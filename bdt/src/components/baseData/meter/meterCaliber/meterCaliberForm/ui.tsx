import { Form, Input, InputNumber, } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { IMeterCaliberFormProps } from './interface'
import { MeterCaliberFormUiAction } from './uiAction';
/**
 * 表单布局样式
 */
const formItemLayoutStyle = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
class MeterCaliberForm extends React.Component<IMeterCaliberFormProps> {
    private uiAction: MeterCaliberFormUiAction;
    constructor(props: IMeterCaliberFormProps) {
        super(props);
        this.uiAction = new MeterCaliberFormUiAction(props);
    }
    public componentDidMount() {
        this.props.getAction(this.uiAction);
    }
    public render() {
        const form = this.props.form;
        return (
            <Form>

                <Form.Item {...formItemLayoutStyle} label="水表口径">
                    {
                        form.getFieldDecorator(
                            'MeterCaliberName',
                            {
                                rules: [{
                                    message: '请输入正确的水表口径名称',
                                    required: true, whitespace: true,
                                }, {
                                    max: 8,
                                    message: '超出长度限制',
                                }],
                                // validateTrigger: 'onBlur',
                            })(<Input placeholder='请输入水表口径名称' />)
                    }
                </Form.Item>
                <Form.Item {...formItemLayoutStyle} label="最大读数">
                    {
                        form.getFieldDecorator(
                            'MaxReading',
                            {
                                rules: [{
                                    message: '请输入正确的最大读数',
                                    // pattern:new RegExp("^([1-9]{3,9})(\\.[0-9]{1,4})?$"),
                                    required: true,
                                },],
                                // validateTrigger: 'onBlur',
                            })(<InputNumber style={{ width: '50%' }} max={999999999} placeholder='请输入最大读数' />)
                    }
                </Form.Item>
                <Form.Item {...formItemLayoutStyle} label="表鉴定周期">
                    {
                        form.getFieldDecorator(
                            'ProofCircleMonth',
                            {
                                rules: [
                                    {
                                        message: "表鉴定周期不能为空",
                                        required: true,
                                    }, {
                                        validator: (rule: any, value: any, callback: any, source?: any, options?: any) => {
                                            if (value && value.length > 0) {
                                                const reg = new RegExp("^[1-9][0-9]{0,8}$");
                                                if (reg.test(String(value))) {
                                                    callback()
                                                } else {
                                                    callback('请输入正确的表鉴定周期')
                                                }
                                            } else {
                                                callback()
                                            }
                                        },
                                    }],
                            })(<Input type='number' style={{ width: '50%' }} placeholder='请输入表鉴定周期' />)
                    }
                </Form.Item>
                <Form.Item {...formItemLayoutStyle} label="排序号" >
                    {
                        form.getFieldDecorator(
                            'SortNo',
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
                            })(<Input placeholder="请输入排序号" />)
                    }
                </Form.Item>
                <Form.Item {...formItemLayoutStyle} label="备注">
                    {
                        form.getFieldDecorator(
                            'Description',
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
const formCreateOption: FormCreateOption<IMeterCaliberFormProps> = {
    mapPropsToFields(props) {
        const item = props.store.currentEditItem;
        return {
            MaxReading: Form.createFormField({
                value: item.MaxReading,
            }),
            MeterCaliberId: Form.createFormField({
                value: item.MeterCaliberId,
            }),
            MeterCaliberName: Form.createFormField({
                value: item.MeterCaliberName,
            }),
            ProofCircleMonth: Form.createFormField({
                value: item.ProofCircleMonth,
            }),
            Description: Form.createFormField({
                value: item.Description
            }),
            SortNo: Form.createFormField({
                value: item.SortNo
            })
        };
    }
}
/**
 * 水费项目类型编辑视图
 */
export default Form.create<IMeterCaliberFormProps>(formCreateOption)(MeterCaliberForm);