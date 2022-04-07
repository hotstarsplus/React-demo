import { MeterStateFormUiAction } from "../meterStateForm/uiAction";
import { IMeterStateDialogProps } from "./interface";

/**
 * 水表状态新增、编辑弹出层视图的Action 类
 */
export class MeterStateDialogUiAction{

    /**
     * 当前组件的api接口
     */
    private props:IMeterStateDialogProps;
    
    /**
     *  内部表单组件的action
     */
    private sonUiAction:MeterStateFormUiAction;
    

    /**
     * 构造方法
     * @param props 
     */
    constructor(props : IMeterStateDialogProps){

        this.props = props;

        this.getSonUiAction= this.getSonUiAction.bind(this);

        this.handleOk = this.handleOk.bind(this);

    }

    /**
     * 获取子组件action
     * @param sonUiAction 
     */
    public getSonUiAction(sonUiAction:MeterStateFormUiAction){

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