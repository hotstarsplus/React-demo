import { PriceRepireDoMainStore } from "../domainStore";
import { PriceRepireMeter } from "../entity";

export interface IPriceRepireMeterTableProps{

    /**
     * 删除之后的回调函数
     */
    afterDelete?:() => void;

    /**
     * 点击编辑之后的回调函数
     */
    onEdit: (item:PriceRepireMeter) => void;

    /**
     * 业务store
     */
    GlobalPriceRepireMeterStore?:PriceRepireDoMainStore;
}