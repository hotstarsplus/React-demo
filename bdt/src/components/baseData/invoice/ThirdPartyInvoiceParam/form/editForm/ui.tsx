import { Form, Input, Radio } from "antd";
import { FormCreateOption } from "antd/lib/form";
import * as React from "react";
import { TaxPreConSelect } from "../../taxPreConSelect/ui";
import { TaxRateSelect } from "../../taxRateSelect/ui";
import { IThirdPartyInvoiceParamEditFormProps } from "./interface";
import { ThirdPartyInvoiceParamEditFormUiAction } from "./uiAction";





const formItemLayoutStyle = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 15
    }
}


class ThirdPartyInvoiceParamEditForm extends React.Component<IThirdPartyInvoiceParamEditFormProps>{

    private uiAction: ThirdPartyInvoiceParamEditFormUiAction;

    constructor(props: IThirdPartyInvoiceParamEditFormProps) {
        super(props);
        this.uiAction = new ThirdPartyInvoiceParamEditFormUiAction(props);
    }


    public componentDidMount() {
        this.props.getValidate(this.uiAction.validate)
    }


    public render() {
        const form = this.props.form;
        form.getFieldDecorator("ProductId");
        return (
            <Form>
                <Form.Item {...formItemLayoutStyle} label={"商品名称"} style={{ marginBottom: "10px" }} >
                    {
                        form.getFieldDecorator("GoodsName",
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: "最大长度不能超过15",
                                        max: 15
                                    },
                                    {
                                        required: true,
                                        message: "不能为空",
                                        whitespace: true
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                </Form.Item>
                <Form.Item  {...formItemLayoutStyle} label={"税率"} style={{ marginBottom: "10px" }} >
                    {
                        form.getFieldDecorator("TaxRate",
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: "不能为空",
                                        whitespace: true,
                                        type: "number"
                                    }
                                ]
                            }
                        )(<TaxRateSelect />)
                    }
                </Form.Item>
                <Form.Item  {...formItemLayoutStyle} label="商品分类编码" style={{ marginBottom: "10px" }} >
                    {
                        form.getFieldDecorator("GoodsNo",
                            {
                                rules: [
                                    {
                                        required: true,
                                        pattern: new RegExp("^\\d+$"),
                                        message: "必须是数字"
                                    },
                                    {
                                        required: true,
                                        len: 19,
                                        message: "长度必须是19位"
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                </Form.Item>
                <Form.Item  {...formItemLayoutStyle} label={"计量单位"} style={{ marginBottom: "10px" }} >
                    {
                        form.getFieldDecorator("Uom",
                            {
                                rules: [
                                    {
                                        message: "最大长度不能超过5",
                                        max: 5
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                </Form.Item>
                <Form.Item  {...formItemLayoutStyle} label={"优惠政策标识"} style={{ marginBottom: "10px" }} >
                    {
                        form.getFieldDecorator("TaxPre",
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: "不能为空",
                                        whitespace: true
                                    }
                                ]
                            }
                        )(<Radio.Group>
                            <Radio value={"1"} >享受</Radio>
                            <Radio value={"0"} >不享受</Radio>
                        </Radio.Group>)
                    }
                </Form.Item>
                <Form.Item  {...formItemLayoutStyle} label={"优惠政策类型"} style={{ marginBottom: "10px" }} >
                    {
                        form.getFieldDecorator("TaxPreCon",
                            {
                            }
                        )(<TaxPreConSelect />)
                    }
                </Form.Item>
                <Form.Item  {...formItemLayoutStyle} label={"规格型号"} style={{ marginBottom: "10px" }} >
                    {
                        form.getFieldDecorator("Spec",
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: "不能为空",
                                        whitespace: true
                                    },
                                    {
                                        message: "最大长度不能超过15",
                                        max: 15
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                </Form.Item>
                <Form.Item  {...formItemLayoutStyle} label={"编码版本号"} style={{ marginBottom: "10px" }} >
                    {
                        form.getFieldDecorator("GoodsNoVer",
                            {
                                rules: [
                                    {
                                        message: "最大长度不能超过15",
                                        max: 15
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                </Form.Item>
                <Form.Item  {...formItemLayoutStyle} label={"含税标志"} style={{ marginBottom: "10px" }} >
                    {
                        form.getFieldDecorator("PriceKind",
                            {
                                rules: [
                                    {
                                        required: true
                                    }
                                ]
                            }
                        )(<Radio.Group>
                            <Radio value={"1"} >含税</Radio>
                            <Radio value={"0"} >不含税</Radio>
                        </Radio.Group>)
                    }
                </Form.Item>
                <Form.Item  {...formItemLayoutStyle} label={"打印顺序"} style={{ marginBottom: "10px" }} >
                    {
                        form.getFieldDecorator("SortNo",
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '打印顺序不能为空'
                                    },
                                    {
                                        pattern: new RegExp("^[1-9][0-9]{0,8}$"),
                                        message: '请输入正确的打印顺序（最大值为999999999）'
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                </Form.Item>
            </Form>
        )
    }
}



const formCreateOption: FormCreateOption<IThirdPartyInvoiceParamEditFormProps> = {
    mapPropsToFields(props) {
        const item = props.GlobalThirdPartyInvoiceParamDomainStore!.CurrentEditItem;
        return {
            ProductId: Form.createFormField({
                value: item.ProductId,
            }),
            GoodsName: Form.createFormField({
                value: item.GoodsName,
            }),
            TaxRate: Form.createFormField({
                value: item.TaxRate,
            }),
            GoodsNo: Form.createFormField({
                value: item.GoodsNo,
            }),
            TaxPre: Form.createFormField({
                value: item.TaxPre,
            }),
            Spec: Form.createFormField({
                value: item.Spec,
            }),
            GoodsNoVer: Form.createFormField({
                value: item.GoodsNoVer,
            }),
            PriceKind: Form.createFormField({
                value: item.PriceKind,
            }),
            Uom: Form.createFormField({
                value: item.Uom,
            }),
            TaxPreCon: Form.createFormField({
                value: item.TaxPreCon,
            }),
            SortNo: Form.createFormField({
                value: (item as any).SortNo || Number(props.GlobalThirdPartyInvoiceParamDomainStore!.maxSortNo)+1,
            }),
        };
    }
}

export default Form.create(formCreateOption)(ThirdPartyInvoiceParamEditForm);

