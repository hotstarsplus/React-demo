import { PayTypeFormUiAction } from "../payTypeform/uiAction";
import { IPayTypeDialogProps } from "./interface";

/**
 * 支付方式类别对话框视图的Action 类
 */
export class PayTypeDialogUiAction {

    /**
     * 当前组件的api接口
     */
    private props: IPayTypeDialogProps;

    /**
     *  内部表单组件的action
     */
    private sonUiAction: PayTypeFormUiAction;


    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IPayTypeDialogProps) {

        this.props = props;

        this.getSonUiAction = this.getSonUiAction.bind(this);

        this.handleOk = this.handleOk.bind(this);

    }

    /**
     * 获取子组件action
     * @param sonUiAction 
     */
    public getSonUiAction(sonUiAction: PayTypeFormUiAction) {

        this.sonUiAction = sonUiAction;

    }

    /**
     *  确定方法 
     */
    public handleOk() {

        const result = this.sonUiAction.validate();

        if (!result.isValidated) { return; };

        this.props.handleOk(result.formData);


    }


}