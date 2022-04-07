import { message } from "antd";
import { PriceSuperPlan } from "../entity";
import { IPriceSuperPlanFormProps } from "./interface";

export class PriceSuperPlanFormUiAction{

    /**
     * 表单数据
     */
    public formData:PriceSuperPlan;

    /**
     * 当前表单的api接口
     */
    private props:IPriceSuperPlanFormProps;

    /**
     * 表单验证是否通过
     */
    private isValidated:boolean = false;

    constructor(props:IPriceSuperPlanFormProps){
        this.props = props;
        this.validate = this.validate.bind(this);
        this.validateClient = this.validateClient.bind(this);
        this.validateServer = this.validateServer.bind(this);
    }

    /**
     * 进行表单验证
     */
    public validate():{
        /**
         * 是否验证成功
         */
        isValidated:boolean,

        /**
         * 表单数据
         */
        formData:any,

    }
    {
        this.props.form.validateFieldsAndScroll(this.validateClient);
        if(!this.isValidated){
            return{
                formData:this.formData,
                isValidated : this.isValidated
            }
        }

        this.validateServer(this.formData);

        return{
            formData:this.formData,
            isValidated:this.isValidated
        }
    }
    

    /**
     * 对表单字段进行基本规则验证的回调函数（客户端基本验证）
     * @param errors 错误信息
     * @param values 表单值
     */
    public validateClient(errors:any,values:any){
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
     * @param values 表单值
     */
    public validateServer(values:any){
        const {store} = this.props;
        if(!store){
            this.isValidated = true;
            return;
        }
        const otherError = store.validate(values);
        if(otherError){
            message.error(otherError);
            this.isValidated = false;
            return;
        }
        this.isValidated = true;
    }
}