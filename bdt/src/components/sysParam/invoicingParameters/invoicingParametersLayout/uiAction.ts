import { message } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { RadioChangeEvent } from "antd/lib/radio";
import { SelectValue } from "antd/lib/select";
import { action, observable } from "mobx";
import { SysParameter } from "../../entity/sysParameter";
import { IInvoicingParametersLayoutProps } from "./interface";


export class InvoicingParametersUiAction {
    /** 应收金额 */
    @observable
    public showMoney: string = ''
    /** 实收金额 */
    @observable
    public accountMoney: string = ''

    /**
     * 是否显示编辑视图
     */
    @observable
    public isVisiableModal: boolean;

    @observable
    public isChangeSelected: boolean

    /**
     * 当前操作类型
     */
    public opearatorType: "none" | "edit";

    private SysParameterList: SysParameter[];

    private props: IInvoicingParametersLayoutProps;

    constructor(props: IInvoicingParametersLayoutProps) {
        this.props = props;
        this.SysParameterList = new Array<SysParameter>();
        this.isChangeSelected = false
        this.cancel = this.cancel.bind(this);
        this.ok = this.ok.bind(this);
        this.SaveBtn = this.SaveBtn.bind(this);
        this.setupBtn = this.setupBtn.bind(this);
        this.dataCheck = this.dataCheck.bind(this);
        this.IsPrintListChange = this.IsPrintListChange.bind(this);
        this.IsAutoBinaryChange = this.IsAutoBinaryChange.bind(this);
        this.IsInvoiceCountChange = this.IsInvoiceCountChange.bind(this);
        this.IsCheckInvoiceChange = this.IsCheckInvoiceChange.bind(this);
        this.IsSelectInvoiceChange = this.IsSelectInvoiceChange.bind(this);
        this.InvoicingParametersData = this.InvoicingParametersData.bind(this);
        this.IsCancelOtherReceiptChange = this.IsCancelOtherReceiptChange.bind(this);
        this.IsCheckMakeOutInvoiceChange = this.IsCheckMakeOutInvoiceChange.bind(this);
        this.getInvoicingParametersLayout = this.getInvoicingParametersLayout.bind(this);
        this.InvoiceisDisplayBankInfoChange = this.InvoiceisDisplayBankInfoChange.bind(this);
        this.IsCancelAccountByAnotherChange = this.IsCancelAccountByAnotherChange.bind(this);
        this.IsSetAddedInvoiceNoteFieldChange = this.IsSetAddedInvoiceNoteFieldChange.bind(this);
        this.IsInvoiceNotChangeAddTaxFeeChange = this.IsInvoiceNotChangeAddTaxFeeChange.bind(this);
        this.IsTotalReceivablePrintFirstInvoiceChange = this.IsTotalReceivablePrintFirstInvoiceChange.bind(this);
        this.IsPrintLateFeeToNormalInvoiceChange = this.IsPrintLateFeeToNormalInvoiceChange.bind(this);
        this.IsOutOfTotalShowMessageChange = this.IsOutOfTotalShowMessageChange.bind(this);
        this.ReferenceTypeRadioOnChange = this.ReferenceTypeRadioOnChange.bind(this);
        this.MaxInvoiceAmountOnChange = this.MaxInvoiceAmountOnChange.bind(this);
        this.OnlinePayOverIsEInvoiceChange = this.OnlinePayOverIsEInvoiceChange.bind(this);
        this.PayableInvoiceTypeRadioOnChange = this.PayableInvoiceTypeRadioOnChange.bind(this);
        this.MakeOutInvoiceTypeOnChange = this.MakeOutInvoiceTypeOnChange.bind(this);
        this.LateFeeOnInvoiceKindChange = this.LateFeeOnInvoiceKindChange.bind(this);
        this.IsMergeProductItemChange = this.IsMergeProductItemChange.bind(this);
        this.IsSinglePrintChange = this.IsSinglePrintChange.bind(this);
        
    }

    /**
     * 获取开票系统参数
     */
    public getInvoicingParametersLayout() {
        this.props.sysParamStore!.isLoading = true;
        const defines = ["isAutoBinary", "isTotalReceivablePrintFirstInvoice","IsMergeProductItem", "isPrintLateFeeToNormalInvoice", "isSelectInvoice",
            "isCheckInvoice", "isCheckMakeOutInvoice", "isInvoiceCount", "isSetAddedInvoiceNoteField",
            "isInvoiceNotChangeAddTaxFee", "isPrintList", "InvoiceisDisplayBankInfo",
            "isCancelAccountByAnother", "isCancelOtherReceipt", "isOutOfTotalShowMessage", "showMessageReferenceType", "maxInvoiceAmount",
            "OnlinePayOverIsEInvoice", "MakeOutInvoiceType", "PayableInvoiceType","LateFeeOnInvoiceKind","isSinglePrint"];
        defines.forEach((define: string) => {
            this.InvoicingParametersData(define);
        })
        this.props.sysParamStore!.isLoading = false;
    }

    public IsAutoBinaryChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isAutoBinary = e.target.checked ? "1" : "0";
        this.dataCheck("isAutoBinary", e.target.checked ? "1" : "0");
    }

    public IsTotalReceivablePrintFirstInvoiceChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isTotalReceivablePrintFirstInvoice = e.target.checked ? "1" : "0";
        this.dataCheck("isTotalReceivablePrintFirstInvoice", e.target.checked ? "1" : "0");
    }
    public IsMergeProductItemChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.IsMergeProductItem = e.target.checked ? "1" : "0";
        this.dataCheck("IsMergeProductItem", e.target.checked ? "1" : "0");
    }

    /** 违约金开票类型：  */
    public LateFeeOnInvoiceKindChange(e: CheckboxChangeEvent){
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.LateFeeOnInvoiceKind = e.target.value?e.target.value:"";
        this.dataCheck("LateFeeOnInvoiceKind", e.target.value);
    }

    public IsPrintLateFeeToNormalInvoiceChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isPrintLateFeeToNormalInvoice = e.target.checked ? "1" : "0";
        this.dataCheck("isPrintLateFeeToNormalInvoice", e.target.checked ? "1" : "0");
    }

    public IsOutOfTotalShowMessageChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isOutOfTotalShowMessage = e.target.checked ? "1" : "0";
        this.dataCheck("isOutOfTotalShowMessage", e.target.checked ? "1" : "0");
    }

    public OnlinePayOverIsEInvoiceChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.OnlinePayOverIsEInvoice = e.target.checked ? "1" : "0";
        this.dataCheck("OnlinePayOverIsEInvoice", e.target.checked ? "1" : "0");
    }

    public MakeOutInvoiceTypeOnChange(value: SelectValue) {
        this.props.InvoicingParametersdoMainStore!.MakeOutInvoiceTypeIndex = value.toString();
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.MakeOutInvoiceType = value.toString();
        this.dataCheck("MakeOutInvoiceType", this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.MakeOutInvoiceType);
    }

    /**
     * 票据限额参数-提示参考金额 1：应收金额 2：是否金额
     * @param event 
     */
    public ReferenceTypeRadioOnChange(event: RadioChangeEvent) {
        this.isChangeSelected = true
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.showMessageReferenceType = event.target.value;
        // if (String(this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.showMessageReferenceType) === '1') {
        //     this.props.form.setFieldsValue({
        //         'MaxMoney': this.props.sysParamStore!.showMoney
        //     })
        //     this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.maxInvoiceAmount = this.props.sysParamStore!.showMoney
        // }
        // if (String(this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.showMessageReferenceType) === '2') {
        //     this.props.form.setFieldsValue({
        //         'MaxMoney': this.props.sysParamStore!.accountMoney
        //     })
        //     this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.maxInvoiceAmount = this.props.sysParamStore!.accountMoney
        // }

        this.dataCheck("showMessageReferenceType", event.target.value);
    }

    /**
     * 线上支付开票参数-票据抬头方式：1表示客户号票据抬头，0表示用户号票据抬头
     * @param event 
     */
    public PayableInvoiceTypeRadioOnChange(event: RadioChangeEvent) {
        this.isChangeSelected = true
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.PayableInvoiceType = event.target.value;
        this.dataCheck("PayableInvoiceType", event.target.value);
    }

    /**
     * 票据限额参数-票据最大金额
     * @param event 
     */
    public MaxInvoiceAmountOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        let invoiceAmount = 0;
        try {
            invoiceAmount = Number(event.target.value.toString());
        } catch (error) {
            message.error("票据最大金额必须输入有效数字");

            return;
        }
        if (isNaN(invoiceAmount)) {
            message.error("票据最大金额必须输入有效数字");

            return;
        }
        if (invoiceAmount < 0) {
            message.error("票据最大金额只允许输入大于0的正数");
            return;
        }
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.maxInvoiceAmount = event.target.value;
        // if (String(this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.showMessageReferenceType) === '1') {
        //     console.log(2)
        //     this.props.sysParamStore!.showMoney = event.target.value
        // }
        // if (String(this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.showMessageReferenceType) === '2') {
        //     this.props.sysParamStore!.accountMoney = event.target.value
        // }
        this.dataCheck("maxInvoiceAmount", event.target.value);
    }


    public IsSelectInvoiceChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isSelectInvoice = e.target.checked ? "1" : "0";
        this.dataCheck("isSelectInvoice", e.target.checked ? "1" : "0");
    }
    public IsCheckInvoiceChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isCheckInvoice = e.target.checked ? "1" : "0";
        this.dataCheck("isCheckInvoice", e.target.checked ? "1" : "0");
    }
    public IsCheckMakeOutInvoiceChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isCheckMakeOutInvoice = e.target.checked ? "1" : "0";
        this.dataCheck("isCheckMakeOutInvoice", e.target.checked ? "1" : "0");
    }
    public IsInvoiceCountChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isInvoiceCount = e.target.checked ? "1" : "0";
        this.dataCheck("isInvoiceCount", e.target.checked ? "1" : "0");
    }   
    public IsSinglePrintChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isSinglePrint = e.target.checked ? "1" : "0";
        this.dataCheck("isSinglePrint", e.target.checked ? "1" : "0");
    }
    public IsSetAddedInvoiceNoteFieldChange(e: CheckboxChangeEvent) {
        this.props.sysParamStore!.isButton = e.target.checked ? "1" : "0";
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isSetAddedInvoiceNoteField = e.target.checked ? "1" : "0";
        this.dataCheck("isSetAddedInvoiceNoteField", e.target.checked ? "1" : "0");
        console.log("isButton:" + this.props.sysParamStore!.isButton);
    }
    public IsInvoiceNotChangeAddTaxFeeChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isInvoiceNotChangeAddTaxFee = e.target.checked ? "1" : "0";
        this.dataCheck("isInvoiceNotChangeAddTaxFee", e.target.checked ? "1" : "0");
    }
    public IsPrintListChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isPrintList = e.target.checked ? "1" : "0";
        this.dataCheck("isPrintList", e.target.checked ? "1" : "0");
    }
    public InvoiceisDisplayBankInfoChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.InvoiceisDisplayBankInfo = e.target.checked ? "1" : "0";
        this.dataCheck("InvoiceisDisplayBankInfo", e.target.checked ? "1" : "0");
    }
    public IsCancelAccountByAnotherChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isCancelAccountByAnother = e.target.checked ? "1" : "0";
        this.dataCheck("isCancelAccountByAnother", e.target.checked ? "1" : "0");
    }
    public IsCancelOtherReceiptChange(e: CheckboxChangeEvent) {
        this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isCancelOtherReceipt = e.target.checked ? "1" : "0";
        this.dataCheck("isCancelOtherReceipt", e.target.checked ? "1" : "0");
    }


    /**
     * 设置按钮
     */
    @action
    public setupBtn() {
        this.isVisiableModal = true;

        this.props.InvoicingParametersdoMainStore!.getSourceList();
        this.props.InvoicingParametersdoMainStore!.getInvoiceKindList();
    }

    /**
     * 取消
     */
    @action
    public cancel() {
        this.isVisiableModal = false;
        this.opearatorType = "none";
    }

    /**
     * 保存备注
     */
    @action
    public ok() {


        const save = this.props.InvoicingParametersdoMainStore!.saveSetting();
        save.then((res) => {
            if (res.rtnCode === 0) {
                message.success('保存成功')
            } else {
                message.info('保存失败')
            }
        })


    }

    /**
     * 保存
     */
    public async SaveBtn() {
        if (this.SysParameterList.length === 0) {
            message.info("暂无需要保存的数据");
            return;
        }
        console.log('list', this.SysParameterList)
        
        if(this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isOutOfTotalShowMessage === '1'){
            const showMessageReferenceType = this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.showMessageReferenceType;
            const maxInvoiceAmount = this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.maxInvoiceAmount;
            console.log('showMessageReferenceType----------',this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.showMessageReferenceType)
            console.log('maxInvoiceAmount-----------',this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.maxInvoiceAmount);
            if(showMessageReferenceType === '' || maxInvoiceAmount === ''){
                message.info("票据限额参数设置不完整，请完善");
                return;
            }
        }
        // const showTipsEntity = this.SysParameterList.find(item => item.Define === "isOutOfTotalShowMessage");
        // const showTips = showTipsEntity ? showTipsEntity!.Value : '';
        // if (showTips === "1") {

        //     const referTypeEntity = this.SysParameterList.find(item => item.Define === "showMessageReferenceType");
        //     // const referType = referTypeEntity!.Value;
        //     const maxInvoiceAmountEntity = this.SysParameterList.find(item => item.Define === "maxInvoiceAmount");
        //     // const maxInvoiceAmountValue = maxInvoiceAmountEntity!.Value;

        //     console.log('showMessageReferenceType',this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.showMessageReferenceType)
        //     console.log('maxInvoiceAmount',this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.maxInvoiceAmount)
        //     if (referTypeEntity === undefined || referTypeEntity === null || referTypeEntity.Value.length === 0) {
        //         message.info("票据限额参数设置不完整，请完善");
        //         return;
        //     }
        //     if (maxInvoiceAmountEntity === undefined || maxInvoiceAmountEntity === null || maxInvoiceAmountEntity.Value.length === 0) {
        //         message.info("票据限额参数设置不完整，请完善");
        //         return;
        //     }
        // }

        this.props.sysParamStore!.isLoading = true;
        const res = await this.props.InvoicingParametersdoMainStore!.saveSysParam(this.SysParameterList);
        if (res.rtnCode !== 0) {
            message.error(res.rtnMsg);
            this.props.sysParamStore!.isLoading = false;
            return;
        }
        message.success("保存成功");
        this.props.sysParamStore!.isLoading = false;
        this.SysParameterList = new Array<SysParameter>();
    }

    /**
     * 编辑
     */
    @action
    public edit() {
        this.isVisiableModal = true;
        this.opearatorType = "edit";
    }

    /**
     * 判断数据在不在要保存的数据集合内
     */
    private dataCheck(define: string, value: string) {
        const index = this.props.InvoicingParametersdoMainStore!.SysParameterList.findIndex((entity: SysParameter) => {
            return entity.Define === define;
        });

        const index1 = this.SysParameterList.findIndex((entity: SysParameter) => {
            return entity.Define === define;
        });
        // 在store.sysParams中不存在并且在uiAction.sysParams中不存在  或者  在store.sysParams中存在并且在uiAction.sysParams中不存在
        if ((index === -1 && index1 === -1) || (index !== -1 && index1 === -1)) {
            const sysParam = new SysParameter();
            sysParam.Define = define;
            sysParam.Value = value;
            sysParam.Description = "";
            this.SysParameterList.push(sysParam);
        }
        // 在store.sysParams中不存在并且在uiAction.sysParams中存在  或者  在store.sysParams中存在并且在uiAction.sysParams中存在并且store中的值和页面的数据不相同
        else if ((index === -1 && index1 !== -1) || (index !== -1 && index1 !== -1 && this.props.InvoicingParametersdoMainStore!.SysParameterList[index].Value !== value)) {
            this.SysParameterList[index1].Value = value;
        }
        // 在store.sysParams中不存在并且在uiAction.sysParams中存在  或者  在store.sysParams中存在并且在uiAction.sysParams中存在并且store中的值和页面的数据相同
        else if ((index === -1 && index1 !== -1) || (index !== -1 && index1 !== -1 && this.props.InvoicingParametersdoMainStore!.SysParameterList[index].Value === value)) {
            this.SysParameterList.splice(index1, 1);
        }
    }

    /**
     * 构造开票系统参数
     * @param define 
     */
    private InvoicingParametersData(define: string) {
        const index = this.props.sysParamStore!.sysParams.findIndex((entity: SysParameter) => {
            return entity.Define === define;
        })
        if (index !== -1) {
            // console.log("define:", define);
            // console.log("index:", index);
            this.props.InvoicingParametersdoMainStore!.SysParameterList.push(this.props.sysParamStore!.sysParams[index]);
            this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam[define] = this.props.sysParamStore!.sysParams[index].Value;
            if (define === "MakeOutInvoiceType") {
                this.props.InvoicingParametersdoMainStore!.MakeOutInvoiceTypeIndex = this.props.sysParamStore!.sysParams[index].Value;
            }
        } else {
            console.log("index:", index);
        }
    }
}