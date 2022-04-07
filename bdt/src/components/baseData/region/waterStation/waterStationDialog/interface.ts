import { WaterStationUiStore } from "../uiStore";
import { WaterStation } from "../entity";

/**
 * 供水所新增、编辑弹出层组件的接口
 */
export interface IWaterStationDialogProps{

    /**
     * 数据源
     */
    GlobalWaterStationStore?:WaterStationUiStore;

    
    /**
     * 确定时的回调方法 
     */
    handleOk:(WaterStation:WaterStation)=>void;

      /** 获取最大排序号 */
      getMaxSortNo: (fatherId:string) => Promise<number>

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