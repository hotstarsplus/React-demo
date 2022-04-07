import { BusinessOfficeUiStore } from "../uiStore";
import { BusinessOffice } from "../entity";




export interface IBusinessOfficeTableProps{

    /**
     * 数据源
     */
    GlobalBusinessOfficeStore?:BusinessOfficeUiStore

    /**
     * 删除之后的回调函数
     */
    afterDelete?:()=>void;

    /**
     * 编辑
     */
    onEdit:(model:BusinessOffice)=>void;

    /**
     * 增加
     */
    onAdd:(model:BusinessOffice)=>void; 

    /** 刷新ui */
    refreshUi:(jsonData: BusinessOffice[])=>void;

}