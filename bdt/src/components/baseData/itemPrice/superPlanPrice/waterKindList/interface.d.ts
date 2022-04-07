import { SuperPlanPriceUiStore } from "../uiStore";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";




export interface IWaterKindListProps{

    GlobalSuperPlanPriceUiStore?:SuperPlanPriceUiStore

    onSelect?:(selectedKeys: string[], e: AntTreeNodeSelectedEvent)=>void

}
