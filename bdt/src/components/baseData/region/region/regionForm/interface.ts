import { FormComponentProps } from "antd/lib/form";
import { RegionUiStore } from "../uiStore";
import { RegionFormUiAction } from "./uiAction";


export interface IRegionFormProps extends FormComponentProps {


    /**
     * 数据源
     */
    GlobalRegionStore: RegionUiStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    getUiAction: (action: RegionFormUiAction) => void;

    /** 获取最大排序号 */
    GetMaxSortNo: (id: string) => number;


}