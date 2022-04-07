import { CalcFeeTypeFormUiAction } from "../calcFeeTypeForm/uiAction";
import { ICalcFeeTypeDialogProps } from "./interface";

/**
 * 计费方式对话框视图的Action类
 */
export class CalcFeeTypeDialogUiAction{
    /**
     * 当前组件的api接口
     */
    private props:ICalcFeeTypeDialogProps;
    /**
     * 内部表单组件的action
     */
    private sonFormUiAction:CalcFeeTypeFormUiAction;
    constructor(props:ICalcFeeTypeDialogProps){
        this.props=props;
        this.handleOk=this.handleOk.bind(this);
        this.getSonUiAction=this.getSonUiAction.bind(this);
    }
    /**
     * 获得对应的子表单组件的实例
     */
    public getSonUiAction(sonUiAction:CalcFeeTypeFormUiAction){
        this.sonFormUiAction=sonUiAction;
    }
    /**
     * 点击确定按钮的回调方法
     */
    public handleOk(){
        const result=this.sonFormUiAction.validate();
        if(!result.isValidated){return ;}
        this.props.handleOk(result.formData);
    }
}