import { ManufacturerFormUiAction } from "../manufacturerForm/uiAction";
import { IManufacturerDialogProps } from "./interface";

/**
 * 生产厂商类别对话框视图的Action 类
 */
export class ManufacturerDialogUiAction{

    /**
     * 当前组件的api接口
     */
    private props:IManufacturerDialogProps;
    
    /**
     *  内部表单组件的action
     */
    private sonUiAction:ManufacturerFormUiAction;
    

    /**
     * 构造方法
     * @param props 
     */
    constructor(props : IManufacturerDialogProps){

        this.props = props;

        this.getSonUiAction= this.getSonUiAction.bind(this);

        this.handleOk = this.handleOk.bind(this);

    }

    /**
     * 获取子组件action
     * @param sonUiAction 
     */
    public getSonUiAction(sonUiAction:ManufacturerFormUiAction){

        this.sonUiAction = sonUiAction;
        
    }

    /**
     *  确定方法 
     */
    public handleOk(){

        const result = this.sonUiAction.validate();

        if (!result.isValidated) {return;};

        this.props.handleOk(result.formData);
            

    }


}