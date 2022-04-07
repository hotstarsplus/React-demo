import { message } from "antd";
import { ICompanyFormProps } from "./interface";




export class CompanyFormUiAction {


    private props:ICompanyFormProps;

    /**
     * 表单数据
     */
    private formData: any;

    /**
     * 表单验证是否通过
     */
    private isValidated: boolean = false;

    constructor(props:ICompanyFormProps){
        this.props = props;

        this.validate = this.validate.bind(this);
        this.validateClient = this.validateClient.bind(this);
    }


    /**
     * 进行表单验证
     */
    public validate(): {formData: any,isValidated: boolean} {
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