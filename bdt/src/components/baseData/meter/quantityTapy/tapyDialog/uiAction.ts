import { QuantityTapyFormUiAction } from '../tapyForm/uiAction'
import { IQuantityTapyDialogProps } from './interface';

/**
 * 水量类型对话框视图的Action 类
 */
export class QuantityTapyDialogUiAction {
    /**
     * 当前组件的api接口
     */
    private props: IQuantityTapyDialogProps;
    /**
     * 内部表单组件的action
     */
    private sonFormUiAction: QuantityTapyFormUiAction;
    constructor(props: IQuantityTapyDialogProps) {
        this.props = props;
        this.handleOk = this.handleOk.bind(this);
        this.getSonUiAction = this.getSonUiAction.bind(this);
    }
    /**
     * 获得对应的子表单组件的实例
     * @param {WaterRateItemTypeItemFormUiAction} sonUiAction 子表单组件
     */
    public getSonUiAction(sonUiAction: QuantityTapyFormUiAction) {
        this.sonFormUiAction = sonUiAction;
    }
    /**
     * 点击确定按钮的回调方法
     */
    public handleOk() {
        const result = this.sonFormUiAction.validate();
        if (!result.isValidated) { return; }
        this.props.handleOk(result.formData);
    }
}