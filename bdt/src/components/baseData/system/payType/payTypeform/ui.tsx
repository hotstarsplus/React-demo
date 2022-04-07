import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import { inject, observer } from "mobx-react";
import * as React from 'react';
import { IPayTypeFormProps } from "./interface";
import { PayTypeFormUiAction } from "./uiAction";


/**
 * 表单的宽度样式
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

@inject("GlobalPayTypeStore")
@observer
class PayTypeFormView extends React.Component<IPayTypeFormProps>{

    private uiAction: PayTypeFormUiAction;

    constructor(props: IPayTypeFormProps) {
        super(props);

        this.uiAction = new PayTypeFormUiAction(props);


    }

    /**
     * 组件装载时加载数据
     */
    public componentDidMount() {
        this.props.getAction(this.uiAction);
    }


    public render() {

        const form = this.props.form;

        console.info("isEdit:", this.props.store.isEdit);

        return (

            <Form>

                <Form.Item {...formLayoutStyle} label="支付方式名称">
                    {
                        form.getFieldDecorator("PayTypeName", {
                            rules: [{
                                message: '请输入支付方式名称（不能全为空格）',
                                required: true, whitespace: true,
                            },
                            {
                                max: 64,
                                message: '超出长度限制',
                            }]
                        })(<Input placeholder="请输入支付方式名称" disabled={this.props.store.isEdit} />)
                    }
                </Form.Item>

                <Form.Item {...formLayoutStyle} label="排序号">
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


                <Form.Item {...formLayoutStyle} label="备注">
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
 * 创建表单的首选项
 */
const formCreateOption: FormCreateOption<IPayTypeFormProps> = {
    mapPropsToFields(props) {
        const item = props.store.currentEditItem;
        return {
            Description: Form.createFormField({
                value: item.Description,
            }),

            PayTypeName: Form.createFormField({
                value: item.PayTypeName,
            }),
            SortNo: Form.createFormField({
                value: item.SortNo,
            })

        }

    }
}


/**
 *  支付方式编辑视图
 */
export default Form.create<IPayTypeFormProps>(formCreateOption)(PayTypeFormView); 
