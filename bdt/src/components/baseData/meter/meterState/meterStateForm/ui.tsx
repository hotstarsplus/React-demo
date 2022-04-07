import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import { inject, observer } from "mobx-react";
import * as React from 'react';
import { IMeterStateFormProps } from "./interface";
import { MeterStateFormUiAction } from "./uiAction";


/**
 * 表单行样式
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
 * 水表状态管理表单视图
 */
@inject("GlobalMeterStateStore")
@observer
class MeterStateFormView extends React.Component<IMeterStateFormProps>{

    private uiAction: MeterStateFormUiAction;

    constructor(props: IMeterStateFormProps) {
        super(props);

        this.uiAction = new MeterStateFormUiAction(props);


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

                <Form.Item {...formLayoutStyle} label="水表状态名称">
                    {
                        form.getFieldDecorator("MeterStateName", {
                            rules: [{
                                message: '请输入水表状态名称(不能全为空格)',
                                required: true, whitespace: true,
                            },
                            {
                                max: 64,
                                message: '超出长度限制',
                            }]
                        })(<Input placeholder="请输入水表状态名称" disabled={this.props.store.isEdit} />)
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
 * 水表状态管理首选项
 */
const formCreateOption: FormCreateOption<IMeterStateFormProps> = {
    mapPropsToFields(props) {
        const item = props.store.currentEditItem;
        return {
            MeterStateId: Form.createFormField({
                value: item.MeterStateId,
            }),
            MeterStateName: Form.createFormField({
                value: item.MeterStateName,
            }),
            Description: Form.createFormField({
                value: item.Description,
            }),
            SortNo: Form.createFormField({
                value: item.SortNo,
            })

        }

    }
}


/**
 *  水表状态编辑视图
 */
export default Form.create<IMeterStateFormProps>(formCreateOption)(MeterStateFormView); 
