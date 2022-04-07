import { FormComponentProps } from "antd/lib/form";
import { WaterKindDoMainStore } from "../doMainStore";
import { WaterKindFormUiAction } from "./uiAction";



export interface IWaterKindFormProps extends FormComponentProps {

    /**
     * 数据源
     */
    GlobalWaterKindStore: WaterKindDoMainStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    getUiAction: (action: WaterKindFormUiAction)=> void;


}