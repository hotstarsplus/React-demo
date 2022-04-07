import { message } from 'antd';
import { ProductItem } from '../entity';
import { IProductItemFormProps } from './interface';
/**
 * 表单视图的Action 类
 */
export class ProductItemFormUiAction {

    /**
     * 表单数据
     */
    public formData: ProductItem;

    /**
     * 当前表单的api接口
     */
    private props: IProductItemFormProps;

    /**
     * 表单验证是否通过
     */
    private isValidated: boolean = false;

    /**
     * 构造表单action实例
     * 
     * @param {IProductItemFormProps} props 表单的props
     */
    constructor(props: IProductItemFormProps) {
        this.props = props;

        this.validate = this.validate.bind(this);
        this.validateClient = this.validateClient.bind(this);
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

}