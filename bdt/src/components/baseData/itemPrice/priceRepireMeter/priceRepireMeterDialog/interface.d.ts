import { PriceRepireDoMainStore } from "../domainStore";
import { PriceRepireMeter } from "../entity";

export interface IPriceRepireMeterDialogProps{
    
    GlobalPriceRepireMeterStore?:PriceRepireDoMainStore;

    /**
     * 取消时的回调方法
     */
    handleCancel:() => void,

    /**
     * 点击ok时的回调函数
     */
    handleOk:(item:PriceRepireMeter) => void,

    /**
     * 编辑视图是否显示
     */
    visible: boolean


}