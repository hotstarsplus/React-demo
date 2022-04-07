import { FormComponentProps } from "antd/lib/form";
import { ThirdPartyInvoiceParamUiStore } from "../../uiStore";




export interface IThirdPartyInvoiceParamEditFormProps extends FormComponentProps{
    
    GlobalThirdPartyInvoiceParamDomainStore:ThirdPartyInvoiceParamUiStore;

    getValidate:(callback:()=>{ formdata:any,isValidate:boolean})=>void;
}