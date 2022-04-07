import { NeighborhoodDoMainStore } from "../domainStore";
import { Neighborhood } from "../entity";




export interface INeighborhoodTableProps{

    /**
     * 数据源
     */
    GlobalNeighborhoodStore?:NeighborhoodDoMainStore

    /**
     * 删除之后的回调函数
     */
    afterDelete?:()=>void;

    /**
     * 编辑之后的回调函数
     */
    onEdit:(model:Neighborhood)=>void;

    /**
     * 点击增加时回调
     */
    onAdd:(model:Neighborhood)=>void; 

}