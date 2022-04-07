import { Form, Input } from "antd";
import { FormCreateOption } from 'antd/lib/form';
import * as React from "react";
import { CardTypeSelectView } from "../cardTypeSelector/ui";
import { ICardTypeFormProps } from "./interface";
import { CardTypeFormUiAction } from "./uiAction";

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
 * 单个用水性质表单视图.（只有表单内容，没有提交按钮）
 */
class CardTypeFormView extends React.Component<ICardTypeFormProps>{

    private uiAction: CardTypeFormUiAction;

    /**
     * 构造
     * @param props 
     */
    constructor(props: ICardTypeFormProps) {

        super(props)

        this.uiAction = new CardTypeFormUiAction(props);

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
                <Form.Item {...formLayoutStyle} label="请输入客户类型ID" style={{ "display": "none" }}>
                    {
                        form.getFieldDecorator(
                            "CardTypeId",
                        )(<Input placeholder="请输入客户类型ID" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="上级客户类型" >
                    {
                        form.getFieldDecorator(
                            "FatherId",
                        )(<CardTypeSelectView
                            disabled={this.props.GlobalCardTypeStore!.SelectorDisabled}
                            onChange={this.uiAction.OnChange}
                        />)

                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="客户类型">
                    {
                        form.getFieldDecorator(
                            "CardTypeName",
                            {
                                rules: [{
                                    message: "请输入正确的客户类型",
                                    required: true, whitespace: true
                                }, { max: 16, message: "超出长度限制" }]
                            }
                        )(<Input placeholder="请输入客户类型" />)
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
                <Form.Item {...formLayoutStyle} label="备注">
                    {
                        form.getFieldDecorator(
                            "Description",
                            {
                                rules: [{ max: 256, message: "超出长度限制" }]
                            }
                        )(<Input placeholder="请输入备注" />)
                    }
                </Form.Item>
            </Form>

        );
    }
}

const formCreateOption: FormCreateOption<ICardTypeFormProps> = {
    mapPropsToFields(props) {
        const CardType = props.GlobalCardTypeStore.currentEditCardType;

        return {
            Description: Form.createFormField({
                value: CardType.Description
            }),
            FatherId: Form.createFormField({
                value: CardType.FatherId
            }),
            CardTypeName: Form.createFormField({
                value: CardType.CardTypeName
            }),
            CardTypeId: Form.createFormField({
                value: CardType.CardTypeId
            }),
            SortNo: Form.createFormField({
                value: CardType.SortNo
            })

        }
    }
}

/**
 * 用水性质编辑视图
 */
export default Form.create<ICardTypeFormProps>(formCreateOption)(CardTypeFormView);