import { message } from "antd";
import { action } from "mobx";
import { MeterType } from "../entity";
import { IMeterTypeFormProps } from "./interface";




/**
 * 水表类型表单action
 */
export class MeterTypeFormUiAction {

    /**
     * 表单数据
     */
    private formData: MeterType;

    /**
     *  当前表单的api接口
     */
    private props: IMeterTypeFormProps;

    /**
     * 表单验证是否通过
     */
    private isValidated: boolean;

    /**
     * 构造
     * @param props 
     */
    constructor(props: IMeterTypeFormProps) {
        this.props = props;
        this.validate = this.validate.bind(this);
        this.validateClient = this.validateClient.bind(this);
        this.validateServer = this.validateServer.bind(this);
        this.onChange = this.onChange.bind(this);

    }


    /**
     * 选择时改变排序号的值
     * @param fatherId 选中的父级id
     */
    public async onChange(value: any, label: any) {
        console.log("value:" + value);
        // const maxSortNo = await this.props.GlobalMeterTypeStore!.getMaxSortNo(value);
        this.props.getMaxSortNo(this.props.GlobalMeterTypeStore.CompanyName, value).then((num) => {
            const maxSortNo = num
            console.log(maxSortNo);
            this.props.form.setFieldsValue!({
                SortNo: maxSortNo
            });
        });
    }

    /**
     * 验证方法
     */
    public validate(): {
        formdata: any,
        isValidate: boolean
    } {

        this.props.form.validateFieldsAndScroll(this.validateClient);
        if (!this.isValidated) {
            return {
                formdata: this.formData,
                isValidate: this.isValidated
            }
        }
        this.validateServer(this.formData);
        return {
            formdata: this.formData,
            isValidate: this.isValidated
        }
    }

    /**
     * 验证
     * @param model 水表类型实体类
     */
    @action.bound
    public Validate(model: MeterType): string | undefined {
        return undefined;
    }


    /**
     * 对表单字段进行基本规则验证的回调函数（客户端基本验证）
     * @param {any} errors 错误信息
     * @param {any} values 表单值
     */
    private validateClient(errors: any, values: any) {

        this.formData = values;

        console.log(values);
        console.log(errors);
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
    private validateServer(values: any) {

        if (!this.props.GlobalMeterTypeStore) {
            this.isValidated = true;
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

}