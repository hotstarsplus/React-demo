import { CalcFeeTypeUiStore } from "../uiStore";
import { CalcFeeType } from "../entity";

export interface ICalcFeeTypeTableViewProps{
    
    GlobalCalcFeeTypeStore?:CalcFeeTypeUiStore,
    /**
     * 点击编辑后的回调方法
     */
    onEdit:(item:CalcFeeType)=>void,

    selectItem:(id:string) =>boolean;
 }