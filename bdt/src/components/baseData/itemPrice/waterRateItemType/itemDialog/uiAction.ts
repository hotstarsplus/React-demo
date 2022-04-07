import { WaterRateItemTypeItemFormUiAction } from '../itemForm/uiAction'
import { IWaterRateItemTypeItemDialogProps } from './interface';

/**
 * 水费项目类别对话框视图的Action 类
 */
export class WaterRateItemTypeItemDialogUiAction {

    /**
     * 当前组件的api接口
     */
    private props: IWaterRateItemTypeItemDialogProps;

    /**
     * 内部表单组件的action
     */
    private sonFormUiAction: WaterRateItemTypeItemFormUiAction;


    constructor(props: IWaterRateItemTypeItemDialogProps) {
        this.props = props;

        this.handleOk = this.handleOk.bind(this);
        this.getSonUiAction = this.getSonUiAction.bind(this);
    }

    /**
     * 获得对应的子表单组件的实例
     * @param {WaterRateItemTypeItemFormUiAction} sonUiAction 子表单组件
     */
    public getSonUiAction(sonUiAction: WaterRateItemTypeItemFormUiAction) {
        console.log("itemDialog.getSonUIAction")
        this.sonFormUiAction =sonUiAction;
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