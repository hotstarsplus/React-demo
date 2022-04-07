import { WaterProductDoMainStore } from "../domainStore";
import { WaterProduct } from "../entity";





export interface IWaterProductDialogProps{

    GlobalWaterProductStore?:WaterProductDoMainStore;

    /**
     * 确定时的回调方法
     */
    handleOk:(model:WaterProduct)=>void

    /**
     * 取消时的回调方法
     */
    handleCancel:()=>void;


    /**
     * 是否显示
     */
    visiable:boolean;

    businessTypeId:number;
    /**
     * 对话框标题
     */
    title:string;
}