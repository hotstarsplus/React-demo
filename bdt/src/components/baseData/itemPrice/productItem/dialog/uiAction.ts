import { ProductItemFormUiAction } from '../form/uiAction'
import { IProductItemDialogProps } from './interface';

/**
 * 水费项目类别对话框视图的Action 类
 */
export class ProductItemDialogUiAction {

    /**
     * 当前组件的api接口
     */
    private props: IProductItemDialogProps;

    /**
     * 内部表单组件的action
     */
    private sonFormUiAction: ProductItemFormUiAction;


    constructor(props: IProductItemDialogProps) {
        this.props = props;

        this.handleOk = this.handleOk.bind(this);
        this.getSonUiAction = this.getSonUiAction.bind(this);
    }

    /**
     * 获得对应的子表单组件的实例
     * @param {WaterRateItemTypeItemFormUiAction} sonUiAction 子表单组件
     */
    public getSonUiAction(sonUiAction: ProductItemFormUiAction) {
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