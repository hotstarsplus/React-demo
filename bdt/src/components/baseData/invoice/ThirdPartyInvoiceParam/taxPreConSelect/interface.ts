import { SelectValue } from "antd/lib/select";
import { ThirdPartyInvoiceParamUiStore } from "../uiStore";





export interface ITaxPreConSelectProps{

    GlobalThirdPartyInvoiceParamDomainStore?:ThirdPartyInvoiceParamUiStore;

    onChange?:(value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void;

    value?:string;

}