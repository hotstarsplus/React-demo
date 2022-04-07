import { RegionUiStore } from "../uiStore";
import { Region } from "../entity";



export interface IRegionTableProps{
    /**
     * 数据源
     */
    GlobalRegionStore?:RegionUiStore

    /**
     * 删除之后的回调函数
     */
    afterDelete?:()=>void;

    /**
     * 编辑之后的回调函数
     */
    onEdit:(model:Region)=>void;

    // /**
    //  * 增加之后的回调函数
    //  */
    // onAdd:(model:Region)=>void; 

}