import { FormComponentProps } from 'antd/lib/form';
import {MeterCaliberUiStore} from '../uiStore';
import {MeterCaliberFormUiAction} from './uiAction';
import {MeterCaliber} from '../entity'

/**
 * IMeterCaliberFormProps的Props
 * 继承自FormComponentProps,内有form字段
 */
export interface IMeterCaliberFormProps extends FormComponentProps {
    store:MeterCaliberUiStore
    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Actin 传递给父组件
     */
    getAction:(action:MeterCaliberFormUiAction)=>void,
}
