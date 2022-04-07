import { CardTypeUiStore } from "../uiStore";
import { CardType } from "../entity";




export interface ICardTypeTableProps{

    /**
     * 数据源
     */
    GlobalCardTypeStore?:CardTypeUiStore

    /**
     * 删除之后的回调函数
     */
    afterDelete?:()=>void;

    /**
     * 编辑
     */
    onEdit:(model:CardType)=>void;

    /**
     * 增加
     */
    onAdd:(model:CardType)=>void; 

}