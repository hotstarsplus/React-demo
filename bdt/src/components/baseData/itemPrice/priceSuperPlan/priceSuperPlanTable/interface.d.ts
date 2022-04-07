import { PriceSuperPlanDoMainStore } from "../domainStore";
import { PriceSuperPlan } from "../entity";

export interface IPriceSuperPlanTableProps{

    GlobalPriceSuperPlanStore?:PriceSuperPlanDoMainStore;

    /**
     * 点击编辑后的回调方法
     */
    onEdit: (item:PriceSuperPlan) => void,

    /**
     * 删除之后触发的回调方法
     */
    afterDelete?: () => void
}