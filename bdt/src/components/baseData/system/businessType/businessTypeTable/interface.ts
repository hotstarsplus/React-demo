import { BusinessTypeDoMainStore } from "../doMainStore";
import { BusinessType } from "../entity";


/**
 * 业务类型表格接口
 */
export interface IBusinessTypeTableProps{

    /**
     * 数据源
     */
    GlobalBusinesstypeStore?:BusinessTypeDoMainStore

    /**
     * 编辑
     */
    onEdit:(model:BusinessType)=>void;
}
