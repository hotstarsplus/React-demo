import { MeterModelFormUiAction } from "../meterModelForm/uiAction";
import { IMeterModelDialogProps } from "./interface";

/**
 * 水表型号类别对话框视图的Action 类
 */
export class MeterModelDialogUiAction {

    /**
     * 当前组件的api接口
     */
    private props: IMeterModelDialogProps;
    /**
     * 内部表单组件的action
     */
    private sonFormUiAction: MeterModelFormUiAction;
    constructor(props: IMeterModelDialogProps) {
        this.props = props;
        this.handleOk = this.handleOk.bind(this);
        this.getSonUiAction = this.getSonUiAction.bind(this);
    }
    /**
     * 获得对应的子表单组件的实例
     * @param {MeterModelFormUiAction} sonUiAction 子表单组件
     */
    public getSonUiAction(sonUiAction: MeterModelFormUiAction) {
        console.log("MeterModelDialog.getSonUIAction")
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