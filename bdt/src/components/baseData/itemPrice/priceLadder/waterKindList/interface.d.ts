import { PriceLadderUiStore } from "../uiStore";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";




export interface IWaterKindListProps{

    GlobalLadderPriceUiStore?:PriceLadderUiStore;


    onSelect?:(selectedKeys: string[], e: AntTreeNodeSelectedEvent)=>void

}
