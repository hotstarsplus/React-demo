import { action, observable } from "mobx";
import { CardTypeUiStore } from "./uiStore";
import { CardType } from "./entity";
import { ICardTypeListViewProps } from "./interface";
import { CardTypeDomainStore } from "./domainStore";
import { OridStores } from "orid";
import { message } from "antd";
import { conversionSpecialCharacter } from "../../../common/utilFunctions/utilFunctions";




export class CardTypeLisViewUiAction {


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

    public props: ICardTypeListViewProps;
    /**
     * 当前操作类型
     */
    public opearatorType: "none" | "add" | "edit";

    private uiStore: CardTypeUiStore;

    private domainStore: CardTypeDomainStore;



    /**
     * 构造
     * @param props 
     */
    constructor(props: ICardTypeListViewProps) {

        this.uiStore = props.GlobalCardTypeStore!;

        this.domainStore = new CardTypeDomainStore();

        this.addbtn = this.addbtn.bind(this);

        this.adda = this.adda.bind(this);

        this.cancel = this.cancel.bind(this);

        this.edit = this.edit.bind(this);

        this.save = this.save.bind(this);

        this.ChangeCode = this.ChangeCode.bind(this)

        this.ChangeTypeName = this.ChangeTypeName.bind(this)

        this.selectedContent = this.selectedContent.bind(this)

        this.props = props;

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
                this.uiStore.InfoName = res.data.OrganizationName
                this.uiStore.CompanyNameData.push(res.data)
                this.uiStore.CompanyName = OridStores.authStore.currentOperator.CpCode
                this.uiStore.Name = OridStores.authStore.currentOperator.CpCode
                this.loadData()
            }
        })
    }

    @action.bound
    public targetFunc = (): any => {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
    }

    /** 查询按钮调用 */
    @action.bound
    public  searchData = async() => {
        this.props.GlobalCardTypeStore!.CompanyName = this.props.GlobalCardTypeStore!.Name
        await this.loadData()
    }

    /** 输入编码 */
    @action
    public ChangeCode(e: any) {
        this.props.GlobalCardTypeStore!.InputCode = e.target.value
        console.log('输入编码:', this.props.GlobalCardTypeStore!.InputCode)
    }
    /**
     * 水卡类型名称输入
     * @param e
     */
    @action
    public ChangeTypeName(e: any) {
        console.log("水卡类型名称输入",e.target.value)
        this.props.GlobalCardTypeStore!.InputTypeName = e.target.value
        console.log('输入水卡类型名称:', this.props.GlobalCardTypeStore!.InputTypeName)
    }

    /**
     * 企业名称切换
     */
    @action
    public selectedContent(value: any) {
        this.props.GlobalCardTypeStore!.Name = value
        const that = this
        getName(this.props.GlobalCardTypeStore!.CompanyNameData, that)
        function getName(list: any, thats: any) {
            list.map((element: any) => {
                if (String(value) === String(element.OrganitionCode)) {
                    thats.props.GlobalCardTypeStore!.InfoName = element.OrganizationName
                }
                if (element.Children) {
                    getName(element.Children, thats)
                }
            })
        }
        console.log('公司名称:', this.props.GlobalCardTypeStore!.CompanyName)
    }
    /**
     * 新增按钮点击
     * @param model 实体类
     */
    @action
    public async addbtn() {

        this.uiStore.currentEditCardType = new CardType();

        this.uiStore.currentEditCardType.FatherId = ""

        this.opearatorType = "add";

        this.uiStore.SelectorDisabled = false;

        this.domainStore.getCardTypeList(this.uiStore.CompanyName, "").then((res) => {
            if (res.rtnCode === 0) {
                const jsonList = res.data as CardType[];
                this.uiStore.CardTypeUiList = jsonList;
            } else {
                message.error(res.rtnMsg);
            }
            this.getMaxSortNo("").then((sortNo) => {
                console.log("sortNo=====", sortNo)
                this.uiStore.currentEditCardType.SortNo = sortNo;
                this.modaltitle = "新增客户类型";
                this.uiStore.isVisibleModal = true;
            })
        })




    }

    /** 获取最大排序号 */
    @action.bound
    public async getMaxSortNo(fatherId: string): Promise<number> {
        let id = "";
        if (fatherId !== "") {
            /** 不能出现fatherId="",接口返回的数据会出现错误 */
            id = "&fatherId=" + fatherId;
        }
        await this.domainStore.getMaxSortNo(this.uiStore.CompanyName, id).then((res) => {
            if (res.rtnCode !== 0) {
                this.uiStore.isLoading = false;
                console.log("获取最大排序号失败" + res.rtnMsg);
            } else {
                this.uiStore.maxSortNo = res.data.SortNo + 1;
                this.uiStore.isLoading = false;
            }
        })
        return this.uiStore.maxSortNo;
    }

    /**
     * 新增<a>点击
     * @param model 实体类
     */
    @action
    public adda() {
        this.modaltitle = "新增客户类型";

        this.uiStore.isVisibleModal = true;

        this.opearatorType = "add";

        this.uiStore.currentEditCardType = new CardType();

        this.uiStore.SelectorDisabled = true;

    }

    /**
     * 编辑
     */
    @action
    public edit() {

        this.uiStore.isVisibleModal = true;

        this.opearatorType = "edit";

        this.modaltitle = "编辑客户类型";

        this.uiStore.SelectorDisabled = true;

    }

    /**
     * 取消
     */
    @action
    public cancel() {

        this.uiStore.isVisibleModal = false;

        this.opearatorType = "none";


    }

    /**
     * 保存
     * @param model 实体类
     */
    @action
    public save(model: CardType) {
        if (this.opearatorType === "add") {
            const index = model.FatherId.indexOf("_");
            if (index > 0) {
                model.FatherId = model.FatherId.substring(0, index);
            }
            this.AddCardType(model);
        } else if (this.opearatorType === "edit") {
            const index = model.FatherId.indexOf("_");
            if (index > 0) {
                model.FatherId = model.FatherId.substring(index + 1, model.FatherId.length);
            }
            this.UpdateCardType(model);
        }
    }

    /** 新增水卡类型 */
    @action.bound
    public AddCardType(model: CardType) {
        model.CpCode = this.uiStore.CompanyName
        try {
            if (!this.uiStore.isLoading) {
                this.uiStore.isLoading = true;
            }
            this.domainStore.addCardType(model).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    this.uiStore.isLoading = false;
                } else {
                    const jsonList = res.data.data as CardType[];
                    if (this.uiStore.CardTypeList.length > 0) {
                        this.uiStore.CardTypeList.splice(0, this.uiStore.CardTypeList.length);
                        this.uiStore.CardTypeUiList.splice(0, this.uiStore.CardTypeUiList.length);
                    }
                    this.uiStore.CardTypeList = jsonList;
                    this.uiStore.CardTypeUiList = jsonList;
                    this.uiStore.isLoading = false;
                    message.success("新增成功");
                    this.uiStore.isVisibleModal = false
                }
            })
        } catch (error) {
            this.uiStore.isLoading = false;
        }
    }

    /** 编辑水卡数据 */
    @action.bound
    public UpdateCardType(model: CardType) {
        model.CpCode = this.uiStore.CompanyName
        try {
            if (!this.uiStore.isLoading) {
                this.uiStore.isLoading = true;
            }
            model.CreateId = this.uiStore.currentEditCardType.CreateId;
            model.CreateDate = this.uiStore.currentEditCardType.CreateDate;
            this.domainStore.updateCardType(model).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    this.uiStore.isLoading = false;
                } else {
                    const jsonList = res.data as CardType[];
                    if (this.uiStore.CardTypeList.length > 0) {
                        this.uiStore.CardTypeList.splice(0, this.uiStore.CardTypeList.length);
                        this.uiStore.CardTypeUiList.splice(0, this.uiStore.CardTypeUiList.length);
                    }
                    this.uiStore.CardTypeList = jsonList;
                    this.uiStore.CardTypeUiList = jsonList;

                    this.uiStore.isLoading = false;
                    message.success("更新成功");
                    this.uiStore.isVisibleModal = false
                }
            })
        } catch (error) {
            this.uiStore.isLoading = false;
        }
    }

    /** 加载数据 */
    @action.bound
    public async loadData() {
        this.uiStore.CardTypeList = []
        try {
            if (!this.uiStore.isLoading) {
                this.uiStore.isLoading = true;
            }
            let searchCase: string = '';
            if (this.uiStore.InputCode !== '') {
                searchCase = searchCase + "CardTypeId_" + conversionSpecialCharacter(this.uiStore.InputCode) + ",";
            }
            if (this.uiStore.InputTypeName !== '') {
                searchCase = searchCase + "CardTypeName_" +conversionSpecialCharacter(this.uiStore.InputTypeName)  + ",";
            }
            if (searchCase !== '') {
                searchCase = searchCase.substring(0, searchCase.length - 1);
            }
            searchCase = encodeURIComponent(searchCase);
            if (this.uiStore.CardTypeList.length > 0) {
                this.uiStore.CardTypeList.splice(0, this.uiStore.CardTypeList.length);
            }
          await   this.domainStore.getCardTypeList(this.uiStore.CompanyName, searchCase).then((res) => {
                if (res.rtnCode === 0) {
                    if (searchCase === '') {
                        const jsonList = res.data as CardType[];
                        this.uiStore.CardTypeList = jsonList;
                        this.uiStore.isLoading = false;
                    } else {
                        const jsonList = res.data.model as CardType[];
                        this.uiStore.CardTypeList = jsonList;
                        this.uiStore.isLoading = false;
                    }

                } else {
                    message.error(res.rtnMsg);
                    this.uiStore.isLoading = false;
                }
            })
        } catch (error) {
            console.log(error);
            this.uiStore.isLoading = false;
        }
    }


}
