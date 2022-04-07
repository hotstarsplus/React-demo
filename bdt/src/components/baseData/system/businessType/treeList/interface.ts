import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { BusinessTypeDoMainStore } from "../doMainStore";




export interface IBusinessTypeTreeListProps{

    GlobalBusinesstypeStore?:BusinessTypeDoMainStore

    selectedKeys?:string[];

    onSelect?:(selectedKeys: string[], e: AntTreeNodeSelectedEvent)=>void

}