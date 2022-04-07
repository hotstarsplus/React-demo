import { Form, Input } from "antd";
import { FormCreateOption } from 'antd/lib/form';
import * as React from "react";
import { MeterTypeSelect } from "../meterTypeSelector/ui";
import { IMeterTypeFormProps } from "./interface";
import { MeterTypeFormUiAction } from "./uiAction";


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
 * 单个水表类型表单视图.（只有表单内容，没有提交按钮）
 */
class MeterTypeFormView extends React.Component<IMeterTypeFormProps>{

    private uiAction: MeterTypeFormUiAction;


    /**
     * 构造
     * @param props 
     */
    constructor(props: IMeterTypeFormProps) {

        super(props)

        this.uiAction = new MeterTypeFormUiAction(props);

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
                <Form.Item {...formLayoutStyle} label="请输入水表类型ID" style={{ "display": "none" }}>
                    {
                        form.getFieldDecorator(
                            "MeterTypeId",
                            {
                            }
                        )(<Input placeholder="请输入水表类型ID" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="上级名称" >
                    {
                        form.getFieldDecorator(
                            "FatherId",

                        )(<MeterTypeSelect
                            list={this.props.GlobalMeterTypeStore!.MeterTypeUiLists}
                            disabled={this.props.GlobalMeterTypeStore!.SelectorDisabled}
                            setFieldsValue={this.props.form.setFieldsValue}
                            getMaxSortNo={this.props.getMaxSortNo}
                        />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="水表类型名称">
                    {
                        form.getFieldDecorator(
                            "MeterTypeName",
                            {
                                rules: [{
                                    message: "请输入正确的水表类型",
                                    required: true, whitespace: true
                                }, {
                                    max: 32,
                                    message: '超出长度限制',
                                }],
                                // validateTrigger: 'onBlur', 
                            }
                        )(<Input placeholder="请输入水表类型" />)
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

const formCreateOption: FormCreateOption<IMeterTypeFormProps> = {
    mapPropsToFields(props) {
        const MeterType = props.GlobalMeterTypeStore.CurrentEditMeterType;
        return {
            Description: Form.createFormField({
                value: MeterType.Description
            }),
            FatherId: Form.createFormField({
                value: MeterType.FatherId
            }),
            MeterTypeName: Form.createFormField({
                value: MeterType.MeterTypeName
            }),
            MeterTypeId: Form.createFormField({
                value: MeterType.MeterTypeId
            }),
            SortNo: Form.createFormField({
                value: MeterType.SortNo
            })
        }
    }
}

/**
 * 水表类型编辑视图
 */
export default Form.create<IMeterTypeFormProps>(formCreateOption)(MeterTypeFormView);