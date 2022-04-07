import { Icon, Input, Radio, Select, Tooltip, TreeSelect } from "antd";
import Form, { FormComponentProps, FormCreateOption } from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";
import { SelectValue } from "antd/lib/select";
import { observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { AgentBankList } from "../entity/invoiceKind";
import { BillTemplateModalStore } from "./store";

interface IBillTemplateFormProps extends FormComponentProps {
    /**
     * 票据模板弹窗store
     */
    BillTemplateModalStore: BillTemplateModalStore;
}
const formItemLayoutStyle = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 14
    }
};

/**
 * 票据模板表单
 */
@observer
class BillTemplateForm extends React.Component<IBillTemplateFormProps>{

    @observable
    public SelectPrintTemplate: number = Number(this.props.BillTemplateModalStore.CurrentEditItem.Type);

    constructor(props: IBillTemplateFormProps) {
        super(props);
        props.BillTemplateModalStore!.FormUtils = props.form;

    }

    public render() {

        const modalStore = this.props.BillTemplateModalStore!;
        const form = this.props.form;

        return (
            <Form >
                <Form.Item {...formItemLayoutStyle} label="所属类型" >
                    {
                        form.getFieldDecorator(
                            'Type',
                            {
                                rules: [{
                                    message: '请选择所属类型',
                                    required: true,
                                }]
                            })(
                                <Select
                                    allowClear={true}
                                    disabled={modalStore.TypeDisabled}
                                    onChange={this.HandlePrintTemplateTypeOnChange}
                                >
                                    {
                                        modalStore.RootStore.BillTemplateLayoutStore.PrintTemplateTypeList.map((model) => {
                                            return (
                                                <Select.Option
                                                    key={String(model.PrintTemplateTypeId)}
                                                    value={String(model.PrintTemplateTypeId)}
                                                    title={model.PrintTemplateTypeName}
                                                >
                                                    {
                                                        model.PrintTemplateTypeName
                                                    }
                                                </Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            )
                    }
                </Form.Item>

                {this.SelectPrintTemplate === 1 ? <Form.Item {...formItemLayoutStyle} label="对应票据类型" >
                    {
                        form.getFieldDecorator(
                            'BillTypeId',
                            {
                                rules: [{
                                    message: '请选择对应票据类型',
                                    required: true,
                                }]
                            })(
                                <Select
                                    allowClear={true}
                                    disabled={modalStore.KindDisabled}
                                    onChange={modalStore.HandleInvoiceKindOnChange}
                                >
                                    {
                                        modalStore.RootStore.BillTemplateLayoutStore.InvoiceKindList.filter(x => x.IsCustomTemplate === "1").map((model) => {
                                            return (
                                                <Select.Option
                                                    key={model.InvoiceKindId}
                                                    value={model.InvoiceKindId}
                                                    title={model.InvoiceKindName}
                                                >
                                                    {
                                                        model.InvoiceKindName
                                                    }
                                                </Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            )
                    }
                </Form.Item> : <></>}

                {this.SelectPrintTemplate === 3 ? <Form.Item {...formItemLayoutStyle} label="托收银行" >
                    {
                        form.getFieldDecorator(
                            'AgentBankId',
                            {
                                rules: [{
                                    message: '请选择托收银行',
                                    required: true,
                                }]
                            })(
                                <TreeSelect
                                    allowClear={true}
                                    onChange={modalStore.HandleAgentBankOnChange}
                                >
                                    {this.renderBankSelectTree(modalStore.RootStore.BillTemplateLayoutStore.AgentBankList)}
                                </TreeSelect>
                            )
                    }
                </Form.Item> : <></>}

                <Form.Item {...formItemLayoutStyle} label="票据模板名称" >
                    {
                        form.getFieldDecorator(
                            'Name',
                            {
                                rules: [
                                    {
                                        message: '请输入票据模板名称',
                                        required: true,
                                    },
                                    {
                                        message: '模板名称长度不能超过32',
                                        max: 32
                                    },
                                    {
                                        validator: modalStore.HandleNameValidator
                                    }
                                ]
                            })(<Input />)
                    }

                </Form.Item>

                {
                    modalStore.DefaultRowVisible ?
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
                                    <Radio.Group onChange={modalStore.HandleIsDefaultChange}>
                                        <Radio value={"1"}>是</Radio>
                                        <Radio value={"0"}>否</Radio>
                                    </Radio.Group>

                                )
                            }
                        </Form.Item> : ""
                }
                {
                    modalStore.OpertionModalType !== "copy" ?
                        <div>
                            <Form.Item
                                {...formItemLayoutStyle}
                                label={
                                    <div style={{ display: "inline-block" }}>
                                        <Tooltip title={"温馨提示：为方便快速操作，可以参考模板中选择一个进行修改"}>
                                            <Icon type="exclamation-circle" style={{ color: "#87CEFA" }} />
                                        </Tooltip>
                                        &nbsp;参考模板
                                    </div>
                                }
                            >
                                {
                                    form.getFieldDecorator(
                                        'HtmlSource'
                                    )(
                                        <Select
                                            allowClear={true}
                                        >
                                            {
                                                modalStore.RootStore.BillTemplateLayoutStore.BillPrintReferencesList.map((model) => {
                                                    return (
                                                        <Select.Option
                                                            key={model.Id}
                                                            value={model.HtmlSource}
                                                            title={model.Name}
                                                        >
                                                            {
                                                                model.Name
                                                            }
                                                        </Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </Form.Item>

                            <Form.Item {...formItemLayoutStyle} label="备注">
                                {
                                    form.getFieldDecorator(
                                        'Description', {
                                        rules: [
                                            {
                                                message: '备注长度不能超过128',
                                                max: 128
                                            },
                                        ]
                                    }
                                    )(<TextArea />)
                                }
                            </Form.Item>
                            {
                                modalStore.KindDisabled ? <div style={{ color: "#FF8C00", textAlign: "center" }} >
                                    温馨提示：当前编辑的模板正在使用中
                                </div> : ""
                            }
                        </div> : ""
                }

            </Form>
        )
    }

    public HandlePrintTemplateTypeOnChange = (value: SelectValue) => {
        if (!isNaN(Number(value))) {
            this.SelectPrintTemplate = Number(value);
        }
    }

    public renderBankSelectTree = (data: AgentBankList[]): React.ReactNode => {
        return data.map((item: AgentBankList) => {
            if (item.children && item.children.length > 0) {
                return <TreeSelect.TreeNode key={item.AgentBankId} value={item.AgentBankId} title={item.AgentBankName}>
                    {this.renderBankSelectTree(item.children)}
                </TreeSelect.TreeNode>
            } else {
                return <TreeSelect.TreeNode key={item.AgentBankId} value={item.AgentBankId} title={item.AgentBankName}>
                    {item.AgentBankName}
                </TreeSelect.TreeNode>
            }
        })
    }

}


const formCreateOption: FormCreateOption<IBillTemplateFormProps> = {

    mapPropsToFields(props) {
        const item = props.BillTemplateModalStore.CurrentEditItem;
        return {
            AgentBankId: Form.createFormField({
                value: item.AgentBankId
            }),
            Name: Form.createFormField({
                value: item.Name
            }),
            CpCode: Form.createFormField({
                value: item.CpCode,
            }),
            Type: Form.createFormField({
                value: item.Type,
            }),
            BillTypeId: Form.createFormField({
                value: item.BillTypeId,
            }),
            PrintTempLateId: Form.createFormField({
                value: item.PrintTempLateId,
            }),
            Description: Form.createFormField({
                value: item.Description,
            }),
            HtmlSource: Form.createFormField({
                value: "",
            }),
            IsDefault: Form.createFormField({
                value: item.IsDefault,
            }),
            IsDefaultChange: Form.createFormField({
                value: item.IsDefaultChange,
            }),
            IsTurnOn: Form.createFormField({
                value: item.IsTurnOn,
            }),
           
        }
    }
}

export default Form.create<IBillTemplateFormProps>(formCreateOption)(BillTemplateForm)