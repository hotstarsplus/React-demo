import { PriceSuperPlanDoMainStore } from "../domainStore";
import { PriceSuperPlan } from "../entity";

export interface IPriceSuperPlanDialogProps{
    
    GlobalPriceSuperPlanStore?:PriceSuperPlanDoMainStore;

    /**
     * 取消时的回调方法
     */
    handleCancel:() => void,

    /**
     * 点击ok时的回调函数
     */
    handleOk:(item:PriceSuperPlan) => void,

    /**
     * 编辑视图是否显示
     */
    visible: boolean


}