import { FormComponentProps } from "antd/lib/form";
import { MeterStateUiStore } from "../uiStore";
import { MeterStateFormUiAction } from "./uiAction";



/**
 * IMeterStateFormProps的Props
 * 继承自FormComponentProps,内有form字段
 */
export interface IMeterStateFormProps extends FormComponentProps{

    /**
     * 数据源
     */
    store:MeterStateUiStore;
    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    getAction:(action:MeterStateFormUiAction)=>void;

}