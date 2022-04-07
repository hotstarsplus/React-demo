import { Form, Input } from "antd";
import { FormCreateOption } from 'antd/lib/form';
import * as React from "react";
import { NeighborhoodTreeSelect } from "../neighborhoodSelector/ui";
import { INeighborhoodFormProps } from "./interface";
import { NeighborhoodFormUiAction } from "./uiAction";

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
 * 缴费网点表单视图（只有表单内容，没有提交按钮）
 */
class NeighborhoodFormView extends React.Component<INeighborhoodFormProps>{

    private uiAction: NeighborhoodFormUiAction;

    /**
     * 构造方法
     */
    constructor(props: INeighborhoodFormProps) {

        super(props);

        this.uiAction = new NeighborhoodFormUiAction(props);

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
                <Form.Item {...formLayoutStyle} label="请输入缴费网点ID" style={{ "display": "none" }} >
                    {
                        form.getFieldDecorator(
                            "NeighborhoodId",
                            {
                            }
                        )(<Input placeholder="请输入缴费网点ID" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="上级缴费网点" >
                    {
                        form.getFieldDecorator(
                            "FatherId",
                        )(<NeighborhoodTreeSelect
                            list={this.props.GlobalNeighborhoodStore!.NeighborhoodUiList}
                            disabled={this.props.GlobalNeighborhoodStore!.SelectorDisabled}
                            setFieldsValue={this.props.form.setFieldsValue}
                        />)

                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="缴费网点名称">
                    {
                        form.getFieldDecorator(
                            "NeighborhoodName",
                            {
                                rules: [{
                                    message: "请输入缴费网点名称（不能全为空格）",
                                    required: true, whitespace: true,
                                }, {
                                    max: 64,
                                    message: '超出长度限制',
                                }]
                            }
                        )(<Input placeholder="请输入缴费网点" />)
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
                <Form.Item {...formLayoutStyle} label="电话">
                    {
                        form.getFieldDecorator(
                            "NeighborhoodTel",
                            {
                                rules: [{
                                    message: '请输入正确的电话',
                                    pattern: new RegExp("^1[3|4|5|7|8][0-9]{9}$"),
                                },
                                {
                                    max: 64,
                                    message: '超出长度限制',
                                }]
                            }
                        )(<Input placeholder="请输入电话" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="地址">
                    {
                        form.getFieldDecorator(
                            "NeighborhoodAddress",
                            {
                                rules: [{
                                },
                                {
                                    max: 128,
                                    message: '超出长度限制',
                                }]
                            }
                        )(<Input placeholder="请输入地址" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="联系人">
                    {
                        form.getFieldDecorator(
                            "NeighborhoodLinkMan",
                            {
                                rules: [{
                                },
                                {
                                    max: 64,
                                    message: '超出长度限制',
                                }]
                            }
                        )(<Input placeholder="请输入联系人" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="备注">
                    {
                        form.getFieldDecorator(
                            "Description",
                            {
                                rules: [{
                                },
                                {
                                    max: 256,
                                    message: '超出长度限制',
                                }]
                            }
                        )(<Input placeholder="请输入描述" />)
                    }
                </Form.Item>
            </Form>
        );
    }
}
/**
 * 表单首选项
 */
const formCreateOption: FormCreateOption<INeighborhoodFormProps> = {
    mapPropsToFields(props) {
        const Neighborhood = props.GlobalNeighborhoodStore.CurrentEditNeighborhood;
        return {
            NeighborhoodAddress: Form.createFormField({
                value: Neighborhood.NeighborhoodAddress
            }),
            Description: Form.createFormField({
                value: Neighborhood.Description
            }),
            FatherId: Form.createFormField({
                value: Neighborhood.FatherId
            }),
            NeighborhoodLinkMan: Form.createFormField({
                value: Neighborhood.NeighborhoodLinkMan
            }),
            NeighborhoodTel: Form.createFormField({
                value: Neighborhood.NeighborhoodTel
            }),
            NeighborhoodName: Form.createFormField({
                value: Neighborhood.NeighborhoodName
            }),
            NeighborhoodId: Form.createFormField({
                value: Neighborhood.NeighborhoodId
            }),
            SortNo: Form.createFormField({
                value: Neighborhood.SortNo
            })

        }
    }
}

export default Form.create<INeighborhoodFormProps>(formCreateOption)(NeighborhoodFormView);