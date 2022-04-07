import { SelectValue } from "antd/lib/select";
import { CalcFeeTypeUiStore } from "../uiStore";




export interface ICalcFeeTypeSelectorProps{

    GlobalCalcFeeTypeStore?:CalcFeeTypeUiStore,
    
    onChange?:(value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void;

    value?:SelectValue;

    businessTypeId:number;

}