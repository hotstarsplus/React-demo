import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IControlTypeFormProps } from './interface';
import { ControlTypeFormUiAction } from './uiAction';

/**
 * 表单宽度
 */
const formLayoutStyle = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    },
};
/**
 * 控制方式表单视图
 */
@inject("GlobalControlTypeStore")
@observer
class ControlTypeFormView extends React.Component<IControlTypeFormProps>{
    private uiAction: ControlTypeFormUiAction;
    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IControlTypeFormProps) {
        super(props);
        this.uiAction = new ControlTypeFormUiAction(props);
    }
    /**
     * 组价装载时加载数据
     */
    public componentDidMount() {
        this.props.getAction(this.uiAction);
    }

    public render() {
        const { form } = this.props
        return (
            <Form>
                <Form.Item
                    {...formLayoutStyle}
                    label="控制方式名称"
                >
                    {
                        form.getFieldDecorator("ControlTypeName", {
                            rules: [{
                                message: '请输入名称(不能全为空格)',
                                required: true, whitespace: true,
                            }, {
                                max: 64,
                                message: '超出长度限制',
                            }],
                            // 设置进行表单验证的时机为onblur
                            validateTrigger: "onBlur",
                        })(<Input placeholder="请输入名称" />)
                    }
                </Form.Item>
                <Form.Item
                    {...formLayoutStyle}
                    label="排序号"
                >
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
                            }],
                        })(<Input placeholder="请输入排序号" />)
                    }
                </Form.Item>
                <Form.Item
                    {...formLayoutStyle}
                    label="备注"
                >
                    {
                        form.getFieldDecorator("Description", {
                            rules: [{
                            }, {
                                max: 256,
                                message: '超出长度限制',
                            }]
                        })((<Input placeholder="请输入备注" />))

                    }

                </Form.Item>


            </Form>
        );
    }
}
/**
 * 表单首选项
 */
const formCreateOption: FormCreateOption<IControlTypeFormProps> = {
    mapPropsToFields(props) {
        const item = props.store.currentEditItem;

        return {
            // ControlTypeId:Form.createFormField({
            //     value:item.ControlTypeId
            // }),
            ControlTypeName: Form.createFormField({
                value: item.ControlTypeName
            }),
            SortNo: Form.createFormField({
                value: item.SortNo,
            }),
            Description: Form.createFormField({
                value: item.Description,
            }),
            // IsDelete:Form.createFormField({
            //     value:item.IsDelete,
            // }),
            // CreaterId:Form.createFormField({
            //     value:item.CreaterId,
            // }),
            // CreateDate:Form.createFormField({
            //     value:item.CreateDate,
            // }),
            // UpdateId:Form.createFormField({
            //     value:item.UpdateId
            // }),
            // UpdateDate:Form.createFormField({
            //     value:item.UpdateDate
            // })
        }
    }
}
/**
 * 控制方式表单视图
 */
export default Form.create<IControlTypeFormProps>(formCreateOption)(ControlTypeFormView)