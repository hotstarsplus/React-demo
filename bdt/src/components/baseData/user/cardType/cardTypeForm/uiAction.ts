import { message } from "antd";
import { action } from "mobx";
import { CardType } from "../entity";
import { ICardTypeFormProps } from "./interface";




/**
 * 用水性质表单action
 */
export class CardTypeFormUiAction {

    /**
     * 表单数据
     */
    private formData: CardType;


    /**
     *  当前表单的api接口
     */
    private props: ICardTypeFormProps;


    /**
     * 表单验证是否通过
     */
    private isValidated: boolean;


    /**
     * 构造
     * @param props 
     */
    constructor(props: ICardTypeFormProps) {

        this.props = props;

    }

    @action.bound
    public async OnChange(value: any, label: any) {
        this.props.getMaxSortNo(value).then((sortNo) => {
            this.props.form.setFieldsValue({
                SortNo: sortNo
            });
        })

    }


    /**
     * 验证方法
     */
    @action.bound
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
     * 对表单字段进行基本规则验证的回调函数（客户端基本验证）
     * @param {any} errors 错误信息
     * @param {any} values 表单值
     */
    @action.bound
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
    @action.bound
    private validateServer(values: any) {

        if (!this.props.GlobalCardTypeStore) {

            this.isValidated = true;

            return;
        }


        const otherError = this.ValiDate(values);

        if (otherError) {
            message.error(otherError);
            this.isValidated = false;
            return;
        }
        this.isValidated = true;


    }

    @action.bound
    private ValiDate(model: CardType): string | undefined {
        return undefined;
    }


}