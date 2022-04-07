import { message } from "antd";
import { IThirdPartyInvoiceParamEditFormProps } from "./interface";






export class ThirdPartyInvoiceParamEditFormUiAction{

    /**
     * 表单数据
     */
    private formData:any;


    private props:IThirdPartyInvoiceParamEditFormProps;
    
    /**
     * 表单验证是否通过
     */
    private isValidated:boolean;

    constructor(props:IThirdPartyInvoiceParamEditFormProps){
        this.props = props;

        this.validate = this.validate.bind(this);

        this.validateClient = this.validateClient.bind(this);
    }
    

    /**
     * 验证方法
     */
    public validate():{
        formdata:any,
        isValidate:boolean
    }{

        this.props.form.validateFieldsAndScroll(this.validateClient);

        if (!this.isValidated) {
            return {
                formdata : this.formData,
                isValidate : this.isValidated
            }
        }

        return{
            formdata:this.formData,
            isValidate:this.isValidated
        }

    }


    /**
     * 对表单字段进行基本规则验证的回调函数（客户端基本验证）
     * @param {any} errors 错误信息
     * @param {any} values 表单值
     */
    private validateClient(errors:any,values:any){

        this.formData = values;

        if (errors) {
            console.log(errors,this.formData);
            message.error('表单填写错误');
            this.isValidated = false;
            return;
        };
        this.isValidated = true;

    }







}