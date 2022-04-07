import { SelectValue } from "antd/lib/select";
import { ThirdPartyInvoiceParamUiStore } from "../uiStore";






export interface ITaxRateSelectProps{
    GlobalThirdPartyInvoiceParamDomainStore?:ThirdPartyInvoiceParamUiStore;

    onChange?:(value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void;

    value?:SelectValue;
}