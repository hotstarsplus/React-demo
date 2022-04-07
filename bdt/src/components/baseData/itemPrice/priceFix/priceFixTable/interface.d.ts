import { PriceFixDoMainStore } from "../domainStore";
import { PriceFix } from "../entity";

export interface IPriceFixTableProps{

    GlobalPriceFixStore?:PriceFixDoMainStore;

    /**
     * 点击编辑后的回调方法
     */
    onEdit: (item:PriceFix) => void,

    /**
     * 删除之后触发的回调方法
     */
    afterDelete?: () => void
}