import { PriceNormalDoMainStore } from "../domainStore";
import { PriceNormal } from "../entity";

export interface IPriceNormalTableProps{

    GlobalPriceNormalStore?:PriceNormalDoMainStore;

    /**
     * 点击编辑后的回调方法
     */
    onEdit: (item:PriceNormal) => void,

    /**
     * 删除之后触发的回调方法
     */
    afterDelete?: () => void
}