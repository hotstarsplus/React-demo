// import { DeviceTypeCommonParaFormAction } from "../DeviceTypeCommonParaForm/uiAction";
import { IDeviceTypeCommonFieldDialogProps } from "./interface";

export class DeviceTypeCommonFieldDialogUiAction{
    private props:IDeviceTypeCommonFieldDialogProps;

    // private sonFormUiAction:DeviceTypeCommonParaFormAction;


    constructor(props:IDeviceTypeCommonFieldDialogProps){
        this.props = props;
        // this.GetSonUiAction = this.GetSonUiAction.bind(this);
        this.HandleOk = this.HandleOk.bind(this);
        this.HandleCancel = this.HandleCancel.bind(this);
        
    }

    /**
     * 获得对应的子表单组件的实例
     * @param action 子表单组件
     */
    // public GetSonUiAction(action: DeviceTypeCommonParaFormAction) {
    //     // this.sonFormUiAction = action;
    // }

    /**
     * 取消
     */
    public HandleOk(){
        this.props.handleOk();
    }    

    /**
     * 取消
     */
    public HandleCancel(){
        this.props.handleCancel();
    }
}