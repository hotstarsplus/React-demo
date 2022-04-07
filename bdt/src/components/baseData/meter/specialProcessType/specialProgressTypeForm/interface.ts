import {FormComponentProps} from "antd/lib/form";
import {SpecialProcessTypeUiStore} from '../uiStore';
import {SpecialProcessTypeFormUiAction} from './uiAction';

/**
 * 水表特殊型号表单组件的接口
 */
export interface ISpecialProcessTypeFormProps extends FormComponentProps{
    /**
     * 数据源
     */
    store:SpecialProcessTypeUiStore;
    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    getAction:(action:SpecialProcessTypeFormUiAction)=>void;
}