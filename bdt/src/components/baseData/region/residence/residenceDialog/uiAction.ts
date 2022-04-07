import { ResidenceFormUiAction } from "../residenceForm/uiAction";
import { IResidenceDialogProps } from "./interface";



export class ResidenceDialogUiAction{

    private props:IResidenceDialogProps;

    /**
     * 子组件的action
     */
    private sonFormUiAction:ResidenceFormUiAction;


    constructor(props:IResidenceDialogProps){

        this.props = props;

        this.GetSonUiAction = this.GetSonUiAction.bind(this);

        this.HandleOk = this.HandleOk.bind(this);

    }

    /**
     * 获得对应的子表单组件的实例
     * @param action 子表单组件
     */
    public GetSonUiAction(action:ResidenceFormUiAction){
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