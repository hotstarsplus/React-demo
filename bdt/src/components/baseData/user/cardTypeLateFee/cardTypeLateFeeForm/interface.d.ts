import { FormComponentProps } from "antd/lib/form";
import { SelectValue } from "antd/lib/select";
import { CardTypeLateFeeDoMainStore } from "../domainStore";
import { CardTypeLateFeeFormUiAction } from "./uiAction"

export interface ICardTypeLateFeeFormProps extends FormComponentProps{
    store:CardTypeLateFeeDoMainStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Actin 传递给父组件
     */
    getAction:(action:CardTypeLateFeeFormUiAction)=>void,



}