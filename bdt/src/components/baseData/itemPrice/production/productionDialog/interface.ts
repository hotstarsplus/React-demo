import { WaterProductionDoMainStore } from "../doMainStore";
import { WaterProduction } from "../entity";





export interface IWaterProductionDialogProps{

    GlobalWaterProductionStore?:WaterProductionDoMainStore;

    /**
     * 确定时的回调方法
     */
    handleOk:(model:WaterProduction)=>void

    /**
     * 取消时的回调方法
     */
    handleCancel:()=>void;


    /**
     * 是否显示
     */
    visiable:boolean;
    /**
     * 对话框标题
     */
    title:string;

}