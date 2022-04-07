import { FormComponentProps } from "antd/lib/form";
import { CardTypeUiStore } from "../uiStore";
import { CardTypeFormUiAction } from "./uiAction";



export interface ICardTypeFormProps extends FormComponentProps{

    /**
     * 数据源
     */
    GlobalCardTypeStore:CardTypeUiStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    getUiAction:(action:CardTypeFormUiAction)=>void;
    /** 获取最大排序号 */
    getMaxSortNo:(fatherId:string)=>Promise<number>

}