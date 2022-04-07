import { CardTypeLateFeeDoMainStore } from "../domainStore";
import { CardTypeLateFee } from "../entity";

export interface ICardTypeLateFeeTableProps{

    GlobalCardTypeLateFeeStore?:CardTypeLateFeeDoMainStore;

    /**
     * 点击编辑后的回调方法
     */
    onEdit:(cardTypeLateFee:CardTypeLateFee) => void,

    /**
     * 点击删除之后的回调方法
     */
    afterDelete?:()=>void

}