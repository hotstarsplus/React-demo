import { SelectValue } from "antd/lib/select";
import { InvoiceingParametersdoMainStore } from "../doMainStore";
import { FieldNameList } from "../entity";



export interface IFieldNameSelectViewProps{


    InvoicingParametersdoMainStore?:InvoiceingParametersdoMainStore;

    handlestyle?:React.CSSProperties;

    onChange?:(value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>)=>void;

    onBlur?:()=>void;

    value ?: string;

    FieldNameList?:FieldNameList[];
}