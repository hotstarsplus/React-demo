import { action } from "mobx";
import { WaterProductFormUiAction } from "../form/uiAction";
import { IWaterProductDialogProps } from "./interface";


export class ProductDialogUiAction{


    private props:IWaterProductDialogProps;

    /**
     * 内部表单组件的action
     */
    private sonUiAction:WaterProductFormUiAction;

    constructor(props:IWaterProductDialogProps){

        this.props =props
        this.handleOk = this.handleOk.bind(this);
        this.GetSonUiAction = this.GetSonUiAction.bind(this);
    }

    /**
     * 获得对应的子表单组件的实例
     * @param sonAction 
     */
    @action
    public GetSonUiAction(sonAction:WaterProductFormUiAction){

        this.sonUiAction = sonAction;

    }

    /**
     * 确定
     */
    @action
    public handleOk(){

        const result = this.sonUiAction.validate();

        if (!result.isValidated) {return ;};

        this.props.handleOk(result.formData);

    }



}