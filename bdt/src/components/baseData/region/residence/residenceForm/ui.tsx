import { Form, Input } from "antd";
import { FormCreateOption } from 'antd/lib/form';
import * as React from "react";
import { ResidenceSelectView } from "../residenceSelector/ui";
import { IResidenceFormProps } from "./interface";
import { ResidenceFormUiAction } from "./uiAction";



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
 * 单个小区表单视图.（只有表单内容，没有提交按钮）
 */
class ResidenceFormView extends React.Component<IResidenceFormProps>{

    private uiAction: ResidenceFormUiAction;


    /**
     * 构造
     * @param props 
     */
    constructor(props: IResidenceFormProps) {

        super(props)

        this.uiAction = new ResidenceFormUiAction(props);

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
                <Form.Item {...formLayoutStyle} label="小区ID" style={{ "display": "none" }}>
                    {
                        form.getFieldDecorator(
                            "GardenId",
                            {
                            }
                        )(<Input placeholder="请输入小区ID" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="上级小区" >
                    {
                        form.getFieldDecorator(
                            "FatherId", {
                            initialValue: ""
                        }

                        )(<ResidenceSelectView
                            disabled={this.props.GlobalResidenceStore!.SelectorDisabled}
                            onChange={this.uiAction.onChange}
                        />)

                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="小区名称">
                    {
                        form.getFieldDecorator(
                            "GardenName",
                            {
                                rules: [{
                                    message: "请输入正确的小区名称",
                                    required: true, whitespace: true
                                }, {
                                    max: 32,
                                    message: '超出长度限制',
                                }],
                                validateTrigger: 'onBlur',
                            }
                        )(<Input placeholder="请输入小区名称" />)
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
                <Form.Item {...formLayoutStyle} label="地址">
                    {
                        form.getFieldDecorator(
                            "GardenAddress",
                            {
                                rules: [{
                                    max: 256,
                                    message: '超出长度限制',
                                }],
                            }
                        )(<Input placeholder="请输入小区地址" />)
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

const formCreateOption: FormCreateOption<IResidenceFormProps> = {
    mapPropsToFields(props) {
        const Residence = props.GlobalResidenceStore.CurrentEditResidence;
        console.log("fatherID", Residence.FatherId)
        return {
            GardenAddress: Form.createFormField({
                value: Residence.GardenAddress
            }),
            Description: Form.createFormField({
                value: Residence.Description
            }),
            FatherId: Form.createFormField({
                value: Residence.FatherId
            }),
            GardenName: Form.createFormField({
                value: Residence.GardenName
            }),
            GardenId: Form.createFormField({
                value: Residence.GardenId
            }),
            SortNo: Form.createFormField({
                value: Residence.SortNo
            })

        }
    }
}

/**
 * 小区编辑视图
 */
export default Form.create<IResidenceFormProps>(formCreateOption)(ResidenceFormView);