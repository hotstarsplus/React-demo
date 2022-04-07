import { NeighborhoodDoMainStore } from "../domainStore";
import { Neighborhood } from "../entity";


export interface INeighborhoodDialogProps{

    
    GlobalNeighborhoodStore?:NeighborhoodDoMainStore;

    
    /**
     * 确定时的回调方法 
     */
    handleOk:(Neighborhood:Neighborhood)=>void;

    /**
     * 取消时的回调方法
     */
    handleCancel:()=>void;

    /**
     * 编辑视图是否显示
     */
    visible:boolean;

    /**
     * 对话框标题
     */
    title:string;
}