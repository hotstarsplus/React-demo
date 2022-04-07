import { Form, Input } from "antd";
import { FormCreateOption } from 'antd/lib/form';
import * as React from "react";
import { IBusinessOfficeFormProps } from "../businessOfficeForm/interface";
import { BusinessOfficeFormUiAction } from "../businessOfficeForm/uiAction";
import { BusinessOfficeTreeSelect } from "../businessOfficeSelector/ui";

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
 * 营业网点表单视图（只有表单内容，没有提交按钮）
 */
class BusinessOfficeFormView extends React.Component<IBusinessOfficeFormProps>{

    private uiAction: BusinessOfficeFormUiAction;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IBusinessOfficeFormProps) {

        super(props);

        this.uiAction = new BusinessOfficeFormUiAction(props);

    }

    /**
     *  组装组件
     */
    public componentDidMount() {
        this.props.getUiAction(this.uiAction);
    }

    public render() {
        // console.log("BusinessOfficeFormView render()");
        const form = this.props.form;
        return (
            <Form>
                <Form.Item {...formLayoutStyle} label="请输入营业网点ID" style={{ "display": "none" }} >
                    {
                        form.getFieldDecorator(
                            "BusinessOfficeId",
                            {
                            }
                        )(<Input placeholder="请输入营业网点ID" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="上级营业网点" >
                    {
                        form.getFieldDecorator(
                            "FatherId",
                        )(<BusinessOfficeTreeSelect
                            list={this.props.GlobalBusinessOfficeStore!.BusinessOfficeUiList}
                            disabled={this.props.GlobalBusinessOfficeStore!.SelectorDisabled}
                            setFieldsValue={this.props.form.setFieldsValue}
                            getMaxSortNo={this.props.getMaxSortNo}
                        />)

                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="营业网点名称">
                    {
                        form.getFieldDecorator(
                            "BusinessOfficeName",
                            {
                                rules: [{
                                    message: "请输入营业网点名称（不能全为空格）",
                                    required: true, whitespace: true,
                                }, {
                                    max: 64,
                                    message: '超出长度限制',
                                }]
                            }
                        )(<Input placeholder="请输入营业网点" />)
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
                            "BusinessOfficeTel",
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
                            "BusinessOfficeAddress",
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
                            "BusinessOfficeLinkMan",
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
 * 创建表单首选项
 */
const formCreateOption: FormCreateOption<IBusinessOfficeFormProps> = {
    mapPropsToFields(props) {
        const BusinessOffice = props.GlobalBusinessOfficeStore.CurrentEditBusinessOffice;
        return {
            BusinessOfficeAddress: Form.createFormField({
                value: BusinessOffice.BusinessOfficeAddress
            }),
            Description: Form.createFormField({
                value: BusinessOffice.Description
            }),
            FatherId: Form.createFormField({
                value: BusinessOffice.FatherId
            }),
            BusinessOfficeLinkMan: Form.createFormField({
                value: BusinessOffice.BusinessOfficeLinkMan
            }),
            BusinessOfficeTel: Form.createFormField({
                value: BusinessOffice.BusinessOfficeTel
            }),
            BusinessOfficeName: Form.createFormField({
                value: BusinessOffice.BusinessOfficeName
            }),
            BusinessOfficeId: Form.createFormField({
                value: BusinessOffice.BusinessOfficeId
            }),
            SortNo: Form.createFormField({
                value: BusinessOffice.SortNo
            })

        }
    }
}

export default Form.create<IBusinessOfficeFormProps>(formCreateOption)(BusinessOfficeFormView);