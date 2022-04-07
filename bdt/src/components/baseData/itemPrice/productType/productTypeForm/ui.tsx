import { Form, Input } from "antd";
import { FormCreateOption } from "antd/lib/form";
import * as React from "react";
import { ProductTypeSelector } from "../productTypeSelector/ui";
import { IProductTypeFormProps } from "./interface";
import { ProductTypeFormUiAction } from "./uiAction";



/**
 * 表单视图
 */
class ProductTypeForm extends React.Component<IProductTypeFormProps>{

    private formItemLayoutStyle:{
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 15
        }
    };

    private uiAction :ProductTypeFormUiAction;

    constructor(props:IProductTypeFormProps){
        super(props);
        this.uiAction = new ProductTypeFormUiAction(props);

    }

    public componentDidMount(){
        this.props.getUiAction(this.uiAction);
    }

    public render(){
        const form = this.props.form;
        return(
            <Form>
                <Form.Item {...this.formItemLayoutStyle} label="产品类型ID" style = {{"display":"none"}}>
                    {
                        form.getFieldDecorator(
                            'ProductTypeId', 
                            {
                            })(<Input placeholder='产品类型ID' disabled={true} />)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="上级产品类型" >
                    {
                        form.getFieldDecorator(
                            'FatherId', 
                            {
                                rules:[{
                                    message:"请选择父级",
                                    required:true
                                }]
                            })(<ProductTypeSelector  
                                disabled={this.props.store.SelectorDisabled}
                            />)
                    }
                </Form.Item>
                
                <Form.Item {...this.formItemLayoutStyle} label="请输入产品类型名称">
                    {
                        form.getFieldDecorator(
                            "ProductTypeName",
                            {
                                rules:[
                                    {
                                        message:"请输入产品类型名称",
                                        required:true,
                                    },
                                    {
                                        max:15,
                                        message:"长度不能大于15"
                                    },
                                    {
                                        whitespace:true,
                                        message:"不能为空"
                                    }
                                ]
                            }
                        )(<Input placeholder="请输入产品类型名称" />)
                    }
                </Form.Item>

            </Form>

        );
    }

}

const formCreateOption : FormCreateOption<IProductTypeFormProps>={
    mapPropsToFields(props){
        const productType = props.store.CurrentEditEntity;
        return{
            FatherId:Form.createFormField({
                value:productType.FatherId
            }),
            ProductTypeId:Form.createFormField({
                value:productType.ProductTypeId
            }),
            ProductTypeName:Form.createFormField({
                value:productType.ProductTypeName
            }),
        }
    }
}

export default Form.create<IProductTypeFormProps>(formCreateOption)(ProductTypeForm);