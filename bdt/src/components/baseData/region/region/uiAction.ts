import { action, observable, toJS } from "mobx";
import { OridStores } from "orid";
import { RegionUiStore } from "./uiStore";
import { IOrganition, Region } from "./entity";
import { IRegionListViewProps } from "./interface";
import { RegionDomainStore } from "./doMainStore";
import { message } from "antd";
import { conversionSpecialCharacter, getMaxValueByKey } from "../../../common/utilFunctions/utilFunctions";




export class RegionLisViewUiAction {

    public props: IRegionListViewProps;

    /**
     * 当前操作类型
     */
    public opearatorType: "none" | "add" | "edit";

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle: string = "";

    /**
     * 片区管理domainStore
     */
    private uiStore: RegionUiStore;

    private domainStore: RegionDomainStore;

    /**
     * 片区id
     */
    private regionId: string;

    /**
     * 片区名称
     */
    private regionName: string;
    /**
     * 公司组织树cpCode
     */
    private cpCode: string;

    /**
     * 构造
     * @param props 
     */
    constructor(props: IRegionListViewProps) {
        this.props = props;
        this.uiStore = props.GlobalRegionStore!;
        this.domainStore = new RegionDomainStore();
        this.regionId = "";
        this.regionName = "";
        this.cpCode = OridStores.authStore.currentOperator.CpCode;

    }

    @action.bound
    public GetCompanyName() {
        this.uiStore.CompanyNameData = [];
        try {
            this.domainStore.getOrganizationTree().then((res) => {
                if (res.rtnCode === 0) {
                    this.uiStore.CompanyNameData.push(res.data as IOrganition)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 输入编码
     * @param value 
     */
    @action.bound
    public ChangeCode(e: any) {
        this.regionId = e.target.value
        console.log('输入编码:', this.regionId)
    }
    /**
     * 输入片区名称
     * @param value 
     */
    @action.bound
    public ChangeTypeName(e: any) {
        this.regionName = e.target.value
        console.log('输入片区名称：', this.regionId)


    }

    /**
     * 搜索
     */
    @action.bound
    public async SearchData() {
        let searchCase: string = '';
        if (this.regionId !== '') {
            searchCase = searchCase + "RegionId_" + conversionSpecialCharacter(this.regionId) + ",";
        }
        if (this.regionName !== '') {
            searchCase = searchCase + "RegionName_" + conversionSpecialCharacter(this.regionName) + ",";
        }
        if (searchCase !== '') {
            searchCase = searchCase.substring(0, searchCase.length - 1);
        }
      
       await this.LoadData(this.cpCode, searchCase);
    }

    /**
     * 公司组织树改变事件
     * @param value 
     * @param label 
     */
    @action.bound
    public async HandleChangeOrgin(value: any, label: any) {
        this.cpCode = value;
        let searchCase: string = '';
        if (this.regionId !== '') {
            searchCase = searchCase + "RegionId_" + conversionSpecialCharacter(this.regionId) + ",";
        }
        if (this.regionName !== '') {
            searchCase = searchCase + "RegionName_" + conversionSpecialCharacter(this.regionName) + ",";
        }
        if (searchCase !== '') {
            searchCase = searchCase.substring(0, searchCase.length - 1);
        }
      await  this.LoadData(this.cpCode, searchCase);
    }

    /**
     * 点击新增按钮改变事件
     */
    @action.bound
    public async Addbtn() {

        this.uiStore.CurrentEditRegion = new Region();
        this.uiStore.CurrentEditRegion.FatherId = ""
        this.opearatorType = "add";
        this.modaltitle = "新增片区";
        this.uiStore.SelectorDisabled = false;
        this.uiStore.CurrentEditRegion.SortNo = this.GetMaxSortNo("");
        // console.info(this.domainStore)
        this.uiStore.IsVisiableModal = true;

    }

    /** 获取最大排序号 */
    @action.bound
    public GetMaxSortNo(id: string): number {
        this.uiStore.maxSortNo = 1;
        if (!id) {
            // 新增时,没有选择父级时,默认取一级片区的最大排序号
            this.uiStore.maxSortNo = getMaxValueByKey(this.uiStore.RegionList, "SortNo") + 1;
        } else {
            this.getMaxSortNo(this.uiStore.RegionList, id);
        }
        return this.uiStore.maxSortNo;
    }

    /** 递归获取最大排序号 */
    @action.bound
    public getMaxSortNo(list: Region[], id: string) {
        list.forEach((model: Region) => {
            if (model.RegionId === id) {
                if (model.children !== undefined && model.children !== null) {
                    // this.maxSortNo = model.SortNo + 1;
                    this.uiStore.maxSortNo = getMaxValueByKey(model.children, "SortNo") + 1;
                } else {
                    this.uiStore.maxSortNo = 1;
                }
            } else if (model.children !== null && model.children !== undefined && model.children.length > 0) {
                this.getMaxSortNo(model.children, id);
            }
        })
    }

    /**
     * 点击编辑按钮改变事件
     */
    @action.bound
    public Edit() {
        this.modaltitle = "编辑片区";
        this.uiStore.IsVisiableModal = true;
        this.opearatorType = "edit";
        this.uiStore.SelectorDisabled = true;

    }

    /**
     * 取消
     */
    @action.bound
    public Cancel() {

        this.uiStore.IsVisiableModal = false;
        this.opearatorType = "none";

    }

    /**
     * 保存
     * @param model 实体类
     */
    @action.bound
    public Save(model: Region) {
        model.CpCode = this.cpCode;
        console.log("FatherId:", toJS(model))
        if (this.opearatorType === "add") {
            this.AddRegion(model);
        } else if (this.opearatorType === "edit") {
            if (!model.FatherId || model.FatherId.length === 0) {
                model.FatherId = model.CpCode;
            }
            this.UpdateRegion(model);
        }
    }

    /**
     * 获取回到顶部组件侦听的元素
     */
    @action.bound
    public BackTopTarget = (): any => {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
    }

    /** 加载数据 */
    @action.bound
    public async LoadData(cpCode: string, searchCase: string) {
        try {
            this.uiStore.IsLoading = true;
            this.uiStore.RegionList = new Array<Region>();
          await  this.domainStore.getRegionList(cpCode,   searchCase).then((res) => {
                if (res.rtnCode === 0) {
                    if (searchCase === '') {
                        const jsonlist = res.data as Region[];
                        this.uiStore.RegionList.push(...jsonlist);
                        this.uiStore.UiRegionList = JSON.parse(JSON.stringify(this.uiStore.RegionList));
                        this.uiStore.IsLoading = false;
                    } else {
                        const jsonlist = res.data.model as Region[];
                        this.uiStore.RegionList.push(...jsonlist);
                        this.uiStore.IsLoading = false;
                    }

                } else {
                    this.uiStore.IsLoading = false;
                    message.info(res.rtnMsg);
                }
            })
        } catch (error) {
            this.uiStore.IsLoading = false;
        }
    }

    /** 新增片区 */
    @action.bound
    public AddRegion(model: Region) {
        try {
            this.uiStore.IsLoading = true;
            this.domainStore.AddRegion(model).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    this.uiStore.IsLoading = false;

                } else {
                    const jsonlist = res.data.data as Region[];
                    this.uiStore.RegionList.splice(0, this.uiStore.RegionList.length);
                    this.uiStore.UiRegionList.splice(0, this.uiStore.UiRegionList.length);
                    this.uiStore.RegionList.push(...jsonlist);
                    this.uiStore.UiRegionList.push(...jsonlist);
                    this.uiStore.IsVisiableModal = false;
                    message.success("新增片区成功");
                }
                this.uiStore.IsLoading = false;
            })
        } catch (error) {
            this.uiStore.IsLoading = false;
        }
    }

    /** 编辑 */
    @action.bound
    public UpdateRegion(model: Region) {
        try {
            this.uiStore.IsLoading = true;
            /**
             * 新增创建时间、创建人id、、自增id参数
             */
            model.CreateDate = this.uiStore.CurrentEditRegion.CreateDate;
            model.CreaterId = this.uiStore.CurrentEditRegion.CreaterId;
            model.AutoId = this.uiStore.CurrentEditRegion.AutoId;
            model.IsDelete = "0";

            this.domainStore.UpdateRegion(model).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    this.uiStore.IsLoading = false;
                } else {
                    const jsonlist = res.data as Region[];
                    this.uiStore.RegionList.splice(0, this.uiStore.RegionList.length);
                    this.uiStore.UiRegionList.splice(0, this.uiStore.UiRegionList.length);
                    this.uiStore.RegionList.push(...jsonlist);
                    this.uiStore.UiRegionList.push(...jsonlist);
                    this.uiStore.IsLoading = false;
                    message.success("更新成功")
                    this.uiStore.IsVisiableModal = false;
                }
            })
        } catch (error) {
            this.uiStore.IsLoading = false;
        }
    }

}