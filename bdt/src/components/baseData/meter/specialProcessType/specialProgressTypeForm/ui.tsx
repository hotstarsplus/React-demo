import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import { inject, observer } from "mobx-react";
import * as React from 'react';
import { ISpecialProcessTypeFormProps } from './interface';
import { SpecialProcessTypeFormUiAction } from './uiAction';


const formLayoutStyle = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

@inject("GlobalSpecialProgressTypeStore")
@observer
class SpecialProcessTypeFormView extends React.Component<ISpecialProcessTypeFormProps>{

    private uiAction: SpecialProcessTypeFormUiAction;

    constructor(props: ISpecialProcessTypeFormProps) {
        super(props);

        this.uiAction = new SpecialProcessTypeFormUiAction(props);


    }


    public componentDidMount() {
        this.props.getAction(this.uiAction);
    }


    public render() {

        const form = this.props.form;

        return (

            <Form>

                <Form.Item {...formLayoutStyle} label="水表特殊型号名称">
                    {
                        form.getFieldDecorator("MeterSpecialTypeName", {
                            rules: [{
                                message: '请输入水表特殊型号名称（不能全为空格）',
                                required: true, whitespace: true,
                            },
                            {
                                max: 64,
                                message: '超出长度限制',
                            }]
                        })(<Input placeholder="请输入水表特殊型号名称" />)
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

const formCreateOption: FormCreateOption<ISpecialProcessTypeFormProps> = {
    mapPropsToFields(props) {
        const item = props.store.currentEditItem;
        return {
            Description: Form.createFormField({
                value: item.Description,
            }),
            MeterSpecialTypeId: Form.createFormField({
                value: item.MeterSpecialTypeId,
            }),
            MeterSpecialTypeName: Form.createFormField({
                value: item.MeterSpecialTypeName,
            }),
            SortNo: Form.createFormField({
                value: item.SortNo,
            })

        }

    }
}


/**
 *  水表特殊型号编辑视图
 */
export default Form.create<ISpecialProcessTypeFormProps>(formCreateOption)(SpecialProcessTypeFormView);

