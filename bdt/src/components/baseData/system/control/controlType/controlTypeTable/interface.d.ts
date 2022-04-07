import { ControlTypeDomainStore } from "../domianStore";
import { ControlType } from "../entity";
/**
 * 控制方式视图的props
 */
export interface IControlTypeTableProps{
    /**
     * 数据源
     */ 
    GlobalControlTypeStore?:ControlTypeDomainStore
    /**
     * 删除之后的回掉
     */ 
    afterDelete?:()=>void

    /**
     * 编辑之后的回调
     */
    onEdit:(item:ControlType)=>void
}