import { message } from 'antd';
import { MeterCaliberFormUiAction } from '../meterCaliberForm/uiAction'
import { IMeterCaliberDialogProps } from './interface';

/**
 * 水表状态类别对话框视图的Action 类
 */
export class MeterCaliberDialogUiAction {
    /**
     * 当前组件的api接口
     */
    private props: IMeterCaliberDialogProps;
    /**
     * 内部表单组件的action
     */
    private sonFormUiAction: MeterCaliberFormUiAction;
    constructor(props: IMeterCaliberDialogProps) {
        this.props = props;
        this.handleOk = this.handleOk.bind(this);
        this.getSonUiAction = this.getSonUiAction.bind(this);
    }
    /**
     * 获得对应的子表单组件的实例
     * @param {WaterRateItemTypeItemFormUiAction} sonUiAction 子表单组件
     */
    public getSonUiAction(sonUiAction: MeterCaliberFormUiAction) {
        this.sonFormUiAction = sonUiAction;
    }
    /**
     * 点击确定按钮的回调方法
     */
    public handleOk() {
        const result = this.sonFormUiAction.validate();
        if (!result.isValidated) { return; }
        if(result.formData.ProofCircleMonth===0){
            message.info("表鉴定周期需大于0");
            return;
        }
        this.props.handleOk(result.formData);
    }
}