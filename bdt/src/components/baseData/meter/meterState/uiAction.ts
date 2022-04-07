import { message } from "antd";
import { action, observable } from "mobx";
import { OridStores } from "orid";
import { MeterStateDomainStore } from "./doMainStore";
import { MeterState } from "./entity";
import { IMeterStateListViewProps } from "./interface";




/**
 *  水表状态管理action
 */
export class MeterStateListViewUiAction {

    /**
     *  是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle: string = "";

    /**
     * 操作类型(无操作,新增,编辑)
     */
    private opearatorType: 'none' | 'add' | 'edit';

    private props: IMeterStateListViewProps;

    private domainStore: MeterStateDomainStore;
    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IMeterStateListViewProps) {

        this.props = props;

        this.domainStore = new MeterStateDomainStore();

    }

    @action.bound
    public getCompanyName() {
        const store = this.props.GlobalMeterStateStore!;
        store.CompanyNameData = [];
        store.InfoName = '';
        store.CompanyName = '';
        store.Name = '';
        this.domainStore.getCompanyName().then((res) => {
            if (res.rtnCode === 0) {
                store.InfoName = res.data.OrganizationName;
                store.CompanyNameData.push(res.data);
                store.CompanyName = OridStores.authStore.currentOperator.CpCode;
                store.Name = OridStores.authStore.currentOperator.CpCode;
                this.loadData();
            }
        })
    }

    /** 加载数据 */
    @action.bound
    public loadData(callBack?: (list: MeterState[]) => void) {
        const store = this.props.GlobalMeterStateStore!;
        try {
            if (!store.isLoading) {
                store.isLoading = true;
            }
            store.list = new Array<MeterState>();
            this.domainStore.getMeterStateList(store.CompanyName).then((res) => {
                if (res.rtnCode === 0) {
                    const datas = res.data as MeterState[];
                    store.isLoading = false;
                    store.list = datas;
                    this.getMaxsortNO(datas);
                } else {
                    store.isLoading = false;
                    store.isLoading = false;
                    console.error("加载失败" + "返回码:" + res.rtnCode + ",返回结果:" + res.rtnMsg);
                }
            })
            if (callBack) {
                callBack(store.list);
            }
        } catch (error) {
            store.isLoading = false;
            console.log(error);
        }
    }

    /**
     * 获取最大排序号
     */
     public getMaxsortNO(datas: any) {
        if (datas !== null) {
            const store = this.props.GlobalMeterStateStore!;
            const arr = datas.sort((a: any, b: any) => a.SortNo - b.SortNo);
            store.maxSortNo = arr[arr.length - 1].SortNo;
            if (store.maxSortNo !== undefined || store.maxSortNo !== 0) {
                store.maxSortNo += 1;
            } else {
                store.maxSortNo = 1;
            }
            console.log(store.maxSortNo + "最大排序号");
        }
    }

    /**
     * 选择企业名称查询条件
     */
    @action.bound
    public selectedContent(value: any) {
        this.props.GlobalMeterStateStore!.Name = value
        const that = this
        getName(this.props.GlobalMeterStateStore!.CompanyNameData, that)
        function getName(list: any, thats: any) {
            list.map((element: any) => {
                if (String(value) === String(element.OrganitionCode)) {
                    thats.props.GlobalMeterStateStore!.InfoName = element.OrganizationName
                }
                if (element.Children) {
                    getName(element.Children, thats)
                }
            })
        }
        console.log('企业名称:', this.props.GlobalMeterStateStore!.CompanyName)
    }

    /**
     * 编辑
     */
    @action.bound
    public edit() {
        this.opearatorType = "edit";
        this.modaltitle = "编辑水表状态"
        this.props.GlobalMeterStateStore!.isEdit = true;
        this.props.GlobalMeterStateStore!.isVisibleModal = true;
    }

    /**
     * 取消
     */
    @action.bound
    public cancel() {
        this.props.GlobalMeterStateStore!.isVisibleModal = false;
    }

    /** 查询 */
    @action.bound
    public onSearchData = () => {
        this.props.GlobalMeterStateStore!.CompanyName = this.props.GlobalMeterStateStore!.Name
        this.loadData()
    }

    /**
     * 保存
     * @param item 水表状态实体类
     */
    @action.bound
    public save(item: MeterState) {
        if (this.opearatorType === "edit") {
            this.update(item);
        }
    }

    /** 编辑 */
    @action.bound
    public update(item: MeterState) {
        const store = this.props.GlobalMeterStateStore!;
        try {
            const index = this.getIndex(store.currentEditItem.MeterStateId);

            if (index < 0) {
                message.error("更新水表状态失败");
                return;
            } else {
                item.CpCode = store.CompanyName
                item.MeterStateId = store.currentEditItem.MeterStateId;
                /**
                 * 添加创建时间、创建人id、自增id参数
                 */
                item["CreateDate"] = store.currentEditItem.CreateDate;
                item["CreaterId"] = store.currentEditItem.CreaterId;
                item["AutoId"] = store.currentEditItem.AutoId;
                this.domainStore.updateRecord(item).then((res) => {
                    if (res.rtnCode !== 0) {
                        message.error(res.rtnMsg);
                        return;
                    }
                    const datas = res.data as MeterState[];
                    store.list.splice(0, store.list.length);
                    store.list = datas;
                    store.isLoading = false;
                    message.success("更新成功");
                    store.isVisibleModal = false
                })
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    /**
     * 根据ID获取集合中的下标
     * @param id 水表状态ID
     */
     public getIndex(id: string): number {
        return this.props.GlobalMeterStateStore!.list.findIndex((value: MeterState, index: number, list: MeterState[]) => {
            return value.MeterStateId === id
        })
    }

    /**
     * 回到顶部组件侦听的目标元素
     */
    public backTopTarget = (): any => {
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