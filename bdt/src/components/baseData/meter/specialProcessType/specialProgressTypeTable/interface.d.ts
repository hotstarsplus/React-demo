import { SpecialProcessTypeUiStore } from "../uiStore";
import { SpecialProcessType } from "../entity";
/**
 * 水表特殊型号表格组件组件的接口
 */
export interface ISpecialProgressTypeTableProps{
    /**
     * 数据源
     */
    GlobalSpecialProgressTypeStore?:SpecialProcessTypeUiStore;

    /**
     * 编辑之后的回调
     * @param 实体类
     */
    onEdit:(item:SpecialProcessType)=>void;
}