import { PriceRepireMeterFormUiAction } from "../priceRepireMeterForm/uiAction";
import { IPriceRepireMeterDialogProps } from "./interface";

/**
 * 校表维修费类别对话框视图的Action 类
 */
export class PriceRepireMeterDialogUiAction{

    /**
     * 当前组件的api接口
     */
    private props:IPriceRepireMeterDialogProps;

    /**
     * 内部表单组件的action
     */
    private sonFormUiAction:PriceRepireMeterFormUiAction;

    constructor(props:IPriceRepireMeterDialogProps){
        this.props = props;
        this.getSonFormUiAction = this.getSonFormUiAction.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    /**
     * 获得对应的子表单组件的实例
     * @param sonUiAction 子表单组件
     */
    public getSonFormUiAction(sonUiAction:PriceRepireMeterFormUiAction){
        console.log("priceRepireMeterDialog.getUiAction");
        this.sonFormUiAction = sonUiAction;
    }

    /**
     * 点击确定按钮的回调方法
     */
    public handleOk()
    {
        const result = this.sonFormUiAction.validate();
        if(!result.isValidated){
            return;
        }
        this.props.handleOk(result.formData);
    }



}