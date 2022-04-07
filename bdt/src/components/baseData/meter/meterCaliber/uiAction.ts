import { message } from 'antd';
import { action, observable } from 'mobx';
import { OridStores } from 'orid';
import { MeterCaliberDomainStore } from './domainStore';
import { MeterCaliber } from './entity';
import { IMeterCaliberViewProps } from './interface';
import { MeterCaliberView } from './ui';

/**
 * 水表口径列表视图action
 */
export class MeterCaliberViewUiAction {

    /**
     * 是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle: string = "";

    public domainStore: MeterCaliberDomainStore;

    /**
     * 当前编辑或新增状态
     */
    public opearatorType: 'none' | 'add' | 'edit';

    private props: IMeterCaliberViewProps;

    // private cite:MeterCaliberView

    constructor(props: IMeterCaliberViewProps, cite: MeterCaliberView) {
        this.props = props;
        // this.cite = cite;
        this.domainStore = new MeterCaliberDomainStore();
        this.addClick = this.addClick.bind(this);
        this.cancelAddOrEdit = this.cancelAddOrEdit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.selectedContent = this.selectedContent.bind(this)
    }

    @action.bound
    public getCompanyName() {
        const store = this.props.GlobalMeterCaliberStore!;
        store.CompanyNameData = []
        store.CompanyName = ''
        store.InfoName = ''
        store.Name = ''
        this.domainStore.getCompanyName().then((res) => {
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                return;
            }
            store.InfoName = res.data.OrganizationName;
            store.CompanyNameData.push(res.data);
            store.CompanyName = OridStores.authStore.currentOperator.CpCode;
            store.Name = OridStores.authStore.currentOperator.CpCode;
            this.loadData();
        })
    }

    /**
     * 下拉选择查询条件
     */
    @action
    public selectedContent(value: any) {
        this.props.GlobalMeterCaliberStore!.Name = value
        const that = this
        getName(this.props.GlobalMeterCaliberStore!.CompanyNameData, that)
        function getName(list: any, thats: any) {
            list.map((element: any) => {
                if (String(value) === String(element.OrganitionCode)) {
                    thats.domainStore!.InfoName = element.OrganizationName
                }
                if (element.Children) {
                    getName(element.Children, thats)
                }
            })
        }
        console.log('text:', this.props.GlobalMeterCaliberStore!.CompanyName)
    }

    /**
     * 点击新增按钮的回调方法
     */
    @action
    public addClick() {
        // 重置当前编辑项目
        this.modaltitle = "新增水表口径"
        this.props.GlobalMeterCaliberStore!.isVisiableModal = true;
        this.props.GlobalMeterCaliberStore!.currentEditItem = new MeterCaliber();
        this.props.GlobalMeterCaliberStore!.currentEditItem.SortNo = this.props.GlobalMeterCaliberStore!.maxSortNo;
        this.opearatorType = 'add';
    }

    /**
     * 点击编辑按钮的回调方法
     * @param item 
     */
    @action
    public onEditClick(item: MeterCaliber) {
        this.modaltitle = "编辑水表口径"
        this.props.GlobalMeterCaliberStore!.isVisiableModal = true;
        this.opearatorType = 'edit';
    }

    /**
     * 取消新增或编辑
     */
    @action
    public cancelAddOrEdit() {
        this.props.GlobalMeterCaliberStore!.isVisiableModal = false;
    };

    /**
     * 保存
     * @param {MeterCaliber} item 当前待编辑的项目
     */
    @action
    public saveClick(item: MeterCaliber) {
        const store = this.props.GlobalMeterCaliberStore!;
        if (this.opearatorType === 'add') {
            /**
             * 新增
             */
            item.CpCode = store.CompanyName;
            if (!store.isLoading) {
                store.isLoading = true;
            }
            this.domainStore.addMeterInfo(item).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    store.isLoading = false;
                } else {
                    const datas = res.data.data as MeterCaliber[];
                    store.maxSortNo = res.data.maxSortNo + 1;
                    store.refreshUi(datas);
                    store.isLoading = false;
                    store.isVisiableModal = false
                    message.success("新增水表口径成功");
                }
            });
            console.log("新增成功")
        } else if (this.opearatorType === 'edit') { 
            /**
             * 编辑
             */
            const index = store.getIndex(store.currentEditItem.MeterCaliberId);
            if (index < 0) {
                message.error("更新水表口径失败");
                return;
            } else {
                if (!store.isLoading) {
                    store.isLoading = true;
                }
                item.CpCode = store.CompanyName
                item.MeterCaliberId = store.currentEditItem.MeterCaliberId;
                item.CreateDate = store.currentEditItem.CreateDate;
                item.CreateId = store.currentEditItem.CreateId;
                this.domainStore.updateMeterInfo(item).then((res) => {
                    if (res.rtnCode !== 0) {
                        message.error(res.rtnMsg);
                        store.isLoading = false;
                        return;
                    }
                    const datas = res.data as MeterCaliber[];
                    store.refreshUi(datas);
                    store.isLoading = false;
                    store.isVisiableModal = false
                    message.success("更新水表口径成功");

                })
            }
            console.log("更新成功" + JSON.stringify(item));
        }
        // console.log("保存成功")
        // message.success("保存成功");
    }

    /**
     * 加载数据
     * @param callBack 
     */
    @action.bound
    public loadData(callBack?: (list: MeterCaliber[]) => void) {
        const store = this.props.GlobalMeterCaliberStore!;
        store.list = []
        try {
            if (!store.isLoading) {
                store.isLoading = true;
            }
            store.list = new Array<MeterCaliber>();
            this.domainStore.getMeterCaliberList(store.CompanyName).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    return;
                }
                const datas = res.data as MeterCaliber[];
                store.dataLength = datas.length;
                store.list = datas;
                /**
                 *  获取最大排序号
                 */
                if (datas.length > 0) {
                    const arr = datas.sort((a, b) => a.SortNo - b.SortNo);
                    store.maxSortNo = arr[arr.length - 1].SortNo;
                }
                if (datas.length > 0) {
                    if (store.maxSortNo !== undefined || store.maxSortNo !== 0) {
                        store.maxSortNo += 1;
                    } else {
                        store.maxSortNo = 1;
                    }
                } else {
                    store.maxSortNo = 1;
                }

                console.log(store.maxSortNo + "最大排序号");
                store.isLoading = false;

                if (callBack) {
                    callBack(store.list);
                }
            })

        }
        catch (error) {
            console.log(error);
        }
        store.currentEditItem = new MeterCaliber();
    }

    /** 查询按钮调用 */
    @action.bound
    public onSearchData() {
        this.props.GlobalMeterCaliberStore!.CompanyName = this.props.GlobalMeterCaliberStore!.Name;
        this.loadData();
    }

}