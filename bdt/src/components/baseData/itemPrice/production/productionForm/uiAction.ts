import { message } from "antd";
import { SelectValue } from "antd/lib/select";
import { action } from "mobx";
import { WaterProduction } from "../entity";
import { IWaterProductionFormProps } from "./interface";





export class WaterProductionFormUiAction{


    private props:IWaterProductionFormProps;

    private formData:WaterProduction;

    private isValidated:boolean;


    constructor(props:IWaterProductionFormProps){

        this.props=props;

        this.validate = this.validate.bind(this);

        this.validateClient = this.validateClient.bind(this);

        this.validateServer = this.validateServer.bind(this);

        this.OnCalcFeeTypeSelectChange = this.OnCalcFeeTypeSelectChange.bind(this);

        this.OnProductTypeSelectChange = this.OnProductTypeSelectChange.bind(this);

        this.PriceValidator = this.PriceValidator.bind(this);

    }

    @action
    public OnCalcFeeTypeSelectChange(value: SelectValue, option: React.ReactElement<any> ){

        this.props.form.setFieldsValue({
            CalcFeeTypeName:option.props.title
        })
    }

    @action
    public OnProductTypeSelectChange(value: any, label: any){
        this.props.form.setFieldsValue({
            ProductTypeName:label[0]
        })
    }

    /**
     * 价格验证
     * @param rule 
     * @param value 
     * @param callback 
     * @param source 
     * @param options 
     */
    @action
    public PriceValidator(rule: any, value: any, callback: any, source?: any, options?: any):any{

        if (value.toString().trim().length===0) {
            callback("单价不能为空");
            return;
        }


        if (isNaN(Number(value))) {
            callback("请输入数字");
            return;
        }

        if (Number(value)<0) {
            callback("单价不能小于0");
            return;
        }

        if (value.toString().trim().length>15) {
            callback("长度不能大于15位");
            return;
        }

        callback();

    }



    /**
     * 进行表单验证
     */
    public validate(): {
        /** 
         * 是否验证成功
         */
        isValidated: boolean,
        /** 
         * 表单数据
         */
        formData: any
    } {

        this.props.form.validateFieldsAndScroll(this.validateClient);
        if (!this.isValidated) {
            return {
                formData: this.formData,
                isValidated: this.isValidated,
            }
        }

        this.validateServer(this.formData);
        return {
            formData: this.formData,
            isValidated: this.isValidated,
        }
    }

    /**
     * 对表单字段进行基本规则验证的回调函数（客户端基本验证）
     * @param {any} errors 错误信息
     * @param {any} values 表单值
     */
    private validateClient(errors: any, values: any) {
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
     * @param {any} values  表单值
     */
    private validateServer(values: any) {
        
        const {GlobalProductionStore}=this.props;

        if (!GlobalProductionStore) {
            this.isValidated = true;
            return;
        }

        // const otherError = GlobalProductionStore.validate(values);
        // if (otherError) {
        //     message.error(otherError);
        //     this.isValidated = false;
        //     return;
        // }
        this.isValidated = true;
    }



}