import { FormComponentProps } from "antd/lib/form";
import { PayTypeUiStore } from "../uiStore";
import { PayTypeFormUiAction } from "./uiAction";



/**
 * IPayTypeFormProps的Props
 * 继承自FormComponentProps,内有form字段
 */
export interface IPayTypeFormProps extends FormComponentProps{

    store:PayTypeUiStore;
    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    getAction:(action:PayTypeFormUiAction)=>void;

}