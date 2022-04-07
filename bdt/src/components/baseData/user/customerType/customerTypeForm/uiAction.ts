import { message} from 'antd';
import {CustomerTypeModel} from '../entity'
import {ICustomerTypeFormProps} from './interface';

/**
 * 表单视图的Action类
 */
export class CustomerTypeFormUiAction{
    /**
     * 表单数据
     */
    public formData:CustomerTypeModel;

    /**
     * 当前表单的api接口
     */
    private props:ICustomerTypeFormProps;

    /**
     * 表单验证是否通过
     */
    private isValidated:boolean=false;

    /**
     * 构造表单action实例
     */
    constructor(props:ICustomerTypeFormProps){
        this.props=props;
        this.validateClient=this.validateClient.bind(this);
        this.validateServer=this.validateServer.bind(this);
        this.validate=this.validate.bind(this);
        
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
        formData:any
    }{
        this.props.form.validateFieldsAndScroll(this.validateClient);
        if(!this.isValidated){
            return{
                formData:this.formData,
                isValidated:this.isValidated,
            }
        }
        this.validateServer(this.formData);
        return{
            formData:this.formData,
            isValidated:this.isValidated,
        }
    

    }

    private validateClient(errors:any ,values:any){
        this.formData=values;
        if(errors){
            message.error('表单填写错误');
            this.isValidated=false;
            return;
        };
        this.isValidated=true;
    }

        private validateServer(values: any) {
            const {store}=this.props;
            if(!store){
                this.isValidated=true;
                return;
            }

            const otherError=store.valiDate(values);
            if(otherError){
                message.error(otherError);
                this.isValidated=false;
                return;
            }
            this.isValidated=true;
        }
}

