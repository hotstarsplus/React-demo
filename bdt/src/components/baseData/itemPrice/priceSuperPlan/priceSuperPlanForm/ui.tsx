import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { IPriceSuperPlanFormProps } from "./interface";
import { PriceSuperPlanFormUiAction } from "./uiAction";

/**
 *  单个超计划水价表单视图.（只有表单内容，没有提交按钮）
 */
class PriceSuperPlanForm extends React.Component<IPriceSuperPlanFormProps>{
    private uiAction : PriceSuperPlanFormUiAction;

    private formItemLayoutStyle:{
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 15
        }
    };

    
    constructor(props:IPriceSuperPlanFormProps){
        super(props);
        this.uiAction = new PriceSuperPlanFormUiAction(this.props);
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
                            'WaterRateItemId', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                            })(<Input placeholder='水费项目id' disabled={true} />)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="用水性质" >
                    {
                        form.getFieldDecorator(
                            'waterKind', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                
                            })(<Input placeholder='用水性质' disabled={true}/>)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="水费项目">
                    {
                        form.getFieldDecorator(
                            'WaterRateItem', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                
                            })(<Input disabled={true} value = {"111"}/>)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="级别" style={{"display":"none"}}>
                    {
                        form.getFieldDecorator(
                            'Levels', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                
                            })(<Input placeholder='级别' disabled={true}/>)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="水量比例下限(只保留四位小数)">
                    {
                        form.getFieldDecorator(
                            'minQuantityPercent', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                rules: [{
                                    message: '请输入正确的水量比例下限',
                                    pattern: new RegExp("^([0-9]{1,19})+(.[0-9]{1,4})?$"),
                                    required: true,
                                }]
                            })(<Input placeholder='水量比例下限' />)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="水量比例上限(只保留四位小数)">
                    {
                        form.getFieldDecorator(
                            'maxQuantityPercent', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                rules: [{
                                    message: '请输入正确的水量比例上限',
                                    pattern: new RegExp("^([0-9]{1,19})+(.[0-9]{1,4})?$"),
                                    required: true,
                                }]
                            })(<Input placeholder='水量比例上限' />)
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

const formCreateOption: FormCreateOption<IPriceSuperPlanFormProps> = {
    mapPropsToFields(props){
        const priceSuperPlan = props.store.currentEditRow;
        return{
            AutoId:Form.createFormField({
                value: priceSuperPlan.AutoId,
            }),
            
            Levels:Form.createFormField({
                value: priceSuperPlan.Levels,
            }),
            Price:Form.createFormField({
                value: priceSuperPlan.Price,
            }),
            WaterKindId:Form.createFormField({
                value: priceSuperPlan.WaterKindId,
            }),
            WaterRateItem:Form.createFormField({
                value: priceSuperPlan.WaterRateItem,
            }),
            WaterRateItemId:Form.createFormField({
                value: priceSuperPlan.WaterRateItemId,
            }),
            maxQuantityPercent:Form.createFormField({
                value: priceSuperPlan.maxQuantityPercent,
            }),
            minQuantityPercent:Form.createFormField({
                value: priceSuperPlan.minQuantityPercent,
            }),
            waterKind:Form.createFormField({
                value: priceSuperPlan.waterKind,
            }),
        }
    }
}
/**
 * 超计划水价编辑视图
 */
export default Form.create<IPriceSuperPlanFormProps>(formCreateOption)(PriceSuperPlanForm);