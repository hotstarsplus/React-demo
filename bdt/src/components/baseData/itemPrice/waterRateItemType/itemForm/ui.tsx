import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { IWaterRateItemTypeItemFormProps } from './interface'
import { WaterRateItemTypeItemFormUiAction } from './uiAction';

/** 
 * 单个水费项目类型表单视图.（只有表单内容，没有提交按钮）
 */
class WaterRateItemTypeItemForm extends React.Component<IWaterRateItemTypeItemFormProps> {
    private uiAction: WaterRateItemTypeItemFormUiAction;

    private formItemLayoutStyle: {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 15
        }
    };

    constructor(props: IWaterRateItemTypeItemFormProps) {
        super(props);
        this.uiAction = new WaterRateItemTypeItemFormUiAction(this.props);
    }


    public componentDidMount() {
        this.props.getAction(this.uiAction);
    }

    public render() {
        const form = this.props.form;
        return (
            <Form>
                <Form.Item {...this.formItemLayoutStyle} label="项目类型Id">
                    {
                        form.getFieldDecorator(
                            'ItemTypeId', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                // initialValue: this.state.formData.ItemTypeId,
                                rules: [{
                                    message: '请输入项目类型Id',
                                    required: true,
                                }]
                            })(<Input placeholder='项目类型Id' />)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="项目类型名称">
                    {
                        form.getFieldDecorator(
                            'ItemTypeName', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                // initialValue: this.props.formData.ItemTypeName,
                                rules: [{
                                    message: '请输入项目类型名称',
                                    required: true,
                                }]
                            })(<Input placeholder='项目类型名称' />)
                    }
                </Form.Item>
            </Form>
        );
    }
}

const formCreateOption: FormCreateOption<IWaterRateItemTypeItemFormProps> = {
    mapPropsToFields(props) {
        // console.log(props);
        const item = props.store.currentEditItem;
        return {
            ItemTypeId: Form.createFormField({
                // ItemTypeId: { value: item.ItemTypeId },
                value: item.ItemTypeId,
            }),
            ItemTypeName: Form.createFormField({
                // ItemTypeName: { value: item.ItemTypeName },
                value: item.ItemTypeName,
            }),

        };
    }
}


/**
 * 水费项目类型编辑视图
 */
export default Form.create<IWaterRateItemTypeItemFormProps>(formCreateOption)(WaterRateItemTypeItemForm);
