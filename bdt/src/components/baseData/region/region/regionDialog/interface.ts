import { RegionUiStore } from "../uiStore";
import { Region } from "../entity";


export interface IRegionDialogProps{

    /**
     * 数据源
     */
    GlobalRegionStore?:RegionUiStore;

    
    /**
     * 确定时的回调方法 
     */
    handleOk:(Region:Region)=>void;

    /**
     * 取消时的回调方法
     */
    handleCancel:()=>void;

     /** 获取最大排序号 */
     GetMaxSortNo: (id: string) => number;

    /**
     * 编辑视图是否显示
     */
    visible:boolean;

    /**
     * 对话框标题
     */
    title:string;
}