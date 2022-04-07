import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { IQuantityTapyFormProps } from './interface'
import { QuantityTapyFormUiAction } from './uiAction';

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
class QuantityTapyForm extends React.Component<IQuantityTapyFormProps> {
    private uiAction: QuantityTapyFormUiAction;
    constructor(props: IQuantityTapyFormProps) {
        super(props);
        this.uiAction = new QuantityTapyFormUiAction(this.props);
    }
    public componentDidMount() {
        this.props.getAction(this.uiAction);
    }
    public render() {
        const form = this.props.form;
        return (
            <Form>
                <Form.Item {...formItemLayoutStyle} label="水量类型名称">
                    {
                        form.getFieldDecorator(
                            'QuantityTypeName',
                            {
                                rules: [{
                                    message: '请输入正确的水量类型名称',
                                    required: true, whitespace: true
                                }],
                                validateTrigger: 'onBlur',
                            })(<Input placeholder='请输入水量类型名称' disabled={true} />)
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
                                rules: [{ max: 256, message: "超出长度限制" }]
                            }
                        )(<Input placeholder="请输入备注" />)
                    }
                </Form.Item>
            </Form>
        );
    }
}
const formCreateOption: FormCreateOption<IQuantityTapyFormProps> = {
    mapPropsToFields(props) {
        const item = props.store.currentEditItem;
        return {
            QuantityTypeId: Form.createFormField({
                value: item.QuantityTypeId,
            }),
            QuantityTypeName: Form.createFormField({
                value: item.QuantityTypeName,
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
 * 水量类型编辑视图
 */
export default Form.create<IQuantityTapyFormProps>(formCreateOption)(QuantityTapyForm);