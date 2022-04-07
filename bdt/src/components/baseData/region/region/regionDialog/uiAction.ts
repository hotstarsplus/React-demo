import { RegionFormUiAction } from "../regionForm/uiAction";
import { IRegionDialogProps } from "./interface";



export class RegionDialogUiAction{

    private props:IRegionDialogProps;

    /**
     * 子组件的action
     */
    private sonFormUiAction:RegionFormUiAction;

    /**
     * 构造方面
     */
    constructor(props:IRegionDialogProps){

        this.props = props;

        this.GetSonUiAction = this.GetSonUiAction.bind(this);

        this.HandleOk = this.HandleOk.bind(this);

    }

    /**
     * 获得对应的子表单组件的实例
     * @param action 子表单组件
     */
    public GetSonUiAction(action:RegionFormUiAction){
        this.sonFormUiAction = action;
    }


    /**
     *  确定
     */
    public HandleOk(){

        const result = this.sonFormUiAction.validate();

        if (!result.isValidate) {return; };
        console.log("rrr-result",result);
        
        this.props.handleOk(result.formdata);

    }

}