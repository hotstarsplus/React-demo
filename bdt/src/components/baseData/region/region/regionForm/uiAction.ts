import { message } from "antd";
import { action } from "mobx";
import { Region } from "../entity";
import { IRegionFormProps } from "./interface";





export class RegionFormUiAction{

    /**
     *  当前表单的api接口
     */
    private props:IRegionFormProps;

    /**
     * 表单数据
     */
    private formData:Region;

    /**
     * 是否验证通过
     */
    private isValidated:boolean;

    /**
     * 构造函数
     * @param props 
     */
    constructor(props:IRegionFormProps){
        this.props =props;
    }

    /**
     * 下拉选树组件改变事件
     * @param value 
     * @param label 
     */
    @action.bound
    public HandleOnChangeTree(value: any, label: any){
        console.log(value);
        const maxSortNo=this.props.GetMaxSortNo(value);
        this.props.form.setFieldsValue({
            SortNo:maxSortNo
        })
    }

    /**
     * 验证方法
     */
    @action.bound
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
    @action.bound
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
    @action.bound
    private validateServer(values:any){

        if (!this.props.GlobalRegionStore) {
            
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
     * @param model 片区实体类
     */
     @action.bound
     private Validate(model: Region): string | undefined {
         return undefined;
     }
    
}