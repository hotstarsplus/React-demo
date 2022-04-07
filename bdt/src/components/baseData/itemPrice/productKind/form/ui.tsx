import { Form, Input,InputNumber } from "antd";
import { FormCreateOption } from "antd/lib/form";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ProductKindSelector } from "../selector/ui";
import { IProductKindFormProps } from "./interface";
import { ProductKindFormUiAction } from "./uiAction";


const formItemLayout = {
    labelCol: {
        xs: 24,
        sm: 8,
    },
    wrapperCol: {
        xs: 24,
        sm: 12,
        md: 10,
        xl: 12,
    }
}

@inject("ProductKindUiStore")
@observer
class ProductKindForm extends React.Component<IProductKindFormProps>{

    private uiAction:ProductKindFormUiAction;

    constructor(props:IProductKindFormProps){
        super(props);
        this.uiAction = new ProductKindFormUiAction(props);

    }

    public componentDidMount(){
        this.props.getValidate(this.uiAction.validate);
    }


    public render(){
        const form = this.props.form;
        form.getFieldDecorator("ProductKindId");
        form.getFieldDecorator("BusinessTypeId");
        form.getFieldDecorator("BusinessTypeName");
        return(
            <Form>
                <Form.Item 
                label={"上级产品性质"} 
                {...formItemLayout}>
                    {
                        form.getFieldDecorator("FatherId",
                            {

                            }
                        )(<ProductKindSelector list={this.props.ProductKindUiStore!.TreeData} disabled={this.props.fatherIdIsCanEdit}/>)
                    }
                </Form.Item>
                <Form.Item 
                label={"产品性质名称"} 
                {...formItemLayout}>
                    {
                        form.getFieldDecorator("ProductKindName",
                            {
                                rules:[
                                    {
                                        required:true,message:"请输入产品性质名称"
                                    },{
                                        max:64,message:"超出最大长度限制"
                                    }
                                ]
                            }
                        )(<Input placeholder={"请输入产品性质"} />)
                    }
                </Form.Item>
                <Form.Item 
                label={"综合价格"} 
                {...formItemLayout}>
                    {
                        form.getFieldDecorator("ColligationPrice" 
                        )(<InputNumber
                            min={0} 
                            max={999999999}
                            style={{width:"100%"}}  
                            placeholder={"请输入综合价格"}
                            />)
                    }
                </Form.Item>
            </Form>
        )
    }


}

const formCreateOption : FormCreateOption<IProductKindFormProps>={
    mapPropsToFields(props){
        const item =props.ProductKindUiStore.CurrentEditItem;
        return{
            ColligationPrice:Form.createFormField({
                value:item.ColligationPrice
            }),
            FatherId:Form.createFormField({
                value:item.FatherId
            }),
            ProductKindId:Form.createFormField({
                value:item.ProductKindId
            }),
            ProductKindName:Form.createFormField({
                value:item.ProductKindName
            }),
            BusinessTypeId:Form.createFormField({
                value:item.BusinessTypeId
            }),
            BusinessTypeName:Form.createFormField({
                value:item.BusinessTypeName
            })
        }
    }
}

export default Form.create<IProductKindFormProps>(formCreateOption)(ProductKindForm);