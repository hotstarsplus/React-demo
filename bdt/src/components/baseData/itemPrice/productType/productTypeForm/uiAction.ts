import { message } from "antd";
import { ProductType } from "../entity";
import { IProductTypeFormProps } from "./interface";


/**
 * 表单行为类
 */
export class ProductTypeFormUiAction{

    /**
     * 表单数据
     */
    private formData:ProductType; 
    
    /**
     * 表单验证是否通过
     */
    private isValidated:boolean;

    /**
     * 当前表单的api接口
     */
    private props:IProductTypeFormProps;
 

    /**
     * 构造方法
     * @param props 
     */
    constructor(props:IProductTypeFormProps){
        this.props = props;
        this.validateClient = this.validateClient.bind(this);
        this.validateServer = this.validateServer.bind(this);
        this.Validate = this.Validate.bind(this);
    }

    /**
     * 进行表单验证
     */
    public Validate():{isValidated:boolean,formData:any}{
        this.props.form.validateFieldsAndScroll(this.validateClient);
        if (!this.isValidated) {
            return{
                formData:this.formData,
                isValidated : this.isValidated
            }
        }
        this.validateServer(this.formData);

        return{
                formData:this.formData,
                isValidated : this.isValidated
            }
    }

    /**
     * 
     * @param errors 错误信息
     * @param values 表单值
     */
    private validateClient(errors:any,values:any){
        this.formData = values;
        if(errors){
            message.error("表单信息填写错误");
            this.isValidated = false;
            return;
        }
        this.isValidated = true;
    }

    /**
     * 对表单字段值进行服务器验证
     * @param formdata 表单值
     */
    private validateServer(formdata:ProductType){
        console.log("validateServer",formdata);
        this.isValidated = true;
    }


}