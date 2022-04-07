import { DeviceTypeFormUiAction } from "../DeviceTypeForm/uiAction";
import { IDeviceTypeDialogProps } from "./interface";


export class DeviceTypeDialogUiAction {

    private props: IDeviceTypeDialogProps;

    /**
     * 子组件的action
     */
    private sonFormUiAction: DeviceTypeFormUiAction;


    constructor(props: IDeviceTypeDialogProps) {

        this.props = props;

        this.GetSonUiAction = this.GetSonUiAction.bind(this);

        this.HandleOk = this.HandleOk.bind(this);

        this.HandleCancel = this.HandleCancel.bind(this);
    }

    /**
     * 获得对应的子表单组件的实例
     * @param action 子表单组件
     */
    public GetSonUiAction(action: DeviceTypeFormUiAction) {
        this.sonFormUiAction = action;
    }


    /**
     *  确定
     */
    public HandleOk() {

        const result = this.sonFormUiAction.validate();

        if (!result.isValidated) { return; };


        for (let index = 0; index < this.props.GlobalDeviceTypeStore!.tmpAttr.length; index++) {
            try {
                const element = result.formData.names[index];
                if(element!==null&&element!==undefined){
                    this.props.GlobalDeviceTypeStore!.tmpAttr[index].DetailFieldCnName = element;
                }
                
            } catch (error) {
                console.log("error");
            }
        }

        // this.props.GlobalDeviceTypeStore!.currentEditItem.DeviceTypeName = result.formData.DeviceTypeName;
        // this.props.GlobalDeviceTypeStore!.currentEditItem.Description = result.formData.Description;
        // this.props.GlobalDeviceTypeStore!.currentEditItem.Attributes=this.props.GlobalDeviceTypeStore!.tmpAttr;

        // console.log('result.formData >>> ', JSON.stringify(this.props.GlobalDeviceTypeStore!.currentEditItem.Attributes));

        this.props.handleOk(result.formData);


    }

    /**
     * 取消
     */
    public HandleCancel(){
        this.props.handleCancel();
    }

}