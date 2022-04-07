import { action, observable } from "mobx";
import moment from 'moment';
import { ResidenceUiStore } from "./uiStore";
import { Residence } from "./entity";
import { IResidenceListViewProps } from "./interface";
import { ResidenceDomainStore } from "./domainStore";
import { OridStores } from "orid";
import { message } from "antd";
import { conversionSpecialCharacter } from "../../../common/utilFunctions/utilFunctions";



export class ResidenceLisViewUiAction {


    /**
     * 是否显示编辑视图
     */
    @observable
    public isVisiableModal: boolean;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle: string = "";

    public props: IResidenceListViewProps;
    /**
     * 当前操作类型
     */
    public opearatorType: "none" | "add" | "edit";

    private uiStore: ResidenceUiStore;

    private domainStore: ResidenceDomainStore;

    /**
     * 构造
     * @param props 
     */
    constructor(props: IResidenceListViewProps) {
        this.props = props;
        this.uiStore = props.GlobalResidenceStore!;
        this.domainStore = new ResidenceDomainStore();
        this.addbtn = this.addbtn.bind(this);
        this.adda = this.adda.bind(this);
        this.cancel = this.cancel.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.selectedContent = this.selectedContent.bind(this)
        this.ChangeAddress = this.ChangeAddress.bind(this)
        this.ChangeTypeName = this.ChangeTypeName.bind(this)
        this.ChangeCode = this.ChangeCode.bind(this)
    }

    /** 获取组织树 */
    @action.bound
    public    getCompanyName() {
        this.uiStore.CompanyNameData = [];
        this.uiStore.CompanyName = '';
        this.uiStore.InfoName = '';
        this.uiStore.Name = '';
           this.domainStore.getOrganizationTree().then(  (res) => {
            if (res.rtnCode === 0) {
                this.uiStore.InfoName = res.data.OrganizationName
                this.uiStore.CompanyNameData.push(res.data)
                this.uiStore.CompanyName = OridStores.authStore.currentOperator.CpCode
                this.uiStore.Name = OridStores.authStore.currentOperator.CpCode
                this.uiStore.cpCode = res.data.CpCode;
                 this.LoadingData()
            }
        })
    }

    /** 加载小区信息列表 */
    @action.bound
    public async LoadingData() {
        this.uiStore.ResidenceList = []
        this.uiStore.Loading = true;
        let searchCase: string = '';
        if (this.uiStore.InputCode !== '') {
            searchCase = searchCase + "GardenId_" + conversionSpecialCharacter(this.uiStore.InputCode) + ",";
        }
        if (this.uiStore.InputTypeName !== '') {
            searchCase = searchCase + "GardenName_" + conversionSpecialCharacter(this.uiStore.InputTypeName) + ",";
        }
        if (this.uiStore.InputAddress !== '') {
            searchCase = searchCase + "GardenAddress_" + conversionSpecialCharacter(this.uiStore.InputAddress) + ",";
        }
        if (searchCase !== '') {
            searchCase = searchCase.substring(0, searchCase.length - 1);
        }
        searchCase = encodeURIComponent(searchCase);
        if (this.uiStore.ResidenceList.length > 0) {
            this.uiStore.ResidenceList.splice(0, this.uiStore.ResidenceList.length);
        }

     await    this.domainStore.getGardenList(this.uiStore.CompanyName, searchCase).then((res) => {
            if (res.rtnCode === 0) {
                if (searchCase === '') {
                    const jsonList = res.data as Residence[];
                    this.uiStore.ResidenceList = jsonList;
                    this.uiStore.Loading = false;
                } else {
                    const jsonList = res.data.model as Residence[];
                    this.uiStore.ResidenceList = jsonList;
                    this.uiStore.Loading = false;
                }
                console.log("ResidenceList===",this.uiStore.ResidenceList);
            } else {
                this.uiStore.Loading = false;
                message.error(res.rtnMsg);
            }
        })
    }

    /** 查询按钮调用 */
    @action.bound
    public searchData = async () => {
        this.props.GlobalResidenceStore!.CompanyName = this.props.GlobalResidenceStore!.Name
       await this.LoadingData();
    }

    /**
     * 输入编码
     * @param e 
     */
    @action
    public ChangeCode(e: any) {
        this.uiStore.InputCode = e.target.value
        console.log('输入编码:', e.target.value)
    }
    /**
     * 输入小区名称
     * @param e 
     */
    @action
    public ChangeTypeName(e: any) {
        this.uiStore.InputTypeName = e.target.value
        console.log('输入小区名称:', e.target.value)
    }
    /**
     * 输入地址
     * @param e
     */
    @action
    public ChangeAddress(e: any) {
        this.uiStore.InputAddress = e.target.value
        console.log('输入地址:', e.target.value)
    }
    /**
     * 切换公司名称查询数据
     */
    @action
    public async  selectedContent(value: any) {
        this.props.GlobalResidenceStore!.cpCode = value;
        this.uiStore.Name = value;
        console.log("切换公司名称查询数据", value, this.props.GlobalResidenceStore!.cpCode);

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
        console.log('公司名称:', value)
        this.props.GlobalResidenceStore!.CompanyName = value;
       await this.LoadingData();
    }

    /**
     * 新增按钮点击
     * @param model 实体类
     */
    @action
    public async addbtn() {
        this.props.GlobalResidenceStore!.isEditModal = false
        this.uiStore.CurrentEditResidence = new Residence();

        this.uiStore.CurrentEditResidence.FatherId = ""

        this.opearatorType = "add";
        this.modaltitle = "新增小区";

        this.uiStore.SelectorDisabled = false;


        await this.domainStore.getGardenList(this.uiStore.CompanyName, "").then((res) => {
            if (res.rtnCode === 0) {
                this.uiStore.ResidenceList = res.data as Residence[];
            } else {
                message.error(res.rtnMsg);
            }
            this.getMaxSortNo("").then((sortNo) => {
                this.uiStore.CurrentEditResidence.SortNo = sortNo;
                this.uiStore!.isVisibleModal = true;
            })
        })


    }

    /**
     * 新增<a>点击
     * @param model 实体类
     */
    @action
    public adda(model: Residence) {
        this.modaltitle = "新增小区";

        this.uiStore!.isVisibleModal = true;

        this.opearatorType = "add";

        this.uiStore.CurrentEditResidence = new Residence();

        this.uiStore.CurrentEditResidence.FatherId = model.GardenId;

        this.uiStore.SelectorDisabled = false;

    }

    /**
     * 编辑
     */
    @action
    public async edit(model: Residence) {
        this.modaltitle = "编辑小区";



        this.uiStore!.isVisibleModal = true;

        this.opearatorType = "edit";

        this.uiStore.SelectorDisabled = true;

    }

    /**
     * 取消
     */
    @action
    public cancel() {

        this.uiStore!.isVisibleModal = false;

        this.opearatorType = "none";


    }

    /**
     * 保存
     * @param model 实体类
     */
    @action
    public async save(model: Residence) {
        if (!this.uiStore.Loading) { // 避免重复保存
            console.log("model.FatherId", model.FatherId)
            if (this.opearatorType === "add") {
                const index = model.FatherId ? model.FatherId.indexOf("_") : -1;
                if (index > 0) {
                    model.FatherId = model.FatherId.substring(0, index);
                }
                this.AddResidence(model);
                model.FatherId = ''
            } else if (this.opearatorType === "edit") {
                if (model.FatherId.length === 0) {
                    model.FatherId = this.props.GlobalResidenceStore!.cpCode
                } else {
                    const index = model.FatherId ? model.FatherId.indexOf("_") : -1;
                    if (index > 0) {
                        model.FatherId = model.FatherId.substring(0, index);
                    }
                }
                if (!model.CreateDate || model.CreateDate.length === 0) {
                    model.CreateDate = moment().format("YYYY-MM-DD HH:mm:ss")
                }
                this.UpdateResidence(model);
                model.FatherId = ''
            }
        }
    }

    /** 新增小区 */
    @action.bound
    public AddResidence(model: Residence) {
        model.CpCode = this.uiStore.CompanyName;
        this.uiStore.Loading = true;

        this.domainStore.addResidence(model).then((res) => {
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                this.uiStore.Loading = false;
            } else {
                if (this.uiStore.ResidenceList.length > 0) {
                    this.uiStore.ResidenceList.splice(0, this.uiStore.ResidenceList.length);
                }
                const jsonList = res.data.data as Residence[];
                this.uiStore.ResidenceList = jsonList;

                message.success("新增小区成功");
                this.uiStore.isVisibleModal = false;
                this.uiStore.Loading = false;
            }
        })
    }

    /** 更新小区 */
    @action.bound
    public UpdateResidence(model: Residence) {
        this.uiStore.Loading = true;
        model.CpCode = this.uiStore.CompanyName;
        model.CreateId = this.uiStore.CurrentEditResidence.CreateId;
        this.domainStore.updateResidence(model).then((res) => {
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                this.uiStore.Loading = false;
            } else {
                if (this.uiStore.ResidenceList.length > 0) {
                    this.uiStore.ResidenceList.splice(0, this.uiStore.ResidenceList.length);
                }
                const jsonList = res.data as Residence[];
                this.uiStore.ResidenceList = jsonList;
                message.success("更新小区成功");
                this.uiStore.isVisibleModal = false;
                this.uiStore.Loading = false;
            }
            this.props.GlobalResidenceStore!.CurrentEditResidence = new Residence();
        })
    }

    /** 获取最大排序号 */
    @action.bound
    public async getMaxSortNo(fatherId: any) {
        if (fatherId === 'undefined' || fatherId === "") {
            fatherId = '';
        } else {
            fatherId = " &fatherId=" + fatherId;
        }
        await this.domainStore.getMaxSortNo(this.uiStore.CompanyName, fatherId).then((res) => {
            if (res.rtnCode !== 0) {
                this.uiStore.Loading = false;
            } else {
                this.uiStore.maxSortNo = res.data.SortNo + 1;
                this.uiStore.Loading = false;
            }
        })
        return this.uiStore.maxSortNo;
    }

}