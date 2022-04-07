import { WaterProductionDoMainStore } from "../doMainStore";
import { WaterProduction } from "../entity";



export interface IWaterProductionTableProps{

    GlobalWaterProductionStore?:WaterProductionDoMainStore;

    /**
     * 编辑回调
     */
    onEdit:(model:WaterProduction)=>void;

    /**
     * 复选框选中的行
     */
    onChecked:(model:WaterProduction)=>void;

    /**
     * 取消选中事件
     */
    onCancelChecked:(model:WaterProduction)=>void;

}