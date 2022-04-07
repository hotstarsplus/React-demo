import { action } from "mobx";
import { WaterProductionFormUiAction } from "../productionForm/uiAction";
import { IWaterProductionDialogProps } from "./interface";


export class ProductionDialogUiAction{


    private props:IWaterProductionDialogProps;

    /**
     * 内部表单组件的action
     */
    private sonUiAction:WaterProductionFormUiAction;

    constructor(props:IWaterProductionDialogProps){

        this.props =props
        this.handleOk = this.handleOk.bind(this);
        this.GetSonUiAction = this.GetSonUiAction.bind(this);
    }

    /**
     * 获得对应的子表单组件的实例
     * @param sonAction 
     */
    @action
    public GetSonUiAction(sonAction:WaterProductionFormUiAction){

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