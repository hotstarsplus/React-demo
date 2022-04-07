import { ControlTypeFormUiAction } from "../controlTypeForm/uiAction";
import { IControlTypeDialogProps } from "./interface";

export class ControlTypeDialogUiAction{
    private props:IControlTypeDialogProps;
    /**
     * 子组件的action
     */
    private sonUiAction:ControlTypeFormUiAction;
/**
 * 构造方法
 * @param props 
 */
    constructor(props:IControlTypeDialogProps){
        this.props=props;

        this.getSonUiAction = this.getSonUiAction.bind(this);

        this.handleOk=this.handleOk.bind(this);
    }
    /**
     * 获得对应的子表单组件的实例
     * @param action 子表单组件
     */
    public getSonUiAction(sonUiAction:ControlTypeFormUiAction){
        this.sonUiAction=sonUiAction;
    }
    /**
     * 确定方法
     */
    public handleOk(){
        const result = this.sonUiAction.validate();
        if(!result.isValidated){
            return;
        }
        this.props.handleOk(result.formDate);
    }


}