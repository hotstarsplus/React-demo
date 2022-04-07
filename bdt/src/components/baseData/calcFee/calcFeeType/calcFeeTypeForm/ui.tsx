import { Form, Input } from "antd";
import { FormCreateOption, } from "antd/lib/form";
import React from "react";
import { ICalcFeeTypeFormProps } from "./interface";
import { CalcFeeTypeFormUiAction } from "./uiAction";
/**
 * 表单布局样式
 */
const formItemLayoutStyle = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

class CalcFeeTypeForm extends React.Component<ICalcFeeTypeFormProps>{
    private uiAction: CalcFeeTypeFormUiAction;
    constructor(props: ICalcFeeTypeFormProps) {
        super(props);
        this.uiAction = new CalcFeeTypeFormUiAction(this.props);
    }
    public componentDidMount() {
        this.props.getAction(this.uiAction);
    }
    public render() {
        const form = this.props.form;
        return (
            <Form>
                <Form.Item {...formItemLayoutStyle} label="编码" style={{ "display": "none" }}>
                    {
                        form.getFieldDecorator(
                            "CalcFeeTypeId", {}
                        )(<Input placeholder="请输入编码" disabled={true} />)
                    }
                </Form.Item>
                <Form.Item {...formItemLayoutStyle} label="计费方式名称">
                    {
                        form.getFieldDecorator(
                            "CalcFeeTypeName", {}
                        )(<Input placeholder="请输入计费方式名称" disabled={true} />)
                    }
                </Form.Item>
                <Form.Item {...formItemLayoutStyle} label="业务类别名称">
                    {
                        form.getFieldDecorator(
                            "BusinessType", {}
                        )(<Input placeholder="请输入业务类别名称" disabled={true} />)
                    }
                </Form.Item>
            </Form>
        );
    }
}
const formCreateOption: FormCreateOption<ICalcFeeTypeFormProps> = {
    mapPropsToFields(props) {
        const item = props.store.currentEditItem;
        return {
            CalcFeeTypeId: Form.createFormField({
                value: item.CalcFeeTypeId,
            }),
            CalcFeeTypeName: Form.createFormField({
                value: item.CalcFeeTypeName,
            }),
            BusinessType:Form.createFormField({
                value:item.BusinessType,
            })
        }
    }
}
export default Form.create<ICalcFeeTypeFormProps>(formCreateOption)(CalcFeeTypeForm);

