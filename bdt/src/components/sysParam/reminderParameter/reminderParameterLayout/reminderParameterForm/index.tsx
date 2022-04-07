import {
    Form,
    Select
} from "antd";
import { FormCreateOption } from "antd/lib/form";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { CPMenuSelect } from "../selector/cPMenuSelect";
import { IReminderParameterFormProps } from "./interface";
import { ReminderParameterFormUiAction } from "./uiActon";

/**
 * 表单宽度
 */
const formLayoutStyle = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    },
};
/**
 * 提醒参数表单视图
 */
@observer
class ReminderParameterFormView extends React.Component<IReminderParameterFormProps>{
    private uiAction: ReminderParameterFormUiAction;
    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IReminderParameterFormProps) {
        super(props);
        this.uiAction = new ReminderParameterFormUiAction(props)
    }
    /**
     * 组价装载时加载数据
     */
    public componentDidMount() {
        this.props.getAction(this.uiAction);
    }
    public render() {
        const { form } = this.props
        return (
            <Form>
                <Form.Item
                    {...formLayoutStyle}
                    label="选择菜单"
                >
                    {
                        form.getFieldDecorator("BusinessID", {
                            rules: [{
                                message:'请选择菜单',
                                required:true,
                            }],
                        })(
                            (<CPMenuSelect/>)
                        )
                    }
                </Form.Item>
                <Form.Item
                    {...formLayoutStyle}
                    label="选择提醒方式"
                >
                    {
                        form.getFieldDecorator("AlertType", {
                            rules: [{
                                message:'请选择提醒方式',
                                required:true,
                            }],
                        })(
                            (<Select 
                                defaultValue="弹窗提醒"
                            >
                                <option value="弹窗提醒">弹窗提醒</option>
                            </Select>)
                            )
                    }
                </Form.Item>
            </Form>
        );
    }
}
/**
 * 表单首选项
 */
const formCreateOption: FormCreateOption<IReminderParameterFormProps> = {
    mapPropsToFields() {
        return {
            BusinessID: Form.createFormField({
                value: undefined
            }),
            AlertType: Form.createFormField({
                value: undefined
            }),
        }
    }
}
/**
 * 提醒参数表单视图
 */
export default inject('reminderParameterStore')(Form.create<IReminderParameterFormProps>(formCreateOption)(ReminderParameterFormView))