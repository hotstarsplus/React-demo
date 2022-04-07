import { message } from "antd";
import { action, observable } from "mobx";
import { OridStores } from "orid";
import { SpecialProcessTypeDomainStore } from "./domainStore";
import { SpecialProcessType } from './entity';
import { ISpecialProgressTypeViewProps } from './interface';

/**
 * 视图action
 */
export class SpecialProgressTypeListViewUiAction {
    /**
     * 是否显示新增、编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;

    /**
     * 操作类型（无操作，新增，编辑）
     */
    private opearatorType: "none" | "edit";

    private props: ISpecialProgressTypeViewProps;

    private domainStore: SpecialProcessTypeDomainStore;
    /**
     * 构造方法
     * @param props
     */
    constructor(props: ISpecialProgressTypeViewProps) {
        this.props = props;
        this.domainStore = new SpecialProcessTypeDomainStore();
        this.cancel = this.cancel.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.selectedContent = this.selectedContent.bind(this)
    }

    @action.bound
    public getCompanyName() {
        const store = this.props.GlobalSpecialProgressTypeStore!;
        store.CompanyNameData = [];
        store.InfoName = '';
        store.CompanyName = '';
        store.Name = '';
        this.domainStore.getCompanyName().then((res) => {
            if (res.rtnCode === 0) {
                store.InfoName = res.data.OrganizationName
                store.CompanyNameData.push(res.data)
                store.CompanyName = OridStores.authStore.currentOperator.CpCode
                store.Name = OridStores.authStore.currentOperator.CpCode
                this.loadData()
            }
        })
    }

    /** 加载数据 */
    @action.bound
    public loadData(callBack?: (list: SpecialProcessType[]) => void) {
        const store = this.props.GlobalSpecialProgressTypeStore!;
        try {
            if (!store.isLoading) {
                store.isLoading = true;
            }
            store.list = new Array<SpecialProcessType>();
            this.domainStore.getMeterSpecialTypeList(store.CompanyName).then((res) => {
                if (res.rtnCode === 0) {
                    const datas = res.data as SpecialProcessType[];
                    store.isLoading = false;
                    store.list = datas
                    this.getMaxsortNO(datas);
                } else {
                    store.isLoading = false;
                    store.maxSortNo = 1;
                    message.error(res.rtnMsg);
                }
            })
            if (callBack) {
                callBack(store.list);
            }
        } catch (error) {
            console.log(error);
            store.isLoading = false;
        }
    }

    /**
     * 选择企业名称查询
     */
    @action
    public selectedContent(value: any) {
        this.props.GlobalSpecialProgressTypeStore!.Name = value
        const that = this
        getName(this.props.GlobalSpecialProgressTypeStore!.CompanyNameData, that)
        function getName(list: any, thats: any) {
            list.map((element: any) => {
                if (String(value) === String(element.OrganitionCode)) {
                    thats.props.GlobalSpecialProgressTypeStore!.InfoName = element.OrganizationName
                }
                if (element.Children) {
                    getName(element.Children, thats)
                }
            })
        }
        console.log('企业名称:', this.props.GlobalSpecialProgressTypeStore!.CompanyName)
    }

    /** 查询按钮调用 */
    @action.bound
    public onSearchData = () => {
        this.props.GlobalSpecialProgressTypeStore!.CompanyName = this.props.GlobalSpecialProgressTypeStore!.Name
        this.loadData();
    }

    /**
     * 编辑
     */
    @action.bound
    public edit() {
        this.opearatorType = "edit";
        this.props.GlobalSpecialProgressTypeStore!.isEdit = true;
        this.props.GlobalSpecialProgressTypeStore!.isVisibleModal = true;
    }

    /**
     * 取消
     */
    @action
    public cancel() {
        this.props.GlobalSpecialProgressTypeStore!.isVisibleModal = false;
    }

    /**
     * 保存
     * @param item 水表特殊型号实体类
     */
    @action
    public save(item: SpecialProcessType) {
        if (this.opearatorType === "edit") {
            this.Update(item);
        }
    }

    /** 更新 */
    @action.bound
    public Update(item: SpecialProcessType) {
        const store = this.props.GlobalSpecialProgressTypeStore!;
        try {
            const index = store.getIndex(store.currentEditItem.MeterSpecialTypeId);
            if (index < 0) {
                message.error("更新失败");
                return;
            } else {
                item.CpCode = store.CompanyName
                item.MeterSpecialTypeId = store.currentEditItem.MeterSpecialTypeId;
                /** 添加创建时间、创建人id、自增id参数 */
                item["CreateDate"] = store.currentEditItem.CreateDate;
                item["CreaterId"] = store.currentEditItem.CreaterId;
                item["AutoId"] = store.currentEditItem.AutoId;
                this.domainStore.updateRecord(item).then((res) => {
                    if (res.rtnCode !== 0) {
                        message.error(res.rtnMsg);
                        return;
                    } else {
                        const datas = res.data as SpecialProcessType[];
                        console.info("datas:", datas);
                        store.list.splice(0, store.list.length);
                        store.list = datas;
                        store.isLoading = false;
                        this.getMaxsortNO(datas);
                        message.success("更新成功");
                        store.isVisibleModal = false
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 获取最大排序号
     */
     public getMaxsortNO(datas: any) {
         if (datas && datas.length > 0) {
            const store = this.props.GlobalSpecialProgressTypeStore!;
            const arr = datas.sort((a: any, b: any) => a.SortNo - b.SortNo);
            store.maxSortNo = arr[arr.length - 1].SortNo;
            if (store.maxSortNo !== undefined || store.maxSortNo !== 0) {
                store.maxSortNo += 1;
            } else {
                store.maxSortNo = 1;
            }
            console.log(store.maxSortNo + "最大排序号");
        } else {
            return;
        }
    }

    /***
     * 回到顶部组件侦听的目标元素
     */
    public backToptarget = (): any => {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
    }
}

/**
 * 修改提醒信息位置、时间
 */

message.config({
    top: 90,
    duration: 3
});