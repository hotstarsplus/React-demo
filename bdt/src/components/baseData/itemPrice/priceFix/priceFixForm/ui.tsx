import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { IPriceFixFormProps } from "./interface";
import { PriceFixFormUiAction } from "./uiAction";

/**
 *  单个固定费用价格表单视图.（只有表单内容，没有提交按钮）
 */
class PriceFixForm extends React.Component<IPriceFixFormProps>{
    private uiAction : PriceFixFormUiAction;

    private formItemLayoutStyle:{
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 15
        }
    };

    constructor(props:IPriceFixFormProps){
        super(props);
        this.uiAction = new PriceFixFormUiAction(this.props);
    }

    public componentDidMount(){
        this.props.getAction(this.uiAction);

    }

    public render(){
        const form = this.props.form;
        return(
            <Form>
                <Form.Item {...this.formItemLayoutStyle} label="用水性质id" style={{display:"none"}}>
                    {
                        form.getFieldDecorator(
                            'WaterKindId', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                
                            })(<Input placeholder='用水性质id' disabled={true}/>)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="水费项目id" style={{display:"none"}}>
                    {
                        form.getFieldDecorator(
                            'itemId', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                
                            })(<Input placeholder='水费项目id' disabled={true}/>)
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

const formCreateOption: FormCreateOption<IPriceFixFormProps> = {
    mapPropsToFields(props){
        const priceFix = props.store.currentEditRow;
        return{
            Price:Form.createFormField({
                value: priceFix.Price,
            }),
            WaterKind:Form.createFormField({
                value: priceFix.WaterKind,
            }),
            WaterKindId:Form.createFormField({
                value: priceFix.WaterKindId,
            }),
            WaterRateItem:Form.createFormField({
                value: priceFix.WaterRateItem,
            }),
            itemId:Form.createFormField({
                value: priceFix.itemId,
            }),
        }
    }
}
/**
 * 固定费用价格编辑视图
 */
export default Form.create<IPriceFixFormProps>(formCreateOption)(PriceFixForm);