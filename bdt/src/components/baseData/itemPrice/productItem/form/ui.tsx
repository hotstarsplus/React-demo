import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { IProductItemFormProps } from './interface';
import { ProductItemFormUiAction } from './uiAction';

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
class ProductItemForm extends React.Component<IProductItemFormProps> {
    private uiAction: ProductItemFormUiAction;

    constructor(props: IProductItemFormProps) {
        super(props);
        this.uiAction = new ProductItemFormUiAction(this.props);
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
                            'ProductItemId',
                            {

                            })(<Input disabled={true} />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="项目名称">
                    {
                        form.getFieldDecorator(
                            'ProductItemName',
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
            </Form>
        );
    }
}

const formCreateOption: FormCreateOption<IProductItemFormProps> = {
    mapPropsToFields(props) {
        const item = props.store.currentEditItem;
        return {
            ProductItemId: Form.createFormField({
                value: item.ProductItemId,
            }),
            ProductItemName: Form.createFormField({
                value: item.ProductItemName,
            })
        };
    }
}


/**
 * 水费项目类型编辑视图
 */
export default Form.create<IProductItemFormProps>(formCreateOption)(ProductItemForm);
