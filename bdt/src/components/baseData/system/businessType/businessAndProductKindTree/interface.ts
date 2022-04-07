import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { WaterProductDoMainStore } from "../../../itemPrice/product/domainStore";
import { BusinessTypeDoMainStore } from "../doMainStore";




export interface IBusinessAndProductKindTreeListProps{

    GlobalBusinesstypeStore?:BusinessTypeDoMainStore;
    GlobalWaterProductStore?:WaterProductDoMainStore;

    selectKeys:string[];

    onSelect?:(businessTypeId:number,selectedKeys: string[], e: AntTreeNodeSelectedEvent)=>void

}