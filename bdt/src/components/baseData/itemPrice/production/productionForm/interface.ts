import { FormComponentProps } from "antd/lib/form";
import { WaterProductionDoMainStore } from "../doMainStore";
import { WaterProductionFormUiAction } from "./uiAction";




export interface IWaterProductionFormProps extends FormComponentProps{
    
    GlobalProductionStore?:WaterProductionDoMainStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Actin 传递给父组件
     */
    getUiAction:(action:WaterProductionFormUiAction)=>void;

}