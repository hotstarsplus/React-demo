import { FormComponentProps } from "antd/lib/form";
import { NeighborhoodDoMainStore } from "../domainStore";
import { NeighborhoodFormUiAction } from "./uiAction";


export interface INeighborhoodFormProps extends FormComponentProps{


    /**
     * 数据源
     */
    GlobalNeighborhoodStore:NeighborhoodDoMainStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    getUiAction:(action:NeighborhoodFormUiAction)=>void;


}