import { IBusinessOfficeDialogProps } from "../businessOfficeDialog/interface";
import { BusinessOfficeFormUiAction } from "../businessOfficeForm/uiAction";

export class BusinessOfficeDialogUiAction{

    private props:IBusinessOfficeDialogProps;

    /**
     * 子组件的action
     */
    private sonFormUiAction:BusinessOfficeFormUiAction;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props:IBusinessOfficeDialogProps){

        this.props = props;

        this.GetSonUiAction = this.GetSonUiAction.bind(this);

        this.HandleOk = this.HandleOk.bind(this);

    }

    /**
     * 获得对应的子表单组件的实例
     * @param action 子表单组件
     */
    public GetSonUiAction(action:BusinessOfficeFormUiAction){
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