import { action, observable } from "mobx";
import { WaterStationUiStore } from "./uiStore";
import { WaterStation, WaterStationUiEntity } from "./entity";
import { IWaterStationListViewProps } from "./interface";
import { WaterStationDomainStore } from "./domainStore";
import { OridStores } from "orid";
import { message } from "antd";
import { conversionSpecialCharacter } from "../../../common/utilFunctions/utilFunctions";




export class WaterStationLisViewUiAction {



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
    public props: IWaterStationListViewProps;

    /**
     * 当前操作类型
     */
    public opearatorType: "none" | "add" | "edit";

    private uiStore: WaterStationUiStore;

    private domainStore: WaterStationDomainStore;
    /**
     * 构造
     * @param props 
     */
    constructor(props: IWaterStationListViewProps) {

        this.uiStore = props.GlobalWaterStationStore!;

        this.domainStore = new WaterStationDomainStore();

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

        this.props = props;

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
                this.uiStore.CompanyName = OridStores.authStore.currentOperator.CpCode;
                this.uiStore.Name = OridStores.authStore.currentOperator.CpCode;
                this.LoadData();
            }
        })
    }

    /** 输入联系人 */
    @action.bound
    public ChangelinkName(e: any) {
        this.props.GlobalWaterStationStore!.InputLinkName = e.target.value
        console.log('输入联系人:', e.target.value)
    }
    /** 输入地址 */
    @action.bound
    public ChangeAddress(e: any) {
        this.props.GlobalWaterStationStore!.InputAddress = e.target.value
        console.log('输入地址:', e.target.value)
    }
    /** 输入编码 */
    @action.bound
    public ChangeCode(e: any) {
        this.props.GlobalWaterStationStore!.InputCode = e.target.value
        console.log('输入编码:', e.target.value)
    }
    /** 查询 */
    @action.bound
    public async searchData() {
        this.props.GlobalWaterStationStore!.CompanyName = this.props.GlobalWaterStationStore!.Name
        await this.LoadData()
    }
    /**
     * 供水所名称输入
     * @param e
     */
    @action
    public ChangeTypeName(e: any) {
        this.props.GlobalWaterStationStore!.InputTypeName = e.target.value
        console.log('输入供水所名称:',conversionSpecialCharacter( e.target.value))
    }

    /**
     * 企业名称切换
     */
    @action.bound
    public selectedContent(value: any) {
        this.props.GlobalWaterStationStore!.Name = value
        const that = this
        getName(this.props.GlobalWaterStationStore!.CompanyNameData, that)
        function getName(list: any, thats: any) {
            list.map((element: any) => {
                if (String(value) === String(element.OrganitionCode)) {
                    thats.props.GlobalWaterStationStore!.InfoName = element.OrganizationName
                }
                if (element.Children) {
                    getName(element.Children, thats)
                }
            })
        }
        console.log('公司名称:', value)
    }

    /**
     * 新增按钮点击
     * @param model 实体类
     */
    @action.bound
    public async addbtn() {
        this.props.GlobalWaterStationStore!.isEditModal = false
        this.props.GlobalWaterStationStore!.operatorType = "add";
        this.uiStore.CurrentEditWaterStation = new WaterStation();

        this.uiStore.CurrentEditWaterStation.FatherId = ""

        this.opearatorType = "add";
        this.modaltitle = "新增供水所";

        this.uiStore.SelectorDisabled = false;

     await   this.domainStore.getWaterStationList(this.uiStore.CompanyName, "").then((res) => {
            if (res.rtnCode === 0) {
                const jsonlist = res.data as WaterStation[];
                this.refreshUis(jsonlist);
            } else {
                message.error(res.rtnMsg);
            }
            this.getMaxSortNo("").then((sortNo) => {
                this.uiStore.CurrentEditWaterStation.SortNo = sortNo;
                this.isVisiableModal = true;
            })

        })
    }

    /** 获取最大排序号 */
    @action.bound
    public async getMaxSortNo(FatherId: string): Promise<number> {
        await this.domainStore.getMaxSortNo(FatherId ? FatherId : "", this.uiStore.CompanyName).then((res) => {
            if (res.rtnCode !== 0) {
                this.uiStore.IsLoading = false;
                console.log(res.rtnMsg);
                message.error(res.rtnMsg)
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
    public adda(model: WaterStation) {
        this.modaltitle = "新增供水所";

        this.isVisiableModal = true;

        this.opearatorType = "add";

        this.uiStore.CurrentEditWaterStation = new WaterStation();

        this.uiStore.CurrentEditWaterStation.FatherId = model.WaterStationId;

        this.uiStore.SelectorDisabled = true;

    }

    /**
     * 编辑
     */
    @action.bound
    public edit() {
        this.modaltitle = "编辑供水所";

        this.isVisiableModal = true;

        this.opearatorType = "edit";

        this.uiStore.SelectorDisabled = true;

    }

    /**
     * 取消
     */
    @action.bound
    public cancel() {

        this.isVisiableModal = false;

        this.opearatorType = "none";


    }

    /**
     * 保存
     * @param model 实体类
     */
    @action.bound
    public async save(model: WaterStation) {

        if (this.opearatorType === "add") {
            const index = model.FatherId.indexOf('_');
            if (index > 0) {
                model.FatherId = model.FatherId.substring(0, index);
            }
            this.AddWaterStation(model);
        } else if (this.opearatorType === "edit") {
            const index = model.FatherId.indexOf("_");
            if (index > 0) {
                model.FatherId = model.FatherId.substring(index + 1, model.FatherId.length);
            }
            this.UpdateWaterStation(model);
        }
    }

    /** 编辑 */
    @action.bound
    public UpdateWaterStation(model: WaterStation) {
        try {
            if (!this.uiStore.IsLoading) {
                this.uiStore.IsLoading = true;
            }
            /** 新增创建时间、创建人id、自增id参数 */
            model.CpCode = this.uiStore.CompanyName
            model["CreateDate"] = this.uiStore.CurrentEditWaterStation.CreateDate;
            model["CreaterId"] = this.uiStore.CurrentEditWaterStation.CreaterId;
            model["AutoId"] = this.uiStore.CurrentEditWaterStation.AutoId;
            this.domainStore.UpdateWaterStation(model).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    this.uiStore.IsLoading = false;
                }
                const jsonList = res.data as WaterStation[];
                this.refreshUi(jsonList);
                this.uiStore.IsLoading = false;
                message.success("更新成功");
                this.isVisiableModal = false;
            })
        } catch (error) {
            this.uiStore.IsLoading = false;
        }
    }

    @action.bound
    public backTopTarget(): any {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
    }

    /** 新增供水所 */
    @action.bound
    public AddWaterStation(model: WaterStation) {
        model.CpCode = this.uiStore.CompanyName
        try {
            if (!this.uiStore.IsLoading) {
                this.uiStore.IsLoading = true;
            }
            this.domainStore.AddWaterStation(model).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    this.uiStore.IsLoading = false;
                    return;
                }

                const jsonlist = res.data.data as WaterStation[];
                this.refreshUi(jsonlist);
                this.uiStore.IsLoading = false;
                message.success("新增供水所成功");
                this.isVisiableModal = false;
            })
        } catch (error) {
            this.uiStore.IsLoading = false;
        }
    }


    /** 加载数据 */
    @action.bound
    public async  LoadData(callBack?: (list: WaterStation[]) => void) {
        const store = this.uiStore;
        try {
            if (!store.IsLoading) {
                store.IsLoading = true;
            }

            let searchCase: string = '';
            if (store.InputCode !== '') {
                searchCase = searchCase + "WaterStationId_" + conversionSpecialCharacter(store.InputCode) + ",";
            }
            if (store.InputTypeName !== '') {
                searchCase = searchCase + "WaterStationName_" + conversionSpecialCharacter(store.InputTypeName) + ",";
            }
            if (store.InputAddress !== '') {
                searchCase = searchCase + "WaterStationAddress_" +conversionSpecialCharacter( store.InputAddress) + ",";
            }
            if (store.InputLinkName !== '') {
                searchCase = searchCase + "WaterStationLinkMan_" + conversionSpecialCharacter(store.InputLinkName) + ",";
            }
            if (searchCase !== '') {
                searchCase = searchCase.substring(0, searchCase.length - 1);
            }
            searchCase = encodeURIComponent(searchCase);
            store.WaterStationList = new Array<WaterStation>();
            store.list = new Array<WaterStation>();
           await this.domainStore.getWaterStationList(store.CompanyName,  searchCase ).then((res) => {
                if (res.rtnCode === 0) {
                    let jsonlist: WaterStation[] = [];
                    if (searchCase === '') {
                        jsonlist = res.data as WaterStation[];
                    } else {
                        jsonlist = res.data.model as WaterStation[];
                    }
                    this.refreshUi(jsonlist);
                    store.IsLoading = false;
                } else {
                    store.IsLoading = false;
                    console.log(res.rtnMsg);
                    message.error(res.rtnMsg);
                }

                if (callBack) {
                    callBack(store.WaterStationList);
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 刷新UI
     */
    @action.bound
    public refreshUi(jsonData: WaterStation[]) {
        const jsonList = jsonData as WaterStation[];
        this.uiStore.list.splice(0, this.uiStore.WaterStationUiList.length)
        this.uiStore.WaterStationUiList.splice(0, this.uiStore.WaterStationUiList.length);
        const data = this.recursion(jsonList);
        this.uiStore.list = jsonList;
        this.uiStore.WaterStationUiList = data;
        console.info(this.uiStore.WaterStationUiList)
    }

    @action.bound
    public refreshUis(jsonData: WaterStation[]) {
        const jsonList = jsonData as WaterStation[];
        this.uiStore.WaterStationUiLists.splice(0, this.uiStore.WaterStationUiLists.length);
        const data = this.recursion(jsonList);
        this.uiStore.WaterStationUiLists = data;
    }

    /**
     * 递归转换数据
     * @param list 接口json数据集合
     */
    @action
    public recursion(list: WaterStation[]): WaterStationUiEntity[] {
        const wsList = new Array<WaterStationUiEntity>();
        if(list){
            list.forEach((jsonmodel: WaterStation, index: number, array: WaterStation[]) => {
    
                const model = new WaterStationUiEntity();
    
                model.key = jsonmodel.WaterStationId;
    
                model.value = jsonmodel.WaterStationId + "_" + jsonmodel.WaterStationName;
    
                model.title = jsonmodel.WaterStationName;
    
                model.FatherId = jsonmodel.FatherId;
    
                model.WaterStationAddress = jsonmodel.WaterStationAddress;
    
                model.WaterStationTel = jsonmodel.WaterStationTel;
    
                model.WaterStationLinkMan = jsonmodel.WaterStationLinkMan;
    
                model.SortNo = jsonmodel.SortNo;
    
                model.UpdateDate = jsonmodel.UpdateDate;
    
                model.UpdaterId = jsonmodel.UpdaterId;
    
                model.CreateDate = jsonmodel.CreateDate;
    
                model.CreaterId = jsonmodel.CreaterId;
    
                model.Description = jsonmodel.Description;
    
                if (jsonmodel.children && jsonmodel.children.length > 0) {
                    model.children = this.recursion(jsonmodel.children);
                } else {
                    model.children = undefined;
                }
                wsList.push(model);
            });
        }
        return wsList;
    }



}