import { Icon, Input, Radio, Select, Tooltip } from "antd";
import Form, { FormComponentProps, FormCreateOption } from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";
import { inject, observer } from "mobx-react";
import React from "react";
import { PrintTemplateUiStore } from "../uiStore";
import { BillFormUiAction } from "./uiAction";

export interface IBillForm extends FormComponentProps {
    PrintTemplateUiStore: PrintTemplateUiStore
    /** 设为默认是否显示 */
    IsDefaultVisible: boolean;
    /** 备注框是否显示 */
    RemarkVisible: boolean;
    /** 模板类型是否不可选 */
    TypeDisabled: boolean
    /** 判断打开模块 */
    message?: string
}

const formItemLayoutStyle = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 14
    }
};

@inject('PrintTemplateUiStore')
@observer
class BillForm extends React.Component<IBillForm>{

    public uiAction: BillFormUiAction;

    public constructor(props: IBillForm) {
        super(props)
        this.uiAction = new BillFormUiAction(props, this)
        this.props.PrintTemplateUiStore!.selectType = String(this.props.PrintTemplateUiStore.defaultValue.AppPrintTypeId);
    }



    public render() {
        const form = this.props.form;
        const store = this.props.PrintTemplateUiStore!;
        return (
            <Form >
                <Form.Item {...formItemLayoutStyle} label="对应模板分类" >
                    {
                        form.getFieldDecorator(
                            'AppPrintTypeId',
                            {
                                rules: [{
                                    message: '请选择所属类型',
                                    required: true,
                                }]
                            })(
                                <Select
                                    allowClear={true}
                                    disabled={this.props.TypeDisabled}
                                    onChange={this.uiAction.HandlePrintTemplateTypeOnChange}
                                >
                                    {
                                        store.KindList.map((model) => {
                                            return (
                                                <Select.Option
                                                    key={String(model.AppPrintTypeId)}
                                                    value={String(model.AppPrintTypeId)}
                                                    title={model.AppPrintTypeName}
                                                >
                                                    {
                                                        model.AppPrintTypeName
                                                    }
                                                </Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            )
                    }
                </Form.Item>

                <Form.Item {...formItemLayoutStyle} label="打印模板名称">
                    {
                        form.getFieldDecorator(
                            'TempLateName',
                            {
                                rules: [{
                                    message: '请输入打印模板名称',
                                    required: true,
                                }, {
                                    validator: this.uiAction.handleValidator,
                                },{
                                    message: '模板名称长度不能超过32',
                                    max: 32
                                }]
                            })(<Input placeholder='请输入打印模板名称' disabled={this.props.message && this.props.message === '新增' ? this.uiAction.nameDisable : false} />)
                    }
                </Form.Item>
                {this.props.IsDefaultVisible ?
                    <Form.Item
                        {...formItemLayoutStyle}
                        label={
                            <div style={{ display: "inline-block" }}>
                                <Tooltip title={"默认模板代表该票据类型下绑定的默认模板样式。"}>
                                    <Icon type="exclamation-circle" style={{ color: "#87CEFA" }} />
                                </Tooltip>
                                &nbsp;设为默认模板
                            </div>
                        }
                    >
                        {
                            this.props.form.getFieldDecorator(
                                'IsDefault', {
                                initialValue: "0"
                            }
                            )(
                                <Radio.Group>
                                    <Radio value={"1"}>是</Radio>
                                    <Radio value={"0"}>否</Radio>
                                </Radio.Group>

                            )
                        }
                    </Form.Item>
                    : ''
                }


                {this.props.RemarkVisible ?
                    <Form.Item {...formItemLayoutStyle} label="备注">
                        {
                            form.getFieldDecorator(
                                'Remark'
                            )(<TextArea />)
                        }
                    </Form.Item>
                    : ''
                }
            </Form>
        )
    }
}

const formCreateOption: FormCreateOption<IBillForm> = {

    mapPropsToFields(props: IBillForm) {
        const item = props.PrintTemplateUiStore.defaultValue;
        return {
            AppPrintTypeId: Form.createFormField({
                value: item.AppPrintTypeId === 0 ? '' : String(item.AppPrintTypeId)
            }),
            TempLateName: Form.createFormField({
                value: props.IsDefaultVisible === false && props.RemarkVisible === false ? item.TempLateName.substring(0,28) + '(副本)' : item.TempLateName
            }),
            IsDefault: Form.createFormField({
                value: item.IsDefault
            }),
            Remark: Form.createFormField({
                value: item.Remark
            }),
        }
    }
}

export { BillForm };
export default Form.create<IBillForm>(formCreateOption)(BillForm)