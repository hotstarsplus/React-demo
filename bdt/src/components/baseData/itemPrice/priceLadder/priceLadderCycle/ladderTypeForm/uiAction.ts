import { message } from 'antd';
import { action } from "mobx";
import { LadderCycleEntity } from "../../entity";
import { ILadderTypeFormProps } from "./interface";

export class  LadderTypeFormUiAction{
    /**
     * form验证后的数据
     */
    private formData:LadderCycleEntity;
    /**
     * 验证是否通过
     */
    private isValidated:boolean;

    /**
     * props
     */
    private props:ILadderTypeFormProps;

    constructor(props:ILadderTypeFormProps){
        this.props = props;
        this.validate = this.validate.bind(this);
        this.validateClient=this.validateClient.bind(this);
        this.validateServer = this.validateServer.bind(this);

    }
    
    /**
     * 数据验证
     */
    @action
    public validate(): {
        /**
         * 是否验证成功
         */
        isValidated: boolean,

        /**
         * 表单数据
         */
        formData: LadderCycleEntity,

    } {
        this.props.form.validateFieldsAndScroll(this.validateClient);
        if (!this.isValidated) {
            return {
                formData: this.formData,
                isValidated: this.isValidated
            }
        }

        this.validateServer(this.formData);

        return {
            formData: this.formData,
            isValidated: this.isValidated
        }
    }


    /**
     * 对表单字段进行基本规则验证的回调函数（客户端基本验证）
     * @param errors 错误信息
     * @param values 表单值
     */
    @action
    public validateClient(errors: any, values: any) {
        this.formData = values;
        if (errors) {
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
    @action
    public validateServer(values: any) {
        this.isValidated = true;
    }

}