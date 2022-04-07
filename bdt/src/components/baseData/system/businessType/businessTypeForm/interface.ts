import { FormComponentProps } from 'antd/lib/form';
import { BusinessTypeDoMainStore } from '../doMainStore';
import { BusinessTypeFormUiAction } from './uiAction';


/**
 * IBusinessTypeFormProps的Props
 * 继承自FormComponentProps,内有form字段
 */
export interface IBusinessTypeFormProps extends FormComponentProps {

    store:BusinessTypeDoMainStore
    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Actin 传递给父组件
     */
    getAction:(action:BusinessTypeFormUiAction)=>void,
}

