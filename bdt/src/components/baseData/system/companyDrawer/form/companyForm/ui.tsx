import { Form, Input } from "antd";
import { FormCreateOption } from "antd/lib/form";
import * as React from "react";
import { ICompanyFormProps } from "./interface";
import { CompanyFormUiAction } from "./uiAction";


const formItemLayoutStyle = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 15
    }
};

class CompanyForm extends React.Component<ICompanyFormProps>{

    private uiAction:CompanyFormUiAction;

    constructor(props:ICompanyFormProps){
        super(props);
        this.uiAction = new CompanyFormUiAction(props);
    }

    public componentDidMount(){
        this.props.validate(this.uiAction.validate);
    }

    
    public render(){
        const form = this.props.form;
        form.getFieldDecorator("CompanyId");
        return(
            <Form>
                <Form.Item label={"企业名称"} {...formItemLayoutStyle} >
                    {
                        form.getFieldDecorator("CompanyName",
                         {
                             rules:[
                                 {
                                     required:true,
                                     whitespace:true,
                                     message:"不能为空"
                                 },
                                 {
                                     required:true,
                                     max:30,
                                     message:"长度不能大于30"
                                 }
                             ]
                         }
                        )(<Input placeholder={"请输入企业名称"} />)
                    }
                </Form.Item>
                <Form.Item label={"企业税号"} {...formItemLayoutStyle} >
                    {
                        form.getFieldDecorator("CompanyTaxNo",
                        {
                            rules:[
                                {
                                    required:true,
                                    whitespace:true,
                                    message:"不能为空"
                                },
                                {
                                    required:true,
                                    max:30,
                                    message:"长度不能大于30"
                                }
                            ]
                        }
                        )(<Input placeholder={"请输入企业税号"} />)
                    }
                </Form.Item>
                <Form.Item label={"企业地址"} {...formItemLayoutStyle} >
                    {
                        form.getFieldDecorator("CompanyAddress",
                        {
                            rules:[
                                {
                                    required:true,
                                    whitespace:true,
                                    message:"不能为空"
                                },
                                {
                                    required:true,
                                    max:30,
                                    message:"长度不能大于30"
                                }
                            ]
                        }
                        )(<Input placeholder={"请输入企业地址"} />)
                    }
                </Form.Item>
                <Form.Item label={"企业电话"} {...formItemLayoutStyle} >
                    {
                        form.getFieldDecorator("CompanyTel",
                        {
                            rules:[
                                {
                                    required:true,
                                    whitespace:true,
                                    message:"不能为空"
                                },
                                {
                                    required:true,
                                    max:15,
                                    message:"长度不能大于15"
                                }
                            ]
                        }
                        )(<Input placeholder={"请输入企业电话"} />)
                    }
                </Form.Item>
                <Form.Item label={"企业银行名称"} {...formItemLayoutStyle} >
                    {
                        form.getFieldDecorator("CompanyBankName",
                        {
                            rules:[
                                {
                                    required:true,
                                    whitespace:true,
                                    message:"不能为空"
                                },
                                {
                                    required:true,
                                    max:25,
                                    message:"长度不能大于25"
                                }
                            ]
                        }
                        )(<Input placeholder={"请输入企业银行名称"} />)
                    }
                </Form.Item>
                <Form.Item label={"企业银行账号"} {...formItemLayoutStyle} >
                    {
                        form.getFieldDecorator("CompanyBankAccount",
                        {
                            rules:[
                                {
                                    required:true,
                                    whitespace:true,
                                    message:"不能为空"
                                },
                                {
                                    required:true,
                                    max:25,
                                    message:"长度不能大于25"
                                }
                            ]
                        }
                        )(<Input placeholder={"请输入企业银行账号"} />)
                    }
                </Form.Item>
            
            </Form>
        )
    }
}


const formCreateOption :FormCreateOption<ICompanyFormProps> = {

    mapPropsToFields(props: ICompanyFormProps){
        const item = props.GlobalCompanyDrawerDomainStore.CurrentEditItem;

        return {
            CompanyId: Form.createFormField({
                value: item.CompanyId,
            }),
            CompanyName: Form.createFormField({
                value: item.CompanyName,
            }),
            CompanyTaxNo: Form.createFormField({
                value: item.CompanyTaxNo,
            }),
            CompanyAddress: Form.createFormField({
                value: item.CompanyAddress,
            }),
            CompanyTel: Form.createFormField({
                value: item.CompanyTel,
            }),
            CompanyBankName: Form.createFormField({
                value: item.CompanyBankName,
            }),
            CompanyBankAccount: Form.createFormField({
                value: item.CompanyBankAccount,
            }),
        }

    }
}



export default Form.create<ICompanyFormProps>(formCreateOption)(CompanyForm)