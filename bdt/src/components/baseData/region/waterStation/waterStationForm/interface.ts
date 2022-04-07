import { FormComponentProps } from "antd/lib/form";
import { WaterStationUiStore } from "../uiStore";
import { WaterStationFormUiAction } from "./uiAction";

/**
 * 供水所表单组件的接口
 */
export interface IWaterStationFormProps extends FormComponentProps{


    /**
     * 数据源
     */
    GlobalWaterStationStore:WaterStationUiStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    getUiAction:(action:WaterStationFormUiAction)=>void;

    /** 获取最大排序号 */
    getMaxSortNo: (fatherId:string) => Promise<number>


}