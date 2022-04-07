import { CardTypeLateFeeFormUiAction } from "../cardTypeLateFeeForm/uiAction";
import { ICardTypeLateFeeDialogProps } from "./interface";

/**
 * 用户类型违约金类别对话框视图的Action 类
 */
export class CardTypeLateFeeDialogUiAction{

    /**
     * 当前组件的api接口
     */
    private props:ICardTypeLateFeeDialogProps;

    /**
     * 内部表单组件的action
     */
    private sonFormUiAction:CardTypeLateFeeFormUiAction;

    constructor(props:ICardTypeLateFeeDialogProps){
        this.props = props;
        this.getSonFormUiAction = this.getSonFormUiAction.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    /**
     * 获得对应的子表单组件的实例
     * @param sonUiAction 子表单组件
     */
    public getSonFormUiAction(sonUiAction:CardTypeLateFeeFormUiAction){
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