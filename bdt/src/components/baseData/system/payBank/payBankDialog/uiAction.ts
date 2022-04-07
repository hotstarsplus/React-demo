import { PayBankFormUiAction } from "../payBankForm/uiAction";
import { IPayBankDialogProps } from "./interface";



export class PayBankDialogUiAction{

    private props:IPayBankDialogProps;

    /**
     * 子组件的action
     */
    private sonFormUiAction:PayBankFormUiAction;


    constructor(props:IPayBankDialogProps){

        this.props = props;

        this.GetSonUiAction = this.GetSonUiAction.bind(this);

        this.HandleOk = this.HandleOk.bind(this);

    }

    /**
     * 获得对应的子表单组件的实例
     * @param action 子表单组件
     */
    public GetSonUiAction(action:PayBankFormUiAction){
        this.sonFormUiAction = action;
    }


    /**
     *  确定
     */
    public HandleOk(){

        const result = this.sonFormUiAction.validate();

        if (!result.isValidate) {return; };
        console.log("f-result",result)
        this.props.handleOk(result.formdata);

    }

}