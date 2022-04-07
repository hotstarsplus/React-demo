import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { IMeterModelFormProps } from './interface'
import { MeterModelFormUiAction } from './uiAction';

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

/** 
 * 单个水表类型表单视图.（只有表单内容，没有提交按钮）
 */
class MeterModelForm extends React.Component<IMeterModelFormProps> {
    private uiAction: MeterModelFormUiAction;
    constructor(props: IMeterModelFormProps) {
        super(props);
        this.uiAction = new MeterModelFormUiAction(this.props);
    }
    public componentDidMount() {
        this.props.getAction(this.uiAction);
    }
    public render() {
        const form = this.props.form;
        return (
            <Form>
                <Form.Item {...formItemLayoutStyle} label="水表型号名称">
                    {
                        form.getFieldDecorator(
                            'MeterModelName', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                rules: [{
                                    message: '请输入正确的水表型号名称',
                                    required: true, whitespace: true
                                }, {
                                    max: 32,
                                    message: '超出长度限制',
                                }],
                                // validateTrigger: 'onBlur', 
                            })(<Input placeholder='请输入水表型号名称' />)
                    }
                </Form.Item>
                <Form.Item {...formItemLayoutStyle} label="排序号">
                    {
                        form.getFieldDecorator(
                            'SortNo', // 注意 :此处的id必须与实体的属性名称完全一致。
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
                            })(<Input placeholder='请输入排序号' />)
                    }
                </Form.Item>
                <Form.Item {...formItemLayoutStyle} label="水表型号代码" style={{ "display": "none" }}>
                    {
                        form.getFieldDecorator(
                            'MeterModelId', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {

                            })(<Input placeholder='水表型号代码' disabled={true} />)
                    }
                </Form.Item>

                <Form.Item {...formItemLayoutStyle} label="备注">
                    {
                        form.getFieldDecorator(
                            'Description', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                rules: [{
                                    max: 256,
                                    message: '超出长度限制',
                                }],
                            })(<Input placeholder='请输入备注' />)
                    }
                </Form.Item>
            </Form>
        );
    }
}
const formCreateOption: FormCreateOption<IMeterModelFormProps> = {
    mapPropsToFields(props) {
        const meterModel = props.store.currentEditRow;
        return {
            AutoId: Form.createFormField({
                value: meterModel.AutoId,
            }),
            Description: Form.createFormField({
                value: meterModel.Description,
            }),
            MeterModelId: Form.createFormField({
                value: meterModel.MeterModelId,
            }),
            MeterModelName: Form.createFormField({
                value: meterModel.MeterModelName,
            }),
            SortNo: Form.createFormField({
                value: meterModel.SortNo,
            })
        };
    }
}
/**
 * 水表类型编辑视图
 */
export default Form.create<IMeterModelFormProps>(formCreateOption)(MeterModelForm);
