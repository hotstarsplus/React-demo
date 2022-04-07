import { FormComponentProps } from 'antd/lib/form';
import { QuantityTapyUiStore } from '../uiStore';
import { QuantityTapyFormUiAction } from './uiAction';

/**
 * IQuantityTapyFormProps的Props
 * 继承自FormComponentProps,内有form字段
 */
export interface IQuantityTapyFormProps extends FormComponentProps {
    store: QuantityTapyUiStore
    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Actin 传递给父组件
     */
    getAction: (action: QuantityTapyFormUiAction) => void,
}
