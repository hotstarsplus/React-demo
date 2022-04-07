import { WaterStationFormUiAction } from "../waterStationForm/uiAction";
import { IWaterStationDialogProps } from "./interface";


/**
 * 表格视图的Action
 */
export class WaterStationDialogUiAction{

    private props:IWaterStationDialogProps;

    /**
     * 子组件的action
     */
    private sonFormUiAction:WaterStationFormUiAction;


    constructor(props:IWaterStationDialogProps){

        this.props = props;

        this.GetSonUiAction = this.GetSonUiAction.bind(this);

        this.HandleOk = this.HandleOk.bind(this);

    }

    /**
     * 获得对应的子表单组件的实例
     * @param action 子表单组件
     */
    public GetSonUiAction(action:WaterStationFormUiAction){
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