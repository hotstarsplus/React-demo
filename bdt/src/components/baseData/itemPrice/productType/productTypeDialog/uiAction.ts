import { action } from "mobx";
import { ProductTypeFormUiAction } from "../productTypeForm/uiAction";
import { IProductTypeDialogProps } from "./interface";



export class ProductTypeDialogUiAction{

    private props:IProductTypeDialogProps;

    /**
     * 内部表单组件的action
     */
    private sonFormUiAction:ProductTypeFormUiAction;


    constructor(props:IProductTypeDialogProps){
        this.props = props;
        this.handleOk = this.handleOk.bind(this);
        this.getSonFormUiAction = this.getSonFormUiAction.bind(this);
    }

    /**
     * 获得对应的子表单组件的实例
     * @param sonUiAction 子表单组件
     */
    @action("获取子组件action的实例")
    public getSonFormUiAction(sonUiAction:ProductTypeFormUiAction){
        this.sonFormUiAction = sonUiAction;
    }

    /**
     * 点击确定按钮的回调方法
     */
    @action("确定")
    public handleOk()
    {
        const result =  this.sonFormUiAction.Validate();
        if(!result.isValidated){
            return;
        }
        this.props.handleOk(result.formData);
    }



}