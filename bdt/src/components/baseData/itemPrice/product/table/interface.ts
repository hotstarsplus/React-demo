import { WaterProductDoMainStore } from "../domainStore";
import { WaterProduct } from "../entity";



export interface IWaterProductTableProps{

    GlobalWaterProductStore?:WaterProductDoMainStore;

    /**
     * 编辑回调
     */
    onEdit:(model:WaterProduct)=>void;

    /**
     * 复选框选中的行
     */
    onChecked:(model:WaterProduct)=>void;

    /**
     * 取消选中事件
     */
    onCancelChecked:(model:WaterProduct)=>void;

}