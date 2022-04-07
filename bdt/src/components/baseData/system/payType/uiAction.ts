import { message } from "antd";
import { action, observable } from "mobx";
import { OridStores } from "orid";
import { PayTypeDomainStore } from "./domainStore";
import { PayType } from './entity';
import { IPayTypeViewProps } from './interface';

/**
 * 视图action
 */
export class PayTypeListViewUiAction {
    /**
     * 是否显示新增、编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;

    /**
     * 操作类型（无操作，新增，编辑）
     */
    private opearatorType: "none" | "edit";

    private props: IPayTypeViewProps;

    private domainStore: PayTypeDomainStore;

    constructor(props: IPayTypeViewProps) {
        this.props = props;
        this.domainStore = new PayTypeDomainStore();
        this.cancel = this.cancel.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.selectedContent = this.selectedContent.bind(this)
    }

    /** 获取组织树 */
    @action.bound
    public getCompanyName() {
        const store = this.props.GlobalPayTypeStore!;
        store.CompanyNameData = [];
        store.InfoName = '';
        store.CompanyName = '';
        store.Name = '';
        this.domainStore.getOrganizationTree().then((res) => {
            if (res.rtnCode === 0) {
                store.InfoName = res.data.OrganizationName;
                store.CompanyNameData.push(res.data);
                store.CompanyName = OridStores.authStore.currentOperator.CpCode;
                store.Name = OridStores.authStore.currentOperator.CpCode;
                this.loadData();
            }
        })
    }

    /** 获取支付方式列表 */
    @action.bound
    public loadData(callBack?: (list: PayType[]) => void) {
        const store = this.props.GlobalPayTypeStore!;
        try {
            if (!store.isLoading) {
                store.isLoading = true;
            }
            store.list = new Array<PayType>();
            this.domainStore.getPayTypeList(store.CompanyName).then((res) => {
                if (res.rtnCode === 0) {
                    const datas = res.data as PayType[];
                    store.isLoading = false;
                    store.list = datas
                    this.getMaxsortNO(datas);
                } else {
                    store.isLoading = false;
                    store.maxSortNo = 1;
                    message.error(res.rtnMsg);
                }

                if (callBack) {
                    callBack(store.list);
                }
            })
        } catch (error) {
            store.isLoading = false;
        }
    }

    /**
     * 获取最大排序号
     */
    public getMaxsortNO(datas: any) {
        const store = this.props.GlobalPayTypeStore!;
        const arr = datas.sort((a: any, b: any) => a.SortNo - b.SortNo);
        store.maxSortNo = arr[arr.length - 1].SortNo;
        if (store.maxSortNo !== undefined || store.maxSortNo !== 0) {
            store.maxSortNo += 1;
        } else {
            store.maxSortNo = 1;
        }
    }

    /** 企业名称切换 */
    @action.bound
    public selectedContent(value: any) {
        this.props.GlobalPayTypeStore!.Name = value
        const that = this
        getName(this.props.GlobalPayTypeStore!.CompanyNameData, that)
        function getName(list: any, thats: any) {
            list.map((element: any) => {
                if (String(value) === String(element.OrganitionCode)) {
                    thats.props.GlobalPayTypeStore!.InfoName = element.OrganizationName
                }
                if (element.Children) {
                    getName(element.Children, thats)
                }
            })
        }
        console.log('企业名称切换：', this.props.GlobalPayTypeStore!.CompanyName)
    }

    /** 查询按钮调用 */
    @action.bound
    public onSearchData() {
        this.props.GlobalPayTypeStore!.CompanyName = this.props.GlobalPayTypeStore!.Name;
        this.loadData();
    }
    /**
     * 新增
     */
    @action.bound
    public add() {
        // this.opearatorType = "add";
        this.props.GlobalPayTypeStore!.isEdit = false;
        this.props.GlobalPayTypeStore!.currentEditItem = new PayType();
        this.props.GlobalPayTypeStore!.currentEditItem.SortNo = this.props.GlobalPayTypeStore!.maxSortNo;
        this.isVisiableModal = true;

    }

    /**
     * 编辑
     */
    @action.bound
    public edit() {
        this.opearatorType = "edit";
        this.props.GlobalPayTypeStore!.isEdit = true;
        this.isVisiableModal = true;
    }

    /**
     * 取消
     */
    @action.bound
    public cancel() {
        this.isVisiableModal = false;
    }

    /**
     * 保存
     * @param item 支付方式实体类
     */
    @action.bound
    public save(item: PayType) {
        if (this.opearatorType === "edit") {
            this.Update(item);
        }
        this.isVisiableModal = false
    }

    /** 更改支付方式数据 */
    @action.bound
    public Update(item: PayType) {
        const store = this.props.GlobalPayTypeStore!;
        const index = this.getIndex(store.currentEditItem.PayTypeId);
        if (index < 0) {
            message.error("更新支付方式失败");
            return;
        } else {
            item.PayTypeId = store.currentEditItem.PayTypeId;
            item.CpCode = store.CompanyName
            item['CreateDate'] = store.currentEditItem.CreateDate;
            item['CreaterId'] = store.currentEditItem.CreaterId;
            item['AutoId'] = store.currentEditItem.AutoId;
            this.domainStore.updatePayType(item).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    return;
                } else {
                    const datas = res.data as PayType[];
                    store.list.splice(0, store.list.length);
                    store.list = datas;
                    store.isLoading = false;
                    this.getMaxsortNO(datas);
                    message.success("更新成功");
                }
            })
        }
    }

    /**
     * 获取回到顶部组件侦听元素
     */
    @action.bound
    public backTopTarget = (): any => {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
    }

    /**
     * 选中的项目
     * @param id 选中项目的ID
     */
    @action.bound
    public SelectedItem(id: string): boolean {
        const item = this.getItem(id);
        if (!item || item === null) {
            return false;
        } else {
            this.props.GlobalPayTypeStore!.currentEditItem = item;
            return true;
        }
    }

    /**
     * 根据id获取集合下标
     * @param id 支付方式ID
     */
    @action.bound
    public getIndex(id: string): number {
        return this.props.GlobalPayTypeStore!.list.findIndex((value: PayType, index: number, list: PayType[]) => {
            return value.PayTypeId === id;
        })
    }

    /**
     * 根据ID对应的支付方式数据
     * @param id 项目ID
     */
    @action.bound
    public getItem(id: string): PayType | null {
        const index = this.getIndex(id);
        return index < 0 ? null : this.props.GlobalPayTypeStore!.list[index];
    }




}

/**
 * 修改提醒信息位置、时间
 */

message.config({
    top: 90,
    duration: 3
});