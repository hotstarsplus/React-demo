import { Form, Input } from "antd";
import { FormCreateOption } from 'antd/lib/form';
import * as React from "react";
import { WaterStationTreeSelect } from "../waterStationSelector/ui";
import { IWaterStationFormProps } from "./interface";
import { WaterStationFormUiAction } from "./uiAction";

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
 * 供水所表单视图（只有表单内容，没有提交按钮）
 */
class WaterStationFormView extends React.Component<IWaterStationFormProps>{

    private uiAction: WaterStationFormUiAction;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IWaterStationFormProps) {

        super(props);

        this.uiAction = new WaterStationFormUiAction(props);

    }

    /**
     *  组装组件时加载数据
     */
    public componentDidMount() {
        this.props.getUiAction(this.uiAction);
    }

    public render() {
        const form = this.props.form;
        return (
            <Form>
                <Form.Item {...formLayoutStyle} label="请输入供水所ID" style={{ "display": "none" }} >
                    {
                        form.getFieldDecorator(
                            "WaterStationId",
                            {
                            }
                        )(<Input placeholder="请输入供水所ID" />)
                    }
                </Form.Item>
                {this.props.GlobalWaterStationStore!.operatorType === "add" ? <Form.Item {...formLayoutStyle} label="上级供水所" >
                    {
                        form.getFieldDecorator(
                            "FatherId",
                        )(<WaterStationTreeSelect
                            list={this.props.GlobalWaterStationStore!.WaterStationUiLists}
                            disabled={this.props.GlobalWaterStationStore!.SelectorDisabled}
                            setFieldsValue={this.props.form.setFieldsValue}
                            getMaxSortNo={this.props.getMaxSortNo}
                        />)
                    }
                </Form.Item>
                    :
                    <>
                        <Form.Item {...formLayoutStyle} label="上级供水所" >
                            <Input value={this.props.GlobalWaterStationStore!.highName} disabled={true} />
                        </Form.Item>
                        <Form.Item {...formLayoutStyle} label="id" style={{ "display": "none" }}>
                            {
                                form.getFieldDecorator(
                                    "FatherId",
                                )(<Input />)
                            }
                        </Form.Item>
                    </>
                }

                <Form.Item {...formLayoutStyle} label="供水所名称">
                    {
                        form.getFieldDecorator(
                            "WaterStationName",
                            {
                                rules: [{
                                    message: "请输入供水所名称（不能全为空格）",
                                    required: true, whitespace: true,
                                }, {
                                    max: 32,
                                    message: '超出长度限制且不允许保存',
                                }]
                            }
                        )(<Input placeholder="请输入供水所" />)
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
                            "WaterStationAddress",
                            {
                                rules: [
                                {
                                    max: 64,
                                    message: '超出长度限制且不允许保存',
                                }]
                            }
                        )(<Input placeholder="请输入地址" />)
                    }
                </Form.Item>

                <Form.Item {...formLayoutStyle} label="联系人">
                    {
                        form.getFieldDecorator(
                            "WaterStationLinkMan",
                            {
                                rules: [
                                {
                                    max: 32,
                                    message: '超出长度限制且不允许保存',
                                }]
                            }
                        )(<Input placeholder="请输入联系人" />)
                    }
                </Form.Item>

                <Form.Item {...formLayoutStyle} label="电话">
                    {
                        form.getFieldDecorator(
                            "WaterStationTel",
                            {
                                rules: [{
                                    message: '请输入正确的电话',
                                    pattern: new RegExp("^1[3|4|5|7|8][0-9]{9}$"),
                                },
                                {
                                    max: 64,
                                    message: '超出长度限制且不允许保存',
                                }]
                            }
                        )(<Input placeholder="请输入电话" />)
                    }
                </Form.Item>

                <Form.Item {...formLayoutStyle} label="备注">
                    {
                        form.getFieldDecorator(
                            "Description",
                            {
                                rules: [
                                {
                                    max: 256,
                                    message: '超出长度限制且不允许保存',
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
const formCreateOption: FormCreateOption<IWaterStationFormProps> = {
    mapPropsToFields(props) {
        const WaterStation = props.GlobalWaterStationStore.CurrentEditWaterStation;
        return {
            WaterStationAddress: Form.createFormField({
                value: WaterStation.WaterStationAddress
            }),
            Description: Form.createFormField({
                value: WaterStation.Description
            }),
            FatherId: Form.createFormField({
                value: WaterStation.FatherId
            }),
            WaterStationLinkMan: Form.createFormField({
                value: WaterStation.WaterStationLinkMan
            }),
            WaterStationTel: Form.createFormField({
                value: WaterStation.WaterStationTel
            }),
            WaterStationName: Form.createFormField({
                value: WaterStation.WaterStationName
            }),
            WaterStationId: Form.createFormField({
                value: WaterStation.WaterStationId
            }),
            SortNo: Form.createFormField({
                value: WaterStation.SortNo
            })

        }
    }
}

export default Form.create<IWaterStationFormProps>(formCreateOption)(WaterStationFormView);