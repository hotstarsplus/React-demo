import { MeterStateUiStore } from "../uiStore";
import { MeterState } from "../entity";

/**
 * 水表状态管理视图的Props
 */
export interface IMeterStateTableProps{

    /**
     * 数据源
     */
    GlobalMeterStateStore?:MeterStateUiStore;
    /**
     * 删除之后的回调
     */
    afterDelete?:()=>void;


    /**
     * 编辑之后的回调
     * @param 实体类
     */
    onEdit:(item:MeterState)=>void;

}