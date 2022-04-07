import { Form, Input } from "antd";
import { FormCreateOption } from 'antd/lib/form';
import * as React from "react";
import { PayBankSelectView } from "../payBankSelector/ui";
import { IPayBankFormProps } from "./interface";
import { PayBankFormUiAction } from "./uiAction";



/**
 * 表单布局样式
 */

const formLayoutStyle = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

/** 
 * 单个银行表单视图.（只有表单内容，没有提交按钮）
 */
class PayBankFormView extends React.Component<IPayBankFormProps>{

    private uiAction: PayBankFormUiAction;


    /**
     * 构造
     * @param props 
     */
    constructor(props: IPayBankFormProps) {

        super(props)

        this.uiAction = new PayBankFormUiAction(props);

    }

    /**
     *  组装组件
     */
    public componentDidMount() {
        this.props.getUiAction(this.uiAction);
    }

    public render() {
        const form = this.props.form;
        return (
            <Form>
                <Form.Item {...formLayoutStyle} label="请输入银行ID" style={{ "display": "none" }}>
                    {
                        form.getFieldDecorator(
                            "AgentBankId",
                            {
                            }
                        )(<Input placeholder="请输入银行ID" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="上级银行" >
                    {
                        form.getFieldDecorator(
                            "FatherId",
                        )(<PayBankSelectView
                            onSelect={this.uiAction.onSelect}
                            list={this.props.GlobalPayBankStore!.PayBankTypeUiLists}
                            disabled={this.props.GlobalPayBankStore!.SelectorDisabled}
                            setFieldsValue={this.props.form.setFieldsValue}
                        />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="开户行名称">
                    {
                        form.getFieldDecorator(
                            "AgentBankName",
                            {
                                rules: [{
                                    message: "请输入开户行名称",
                                    required: true,
                                    whitespace: true,
                                }, {
                                    max: 64,
                                    message: "超出长度限制"
                                }],
                                validateTrigger: 'onBlur',
                            }
                        )(<Input placeholder="请输入开户行名称" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="排序号">
                    {
                        form.getFieldDecorator(
                            "SortNo",
                            {
                                rules: [{
                                    message: '请输入正确的排序号(不能为空)',
                                    required: true,
                                }, {
                                    validator: (rule: any, value: any, callback: any, source?: any, options?: any) => {
                                        if (value && value.length > 0) {
                                            const reg = new RegExp("^[1-9][0-9]{0,8}$");
                                            if (reg.test(String(value))) {
                                                callback()
                                            } else {
                                                callback('请输入正确的排序号(最大值为999999999)')
                                            }
                                        } else {
                                            callback()
                                        }
                                    },
                                }]
                            }
                        )(<Input placeholder="请输入排序号" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="账号">
                    {
                        form.getFieldDecorator(
                            "AgentBankAccount",
                            {
                                rules: [
                                    { max: 64, message: "超出长度限制" },
                                    {
                                        message: "请输入正确的账号",
                                        pattern: new RegExp("^[0-9]*$"),
                                    }
                                ]
                            }
                        )(<Input placeholder="请输入银行账号" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="邮箱">
                    {
                        form.getFieldDecorator(
                            "AgentBankEmail",
                            {
                                rules: [{
                                    message: "请输入银行邮箱",
                                    pattern: new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"),
                                }, { max: 256, message: "超出长度限制" }]
                            }
                        )(<Input placeholder="请输入银行邮箱" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="备注">
                    {
                        form.getFieldDecorator(
                            "Description",
                            {
                                rules: [{
                                    max: 256,
                                    message: '超出长度限制',
                                }],
                            }
                        )(<Input placeholder="请输入备注" />)
                    }
                </Form.Item>
            </Form>

        );
    }
}

const formCreateOption: FormCreateOption<IPayBankFormProps> = {
    mapPropsToFields(props) {
        const PayBank = props.GlobalPayBankStore.CurrentEditPayBank;
        return {
            AgentBankAccount: Form.createFormField({
                value: PayBank.AgentBankAccount
            }),
            AgentBankEmail: Form.createFormField({
                value: PayBank.AgentBankEmail
            }),
            Description: Form.createFormField({
                value: PayBank.Description
            }),
            FatherId: Form.createFormField({
                value: PayBank.FatherId === PayBank.CpCode ? "" : PayBank.FatherId
            }),
            AgentBankName: Form.createFormField({
                value: PayBank.AgentBankName
            }),
            AgentBankId: Form.createFormField({
                value: PayBank.AgentBankId
            }),
            SortNo: Form.createFormField({
                value: PayBank.SortNo
            })
        }
    }
}

/**
 * 银行编辑视图
 */
export default Form.create<IPayBankFormProps>(formCreateOption)(PayBankFormView);