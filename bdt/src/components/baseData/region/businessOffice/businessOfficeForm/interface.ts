import { FormComponentProps } from "antd/lib/form";
import { BusinessOfficeUiStore } from "../uiStore";
import { BusinessOfficeFormUiAction } from "./uiAction";


export interface IBusinessOfficeFormProps extends FormComponentProps {


    /**
     * 数据源
     */
    GlobalBusinessOfficeStore: BusinessOfficeUiStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    getUiAction: (action: BusinessOfficeFormUiAction) => void;
    /** 获取最大排序号 */
    getMaxSortNo: (fatherId: string) => Promise<number>
}