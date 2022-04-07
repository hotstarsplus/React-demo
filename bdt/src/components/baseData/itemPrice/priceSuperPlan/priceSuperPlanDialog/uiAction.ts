import { PriceSuperPlanFormUiAction } from "../priceSuperPlanForm/uiAction";
import { IPriceSuperPlanDialogProps } from "./interface";

/**
 * 超计划水价类别对话框视图的Action 类
 */
export class PriceSuperPlanDialogUiAction{

    /**
     * 当前组件的api接口
     */
    private props:IPriceSuperPlanDialogProps;

    /**
     * 内部表单组件的action
     */
    private sonFormUiAction:PriceSuperPlanFormUiAction;

    constructor(props:IPriceSuperPlanDialogProps){
        this.props = props;
        this.getSonFormUiAction = this.getSonFormUiAction.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    /**
     * 获得对应的子表单组件的实例
     * @param sonUiAction 子表单组件
     */
    public getSonFormUiAction(sonUiAction:PriceSuperPlanFormUiAction){
        console.log("priceSuperPlanDialog.getUiAction");
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