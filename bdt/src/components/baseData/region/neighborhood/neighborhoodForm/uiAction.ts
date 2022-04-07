import { message } from "antd"
import { Neighborhood } from "../entity";
import { INeighborhoodFormProps } from "./interface";





export class NeighborhoodFormUiAction{

    /**
     *  当前表单的api接口
     */
    private props:INeighborhoodFormProps;

    /**
     * 表单数据
     */
    private formData:Neighborhood;

    /**
     * 是否验证通过
     */
    private isValidated:boolean;

    /**
     * 构造函数
     * @param props 
     */
    constructor(props:INeighborhoodFormProps){
        this.props =props;
        this.validate = this.validate.bind(this);

        this.validateClient = this.validateClient.bind(this);

        this.validateServer = this.validateServer.bind(this);
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

        this.validateServer(this.formData);


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
            message.error('表单填写错误');
            this.isValidated = false;
            return;
        };
        this.isValidated = true;

    }



    /**
     * 对表单字段进行服务端验证
     * @param vales 表单值
     */
    private validateServer(values:any){

        if (!this.props.GlobalNeighborhoodStore) {
            
            this.isValidated=true;
            
            return;
        }


        const otherError = this.props.GlobalNeighborhoodStore.Validate(values);

        if (otherError) {
            message.error(otherError);
            this.isValidated = false;
            return;
        }
        this.isValidated = true;


    }


}