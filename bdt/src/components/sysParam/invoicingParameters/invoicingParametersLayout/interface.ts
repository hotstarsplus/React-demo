import { FormComponentProps } from "antd/lib/form";
import { SysParamDoMainStore } from "../../domainStore";
import { InvoiceingParametersdoMainStore } from "../doMainStore";

export interface IInvoicingParametersLayoutProps extends FormComponentProps{

    InvoicingParametersdoMainStore?:InvoiceingParametersdoMainStore;

    sysParamStore?:SysParamDoMainStore;
}