import { message } from 'antd';
import { MeterCaliber } from '../entity';
import { IMeterCaliberFormProps } from './interface';

/**
 * 表单视图的Action 类
 */
export class MeterCaliberFormUiAction {
    /**
     * 表单数据
     */
    public formData: MeterCaliber;
    /**
     * 当前表单的api接口
     */
    private props: IMeterCaliberFormProps;
    /**
     * 表单验证是否通过
     */
    private isValidated: boolean = false;
    /**
     * 构造表单action实例
     * 
     * @param {IWaterRateItemItemFormProps} props 表单的props
     */
    constructor(props: IMeterCaliberFormProps) {
        this.props = props;
        this.validate = this.validate.bind(this);
        this.validateClient = this.validateClient.bind(this);
        this.validateServer = this.validateServer.bind(this);
    }
    /**
     * 进行表单验证
     */
    public validate(): {
        /** 
         * 是否验证成功
         */
        isValidated: boolean,
        /** 
         * 表单数据
         */
        formData: any
    } {
        this.props.form.validateFieldsAndScroll(this.validateClient);
        if (!this.isValidated) {
            return {
                formData: this.formData,
                isValidated: this.isValidated,
            }
        }
        this.validateServer(this.formData);
        return {
            formData: this.formData,
            isValidated: this.isValidated,
        }
    }
    /**
     * 对表单字段进行基本规则验证的回调函数（客户端基本验证）
     * @param {any} errors 错误信息
     * @param {any} values 表单值
     */
    private validateClient(errors: any, values: any) {
        this.formData = values;
        if (errors) {
            message.error('表单填写错误');
            this.isValidated = false;
            return;
        };
        this.isValidated = true;
    }
    /**
     * 对表单字段进行服务端验证
     * @param {any} values  表单值
     */
    private validateServer(values: any) {
        const { store } = this.props;
        if (!store) {
            this.isValidated = true;
            return;
        }
        const otherError = store.validate(values);
        if (otherError) {
            message.error(otherError);
            this.isValidated = false;
            return;
        }
        this.isValidated = true;
    }
}