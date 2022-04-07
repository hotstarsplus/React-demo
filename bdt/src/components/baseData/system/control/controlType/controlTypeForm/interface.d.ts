import { FormComponentProps } from "antd/lib/form";
import { ControlTypeFormUiAction } from './uiAction'
import { ControlTypeDomainStore } from "../domianStore";
/**
 * IControlTypeFormViewProps的Props
 * 继承自FormComponentProps,内有form字段
 */
export interface IControlTypeFormProps extends FormComponentProps{
    /**
     * 数据源
     */
    store:ControlTypeDomainStore;
    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    getAction:(action:ControlTypeFormUiAction)=>void
}