import { WaterKindFormUiAction } from "../waterKindForm/uiAction";
import { IWaterKindDialogProps } from "./interface";



export class WaterKindDialogUiAction{

    private props:IWaterKindDialogProps;

    /**
     * 子组件的action
     */
    private sonFormUiAction:WaterKindFormUiAction;


    constructor(props:IWaterKindDialogProps){

        this.props = props;

        this.GetSonUiAction = this.GetSonUiAction.bind(this);

        this.HandleOk = this.HandleOk.bind(this);

    }

    /**
     * 获得对应的子表单组件的实例
     * @param action 子表单组件
     */
    public GetSonUiAction(action:WaterKindFormUiAction){
        this.sonFormUiAction = action;
    }


    /**
     *  确定
     */
    public HandleOk(){

        const result = this.sonFormUiAction.validate();

        if (!result.isValidate) {return; };

        this.props.handleOk(result.formdata);

    }

}