import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { WaterItemSelectView } from '../WaterItemSelectView/ui';
import { IWaterFeeItemFormProps } from './interface';
import { WaterFeeItemFormUiAction } from './uiAction';

const formLayoutStyle = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

/** 
 * 单个水费项目类型表单视图.（只有表单内容，没有提交按钮）
 */
class WaterFeeItemForm extends React.Component<IWaterFeeItemFormProps> {
    private uiAction: WaterFeeItemFormUiAction;

    constructor(props: IWaterFeeItemFormProps) {
        super(props);
        this.uiAction = new WaterFeeItemFormUiAction(this.props);
    }


    public componentDidMount() {
        this.props.getAction(this.uiAction);
    }

    public render() {
        const form = this.props.form;
        return (
            <Form>
                <Form.Item {...formLayoutStyle} label="项目Id" style={{ display: "none" }} >
                    {
                        form.getFieldDecorator(
                            'WaterFeeItemId',
                            {

                            })(<Input disabled={true} />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="项目名称">
                    {
                        form.getFieldDecorator(
                            'WaterFeeItemName',
                            {
                                rules: [
                                    {
                                        message: '请输入项目名称',
                                        required: true,
                                    },
                                    {
                                        max: 15,
                                        message: "长度不能大于15"
                                    },
                                    {
                                        whitespace: true,
                                        message: "不能为空"
                                    }
                                ]
                            })(<Input placeholder='项目名称' />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="业务类型" >
                    {
                        form.getFieldDecorator(
                            "BusinessType",
                           {
                            rules:[{
                                message:"请选择父级",
                                required:true
                            }]
                           }
                        )(<WaterItemSelectView 
                            WaterFeeItemList={this.props.store!.list.slice()}
                            disabled = {this.props.store!.SelectorDisabled}
                            />)
                    }
                </Form.Item>
            </Form>
        );
    }
}

const formCreateOption: FormCreateOption<IWaterFeeItemFormProps> = {
    mapPropsToFields(props) {
        const item = props.store.currentEditItem;
        return {
            WaterFeeItemId: Form.createFormField({
                value: item.WaterFeeItemId,
            }),
            WaterFeeItemName: Form.createFormField({
                value: item.WaterFeeItemName,
            })
        };
    }
}


/**
 * 水费项目类型编辑视图
 */
export default Form.create<IWaterFeeItemFormProps>(formCreateOption)(WaterFeeItemForm);
