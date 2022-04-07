import { PriceFixDoMainStore } from "../domainStore";
import { PriceFix } from "../entity";

export interface IPriceFixDialogProps{
    
    GlobalPriceFixStore?:PriceFixDoMainStore;

    /**
     * 取消时的回调方法
     */
    handleCancel:() => void,

    /**
     * 点击ok时的回调函数
     */
    handleOk:(item:PriceFix) => void,

    /**
     * 编辑视图是否显示
     */
    visible: boolean


}