import { message } from "antd"
// import { action } from "mobx";
import { MenuAlertMessageSearchDto } from "../entity";
import { IReminderParameterFormProps } from "./interface";

/**
 * 表单视图Action类
 */
export class ReminderParameterFormUiAction {
    /**
     * 表单数据
     */
    private formData: MenuAlertMessageSearchDto;

    /**
     * 当前表单的api接口
     */
    private props: IReminderParameterFormProps;

    /**
     * 表单验证是否通过
     */
    private isValidated: boolean = false;
    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IReminderParameterFormProps) {
        this.props = props;
        // 表单验证
        this.validate = this.validate.bind(this);
        this.validateClient = this.validateClient.bind(this);
        this.validateServer = this.validateServer.bind(this);
    }
    
   
    /**
     * 表单验证
     */
    public validate(): {
        /**
         * 是否验证成功
         */
        isValidated: boolean,
        /**
         * 表单数据
         */
        formDate: any
    } {
        this.props.form.validateFieldsAndScroll(this.validateClient);
        if (!this.isValidated) {
            return {
                formDate: this.formData,
                isValidated: this.isValidated
            }
        }
        this.validateServer(this.formData);
        return {
            formDate: this.formData,
            isValidated: this.isValidated
        }
    }
    /**
     * 对表单字段进行基本规则验证的回调函数（客户端基本验证）
     * @param error  错误信息
     * @param values 表单值
     */
    private validateClient(error: any, values: any) {
        this.formData = values;
        if (error) {
            message.error("表单填写错误")
            this.isValidated = false;
            return;
        }
        this.isValidated = true;
    }
    private validateServer(values: any) {
        const { reminderParameterStore } = this.props;
        if (!reminderParameterStore) {
            this.isValidated = true;
            return;
        }
        const otherError = reminderParameterStore.validate(values);
        if (otherError) {
            message.error(otherError);
            this.isValidated = false;
            return;
        }
        this.isValidated = true;
    }

}


/**
 * 修改提醒信息位置、时间
 */
message.config({
    top: 90,
    duration: 3
});