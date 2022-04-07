import { action, observable } from 'mobx';
import { QuantityTapyUiStore } from './uiStore';
import { QuantityTapy } from './entity';
import { IQuantityTapyViewProps } from './interface';
import { QuantityTapyDomainStore } from './domainStore';
import { OridStores } from 'orid';
import { message } from 'antd';

/**
 * 水量类型列表视图Action
 */
export class QuantityTapyViewUiAction {
    /**
     * 是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;
    /**
     * 当前编辑或新增状态
     */
    public opearatorType: 'none' | 'add' | 'edit';

    public props: IQuantityTapyViewProps

    /** 数据store */
    private uiStore: QuantityTapyUiStore;
    /** 接口store */
    private domainStore: QuantityTapyDomainStore;

    constructor(props: IQuantityTapyViewProps) {
        this.props = props;
        this.uiStore = props.GlobalQuantityTapyStore!;
        this.domainStore = new QuantityTapyDomainStore();
    }

    /** 获取组织树 */
    @action.bound
    public getCompanyName() {
        this.uiStore.CompanyNameData = [];
        this.uiStore.InfoName = '';
        this.uiStore.CompanyName = '';
        this.uiStore.Name = '';
        this.domainStore.getOrganizationTree().then((res) => {
            if (res.rtnCode === 0) {
                this.uiStore.InfoName = res.data.OrganizationName;
                this.uiStore.CompanyNameData.push(res.data);
                this.uiStore.CompanyName = OridStores.authStore.currentOperator!.CpCode;
                this.uiStore.Name = OridStores.authStore.currentOperator.CpCode;
                this.loadData();
            }
        })
    }

    /** 加载水量类型列表 */
    @action.bound
    public loadData(callBack?: (list: QuantityTapy[]) => void) {
        try {
            if (!this.uiStore.isLoading) {
                this.uiStore.isLoading = true;
            }
            this.uiStore.list = new Array<QuantityTapy>();

            this.domainStore.getQuantityTypeList(this.uiStore.CompanyName).then((res) => {
                if (res.rtnCode !== 0) {
                    console.log(res.rtnMsg);
                    this.uiStore.isLoading = false;
                    return;
                } else {
                    const datas = res.data as QuantityTapy[];
                    console.log(datas);
                    this.uiStore.dataLength = datas.length;
                    this.uiStore.list = datas;
                    /**
                     *  获取最大排序号
                     */
                    if (datas.length > 0) {
                        const arr = datas.sort((a, b) => a.SortNo - b.SortNo);
                        this.uiStore.maxSortNo = arr[arr.length - 1].SortNo;
                    }
                    if (this.uiStore.maxSortNo !== undefined || this.uiStore.maxSortNo !== 0) {
                        this.uiStore.maxSortNo += 1;
                    } else {
                        this.uiStore.maxSortNo = 1;
                    }
                    console.log(this.uiStore.maxSortNo + "最大排序号");
                    this.uiStore.isLoading = false;
                }
                if (callBack) {
                    callBack(this.uiStore.list);
                }
            })
        }
        catch (error) {
            console.log(error);
            this.uiStore.isLoading = false;
        }
        this.uiStore.currentEditItem = new QuantityTapy();
    }

    /** 公司名称切换 */
    @action.bound
    public selectedContent(value: any) {
        this.uiStore!.Name = value
        const that = this
        getName(this.uiStore!.CompanyNameData, that)
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
        console.log('公司名称:', this.uiStore!.CompanyName)
    }

    @action.bound
    public targetFunc = (): any => {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
    }

    /** 查询按钮调用 */
    @action.bound
    public onSearchData() {
        this.props.GlobalQuantityTapyStore!.CompanyName = this.props.GlobalQuantityTapyStore!.Name
        this.loadData();
    }

    /**
     * 点击新增按钮的回调方法
     */
    @action.bound
    public addClick() {
        // 重置当前编辑项目
        this.isVisiableModal = true;
        this.uiStore.currentEditItem = new QuantityTapy();
        this.uiStore.currentEditItem.SortNo = this.uiStore.maxSortNo;
        this.opearatorType = 'add';
    }
    /**
     * 点击编辑按钮的回调方法
     * @param item 
     */
    @action.bound
    public onEditClick(item: QuantityTapy) {
        this.isVisiableModal = true;
        this.opearatorType = 'edit';
    }
    /**
     * 取消新增或编辑
     */
    @action.bound
    public cancelAddOrEdit() {
        this.isVisiableModal = false;
    };
    /**
     * 保存
     * @param {MeterCaliber} item 当前待编辑的项目
     */
    @action.bound
    public saveClick(item: QuantityTapy) {
        if (this.opearatorType === 'add') {
            this.add(item);
        }
        else if (this.opearatorType === 'edit') {
            this.update(item);
        }
        this.isVisiableModal = false;
    }

    /** 新增水量类型 */
    @action.bound
    public add(item: QuantityTapy) {
        item.CpCode = this.uiStore.CompanyName
        try {
            if (!this.uiStore.isLoading) {
                this.uiStore.isLoading = true;
            }
            this.domainStore.addQuantityType(item).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    this.uiStore.isLoading = false;
                } else {
                    const datas = res.data.data as QuantityTapy[];
                    this.uiStore.maxSortNo = res.data.maxSortNo + 1;
                    this.refreshUi(datas);
                    this.uiStore.isLoading = false;
                    message.success("新增水量类型成功");
                }
            })
        } catch (error) {
            this.uiStore.isLoading = false;
        }
    }

    /** 更新水量类型 */
    @action.bound
    public update(item: QuantityTapy) {
        try {
            const index = this.getIndex(this.uiStore.currentEditItem.QuantityTypeId);
            if (index < 0) {
                message.error("更新水量类型失败");
                return;
            } else {
                if (!this.uiStore.isLoading) {
                    this.uiStore.isLoading = true;
                }
                item.CpCode = this.uiStore.CompanyName
                item.QuantityTypeId = this.uiStore.currentEditItem.QuantityTypeId;
                item.CreateId = this.uiStore.currentEditItem.CreateId;
                item.CreateDate = this.uiStore.currentEditItem.CreateDate;
                this.domainStore.updateQuantityType(item).then((res) => {
                    if (res.rtnCode !== 0) {
                        message.error(res.rtnMsg);
                        this.uiStore.isLoading = false;
                    } else {
                        const datas = res.data as QuantityTapy[];
                        this.refreshUi(datas);
                        this.uiStore.isLoading = false;
                        message.success("更新水量类型成功");
                    }
                })
            }
        } catch (error) {
            this.uiStore.isLoading = false;
        }
    }

    /** 移除水量类型 */
    @action.bound
    public remove(id: string) {
        try {
            const index = this.getIndex(id);
            if (index < 0) {
                message.error("删除水量类型失败");
                return;
            } else {
                if (!this.uiStore.isLoading) {
                    this.uiStore.isLoading = true;
                }
                this.domainStore.removeQuantityType(id, this.uiStore.CompanyName).then((res) => {
                    if (res.rtnCode !== 0) {
                        this.uiStore.isLoading = false;
                        message.error(res.rtnMsg);
                    } else {
                        const datas = res.data as QuantityTapy[];
                        this.refreshUi(datas);
                        const arr = datas.sort((a, b) => a.SortNo - b.SortNo);
                        this.uiStore.maxSortNo = arr[arr.length - 1].SortNo;
                        if (this.uiStore.maxSortNo !== undefined || this.uiStore.maxSortNo !== 0) {
                            this.uiStore.maxSortNo += 1;
                        } else {
                            this.uiStore.maxSortNo = 1;
                        }
                        this.uiStore.isLoading = false;
                        message.success("删除水量类型成功");
                    }
                })
            }
        } catch (error) {
            this.uiStore.isLoading = false;
        }
    }

    /**
     * 查找指定id的项目的在集合中的索引
     * @param id {string} id 项目的id
     * @returns {number} 项目的索引
     */
    @action.bound
    public getIndex(id: string): number {
        return this.uiStore.list.findIndex((item: QuantityTapy, index: number, items: QuantityTapy[]) => {
            return item.QuantityTypeId === id;
        });
    }

    /**
     * 设置指定Id的项目为当前编辑项目
     * @param {string} id 项目的Id
     * @returns {boolean} 成功返回True，否则返回false
     */
    @action.bound
    public selectItem(id: string): boolean {
        const item = this.getItem(id);
        console.log(item);
        if (!item || item === null) {
            return false;
        }
        this.uiStore.currentEditItem = item;
        return true;
    }

    /**
     * 查找指定的id的项目
     * 
     * @param {string} id 
     * @returns {QuantityTapy | null} 水量类型或空
     */
    @action.bound
    public getItem(id: string): QuantityTapy | null {
        const ix = this.getIndex(id);
        return ix < 0
            ? null
            : this.uiStore.list[ix];
    }

    /**
     * 刷新页面ui
     */
    @action.bound
    public refreshUi(jsonList: QuantityTapy[]) {
        const datas = jsonList as QuantityTapy[];
        this.uiStore.list.splice(0, this.uiStore.dataLength);
        this.uiStore.list = datas;
        this.uiStore.dataLength = datas.length;
    }
}