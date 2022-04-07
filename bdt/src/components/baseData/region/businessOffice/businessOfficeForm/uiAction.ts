import { message } from "antd"
import { action } from "mobx";
import { IBusinessOfficeFormProps } from "../businessOfficeForm/interface";
import { BusinessOffice } from "../entity";





export class BusinessOfficeFormUiAction{

    /**
     *  当前表单的api接口
     */
    private props:IBusinessOfficeFormProps;

    /**
     * 表单数据
     */
    private formData:BusinessOffice;

    /**
     * 是否验证通过
     */
    private isValidated:boolean;

    /**
     * 构造函数
     * @param props 
     */
    constructor(props:IBusinessOfficeFormProps){
        this.props =props;
        this.validate = this.validate.bind(this);

        this.validateClient = this.validateClient.bind(this);

        this.validateServer = this.validateServer.bind(this);

        this.onChange = this.onChange.bind(this);
    }


    public async onChange(value: any, label: any){ 
        console.log("内容发生改变！")
        this.props.getMaxSortNo(value).then((sortNo)=>{
            this.props.form.setFieldsValue!({
                SortNo:sortNo
            });
        })
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

        if (!this.props.GlobalBusinessOfficeStore) {
            
            this.isValidated=true;
            
            return;
        }

        const otherError = this.Validate(values);

        if (otherError) {
            message.error(otherError);
            this.isValidated = false;
            return;
        }
        this.isValidated = true;
    }

    /**
     * 验证
     * @param model 营业网点实体类
     */
     @action.bound
     private Validate(model: BusinessOffice): string | undefined {
         return undefined;
     }

}