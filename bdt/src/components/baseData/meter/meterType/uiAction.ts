import { message } from "antd";
import { action, observable } from "mobx";
import { OridStores } from "orid";
import { conversionSpecialCharacter } from "../../../common/utilFunctions/utilFunctions";
import { MeterTypeDomainStore } from "./domainStore";
import { MeterType } from "./entity";
import { IMeterTypeListViewProps } from "./interface";




export class MeterTypeLisViewUiAction {

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle: string = "";


    public props: IMeterTypeListViewProps;
    /**
     * 当前操作类型
     */
    public opearatorType: "none" | "add" | "edit";

    private domainStore: MeterTypeDomainStore;



    /**
     * 构造
     * @param props 
     */
    constructor(props: IMeterTypeListViewProps) {

        this.domainStore = new MeterTypeDomainStore();

        this.addbtn = this.addbtn.bind(this);

        this.adda = this.adda.bind(this);

        this.cancel = this.cancel.bind(this);

        this.edit = this.edit.bind(this);

        this.save = this.save.bind(this);

        this.selectedContent = this.selectedContent.bind(this)

        this.ChangeCode = this.ChangeCode.bind(this)

        this.ChangeTypeName = this.ChangeTypeName.bind(this)

        this.props = props;

    }


    @action.bound
    public getCompanyName() {
        const store = this.props.GlobalMeterTypeStore!;
        store.CompanyNameData = [];
        store.CompanyName = '';
        store.InfoName = '';
        store.Name = '';
        this.domainStore.getCompanyName().then((res) => {
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                return;
            }
            store.InfoName = res.data.OrganizationName
            store.CompanyNameData.push(res.data)
            store.CompanyName = OridStores.authStore.currentOperator.CpCode
            store.Name = OridStores.authStore.currentOperator.CpCode
            this.LoadingData()

        })

    }

    /** 查询按钮调用 */
    @action.bound
    public searchData =async  () => {
        this.props.GlobalMeterTypeStore!.CompanyName = this.props.GlobalMeterTypeStore!.Name;
       await  this.LoadingData();
    }

    /** 加载数据 */
    @action.bound
    public async LoadingData(callBack?: (list: MeterType[]) => void) {
        const store = this.props.GlobalMeterTypeStore!;
        try {
            if (!store.IsLoading) {
                store.IsLoading = true;
            }
            let searchCase: string = '';
            if (store.InputCode !== '') {
                searchCase = searchCase + "MeterTypeId_" + conversionSpecialCharacter(store.InputCode) + ",";
            }
            if (store.InputTypeName !== '') {
                searchCase = searchCase + "MeterTypeName_" + conversionSpecialCharacter(store.InputTypeName) + ",";
            }
            if (searchCase !== '') {
                searchCase = searchCase.substring(0, searchCase.length - 1);
            }


            searchCase = encodeURIComponent(searchCase);
            store.IsLoading = true;
            store.MeterTypeList = new Array<MeterType>();
            store.list = new Array<MeterType>();
          await  this.domainStore.getMeterTypeList(store.CompanyName, searchCase).then((res) => {
                if (res.rtnCode === 0) {
                    if (!res.data) {
                        res.data = new Array<MeterType>();
                    }
                    if (searchCase === '') {
                        const jsonList = res.data as MeterType[];
                        store.refreshUi(jsonList);
                        store.refreshUis(jsonList);
                        store.IsLoading = false;
                    } else {
                        const jsonList = res.data.model as MeterType[];
                        store.refreshUi(jsonList);
                        store.IsLoading = false;
                    }
                } else {
                    store.IsLoading = false;
                    message.error(res.rtnMsg);
                }
                if (callBack) {
                    callBack(store.MeterTypeList);
                }
            })
        } catch (error) {
            store.IsLoading = false;
        }
    }



    /**
     * 编码选择
     * @param value 
     */
    @action
    public ChangeCode(e: any) {
        this.props.GlobalMeterTypeStore!.InputCode = e.target.value;
        console.log('输入编码:', this.props.GlobalMeterTypeStore!.InputCode);
    }


    /**
     * 水表类型名称选择
     * @param value 
     */
    @action
    public ChangeTypeName(e: any) {
        this.props.GlobalMeterTypeStore!.InputTypeName =e.target.value;
        console.log('输入水表类型名称:', this.props.GlobalMeterTypeStore!.InputTypeName);
    }


    /**
     * 企业名称选择
     */
    @action
    public selectedContent(value: any) {
        this.props.GlobalMeterTypeStore!.Name = value;
        const that = this
        getName(this.props.GlobalMeterTypeStore!.CompanyNameData, that);
        function getName(list: any, thats: any) {
            list.map((element: any) => {
                if (String(value) === String(element.OrganitionCode)) {
                    thats.props.GlobalMeterTypeStore!.InfoName = element.OrganizationName
                }
                if (element.Children) {
                    getName(element.Children, thats)
                }
            })
        }
        console.log('企业名称:', this.props.GlobalMeterTypeStore!.CompanyName)
    }

    /**
     * 新增按钮点击
     * @param model 实体类
     */
    @action
    public async addbtn() {

        this.props.GlobalMeterTypeStore!.CurrentEditMeterType = new MeterType();

        // this.props.GlobalMeterTypeStore!.CurrentEditMeterType.FatherId = ""

        this.opearatorType = "add";

        this.modaltitle = "新增水表类型"

        this.props.GlobalMeterTypeStore!.SelectorDisabled = false;

        this.domainStore.getMeterTypeList(this.props.GlobalMeterTypeStore!.CompanyName, "").then((res) => {
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                return;
            }
            const jsonlist = res.data as MeterType[];
            this.props.GlobalMeterTypeStore!.refreshUis(jsonlist);
            this.getMaxSortNo(this.props.GlobalMeterTypeStore!.CompanyName, "").then((num) => {
                this.props.GlobalMeterTypeStore!.CurrentEditMeterType.SortNo = num;
                this.props.GlobalMeterTypeStore!.isVisiableModal = true;
            })
        })
    }

    /** 获取最大排序号 */
    @action.bound
    public async getMaxSortNo(CompanyName: string, fatherId: string) {
        const store = this.props.GlobalMeterTypeStore!;
        let id = "";
        if (fatherId) {
            id = "&fatherId=" + fatherId
        }
        await this.domainStore.getMaxSortNo(id, CompanyName).then((res) => {
            if (res.rtnCode !== 0) {
                store.IsLoading = false;
                console.log("获取最大排序号失败" + res.rtnMsg);
            } else {
                store.maxSortNo = res.data.SortNo + 1;
                store.IsLoading = false;
            }
        })
        return store.maxSortNo;

    }

    /**
     * 新增<a>点击
     * @param model 实体类
     */
    @action
    public adda(model: MeterType) {

        this.props.GlobalMeterTypeStore!.isVisiableModal = true;

        this.opearatorType = "add";
        this.modaltitle = "新增水表类型"

        this.props.GlobalMeterTypeStore!.CurrentEditMeterType = new MeterType();

        this.props.GlobalMeterTypeStore!.CurrentEditMeterType.FatherId = model.MeterTypeId;

        this.props.GlobalMeterTypeStore!.SelectorDisabled = true;

    }

    /**
     * 编辑
     */
    @action
    public edit() {

        this.props.GlobalMeterTypeStore!.isVisiableModal = true;

        this.opearatorType = "edit";
        this.modaltitle = "编辑水表类型"

        console.log(this.props.GlobalMeterTypeStore!.CurrentEditMeterType);

        this.props.GlobalMeterTypeStore!.SelectorDisabled = true;

    }

    /**
     * 取消
     */
    @action
    public cancel() {


        this.props.GlobalMeterTypeStore!.isVisiableModal = false;

        this.opearatorType = "none";


    }

    /**
     * 保存
     * @param model 实体类
     */
    @action
    public save(model: MeterType) {

        if (this.opearatorType === "add") {
            const index = model.FatherId.indexOf("_");
            if (index > 0) {
                model.FatherId = model.FatherId.substring(0, index);
            }
            this.AddMeterType(model);
        } else if (this.opearatorType === "edit") {
            const index = model.FatherId.indexOf("_");
            if (index > 0) {
                model.FatherId = model.FatherId.substring(index + 1, model.FatherId.length);
            }
            this.UpdateMeterType(model);
        }
    }

    /** 更新水表类型 */
    @action.bound
    public UpdateMeterType(model: MeterType) {
        const store = this.props.GlobalMeterTypeStore!;
        try {
            if (!store.IsLoading) {
                store.IsLoading = true;
            }
            console.log(1111);
            /**
             * 新增创建时间、创建人id、、自增id参数
             */
            model.CpCode = store.CompanyName
            model["CreateDate"] = store.CurrentEditMeterType.CreateDate;
            model["CreaterId"] = store.CurrentEditMeterType.CreaterId;
            model["AutoId"] = store.CurrentEditMeterType.AutoId;
            this.domainStore.UpdateMeterType(model).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    store.IsLoading = false;
                    return;
                }
                const jsonList = res.data as MeterType[];
                store.refreshUi(jsonList);
                store.refreshUis(jsonList);
                store.IsLoading = false;
                message.success("更新水表类型成功");
                store.isVisiableModal = false;
            })

        } catch (error) {
            store.IsLoading = false;
        }
    }

    /** 新增水表类型 */
    @action.bound
    public AddMeterType(model: MeterType) {
        const store = this.props.GlobalMeterTypeStore!;
        model.CpCode = store.CompanyName
        try {
            if (!store.IsLoading) {
                store.IsLoading = true;
            }
            this.domainStore.addMeterType(model).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    store.IsLoading = false;
                } else {
                    const jsonList = res.data.data as MeterType[];
                    store.refreshUi(jsonList);
                    store.IsLoading = false;
                    store.isVisiableModal = false;
                    message.success("新增水表类型成功");
                }
            })


        } catch (error) {
            store.IsLoading = false;
        }
    }

   

}