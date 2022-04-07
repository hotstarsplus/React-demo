import { Form, Input, Radio, } from "antd";
import { FormCreateOption } from 'antd/lib/form';
import { inject, observer } from "mobx-react";
import * as React from "react";
import { CalcFeeTypeSelector } from "../../../calcFee";
import { BillTypeMenuSelect } from "../select/ui";
import { IWaterProductFormProps } from "./interface";
import { WaterProductFormUiAction } from "./uiAction";


const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 14
    }
}

/**
 * form表单
 */
@inject("GlobalWaterProductStore")
@observer
class WaterProductFormView extends React.Component<IWaterProductFormProps>{


    private uiAction: WaterProductFormUiAction;


    constructor(props: IWaterProductFormProps) {

        super(props);

        this.uiAction = new WaterProductFormUiAction(props);

    }
    public componentDidMount() {
        this.props.getUiAction(this.uiAction);
    }

    public render() {
        console.log("票据代码", this.props.GlobalWaterProductStore!.CurrentEditItem.BillTypeId)
        const form = this.props.form;
        form.getFieldDecorator('ProductId');
        form.getFieldDecorator('CalcFeeTypeName');
        form.getFieldDecorator('ProductKindId');
        form.getFieldDecorator('ProductItemId');
        form.getFieldDecorator('ProductTypeName');
        form.getFieldDecorator('IsDelete');
        return (
            <Form layout="horizontal">
                <Form.Item style={{ display: "none" }} {...formItemLayout} label="业务类型">
                    {
                        form.getFieldDecorator(
                            'BusinessTypeId', { initialValue: this.props.businessTypeId })(<Input placeholder='业务类型id' disabled={true} />)
                    }
                </Form.Item>
                <Form.Item style={{ marginBottom: "4px" }} {...formItemLayout} label="产品性质">
                    {
                        form.getFieldDecorator(
                            'ProductKindName',
                            {
                                rules: [{
                                    message: '产品性质',
                                    required: true,
                                }]
                            })(<Input placeholder='产品性质' disabled={true} />)
                    }
                </Form.Item>
                <Form.Item style={{ marginBottom: "4px" }} {...formItemLayout} label="产品项目">
                    {
                        form.getFieldDecorator(
                            'ProductItemName',
                            {
                                rules: [{
                                    message: '产品项目',
                                    required: true,
                                }]
                            })(<Input placeholder='产品项目' disabled={true} />)
                    }
                </Form.Item>
                <Form.Item style={{ marginBottom: "4px" }} {...formItemLayout} label="计费方式">
                    {
                        form.getFieldDecorator(
                            'CalcFeeTypeId',
                            {
                                rules: [{
                                    message: '请选择计费方式',
                                    required: true,
                                }]
                            })(<CalcFeeTypeSelector businessTypeId={this.props.businessTypeId} onChange={this.uiAction.OnCalcFeeTypeSelectChange} />)
                    }
                </Form.Item>
                <Form.Item style={{ marginBottom: "4px" }} {...formItemLayout} label="是否由系统计费">
                    {
                        form.getFieldDecorator(
                            'IsSystemClacFee',
                            {
                                rules: [{
                                    message: '请选择是否由系统计费:',
                                    required: true,

                                }]
                            })(<Radio.Group  >
                                <Radio value={'1'}>是</Radio>
                                <Radio value={'0'}>否</Radio>
                            </Radio.Group>)
                    }
                </Form.Item>
                <Form.Item style={{ marginBottom: "4px" }} {...formItemLayout} label="是否随机收费项目">
                    {
                        form.getFieldDecorator(
                            'IsRandClacFee',
                            {
                                rules: [{
                                    message: '请选择是否随机收费项目',
                                    required: true,
                                }]
                            })(
                                <Radio.Group >
                                    <Radio value={'1'}>是</Radio>
                                    <Radio value={'0'}>否</Radio>
                                </Radio.Group>
                            )
                    }
                </Form.Item>
                <Form.Item style={{ marginBottom: "4px" }} {...formItemLayout} label="是否增值税">
                    {
                        form.getFieldDecorator(
                            'IsAddedTax',
                            {
                                rules: [{
                                    message: '请选择是否增值税',
                                    required: true,
                                }]
                            })(
                                <Radio.Group onChange={this.uiAction.IsAddedTaxChangeHandler}>
                                    <Radio value={'1'}>是</Radio>
                                    <Radio value={'0'}>否</Radio>
                                </Radio.Group>
                            )
                    }
                </Form.Item>
                <Form.Item style={{ marginBottom: "4px" }} {...formItemLayout} label="是否计算违约金">
                    {
                        form.getFieldDecorator(
                            'IsCalcLateFee',
                            {
                                rules: [{
                                    message: '请选择是否计算违约金',
                                    required: true,
                                }]
                            })(
                                <Radio.Group  >
                                    <Radio value={'1'}>是</Radio>
                                    <Radio value={'0'}>否</Radio>
                                </Radio.Group>
                            )
                    }
                </Form.Item>
                {
                    this.props.GlobalWaterProductStore!.IsShowBillType ? <Form.Item style={{ marginBottom: "4px" }} {...formItemLayout} label="票据类型">
                        {
                            form.getFieldDecorator(
                                'BillTypeId',
                                {
                                    rules: [{
                                        max: 15,
                                        message: "请选择票据类型",
                                        required: true,
                                    }]
                                })(<BillTypeMenuSelect />)
                        }
                    </Form.Item> : ""
                }
                <Form.Item style={{ marginBottom: "4px" }} {...formItemLayout} label="会计科目">
                    {
                        form.getFieldDecorator(
                            'AccountCode',
                            {
                                rules: [{
                                    max: 15,
                                    message: "长度不能大于15"
                                }]
                            })(<Input placeholder="请输入会计科目" />)
                    }
                </Form.Item>
                {
                    form.getFieldValue("CalcFeeTypeId") !== "superPlanOuter" && form.getFieldValue("CalcFeeTypeId") !== "ladder"
                        ? <Form.Item
                            {...formItemLayout}
                            label="产品价格"
                            style={{ display: form.getFieldValue("CalcFeeTypeId") !== "superPlanOuter" && form.getFieldValue("CalcFeeTypeId") !== "ladder" ? "" : "none", marginBottom: "4px" }}
                        >
                            {
                                form.getFieldDecorator(
                                    'ActualPrice',
                                    {
                                        rules: [{
                                            required: true,
                                            validator: this.uiAction.PriceValidator
                                        }]
                                    })(<Input placeholder={"请输入产品价格"} />)
                            }
                        </Form.Item>
                        : ""
                }

                <div
                    style={
                        {
                            color: "#FF9A2B",
                            textAlign: "center",
                            display: form.getFieldValue("CalcFeeTypeId") === "superPlanOuter" ? "block" : "none"
                        }
                    }
                >
                    备注: 超计划外计费方式水价请在超计划水价窗口进行设置
                </div>
                <div
                    style={
                        {
                            color: "#FF9A2B",
                            textAlign: "center",
                            display: form.getFieldValue("CalcFeeTypeId") === "ladder" ? "block" : "none"
                        }
                    }
                >
                    备注: 阶梯计费方式水价请在阶梯水价窗口进行设置
                </div>
            </Form>

        );

    }
}


const formCreateOption: FormCreateOption<IWaterProductFormProps> = {
    mapPropsToFields(props) {
        const item = props.GlobalWaterProductStore!.CurrentEditItem;
        return {
            AccountCode: Form.createFormField({
                value: item.AccountCode,
            }),
            CalcFeeTypeId: Form.createFormField({
                value: item.CalcFeeTypeId,
            }),
            ProductItemId: Form.createFormField({
                value: item.ProductItemId,
            }),
            ProductKindId: Form.createFormField({
                value: item.ProductKindId,
            }),
            ProductKindName: Form.createFormField({
                value: item.ProductKindName,
            }),
            ProductItemName: Form.createFormField({
                value: item.ProductItemName,
            }),
            CalcFeeTypeName: Form.createFormField({
                value: item.CalcFeeTypeName,
            }),
            ActualPrice: Form.createFormField({
                value: item.ActualPrice,
            }),
            IsRandClacFee: Form.createFormField({
                value: item.IsRandClacFee.trim(),
            }),
            IsAddedTax: Form.createFormField({
                value: item.IsAddedTax!.trim(),
            }),
            IsCalcLateFee: Form.createFormField({
                value: item.IsCalcLateFee.trim(),
            }),
            IsSystemClacFee: Form.createFormField({
                value: item.IsSystemClacFee.trim(),
            }),
            ProductId: Form.createFormField({
                value: item.ProductId,
            }),
            IsDelete: Form.createFormField({
                value: item.IsDelete,
            }),
            BillTypeId: Form.createFormField({
                value: item.BillTypeId,
            })

        };
    }
}



/**
 * 水费项目类型编辑视图
 */
export default Form.create<IWaterProductFormProps>(formCreateOption)(WaterProductFormView);