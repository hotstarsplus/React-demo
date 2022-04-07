import { message } from "antd";
import { action, observable } from "mobx";
import { IResponseJsonResult, OridStores, requestJson } from "orid";
import { InvoiceKind } from "../../baseData/billTemplate/entity/invoiceKind";
import { SysParameter } from "../entity/sysParameter";
import { InvoiceParamEntity } from "./cardEntity";
import { FieldNameList, SourceInvoiceingParameters, SourceList } from "./entity";
import { OpenInvoiceParamSaveDto } from "./openInvoiceParamSaveDto";


export class InvoiceingParametersdoMainStore {


    /**
     * 数据集合
     */
    @observable
    public list: SourceInvoiceingParameters[];

    /**
     * 来源数据集合
     */
    @observable
    public SourceList: SourceList[]

    @observable
    public FieldNameList: FieldNameList[]
    /**
     *  当前编辑的项目
     */
    @observable
    public currentEditItem: SourceInvoiceingParameters;

    @observable
    public SysParameterList: SysParameter[];
    @observable
    public CurrentInvoiceParam: InvoiceParamEntity;
    @observable
    public MakeOutInvoiceTypeIndex: string;

    /**
     * 是否正在加载
     */
    @observable
    public isLoading: boolean = false;
    @observable
    public InvoiceKindList: InvoiceKind[] = [];

    @observable
    public currentSelectInvoice:string='';

    constructor() {
        this.Add = this.Add.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getSourceList = this.getSourceList.bind(this);
        this.saveSysParam = this.saveSysParam.bind(this);
        this.SourceList = Array<SourceList>();
        this.FieldNameList = Array<FieldNameList>();
        this.list = Array<SourceInvoiceingParameters>(new SourceInvoiceingParameters());
        this.SysParameterList = new Array<SysParameter>();
        this.currentEditItem = new SourceInvoiceingParameters();
        this.CurrentInvoiceParam = new InvoiceParamEntity();
    }

    /**
     * 主页面的保存功能
     */
    @action
    public async saveSysParam(list: SysParameter[],): Promise<IResponseJsonResult> {
        const saveDto = new OpenInvoiceParamSaveDto();
        saveDto.SysParameters = list;
        saveDto.InvoiceParam = this.CurrentInvoiceParam;
        saveDto.CpCode = OridStores.authStore.currentOperator.CpCode
        const res = await requestJson("/api/bdt/SysParameter/save", {
            body: JSON.stringify(saveDto),
            headers: { "content-type": "application/json" },
            method: "POST",
        });
        return res;
    }

    /**
     * 票据备注的保存功能
     */
    @action
    public async saveSetting() {
        const res = await requestJson("/api/bdt/InvoicePrintRemark/AddorUpdate", {
            body: JSON.stringify(this.list),
            headers: { "content-type": "application/json" },
            method: "POST",
        });
        return res
    }
    /**
     * 增加一条默认行
     */
    @action
    public async Add() {

        const showList = this.list.filter((item) => item.IsDelete === '0')

        if (showList.length >= this.SourceList.length) {
            return message.error("无法继续添加，请保存修改或删除项目！")
        }

        const newList = new SourceInvoiceingParameters();
        newList.RemarkFieldId = 0;
        newList.DefineRemark ='';
        newList.RemarkField = '';
        newList.SortNo = showList && showList.length > 0 ? showList[showList.length - 1].SortNo + 1 : 1;
        newList.CpCode = OridStores.authStore.currentOperator.CpCode;
        newList.IsDelete = '0';
        newList.ReMarkId = Number((Math.random() * 65535).toFixed(0));
        this.list.push({ ...newList });
    }

    /**
     * 加载弹窗表格数据
     * @param callBack 回调函数
     */
    @action
    public async loadData() {
        try {
            this.isLoading = true;
            const returnJson = await requestJson('/api/bdt/InvoicePrintRemark/GetList?invoiceKindId='+this.currentSelectInvoice, { method: "GET" });
            if (returnJson.rtnCode === 0) {
                const datas = returnJson.data as SourceInvoiceingParameters[];
                this.list = datas ? datas : [];
                this.list.map((list) => {
                    this.SourceList.map((source) => {
                        if (list.RemarkFieldId === source.FieldId) {
                            list.RemarkField = source.FieldCnName
                        }
                    })
                })
                this.isLoading = false;
            } else {
                this.isLoading = false;
            }

        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 删除弹窗表格数据
     * @param key 需要删除的ID
     */
    @action
    public async Delete(key: number) {

        this.list.map((model: SourceInvoiceingParameters, index: number) => {
            if (Number(model.ReMarkId) === Number(key)) {
                model.IsDelete = '1';
            }
        });
        this.list.map((model: SourceInvoiceingParameters, index: number) => {
            if (Number(model.ReMarkId) === Number(key)) {
                this.list[index].IsDelete = "1";
            }
        });
    }


    /**
     * 来源下拉选
     */
    public async getSourceList() {
        this.SourceList = [];
        this.list = [];
        try {
            const res = await requestJson("/api/bdt/InvoicePrintRemarkField/GetFieldList",
                {
                    method: "GET"
                }
            )
            if (res.rtnCode === 0) {
                const datas = res.data as SourceList[];
                this.SourceList = datas ? datas : [];
            } else {
                console.error("加载失败:" + "返回码:" + res.rtnCode + " 返回信息:" + res.rtnMsg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 获取票据类型
     */
    public async getInvoiceKindList() {
        try {
            const res = await requestJson("/api/ims/InvoiceKind/GetListByFatherId?cpCode=" + OridStores.authStore.currentOperator.CpCode,
                {
                    method: "GET"
                }
            )
            if (res.rtnCode === 0) {
               this.InvoiceKindList=res.data as InvoiceKind[]
               this.currentSelectInvoice=this.InvoiceKindList[0]?this.InvoiceKindList[0].InvoiceKindId:'';
               this.loadData();
            } else {
                this.InvoiceKindList=[]
                message.info('获取票据类型列表失败')
            }
        } catch (error) {
            console.log(error);
        }
    }
}