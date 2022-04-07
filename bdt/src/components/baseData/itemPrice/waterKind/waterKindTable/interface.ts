import { WaterKindDoMainStore } from "../doMainStore";
import { WaterKind } from "../entity";




export interface IWaterKindTableProps{

    /**
     * 数据源
     */
    GlobalWaterKindStore?:WaterKindDoMainStore

    /**
     * 删除之后的回调函数
     */
    afterDelete?:()=>void;

    /**
     * 编辑
     */
    onEdit:(model:WaterKind)=>void;

    /**
     * 增加
     */
    onAdd:(model:WaterKind)=>void; 

}