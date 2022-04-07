import { message } from "antd";
import { action, observable, runInAction } from "mobx";
import { OridStores, requestJson } from "orid";
import { BillPrintReferences } from "../entity/BillPrintReferences";
import { BillPrintTempLate } from "../entity/billPrintTempLateDto";
import { AgentBankList, InvoiceKind,  PrintTemplateType } from "../entity/invoiceKind";
import { BillTemplateRootStore } from "../rootStore";

export class BillTemplateLayoutStore {

    /**
     * 票据模板是否正在使用 
     */
    @observable
    public BillTemplateIsUse: boolean;
    /**
     * 模板数据
     */
    @observable
    public BillTemplateList: BillPrintTempLate[];

    /**
     * 票据种类集合
     */
    @observable
    public InvoiceKindList: InvoiceKind[];

    /** 类型列表 */
    @observable
    public PrintTemplateTypeList: PrintTemplateType[] = [];

     /** 类型ID列表 */
     @observable
     public PrintTemplateTypeIdArray: number[];

    @observable
    public AgentBankList: AgentBankList[] = [];

    /**
     * 参考模板数据
     */
    @observable
    public BillPrintReferencesList: BillPrintReferences[]

    /**
     * 根store
     */
    public RootStore: BillTemplateRootStore;

    constructor(rootStore: BillTemplateRootStore) {
        this.RootStore = rootStore;
        this.BillTemplateList = new Array<BillPrintTempLate>();
        this.InvoiceKindList = new Array<InvoiceKind>();
        this.BillPrintReferencesList = new Array<BillPrintReferences>();
        this.BillTemplateIsUse = false;
        this.PrintTemplateTypeIdArray = [];
    }


    /**
     * 点击新增
     */
    @action.bound
    public async HandleAddBillTemplate() {
        this.RootStore.BillTemplateModalStore.BtnDisible = false;
        this.RootStore.BillTemplateModalStore.OpertionModalVisible = true;
        this.RootStore.BillTemplateModalStore.DefaultRowVisible = true;
        this.RootStore.BillTemplateModalStore.KindDisabled = false;
        this.RootStore.BillTemplateModalStore.TypeDisabled = false;
        this.RootStore.BillTemplateModalStore.OpertionModalType = "add";
        this.RootStore.BillTemplateModalStore.OpertionModalTitle = "新增票据模板";
        this.RootStore.BillTemplateModalStore.CurrentEditItem = new BillPrintTempLate();
        this.RootStore.BillTemplateModalStore.CurrentEditItem.CpCode = OridStores.authStore.currentOperator.CpCode;
        this.RootStore.BillTemplateModalStore.CurrentEditItem.IsTurnOn = "1";
    }
    /**
     * 加载票据种类的模板列表数据
     */
    @action.bound
    public async LoadDataBillTemplate() {
        try {
            this.RootStore.BillTemplateCardUiStore.Loading = true;
            const res = await requestJson("/api/bdt/BillPrintTemplate/GetBillPrintTemplates", { method: "GET" });
            runInAction(() => {
                if (res.rtnCode === 0) {
                    if (this.BillTemplateList.length > 0) {
                        this.BillTemplateList.splice(0, this.BillTemplateList.length)
                    }
                    const dataList = res.data as BillPrintTempLate[];
                    this.BillTemplateList.push(...dataList);

                    console.log("billList",this.BillTemplateList)
                } else {
                    message.error(res.rtnMsg);
                }
                this.RootStore.BillTemplateCardUiStore.Loading = false;
            })

        } catch (error) {
            message.error(error);
        }
    }

    /**
     * 加载票据种类数据
     */
    @action.bound
    public async LoadKindData() {
        try {
            const res = await requestJson("/api/ims/InvoiceKind/GetList?cpCode=" + OridStores.authStore.currentOperator.CpCode,
                {
                    method: "GET"
                }
            )
            runInAction(() => {
                if (res.rtnCode === 0) {
                    const invoiceKindList = res.data as InvoiceKind[];
                    if (this.InvoiceKindList.length > 0) {
                        this.InvoiceKindList.splice(0, this.InvoiceKindList.length);
                    }
                    this.InvoiceKindList.push(...invoiceKindList)
                } else {
                    message.info(res.rtnMsg)
                }
            })
        } catch (error) {
            message.error(error)
        }
    }

    /**
     * 加载参考模板数据
     */
    @action.bound
    public async loadReferencesData() {
        try {
            const res = await requestJson("/api/bdt/BillPrintTemplate/GetBillPrintReferences",
                {
                    method: "GET"
                }
            )
            runInAction(() => {
                if (res.rtnCode === 0) {
                    const datas = res.data as BillPrintReferences[];
                    if (this.BillPrintReferencesList.length > 0) {
                        this.BillPrintReferencesList.splice(0, this.BillPrintReferencesList.length);
                    }
                    this.BillPrintReferencesList.push(...datas);
                } else {
                    message.info(res.rtnMsg);
                }

            })
        } catch (error) {
            console.log(error);
        }
    }

    public GetListAll = async () => {
        try {
            const res = await requestJson("/api/bdt/PrintTemplateType/GetListAll",
                {
                    method: "GET"
                }
            )
            if (res.rtnCode === 0) {
                this.PrintTemplateTypeList = res.data
                this.PrintTemplateTypeIdArray=[];
                this.PrintTemplateTypeList.map((item) => {
                    this.PrintTemplateTypeIdArray.push(item.PrintTemplateTypeId);
                })
            } else {
                message.error(res.rtnMsg);
            }
        } catch (error) {
            console.log(error)
        }
    }

    public GetBankListAll = async () => {
        try {
            const res = await requestJson("/api/bdt/AgentBank/List/All?cpCode=" + OridStores.authStore.currentOperator.CpCode,
                {
                    method: "GET"
                }
            )
            if (res.rtnCode === 0) {
                this.AgentBankList = res.data
            } else {
                message.error(res.rtnMsg);
            }
        } catch (error) {
            console.log(error)
        }
    }


}