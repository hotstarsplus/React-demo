import { WaterKindDoMainStore } from "../doMainStore";
import { WaterKind } from "../entity";


/**
 * 编辑视图的props
 */
export interface IWaterKindDialogProps{

    GlobalWaterKindStore?:WaterKindDoMainStore;

    
    /**
     * 确定时的回调方法 
     */
    handleOk:(waterKing:WaterKind)=>void;

    /**
     * 取消时的回调方法
     */
    handleCancel:()=>void;

    /**
     * 编辑视图是否显示
     */
    visible:boolean;
    /**
     * 对话框标题
     */
    title:string;
}