import { Form, Input, Radio } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { IBusinessTypeFormProps } from './interface';
import { BusinessTypeFormUiAction } from './uiAction';


const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 15,
    },
};


/**
 * 热力业务内的表单
 */
class BusinessTypeFrom extends React.Component<IBusinessTypeFormProps> {

    private uiAction: BusinessTypeFormUiAction;

    constructor(props: IBusinessTypeFormProps) {
        super(props);
        this.uiAction = new BusinessTypeFormUiAction(this.props);
    }

    public componentDidMount() {
        this.props.getAction(this.uiAction)
    }

    public render() {
        const form = this.props.form;
        form.getFieldDecorator("BusinessTypeId");
        return (
            <Form >
                <Form.Item {...formItemLayout} label="业务类别名称">
                    {
                        form.getFieldDecorator('BusinessTypeName', {
                            rules: [
                                {
                                    required: true,
                                },
                            ],
                        })(<Input placeholder='' disabled={true} />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="排序号">
                    {
                        form.getFieldDecorator('SortNo', {
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
                            }],
                        })(<Input placeholder='请输入排序号' />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="是否启用">
                    {
                        form.getFieldDecorator('IsEnable', {
                            rules: [
                                {
                                    whitespace: true,
                                },
                                {
                                    required: true,
                                },
                            ],
                        })(<Radio.Group  >
                            <Radio value="1">是</Radio>
                            <Radio value="0">否</Radio>
                        </Radio.Group>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="备注">
                    {
                        form.getFieldDecorator('Description', {
                            rules:[
                                {
                                    max:128,
                                    message:"超出长度限制，限制输入128个字符"
                                }
                            ]
                        })(<Input.TextArea autosize={{ minRows: 2, maxRows: 5 }} placeholder='请输入备注' />)}
                </Form.Item>
            </Form>
        );
    }

}

const formCreateOption: FormCreateOption<IBusinessTypeFormProps> = {
    mapPropsToFields(props) {
        console.log('item', props.store.CurrentEditItem)
        const item = props.store.CurrentEditItem;
        return {
            BusinessTypeName: Form.createFormField({
                value: item.BusinessTypeName,
            }),
            BusinessTypeId: Form.createFormField({
                value: item.BusinessTypeId,
            }),
            SortNo: Form.createFormField({
                value: item.SortNo,
            }),
            IsEnable: Form.createFormField({
                value: item.IsEnable,
            }),
            Description: Form.createFormField({
                value: item.Description
            }),
        };
    }
}


/**
 * 业务类型编辑视图
 */
export default Form.create<IBusinessTypeFormProps>(formCreateOption)(BusinessTypeFrom);
