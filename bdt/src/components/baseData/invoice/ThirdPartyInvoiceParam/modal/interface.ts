import { ThirdPartyInvoiceParamUiStore } from "../uiStore";
import { ThirdPartyInvoiceParam } from "../entity";




export interface IThirdPartyInvoiceParamModalProps{

    GlobalThirdPartyInvoiceParamDomainStore?:ThirdPartyInvoiceParamUiStore;

    operationType:"add"|"edit";

    visible:boolean;

    onOk:(data:ThirdPartyInvoiceParam)=>void;

    onCancel:()=>void;

    title:string;

}