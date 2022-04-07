import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import { inject, observer } from "mobx-react";
import * as React from 'react';
import { IManufacturerFormProps } from "./interface";
import { ManufacturerFormUiAction } from "./uiAction";

/**
 * 表单宽度
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
 * 水表厂商表单视图
 */
@inject("GlobalManufacturerStore")
@observer
class ManufacturerFormView extends React.Component<IManufacturerFormProps>{

    private uiAction: ManufacturerFormUiAction;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IManufacturerFormProps) {
        super(props);

        this.uiAction = new ManufacturerFormUiAction(props);
    }

    /**
     * 组价装载时加载数据
     */
    public componentDidMount() {
        this.props.getAction(this.uiAction);
    }


    public render() {

        const form = this.props.form;

        return (

            <Form>

                <Form.Item {...formLayoutStyle} label="生产厂家名称" style={{ marginBottom: '5px' }}>
                    {
                        form.getFieldDecorator("ManufacturerName", {
                            rules: [{
                                message: '请输入厂商名称(不能全为空格)',
                                required: true, whitespace: true,
                            }, {
                                max: 64,
                                message: '超出长度限制',
                            },],
                            // validateTrigger: 'onBlur', // 设置进行表单验证的时机为onblur
                        })(<Input placeholder="请输入厂商名称" />)
                    }
                </Form.Item>

                <Form.Item {...formLayoutStyle} label="排序号" style={{ marginBottom: '5px' }}>
                    {
                        form.getFieldDecorator("SortNo", {
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
                        })(<Input placeholder="请输入排序号" />)
                    }
                </Form.Item>

                <Form.Item {...formLayoutStyle} label="传真" style={{ marginBottom: '5px' }}>
                    {
                        form.getFieldDecorator("ManufacturerFax", {
                            rules: [
                                {
                                    max: 64,
                                    message: '超出长度限制',
                                }
                            ]

                        })(<Input placeholder="请输入传真" />)
                    }
                </Form.Item>


                <Form.Item {...formLayoutStyle} label="联系人" style={{ marginBottom: '5px' }}>
                    {
                        form.getFieldDecorator("ManufacturerLinkMan", {
                            rules: [{
                            },
                            {
                                max: 64,
                                message: '超出长度限制',
                            }]
                        })(<Input placeholder="请输入联系人" />)
                    }
                </Form.Item>

                <Form.Item {...formLayoutStyle} label="电话" style={{ marginBottom: '5px' }}>
                    {
                        form.getFieldDecorator("ManufacturerTel", {
                            rules: [{
                                message: '请输入正确的电话',
                                pattern: new RegExp("^0\\d{2,3}-?\\d{7,8}$|^(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])\\d{8}$|\\d{7,8}$"),
                            },
                            {
                                max: 64,
                                message: '超出长度限制',
                            }],
                            // validateTrigger: 'onBlur', // 设置进行表单验证的时机为onblur
                        })(<Input placeholder="请输入电话" />)
                    }
                </Form.Item>


                <Form.Item {...formLayoutStyle} label="邮箱" style={{ marginBottom: '5px' }}>
                    {
                        form.getFieldDecorator("ManufacturerEmail", {
                            rules: [{
                                pattern: new RegExp('([a-zA-Z0-9]+[_|\\_|\\.|\\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.|\\-]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}'), message: '请输入正确的邮箱账号',
                            },
                            {
                                max: 64,
                                message: '超出长度限制',
                            }],
                            // validateTrigger: 'onBlur', // 设置进行表单验证的时机为onblur
                        })(<Input placeholder="请输入邮箱" />)
                    }
                </Form.Item>

                <Form.Item {...formLayoutStyle} label="地址" style={{ marginBottom: '5px' }}>
                    {
                        form.getFieldDecorator("ManufacturerAddress", {
                            rules: [{
                            },
                            {
                                max: 128,
                                message: '超出长度限制',
                            }]
                        })(<Input placeholder="请输入地址" />)
                    }
                </Form.Item>

                <Form.Item {...formLayoutStyle} label="备注" style={{ marginBottom: '5px' }}>
                    {
                        form.getFieldDecorator("Description", {
                            rules: [{
                            },
                            {
                                max: 256,
                                message: '超出长度限制',
                            }]
                        })(<Input placeholder="请输入备注" />)
                    }
                </Form.Item>

            </Form>

        );


    };

}
/**
 * 表单首选项
 */
const formCreateOption: FormCreateOption<IManufacturerFormProps> = {
    mapPropsToFields(props) {
        const item = props.store.currentEditItem;
        return {
            ManufacturerAddress: Form.createFormField({
                value: item.ManufacturerAddress,
            }),
            Description: Form.createFormField({
                value: item.Description,
            }),
            ManufacturerEmail: Form.createFormField({
                value: item.ManufacturerEmail,
            }),
            ManufacturerFax: Form.createFormField({
                value: item.ManufacturerFax,
            }),
            ManufacturerLinkMan: Form.createFormField({
                value: item.ManufacturerLinkMan,
            }),
            ManufacturerId: Form.createFormField({
                value: item.ManufacturerId,
            }),
            ManufacturerName: Form.createFormField({
                value: item.ManufacturerName,
            }),
            ManufacturerTel: Form.createFormField({
                value: item.ManufacturerTel,
            }),
            SortNo: Form.createFormField({
                value: item.SortNo,
            })

        }

    }
}


/**
 *  生产厂家表单视图
 */
export default Form.create<IManufacturerFormProps>(formCreateOption)(ManufacturerFormView); 
