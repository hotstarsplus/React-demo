import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { WaterKindDoMainStore } from "../doMainStore";



export interface  IWaterKindTreeProps{

    /**
     * 数据源
     */
    GlobalWaterKindStore?:WaterKindDoMainStore;


    onSelect?:(selectedKeys: string[], e: AntTreeNodeSelectedEvent)=>void

}