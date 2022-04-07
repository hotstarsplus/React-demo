import { CopeMenuFromUiAction } from "../copeMenuForm/uiAction";
import { IUserDialogProps } from "./interface"

export class CopeMenuDialogUiAction{

    private props:IUserDialogProps;

    private sonFormUiAction : CopeMenuFromUiAction;

    constructor(props:IUserDialogProps){
        this.props = props;

        this.Handleck = this.Handleck.bind(this);

        this.GetSonUiaction = this.GetSonUiaction.bind(this);
    }

    public GetSonUiaction(action:CopeMenuFromUiAction){
        /**
         * 获得了子组件的Action
         */
        this.sonFormUiAction = action; 
    }

    public Handleck(){
        const result = this.sonFormUiAction.validate();

        if (!result.isValidate) {return; };
        console.log("f-result",result)
        this.props.handleOk!(result.formdata);
    }
}