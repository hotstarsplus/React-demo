import { action, observable } from "mobx";
import { BusinessOfficeUiStore } from "./uiStore";
import { BusinessOffice, BusinessOfficeUiEntity } from "./entity";
import { IBusinessOfficeListViewProps } from "./interface";
import { BusinessOfficeDomainStore } from "./domainStore";
import { OridStores } from "orid";
import { message } from "antd";
import { conversionSpecialCharacter } from "../../../common/utilFunctions/utilFunctions";


export class BusinessOfficeLisViewUiAction {

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

    public props: IBusinessOfficeListViewProps;
    /**
     * 当前操作类型
     */
    public opearatorType: "none" | "add" | "edit";

    /**
     * 数据
     */
    private uiStore: BusinessOfficeUiStore;

    /** 接口 */
    private domainStore: BusinessOfficeDomainStore;

    /**
     * 构造
     * @param props 
     */
    constructor(props: IBusinessOfficeListViewProps) {

        this.props = props;

        this.uiStore = props.GlobalBusinessOfficeStore!;

        this.domainStore = new BusinessOfficeDomainStore();

        this.addbtn = this.addbtn.bind(this);

        this.adda = this.adda.bind(this);

        this.cancel = this.cancel.bind(this);

        this.edit = this.edit.bind(this);

        this.save = this.save.bind(this);

        this.selectedContent = this.selectedContent.bind(this)

        this.ChangeCode = this.ChangeCode.bind(this)

        this.ChangeAddress = this.ChangeAddress.bind(this)

        this.ChangelinkName = this.ChangelinkName.bind(this)

        this.ChangeTypeName = this.ChangeTypeName.bind(this)

    }

    /** 查询组织树 */
    @action.bound
    public getCompanyName() {
        this.uiStore.CompanyNameData = [];
        this.uiStore.InfoName = '';
        this.uiStore.CompanyName = '';
        this.uiStore.Name = '';
        this.domainStore.organizationTree().then((res) => {
            if (res.rtnCode === 0) {
                this.uiStore.InfoName = res.data.OrganizationName;
                this.uiStore.CompanyNameData.push(res.data);
                this.uiStore.cpCode = res.data.CpCode;
                this.uiStore.CompanyName = OridStores.authStore.currentOperator.CpCode;
                this.uiStore.Name = OridStores.authStore.currentOperator.CpCode;
                this.LoadData();
            }
        })
    }

    /** 查询 */
    @action.bound
    public searchData = async () => {
        this.props.GlobalBusinessOfficeStore!.CompanyName = this.props.GlobalBusinessOfficeStore!.Name;
     await   this.LoadData();
    }
    /** 输入联系人 */
    @action.bound
    public ChangelinkName(e: any) {
        this.props.GlobalBusinessOfficeStore!.InputlinkName = e.target.value;
        console.log('输入联系人:', this.props.GlobalBusinessOfficeStore!.InputlinkName);
    }
    /** 输入地址 */
    @action.bound
    public ChangeAddress(e: any) {
        this.props.GlobalBusinessOfficeStore!.InputAddress = e.target.value;
        console.log('输入地址:', this.props.GlobalBusinessOfficeStore!.InputAddress);
    }
    /** 输入编码 */
    @action.bound
    public ChangeCode(e: any) {
        this.props.GlobalBusinessOfficeStore!.InputCode = e.target.value;
        console.log('输入编码:', this.props.GlobalBusinessOfficeStore!.InputCode);
    }
    /**
     * 供水所名称输入
     * @param e
     */
    @action.bound
    public ChangeTypeName(e: any) {
        this.props.GlobalBusinessOfficeStore!.InputTypeName = e.target.value;
        console.log('输入营业网点名称:', this.props.GlobalBusinessOfficeStore!.InputTypeName);
    }

    /**
     * 企业名称切换
     */
    @action.bound
    public async selectedContent(value: any) {
        this.props.GlobalBusinessOfficeStore!.Name = value;
        this.props.GlobalBusinessOfficeStore!.cpCode = value;
        const that = this
        getName(this.props.GlobalBusinessOfficeStore!.CompanyNameData, that);
        function getName(list: any, thats: any) {
            list.map((element: any) => {
                if (String(value) === String(element.OrganitionCode)) {
                    thats.props.GlobalBusinessOfficeStore!.InfoName = element.OrganizationName;
                }
                if (element.Children) {
                    getName(element.Children, thats);
                }
            })
        }
        console.log('公司名称:', this.props.GlobalBusinessOfficeStore!.CompanyName);
        this.props.GlobalBusinessOfficeStore!.CompanyName = value;
        await this.LoadData()
    }

    /**
     * 新增按钮点击
     * @param model 实体类
     */
    @action.bound
    public async addbtn() {
        this.props.GlobalBusinessOfficeStore!.isEditModal = false;
        this.uiStore.CurrentEditBusinessOffice = new BusinessOffice();

        this.uiStore.CurrentEditBusinessOffice.FatherId = "";

        this.opearatorType = "add";

        this.modaltitle = "新增营业网点";

        this.uiStore.SelectorDisabled = false;

       await this.domainStore.getBusinessOfficeList(this.uiStore.CompanyName, "").then((res) => {
            if (res.rtnCode === 0) {
                this.uiStore.listDatas = res.data
            } else {
                message.error(res.rtnMsg);
            }
            this.getMaxSortNo("").then((sortNo) => {
                this.uiStore.CurrentEditBusinessOffice.SortNo = sortNo;
                this.uiStore.isVisibleModal = true;
            })
        })

    }

    /** 获取最大排序号 */
    @action.bound
    public async getMaxSortNo(fatherId: string) {
        await this.domainStore.getMaxSortNo(fatherId ? fatherId : "", this.uiStore.CompanyName).then((res) => {
            if (res.rtnCode !== 0) {
                this.uiStore.IsLoading = false;
                message.error(res.rtnMsg);
            } else {
                this.uiStore.maxSortNo = res.data.SortNo + 1;
                this.uiStore.IsLoading = false;
            }
        })
        return this.uiStore.maxSortNo;
    }

    /**
     * 新增<a>点击
     * @param model 实体类
     */
    @action.bound
    public adda(model: BusinessOffice) {
        this.uiStore.isVisibleModal = true;
        this.opearatorType = "add";
        this.modaltitle = "新增营业网点";
        this.uiStore.CurrentEditBusinessOffice = new BusinessOffice();
        this.uiStore.CurrentEditBusinessOffice.FatherId = model.BusinessOfficeId;
        this.uiStore.SelectorDisabled = true;
    }

    /**
     * 编辑
     */
    @action.bound
    public edit() {
        this.modaltitle = "编辑营业网点";
        this.uiStore.isVisibleModal = true;
        this.opearatorType = "edit";
        this.uiStore.SelectorDisabled = true;
    }

    /**
     * 取消
     */
    @action.bound
    public cancel() {
        this.uiStore.isVisibleModal = false;
        this.opearatorType = "none";
    }

    /**
     * 保存
     * @param model 实体类
     */
    @action.bound
    public save(model: BusinessOffice) {

        if (this.opearatorType === "add") {
            const index = model.FatherId.indexOf("_");
            if (index > 0) {
                model.FatherId = model.FatherId.substring(0, index);
            }

            this.AddBusinessOffice(model);
        } else if (this.opearatorType === "edit") {
            if (model.FatherId.length === 0) {
                model.FatherId = this.props.GlobalBusinessOfficeStore!.cpCode;
            } else {
                const index = model.FatherId.indexOf("_");
                if (index > 0) {
                    model.FatherId = model.FatherId.substring(0, index);
                }
            }

            this.UpdateBusinessOffice(model);
        }
    }

    /**
     * 获取回到顶部组件侦听的元素
     */
    public backTopTarget = (): any => {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
    }

    /** 修改营业网点 */
    public UpdateBusinessOffice(model: BusinessOffice) {
        model.CpCode = this.uiStore.CompanyName
        try {
            if (!this.uiStore.IsLoading) {
                this.uiStore.IsLoading = true;
            }
            /** 新增创建时间、创建人id、、自增id参数 */
            model["CreateDate"] = this.uiStore.CurrentEditBusinessOffice.CreateDate;
            model["CreaterId"] = this.uiStore.CurrentEditBusinessOffice.CreaterId;
            model["AutoId"] = this.uiStore.CurrentEditBusinessOffice.AutoId;
            this.domainStore.UpdateBusinessOffice(model).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    this.uiStore.IsLoading = false;
                } else {
                    const jsonList = res.data as BusinessOffice[];
                    this.refreshUi(jsonList)
                    this.uiStore.IsLoading = false;
                    message.success("更新成功");
                    this.uiStore.isVisibleModal = false
                }
            })
        } catch (error) {
            this.uiStore.IsLoading = false;
        }
    }

    /** 新增营业网点 */
    @action.bound
    public AddBusinessOffice(model: BusinessOffice) {
        model.CpCode = this.uiStore.CompanyName
        try {

            if (!this.uiStore.IsLoading) {
                this.uiStore.IsLoading = true;
            }
            this.domainStore.addBusinessOffice(model).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    this.uiStore.IsLoading = false;
                } else {
                    const jsonlist = res.data.data as BusinessOffice[];
                    this.refreshUi(jsonlist);
                    this.uiStore.IsLoading = false;
                    message.success("新增营业网点成功");
                    this.uiStore.isVisibleModal = false
                }
            })
        } catch (error) {
            this.uiStore.IsLoading = false;
        }
    }

    /** 加载营业网点数据 */
    @action.bound
    public async LoadData(callBack?: (list: BusinessOffice[]) => void) {
        this.uiStore.listData = [];
        try {
            if (!this.uiStore.IsLoading) {
                this.uiStore.IsLoading = true;
            }
            let searchCase: string = '';
            if (this.uiStore.InputCode !== '') {
                searchCase = searchCase + "BusinessOfficeId_" + conversionSpecialCharacter(this.uiStore.InputCode) + ",";
            }
            if (this.uiStore.InputTypeName !== '') {
                searchCase = searchCase + "BusinessOfficeName_" +conversionSpecialCharacter( this.uiStore.InputTypeName) + ",";
            }
            if (this.uiStore.InputAddress !== '') {
                searchCase = searchCase + "BusinessOfficeAddress_" + conversionSpecialCharacter(this.uiStore.InputAddress) + ",";
            }
            if (this.uiStore.InputlinkName !== '') {
                searchCase = searchCase + "BusinessOfficeLinkMan_" +conversionSpecialCharacter( this.uiStore.InputlinkName )+ ",";
            }
            if (searchCase !== '') {
                searchCase = searchCase.substring(0, searchCase.length - 1);
            }
            searchCase = encodeURIComponent(searchCase);
           await this.domainStore.getBusinessOfficeList(this.uiStore.CompanyName, searchCase).then((res) => {
                if (res.rtnCode === 0) {
                    if (searchCase === '') {
                        const jsonlist = res.data as BusinessOffice[];
                        this.uiStore.listData = res.data;
                        this.refreshUi(jsonlist);
                        this.uiStore.IsLoading = false;
                    } else {
                        const jsonlist = res.data.model as BusinessOffice[];
                        this.uiStore.listData = res.data.model;
                        this.refreshUi(jsonlist);
                        this.uiStore.IsLoading = false;
                    }

                } else {
                    this.uiStore.IsLoading = false;
                    message.error(res.rtnMsg);
                }
                if (callBack) {
                    callBack(this.uiStore.BusinessOfficeList);
                }
            })

        } catch (error) {
            console.log("加载失败:" + error);
        }
    }

    /**
     * 新增刷新UI
     */
    @action.bound
    public refreshUi(jsonData: BusinessOffice[]) {
        const jsonList = jsonData as BusinessOffice[];
        this.uiStore.list.splice(0, this.uiStore.BusinessOfficeUiList.length)
        this.uiStore.BusinessOfficeUiList.splice(0, this.uiStore.BusinessOfficeUiList.length);
        const data = this.recursion(jsonList);
        this.uiStore.list = jsonList;
        this.uiStore.BusinessOfficeUiList = data;
        console.info(this.uiStore.BusinessOfficeUiList)
    }

    /**
     * 递归转换数据
     * @param list 接口json数据集合
     */
    @action.bound
    public recursion(list: BusinessOffice[]): BusinessOfficeUiEntity[] {
        const wsList = new Array<BusinessOfficeUiEntity>();
        list.forEach((jsonmodel: BusinessOffice, index: number, array: BusinessOffice[]) => {

            const model = new BusinessOfficeUiEntity();

            model.key = jsonmodel.BusinessOfficeId;

            model.value = jsonmodel.BusinessOfficeId;

            model.title = jsonmodel.BusinessOfficeName;

            model.FatherId = jsonmodel.FatherId;

            model.BusinessOfficeAddress = jsonmodel.BusinessOfficeAddress;

            model.SortNo = jsonmodel.SortNo;

            model.BusinessOfficeTel = jsonmodel.BusinessOfficeTel;

            model.BusinessOfficeLinkMan = jsonmodel.BusinessOfficeLinkMan;

            model.Description = jsonmodel.Description;

            model.UpdateDate = jsonmodel.UpdateDate;

            model.UpdaterId = jsonmodel.UpdaterId;

            model.CreateDate = jsonmodel.CreateDate;

            model.CreaterId = jsonmodel.CreaterId;


            if (jsonmodel.children && jsonmodel.children.length > 0) {
                model.children = this.recursion(jsonmodel.children);
            } else {
                model.children = undefined;
            }
            wsList.push(model);
            console.log(model.children)
        });
        return wsList;
    }


}