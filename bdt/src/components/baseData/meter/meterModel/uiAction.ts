import { message } from "antd";
import { action, observable } from "mobx";
import { OridStores } from "orid";
import { MeterModelDomainStore } from "./domainStore";
import { MeterModel } from "./entity";
import { IMeterModelViewProps } from "./interface";

export class MeterModelViewUiAction {

    /**
     * 是否显示新增编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle: string = "";

    /**
     * 当前编辑或新增状态
     */
    public opearatorType: 'none' | 'add' | 'edit';


    public props: IMeterModelViewProps;

    public domianStore: MeterModelDomainStore


    constructor(props: IMeterModelViewProps) {
        this.props = props;
        this.domianStore = new MeterModelDomainStore();
        this.onEditClick = this.onEditClick.bind(this);
        this.addClick = this.addClick.bind(this);
        this.cancelAddOrEdit = this.cancelAddOrEdit.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.selectedContent = this.selectedContent.bind(this)


    }

    @action.bound
    public getCompanyName() {
        const store = this.props.GlobalMeterModelStore!;
        store.CompanyNameData = [];
        store.CompanyName = '';
        store.InfoName = '';
        store.Name = '';
        this.domianStore.getCompanyName().then((res) => {
            if (res.rtnCode === 0) {
                store.InfoName = res.data.OrganizationName;
                store.CompanyNameData.push(res.data);
                store.CompanyName = OridStores.authStore.currentOperator.CpCode;
                store.Name = OridStores.authStore.currentOperator.CpCode;
                this.loadData();
            }
        })
    }

    /**
     * 企业名称选择
     */
    @action
    public selectedContent(value: any) {
        const store = this.props.GlobalMeterModelStore!;
        store.Name = value
        getName(store!.CompanyNameData, this)
        function getName(list: any, that: MeterModelViewUiAction) {
            list.map((element: any) => {
                if (String(value) === String(element.OrganitionCode)) {
                    that.props.GlobalMeterModelStore!.InfoName = element.OrganizationName
                }
                if (element.Children) {
                    getName(element.Children, that)
                }
            })
        }
        console.log('企业名称:', store.CompanyName)
    }

    /**
     * 点击新增按钮的回调方法
     */
    @action
    public addClick() {
        // 重置当前编辑项目
        this.modaltitle = "新增水表型号"
        this.props.GlobalMeterModelStore!.isVisibleModal = true;
        this.props.GlobalMeterModelStore!.currentEditRow = new MeterModel();
        this.props.GlobalMeterModelStore!.currentEditRow.SortNo = this.props.GlobalMeterModelStore!.maxSortNo;
        this.opearatorType = 'add';
    }

    @action
    public onEditClick(item: MeterModel) {
        this.modaltitle = "编辑水表型号"
        this.props.GlobalMeterModelStore!.isVisibleModal = true;
        this.opearatorType = 'edit';
    }
    /**
     * 取消新增或编辑
     */
    @action
    public cancelAddOrEdit() {
        this.props.GlobalMeterModelStore!.isVisibleModal = false;
    };



    /**
     * 保存
     * @param {WaterRateItemType} item 当前待编辑的项目
     */
    @action
    public saveClick(item: MeterModel) {
        if (this.opearatorType === 'add') {
            this.add(item);
            console.log("新增成功")
        }
        else if (this.opearatorType === 'edit') {
            this.update(item);
            console.log("更新成功")
        }
    }


    /** 新增水表型号 */
    @action.bound
    public add(meterModel: MeterModel) {
        const store = this.props.GlobalMeterModelStore!;
        meterModel.CpCode = store.CompanyName;
        try {
            if (!store.isLoading) {
                store.isLoading = true;
            }

            this.domianStore.addMeterModal(meterModel).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    store.isLoading = false;
                } else {
                    const datas = res.data.data as MeterModel[];
                    store.maxSortNo = res.data.maxSortNo + 1;
                    store.refreshUi(datas);
                    store.isLoading = false;
                    message.success("新增水表型号成功");
                    store.isVisibleModal = false;
                }
            })
        } catch (error) {
            store.isLoading = false;
        }
    }

    /** 更新 */
    @action.bound
    public update(meterModel: MeterModel) {
        const store = this.props.GlobalMeterModelStore!;
        try {
            const index = this.getIndex(store.currentEditRow.MeterModelId);
            if (index < 0) {
                message.error("更新水表型号失败");
                return;
            } else {
                meterModel.CpCode = store.CompanyName;
                meterModel.CreateDate = store.currentEditRow.CreateDate;
                meterModel.CreateId = store.currentEditRow.CreateId;
                this.domianStore.updateMeterModel(meterModel).then((res) => {
                    if (res.rtnCode !== 0) {
                        message.error(res.rtnMsg);
                        return;
                    } else {
                        const datas = res.data as MeterModel[];
                        store.refreshUi(datas);
                        store.isLoading = false;
                        message.success("更新水表型号成功");
                        store.isVisibleModal = false;
                    }
                })
            }
        } catch (error) {
            console.log("更新水表型号失败：" + error);
        }
    }

    /**
     * 查找指定id的项目的在集合中的索引
     * 
     * @param {string} id 项目的id
     * @returns {number} 项目的索引
     */
    public getIndex(id: string): number {
        return this.props.GlobalMeterModelStore!.list.findIndex((meterModel: MeterModel, index: number, meterModels: MeterModel[]) => {
            return meterModel.MeterModelId === id;
        });
    }


    /** 加载数据 */
    @action.bound
    public loadData(callBack?: (list: MeterModel[]) => void) {
        const store = this.props.GlobalMeterModelStore!;
        try {
            if (!store.isLoading) {
                store.isLoading = true;
            }
            store.list = new Array<MeterModel>();
            this.domianStore.getMeterModelList(store.CompanyName).then((res) => {
                if (res.rtnCode !== 0) {
                    store.isLoading = false;
                    message.error(res.rtnMsg);
                    return;
                }
                const datas = res.data as MeterModel[];
                store.dataLength = datas.length;
                store.list = datas;
                /** 获取最大排序号 */
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

            })

            if (callBack) {
                callBack(store.list);
            }
        } catch (error) {
            console.log(error);
        }
        store.currentEditRow = new MeterModel();
    }

    /** 查询按钮调用 */
    @action.bound
    public onSearchData() {
        this.props.GlobalMeterModelStore!.CompanyName = this.props.GlobalMeterModelStore!.Name
        this.loadData()
    }

    @action.bound
    public targetFunc(): any {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
    }

}