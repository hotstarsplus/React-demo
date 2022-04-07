import { ReminderParameterFormUiAction } from "../reminderParameterForm/uiActon";
import { IReminderParameterDialogProps } from "./interface";



export class ReminderParamDialogUiAction{
    private props:IReminderParameterDialogProps;

    /**
     * 子组件action
     */
    private sonUiAction : ReminderParameterFormUiAction
    /**
     * @param props
     */
    constructor(props:IReminderParameterDialogProps){
        this.props=props;
        this.handleOk=this.handleOk.bind(this);
        this.getSonUiAction=this.getSonUiAction.bind(this);
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
        // this.props.remainderParameterStore!.loadData();
    }
    /**
     * 获得对应的子表单组件的实例
     * @param action 子表单组件
     */
   public getSonUiAction(sonUiAction:ReminderParameterFormUiAction){
    this.sonUiAction= sonUiAction
   }
}