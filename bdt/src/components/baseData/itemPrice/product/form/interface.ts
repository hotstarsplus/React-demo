import { FormComponentProps } from "antd/lib/form";
import { WaterProductDoMainStore } from "../domainStore";
import { WaterProductFormUiAction } from "./uiAction";




export interface IWaterProductFormProps extends FormComponentProps{
    
    GlobalWaterProductStore?:WaterProductDoMainStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Actin 传递给父组件
     */
    getUiAction:(action:WaterProductFormUiAction)=>void;

    businessTypeId:number;

}