import { SpecialProcessTypeFormUiAction } from "../specialProgressTypeForm/uiAction";
import { ISpecialProcessTypeDialogProps } from "./interface";

/**
 * 水表特殊型号新增、编辑弹出层的Action 类
 */
export class SpecialProcessTypeDialogUiAction{

    /**
     * 当前组件的api接口
     */
    private props:ISpecialProcessTypeDialogProps;
    
    /**
     *  内部表单组件的action
     */
    private sonUiAction:SpecialProcessTypeFormUiAction;
    

    /**
     * 构造方法
     * @param props 
     */
    constructor(props : ISpecialProcessTypeDialogProps){

        this.props = props;

        this.getSonUiAction= this.getSonUiAction.bind(this);

        this.handleOk = this.handleOk.bind(this);

    }

    /**
     * 获取子组件action
     * @param sonUiAction 
     */
    public getSonUiAction(sonUiAction:SpecialProcessTypeFormUiAction){

        this.sonUiAction = sonUiAction;
        
    }

    /**
     *  确定方法 
     */
    public handleOk(){
        
        try{
            const result = this.sonUiAction.validate();
            if (!result.isValidated) {return;};
            this.props.handleOk(result.formData);
        }catch(errro){
            console.info(errro);
        }
        
    }


}