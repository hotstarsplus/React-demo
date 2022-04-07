import { FormComponentProps } from "antd/lib/form";
import { ReminderParameterDomainStore } from "../domianStore";
import { ReminderParameterFormUiAction } from "./uiActon";

export interface IReminderParameterFormProps extends FormComponentProps{
    /**
     * 数据源
     */
    reminderParameterStore?:ReminderParameterDomainStore

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    getAction:(action:ReminderParameterFormUiAction)=>void
}