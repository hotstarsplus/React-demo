import { FormComponentProps } from "antd/lib/form";
import { MeterTypeUiStore } from "../uiStore";
import { MeterTypeFormUiAction } from "./uiAction";



export interface IMeterTypeFormProps extends FormComponentProps{

    /**
     * 数据源
     */
    GlobalMeterTypeStore:MeterTypeUiStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    getUiAction:(action:MeterTypeFormUiAction)=>void;

    /** 获取最大排序号 */
    getMaxSortNo: (CompanyName: string, fatherId: string) => Promise<number>;


}