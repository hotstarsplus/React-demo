import { Form,Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { ICustomerTypeFormProps} from './interface';
import { CustomerTypeFormUiAction } from './uiAction';

class CustomerTypeForm extends React.Component<ICustomerTypeFormProps>{
    private uiAction:CustomerTypeFormUiAction;

    private fromItemLayoutStyle:{
        labelCol:{
            span:6
        },
        wrapperCol:{
            span:15
        }
    };
    constructor(props:ICustomerTypeFormProps){
        super(props);
        this.uiAction=new CustomerTypeFormUiAction(this.props);
    }

    public componentDidMount(){
        this.props.getAction(this.uiAction);
    }
    public render(){
        const form =this.props.form;
        return(
            <Form> 
                <Form.Item {...this.fromItemLayoutStyle} label="序号" style={{"display":"none"}}>
                {
                    form.getFieldDecorator(
                        'Autoid', // 注意 :此处的id必须与实体的属性名称完全一致。
                        {
                        })(<Input placeholder='序号' disabled={true} />)
                }
                </Form.Item>
                <Form.Item {...this.fromItemLayoutStyle} label="用户类型编码" style={{"display":"none"}}>
                    {
                        form.getFieldDecorator(
                            'CustomerTypeId', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {

                            })(<Input placeholder='用户类型编码' disabled={true}/>)
                    }
                </Form.Item>
                <Form.Item {...this.fromItemLayoutStyle} label="用户类型名称" style={{"display":"none"}}>
                    {
                        form.getFieldDecorator(
                            'CustomerTypeName',
                            {

                            })(<Input placeholder='用户类型名称' disabled={true}/>)
                    }
                </Form.Item>
                <Form.Item {...this.fromItemLayoutStyle} label="用户类型名称">
                    {
                        form.getFieldDecorator(
                            'CustomerTypeName',
                            {
                                rules:[{
                                    message:'请输入用户类型名称',
                                    required:true,
                                }]
                            })(<Input placeholder='用户类型名称' />)
                    }
                </Form.Item>
                <Form.Item {...this.fromItemLayoutStyle} label="备注说明">
                    {
                        form.getFieldDecorator(
                            'Description',
                            {

                            })(<Input placeholder='备注说明' />)
                    }
                </Form.Item>
            </Form>
        );
    }
}
const formCreateOption : FormCreateOption<ICustomerTypeFormProps>={
    mapPropsToFields(props){
        const customerTypeModel=props.store.currentEditRow;
        return{
            AutoId:Form.createFormField({
                value:customerTypeModel.AutoId,
            }),
            CustomerTypeId:Form.createFormField({
                value:customerTypeModel.CustomerTypeId,
            }),
            CustomerTypeName:Form.createFormField({
                value:customerTypeModel.CustomerTypeName,
            }),
            Description:Form.createFormField({
                value:customerTypeModel.Description,
            })
        };

    }
}
    

export default Form.create<ICustomerTypeFormProps>(formCreateOption)(CustomerTypeForm);

