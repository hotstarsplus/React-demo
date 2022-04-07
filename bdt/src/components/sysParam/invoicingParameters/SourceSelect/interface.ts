import Select, { SelectValue } from "antd/lib/select";
import { InvoiceingParametersdoMainStore } from "../doMainStore";
import { SourceList } from "../entity";



export interface ISourceSelectViewProps{


    InvoicingParametersdoMainStore?:InvoiceingParametersdoMainStore;

    handlestyle?:React.CSSProperties;

    onChange?:(value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>)=>void;

    onBlur?:()=>void;

    value ?: string;

    rebindRef?: (event: Select<SelectValue> | null)=> void
    
    SourceList?:SourceList[];
    
}