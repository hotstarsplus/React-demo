import { BusinessTypeFormUiAction } from '../businessTypeForm/uiAction';
import { IBusinessTypeDialogProps } from './interface';


export class BusinessTypeDialogUiAction {

    /**
     * 当前组件的api接口
     */
    private props: IBusinessTypeDialogProps;

    /**
     * 内部表单组件的action
     */
    private sonFormUiAction : BusinessTypeFormUiAction;


    constructor(props: IBusinessTypeDialogProps) {
        this.props = props;
        this.HandleOk = this.HandleOk.bind(this);
        this.getSonUiAction = this.getSonUiAction.bind(this);
    }

    /**
     * 获得对应的子表单组件的实例
     * @param { BusinessTypeFormUiAction } sonUiAction 子表单组件
     */
    public getSonUiAction(sonUiAction: BusinessTypeFormUiAction) {
        this.sonFormUiAction = sonUiAction;
    }

    /**
     * 点击确定按钮的回调方法
     */
    public HandleOk() {
        const result = this.sonFormUiAction.validate();
        if (!result.isValidated) { return; }
        this.props.handleOk(result.formData);
    }
    
}