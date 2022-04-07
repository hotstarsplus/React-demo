import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { IPriceNormalFormProps } from "./interface";
import { PriceNormalFormUiAction } from "./uiAction";

/**
 *  单个普通水价表单视图.（只有表单内容，没有提交按钮）
 */
class PriceNormalForm extends React.Component<IPriceNormalFormProps>{
    private uiAction : PriceNormalFormUiAction;

    private formItemLayoutStyle:{
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 15
        }
    };

    constructor(props:IPriceNormalFormProps){
        super(props);
        this.uiAction = new PriceNormalFormUiAction(this.props);
    }

    public componentDidMount(){
        this.props.getAction(this.uiAction);

    }

    public render(){
        const form = this.props.form;
        return(
            <Form>
            <Form.Item {...this.formItemLayoutStyle} label="用水性质id" style = {{"display":"none"}}>
                {
                    form.getFieldDecorator(
                        'WaterKindId', // 注意 :此处的id必须与实体的属性名称完全一致。
                        {
                        })(<Input placeholder='用水性质id' disabled={true} />)
                }
            </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="水费项目id" style = {{"display":"none"}}>
                    {
                        form.getFieldDecorator(
                            'itemId', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                            })(<Input placeholder='水费项目id' disabled={true} />)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="用水性质">
                    {
                        form.getFieldDecorator(
                            'WaterKind', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                
                            })(<Input placeholder='用水性质' disabled={true}/>)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="水费项目">
                    {
                        form.getFieldDecorator(
                            'WaterRateItem', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                
                            })(<Input placeholder='水费项目' disabled={true}/>)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="单价(只保留四位小数)">
                    {
                        form.getFieldDecorator(
                            'Price', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                rules: [{
                                    message: '请输入正确的单价',
                                    pattern: new RegExp("^([0-9]{1,19})+(.[0-9]{1,4})?$"),
                                    required: true,
                                }]
                            })(<Input placeholder='单价' />)
                    }
                </Form.Item>
            </Form>
        );
    }

}

const formCreateOption: FormCreateOption<IPriceNormalFormProps> = {
    mapPropsToFields(props){
        const priceNormal = props.store.currentEditRow;
        return{
            AutoId:Form.createFormField({
                value: priceNormal.AutoId,
            }),
            Price:Form.createFormField({
                value: priceNormal.Price,
            }),
            WaterKind:Form.createFormField({
                value: priceNormal.WaterKind,
            }),
            WaterKindId:Form.createFormField({
                value: priceNormal.WaterKindId,
            }),
            WaterRateItem:Form.createFormField({
                value: priceNormal.WaterRateItem,
            }),
            itemId:Form.createFormField({
                value: priceNormal.itemId,
            }),
        }
    }
}
/**
 * 普通水价编辑视图
 */
export default Form.create<IPriceNormalFormProps>(formCreateOption)(PriceNormalForm);