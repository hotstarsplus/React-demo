import { action } from "mobx";
import { IThirdPartyInvoiceParamModalProps } from "./interface";




export class ThirdPartyInvoiceParamModalUiAction{


    private props:IThirdPartyInvoiceParamModalProps;

    private validate:()=>{formdata:any,isValidate:boolean};

    constructor(props:IThirdPartyInvoiceParamModalProps){
        this.props = props;
        this.GetValidate = this.GetValidate.bind(this);
        this.OnOk = this.OnOk.bind(this);
    }


    public GetValidate(callback:()=>{ formdata:any,isValidate:boolean}){
        this.validate = callback;
    }


    /**
     * 新增数据
     */
    @action
    public OnOk(){
        const res = this.validate();
        if (res.isValidate) {
            this.props.onOk(res.formdata);
        }
    }



}