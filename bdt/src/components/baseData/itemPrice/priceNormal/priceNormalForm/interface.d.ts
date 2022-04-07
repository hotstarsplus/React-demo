import { FormComponentProps } from "antd/lib/form";
import { PriceNormalDoMainStore } from "../domainStore";
import { PriceNormalFormUiAction } from "./uiAction";

export interface IPriceNormalFormProps extends FormComponentProps{
    store:PriceNormalDoMainStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Actin 传递给父组件
     */
    getAction:(action:PriceNormalFormUiAction)=>void,

}