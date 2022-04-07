import { NeighborhoodFormUiAction } from "../neighborhoodForm/uiAction";
import { INeighborhoodDialogProps } from "./interface";



export class NeighborhoodDialogUiAction{

    private props:INeighborhoodDialogProps;

    /**
     * 子组件的action
     */
    private sonFormUiAction:NeighborhoodFormUiAction;


    constructor(props:INeighborhoodDialogProps){

        this.props = props;

        this.GetSonUiAction = this.GetSonUiAction.bind(this);

        this.HandleOk = this.HandleOk.bind(this);

    }

    /**
     * 获得对应的子表单组件的实例
     * @param action 子表单组件
     */
    public GetSonUiAction(action:NeighborhoodFormUiAction){
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