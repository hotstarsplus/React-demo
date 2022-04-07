import { ResidenceUiStore } from "../uiStore";
import { Residence } from "../entity";




export interface IResidenceTableProps{

    /**
     * 数据源
     */
    GlobalResidenceStore?:ResidenceUiStore

    /**
     * 删除之后的回调函数
     */
    afterDelete?:()=>void;

    /**
     * 编辑
     */
    onEdit:(model:Residence)=>void;

    /**
     * 增加
     */
    onAdd:(model:Residence)=>void; 

}