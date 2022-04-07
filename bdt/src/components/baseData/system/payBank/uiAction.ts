import { action, observable } from "mobx";
import { OridStores } from "orid";
import { PayBankUiStore } from "./uiStore";
import { PayBank, PayBankUiEntity } from "./entity";
import { IPayBankListViewProps } from "./interface";
import { PayBankDomainStore } from "./domainStore";
import { message } from "antd";
import { conversionSpecialCharacter } from "../../../common/utilFunctions/utilFunctions";




export class PayBankLisViewUiAction {


    /**
     * 是否显示编辑视图
     */
    @observable
    public isVisiableModal: boolean;
    public props: IPayBankListViewProps;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle: string = "";

    /**
     * 当前操作类型
     */
    public opearatorType: "none" | "add" | "edit";

    private uiStore: PayBankUiStore;

    private domainStore: PayBankDomainStore

    /**
     * 构造
     * @param props 
     */
    constructor(props: IPayBankListViewProps) {

        this.uiStore = props.GlobalPayBankStore!;

        this.domainStore = new PayBankDomainStore();

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
                this.uiStore.InfoName = res.data.OrganizationName;
                this.uiStore.CompanyNameData.push(res.data);
                this.uiStore.CompanyName = OridStores.authStore.currentOperator.CpCode;
                this.uiStore.Name = OridStores.authStore.currentOperator.CpCode;
                this.LoadingData();
            }
        })
    }

    /** 加载数据 */
    @action.bound
    public async LoadingData(callBack?: (list: PayBank[]) => void) {
        try {
            this.uiStore.Loading = true;
            let searchCase: string = '';
            if (this.uiStore.InputCode !== '') {
                searchCase = searchCase + "AgentBankId_" + conversionSpecialCharacter(this.uiStore.InputCode) + ",";
            }
            if (this.uiStore.InputTypeName !== '') {
                searchCase = searchCase + "AgentBankName_" +conversionSpecialCharacter( this.uiStore.InputTypeName )+ ",";
            }
            if (this.uiStore.InputAccount !== '') {
                searchCase = searchCase + "AgentBankAccount_" + conversionSpecialCharacter(this.uiStore.InputAccount )+ ",";
            }
            if (searchCase !== '') {
                searchCase = searchCase.substring(0, searchCase.length - 1);
            }
            searchCase = encodeURIComponent(searchCase)
            this.uiStore.PayBankTypeList = new Array<PayBank>();
            this.uiStore.list = new Array<PayBank>();
        await    this.domainStore.getAgentBankList(this.uiStore.CompanyName, searchCase).then((res) => {
                if (res.rtnCode === 0) {
                    if (searchCase === '') {
                        const jsonlist = res.data as PayBank[];
                        this.refreshUi(jsonlist);
                        this.refreshUis(jsonlist)
                        this.uiStore.Loading = false;
                    } else {
                        const jsonlist = res.data.model as PayBank[];
                        this.refreshUi(jsonlist);
                        this.uiStore.Loading = false;
                    }
                } else {
                    this.uiStore.Loading = false;
                    message.error(res.rtnMsg);
                }
                if (callBack) {
                    callBack(this.uiStore.PayBankTypeList)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    /** 查询按钮调用 */
    @action.bound
    public  searchData =async () => {
        this.props.GlobalPayBankStore!.CompanyName = this.props.GlobalPayBankStore!.Name
       await  this.LoadingData();
    }

    /** 输入账号 */
    @action.bound
    public ChangeAccount(e: any) {
        this.props.GlobalPayBankStore!.InputAccount = e.target.value
        console.log('输入账号:', this.props.GlobalPayBankStore!.InputAccount)
    }
    /** 输入编码 */
    @action.bound
    public ChangeCode(e: any) {
        this.props.GlobalPayBankStore!.InputCode = e.target.value
        console.log('输入编码:', this.props.GlobalPayBankStore!.InputCode)
    }
    /**
     * 开户行名称输入
     * @param e
     */
    @action.bound
    public ChangeTypeName(e: any) {
        this.props.GlobalPayBankStore!.InputTypeName = e.target.value
        console.log('输入开户行名称:', this.props.GlobalPayBankStore!.InputTypeName)
    }

    /**
     * 企业名称切换
     */
    @action.bound
    public selectedContent(value: any) {
        this.props.GlobalPayBankStore!.Name = value
        const that = this
        getName(this.props.GlobalPayBankStore!.CompanyNameData, that)
        function getName(list: any, thats: any) {
            list.map((element: any) => {
                if (String(value) === String(element.OrganitionCode)) {
                    thats.props.GlobalPayBankStore!.InfoName = element.OrganizationName
                }
                if (element.Children) {
                    getName(element.Children, thats)
                }
            })
        }
        console.log('公司名称:', this.props.GlobalPayBankStore!.CompanyName)
    }

    /**
     * 新增按钮点击
     * @param model 实体类
     */
    @action.bound
    public async addbtn() {
        this.props.GlobalPayBankStore!.isEditModal = false
        this.uiStore.CurrentEditPayBank = new PayBank();
        this.uiStore.fatherid = ''
        this.uiStore.CurrentEditPayBank.FatherId = ""

        this.opearatorType = "add";
        this.modaltitle = "新增银行";

        this.uiStore.SelectorDisabled = false;

        this.domainStore.getAgentBankList(this.uiStore.CompanyName, "").then((res) => {
            if (res.rtnCode === 0) {
                const jsonlist = res.data as PayBank[];
                this.refreshUis(jsonlist);
            } else {
                message.error(res.rtnMsg);
            }
            this.getMaxSortNo("").then((sortNo) => {
                console.log("sortNo====",sortNo)
                this.uiStore.CurrentEditPayBank.SortNo = sortNo;
                this.uiStore!.isVisibleModal = true;
            })
            
        })

    }

    /** 获取最大排序号 */
    @action.bound
    public async getMaxSortNo(fatherId: string): Promise<number> {
        await this.domainStore.getMaxSortNo(fatherId, this.uiStore.CompanyName).then((res) => {
            if (res.rtnCode !== 0) {
                this.uiStore.Loading = false;
                console.log("获取最大排序号失败" + res.rtnMsg);
            } else {
                this.uiStore.maxSortNo = res.data.SortNo + 1;
                this.uiStore.Loading = false;
            }
        })
        return this.uiStore.maxSortNo
    }



    /**
     * 新增<a>点击
     * @param model 实体类
     */
    @action.bound
    public adda(model: PayBank) {
        this.modaltitle = "新增银行";
        this.uiStore!.isVisibleModal = true;

        this.opearatorType = "add";

        this.uiStore.CurrentEditPayBank = new PayBank();

        this.uiStore.CurrentEditPayBank.FatherId = model.AgentBankId;

        this.uiStore.SelectorDisabled = true;

    }

    /**
     * 编辑
     */
    @action.bound
    public edit() {
        this.modaltitle = "编辑银行";

        this.uiStore!.isVisibleModal = true;

        this.opearatorType = "edit";

        console.log("编辑",this.uiStore.CurrentEditPayBank);

        this.uiStore.SelectorDisabled = true;

    }

    /**
     * 取消
     */
    @action.bound
    public cancel() {

        this.uiStore!.isVisibleModal = false;

        this.opearatorType = "none";
    }


    /**
     * 保存
     * @param model 实体类
     */
    @action.bound
    public save(model: PayBank) {
        console.log("保存",model)
        if (this.opearatorType === "add") {
            const index = model.FatherId.indexOf("_");
            if (index > 0) {
                model.FatherId = model.FatherId.substring(0, index);
            }
            model.FatherId = this.uiStore.fatherid
            console.log(model.FatherId);
            this.AddPayBank(model);
        } else if (this.opearatorType === "edit") {
            const index = model.FatherId.indexOf("_");
            if (index > 0) {
                model.FatherId = model.FatherId.substring(index + 1, model.FatherId.length);
            }
            if (!model.FatherId || model.FatherId.length === 0) {
                model.FatherId = OridStores.authStore.currentOperator.CpCode;
            }
            this.UpdatePayBank(model);
        }
    }

    /** 新增银行 */
    @action.bound
    public AddPayBank(model: PayBank) {
        model.CpCode = this.uiStore.CompanyName
        try {
            if (!this.uiStore.Loading) {
                this.uiStore.Loading = true;
            }
            this.domainStore.addPayBank(model).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    this.uiStore.Loading = false;
                } else {
                    const jsonList = res.data.data as PayBank[];
                    this.refreshUi(jsonList);
                    this.uiStore.Loading = false;
                    message.success("新增银行成功");
                    this.uiStore.isVisibleModal = false;
                }
            })
        } catch (error) {
            this.uiStore.Loading = false;
        }
    }

    /** 编辑银行信息 */
    @action.bound
    public UpdatePayBank(model: PayBank) {
        model.CpCode = this.uiStore.CompanyName
        try {
            if (!this.uiStore.Loading) {
                this.uiStore.Loading = true;
            }
            /** 新增创建时间、创建人id、、自增id参数 */
            model["CreateDate"] = this.uiStore.CurrentEditPayBank.CreateDate;
            model["CreaterId"] = this.uiStore.CurrentEditPayBank.CreateId;
            model["AutoId"] = this.uiStore.CurrentEditPayBank.AutoId;
            this.domainStore.updatePayBank(model).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    this.uiStore.Loading = false;
                } else {
                    const jsonList = res.data as PayBank[];
                    this.refreshUi(jsonList);
                    this.uiStore.Loading = false;
                    message.success("更新成功");
                    this.uiStore.isVisibleModal = false
                }
            })
        } catch (error) {
            this.uiStore.Loading = false;
        }
    }


    /** 删除银行 */
    @action.bound
    public DeletePayBank(item: PayBank) {
        try {
            if (!this.uiStore.Loading) {
                this.uiStore.Loading = true;
            }
            if (item!.children!.length > 0) {
                message.error("删除失败：" + "存在子级不允许删除");
                this.uiStore.Loading = false;
                return;
            }
            this.domainStore.deletePayBank(item.AgentBankId, this.uiStore.CompanyName).then((res) => {
                if (res.rtnCode !== 0) {
                    this.uiStore.Loading = false;
                    message.error(res.rtnMsg);
                } else {
                    const jsonList = res.data as PayBank[];
                    this.refreshUi(jsonList);
                    this.uiStore.Loading = false;
                    message.success("删除成功");
                }
            })
        } catch (error) {
            this.uiStore.Loading = false;
        }
    }

    /**
     * 构造表格数据
     */
    @action.bound
    public refreshUi(jsonData: PayBank[]) {
        const jsonList = jsonData as PayBank[];
        this.uiStore.PayBankTypeUiList.splice(0, this.uiStore.PayBankTypeUiList.length);
        const data = this.recursion(jsonList);
        this.uiStore.PayBankTypeUiList = data;

    }
/** 构造下拉选数据 */
    @action.bound
    public refreshUis(jsonData: PayBank[]) {
        const jsonList = jsonData as PayBank[];
        this.uiStore.PayBankTypeUiLists.splice(0, this.uiStore.PayBankTypeUiLists.length);
        const data = this.recursion(jsonList);
        this.uiStore.PayBankTypeUiLists = data;

    }

    
    /**
     * 递归转换数据
     * @param list 接口json数据集合
     */
     @action.bound
     public recursion(list: PayBank[]): PayBankUiEntity[] {
         const wsList = new Array<PayBankUiEntity>();
         list.forEach((jsonmodel: PayBank, index: number, array: PayBank[]) => {
             const model = new PayBankUiEntity();
             model.key = jsonmodel.AgentBankId;
             model.value = jsonmodel.AgentBankId;
             model.title = jsonmodel.AgentBankName;
             model.FatherId = jsonmodel.FatherId;
             model.SortNo = jsonmodel.SortNo;
             model.Description = jsonmodel.Description;
             model.AgentBankAccount = jsonmodel.AgentBankAccount;
             model.AgentBankEmail = jsonmodel.AgentBankEmail;
             model.CreateDate=jsonmodel.CreateDate;
             model.CreaterId=jsonmodel.CreateId;
             if (jsonmodel.children && jsonmodel.children.length > 0) {
                 model.children = this.recursion(jsonmodel.children);
             } else {
                 model.children = undefined;
             }
             wsList.push(model);
         })
         return wsList;
     }
}