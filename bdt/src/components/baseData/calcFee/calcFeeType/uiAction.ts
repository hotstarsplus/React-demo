import { message } from "antd";
import { action, observable, } from "mobx";
import { CalcFeeTypeUiStore } from "./uiStore";
import { CalcFeeType } from "./entity";
import { ICalcFeeTypeViewProps } from "./interface";
import { OridStores } from "orid";
import { CalcFeeTypeDomainStore } from "./domainStore";

/**
 * 计费方式列表视图action
 */
export class CalcFeeTypeViewUiAction {
    /**
     * 是否显示编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle: string = "";

    /**
     * 当前编辑或取消状态
     */
    public opearatorType: 'none' | 'edit';
    private uiStore: CalcFeeTypeUiStore;
    private domainStore: CalcFeeTypeDomainStore;
    constructor(props: ICalcFeeTypeViewProps) {
        this.uiStore = props.GlobalCalcFeeTypeStore!;
        this.domainStore = new CalcFeeTypeDomainStore();
        this.cancelAddOrEdit = this.cancelAddOrEdit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.selectedContent = this.selectedContent.bind(this)
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
                this.uiStore.CompanyName = OridStores.authStore.currentOperator.CpCode;
                this.uiStore.Name = OridStores.authStore.currentOperator.CpCode;
                this.loadData();
            }
        })
    }

    /** 加载页面数据 */
    @action.bound
    public loadData(callBack?: (list: CalcFeeType[]) => void) {
        try {
            this.uiStore.isLoading = true;
            this.uiStore.list = new Array<CalcFeeType>();
            this.domainStore.getCalcFeeTypeList(this.uiStore.CompanyName).then((res) => {
                if (res.rtnCode !== 0) {
                    this.uiStore.isLoading = false;
                    message.error(res.rtnMsg);
                    return;
                } else {
                    const datas = res.data as CalcFeeType[];
                    this.uiStore.list = datas;
                    this.uiStore.isLoading = false;
                }
                if (callBack) {
                    callBack(this.uiStore.list);
                }
            })
        } catch (error) {
            console.log(error);
        }
        this.uiStore.currentEditItem = new CalcFeeType();
    }

    /**
     * 企业名称切换
     */
    @action.bound
    public selectedContent(value: any) {
        this.uiStore.Name = value
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
        console.log('企业名称切换:', this.uiStore.CompanyName)
    }
    @action.bound
    public onSearchData = () => {
        this.uiStore!.CompanyName = this.uiStore!.Name
        this.loadData()
    }

    /**
     * 点击编辑按钮的回调方法
     */
    @action.bound
    public onEditClick(item: CalcFeeType) {
        this.modaltitle = "编辑计费方式"
        this.isVisiableModal = true;
        this.opearatorType = "edit"
    }
    /**
     * 取消编辑
     */
    @action.bound
    public cancelAddOrEdit() {
        this.isVisiableModal = false;
    }
    /**
     * 保存
     */
    @action.bound
    public saveClick(item: CalcFeeType) {
        if (this.opearatorType === 'edit') {
            this.update(item);
            console.log(JSON.stringify(item));
        }
        this.isVisiableModal = false;
        message.success("保存成功");
    }

    @action.bound
    public targetFunc = (): any => {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
    }

    /**
     * 更新一条数据
     */
    @action.bound
    public update(item: CalcFeeType) {
        const ix = this.getIndex(this.uiStore.currentEditItem.CalcFeeTypeId);
        if (ix < 0) {
            return false;
        } else {
            this.uiStore.list[ix] = item;
            console.log(item);
            return true;
        }
    }

    /**
     * 设置指定Id的项目为当前编辑项目
     * @param {string} id 项目的Id
     * @returns {boolean} 成功返回True，否则返回false
     */
    @action.bound
    public selectItem(id: string): boolean {
        const item = this.getItem(id);
        if (!item || item === null) {
            return false;
        } else {
            this.uiStore.currentEditItem = item;
            return true;
        }
    }



    /**
     * 查找指定id的项目的在集合中的索引
     * @param id {string} id 项目中的id
     */
    @action.bound
    public getIndex(id: string): number {
        return this.uiStore.list.findIndex((item: CalcFeeType, index: number, items: CalcFeeType[]) => {
            return item.CalcFeeTypeId === id;
        });
    }

    /**
     * 查找指定的id的项目
     * @param {string} id
     */
    @action.bound
    public getItem(id: string): CalcFeeType | null {
        const ix = this.getIndex(id);
        return ix < 0 ? null : this.uiStore.list[ix];
    }
}