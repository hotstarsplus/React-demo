import { CalcFeeTypeUiStore } from "../uiStore";
import { CalcFeeType } from "../entity";

export interface ICalcFeeTypeDialogProps{
    GlobalCalcFeeTypeStore?:CalcFeeTypeUiStore,
    /**
     * 取消时的回调方法
     */
    handleCancel:()=>void,
    /**
     * 确定时的回调方法
     */
    handleOk:(item:CalcFeeType)=>void,
    /**
     * 编辑视图是否显示
     */
    visible:boolean

    /**
     * 对话框标题
     */
    title:string;
}