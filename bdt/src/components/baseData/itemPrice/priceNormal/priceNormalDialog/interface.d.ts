import { PriceNormalDoMainStore } from "../domainStore";
import { PriceNormal } from "../entity";

export interface IPriceNormalDialogProps{
    
    GlobalPriceNormalStore?:PriceNormalDoMainStore;

    /**
     * 取消时的回调方法
     */
    handleCancel:() => void,

    /**
     * 点击ok时的回调函数
     */
    handleOk:(item:PriceNormal) => void,

    /**
     * 编辑视图是否显示
     */
    visible: boolean


}