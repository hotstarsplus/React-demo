import { CustomerTypeFormUiAction } from "../customerTypeForm/uiAction"
import { ICustomerTypeDiaLogProps } from "./interface";

/**
 * 用户类型类别对话框师徒的Action类
 */
export class CustomerTypeDialogUiAction{
    /**
     * 当前组件的api接口
     */
    private props:ICustomerTypeDiaLogProps;

    private sonFormUiAction:CustomerTypeFormUiAction;

    constructor(props:ICustomerTypeDiaLogProps){
        this.props=props;
        this.handleOk=this.handleOk.bind(this);
        this.getSonUiAction=this.getSonUiAction.bind(this);
    }

    /**
     * 
     * @param {CustomerTypeFormUiAction}  souUiAction 子表单组件
     */
    public getSonUiAction(souUiAction:CustomerTypeFormUiAction){
        console.log("CustomerTypeDialog.getSonUiAction")
        this.sonFormUiAction=souUiAction;
    }

    public handleOk(){

        const result=this.sonFormUiAction.validate();
        if(!result.isValidated){return;}

        this.props.handleOk(result.formData);
    }
    

}