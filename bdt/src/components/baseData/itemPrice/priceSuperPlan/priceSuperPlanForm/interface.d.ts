import { FormComponentProps } from "antd/lib/form";
import { PriceSuperPlanDoMainStore } from "../domainStore";
import { PriceSuperPlanFormUiAction } from "./uiAction";

export interface IPriceSuperPlanFormProps extends FormComponentProps{
    store:PriceSuperPlanDoMainStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Actin 传递给父组件
     */
    getAction:(action:PriceSuperPlanFormUiAction)=>void,

}