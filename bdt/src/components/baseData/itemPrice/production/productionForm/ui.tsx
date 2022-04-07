import { Form,Input,Radio ,  } from "antd";
import { FormCreateOption } from 'antd/lib/form';
import * as React from "react";
import { CalcFeeTypeSelector } from "../../../calcFee";
import { ProductTypeSelector } from "../../productType";
import { IWaterProductionFormProps } from "./interface";
import { WaterProductionFormUiAction } from "./uiAction";


const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 14
    }
}

/**
 * form表单
 */
class WaterProductionFormView extends React.Component<IWaterProductionFormProps>{


    private uiAction:WaterProductionFormUiAction;


    constructor(props:IWaterProductionFormProps){

        super(props);

        this.uiAction = new WaterProductionFormUiAction(props);

    }
    public componentDidMount() {
        this.props.getUiAction(this.uiAction);
    }

    public render(){
        const form = this.props.form;
        form.getFieldDecorator('ProductId');
        form.getFieldDecorator('CalcFeeTypeName');
        form.getFieldDecorator('WaterKindId');
        form.getFieldDecorator('WaterFeeItemId');
        form.getFieldDecorator('ProductTypeName');
        form.getFieldDecorator('IsDelete');
        return(
            <Form  layout="horizontal">
                <Form.Item style={{marginBottom: "4px"}} {...formItemLayout} label="用水性质">
                    {
                        form.getFieldDecorator(
                            'WaterKindName', 
                            {
                                rules: [{
                                    message: '用水性质',
                                    required: true,
                                }]
                            })(<Input placeholder='水费项目' disabled={true} />)
                    }
                </Form.Item>
                <Form.Item style={{marginBottom: "4px"}} {...formItemLayout} label="水费项目">
                    {
                        form.getFieldDecorator(
                            'WaterFeeItemName', 
                            {
                                rules: [{
                                    message: '水费项目',
                                    required: true,
                                }]
                            })(<Input placeholder='水费项目' disabled={true} />)
                    }
                </Form.Item>
                <Form.Item style={{marginBottom: "4px"}} {...formItemLayout} label="计费方式">
                    {
                        form.getFieldDecorator(
                            'CalcFeeTypeId', 
                            {   
                                rules: [{
                                    message: '请选择计费方式',
                                    required: true,
                                }]
                            })(<CalcFeeTypeSelector businessTypeId={1} onChange={this.uiAction.OnCalcFeeTypeSelectChange} />)
                    }
                </Form.Item>
                <Form.Item style={{marginBottom: "4px"}} {...formItemLayout} label="是否由系统计费">
                    {
                        form.getFieldDecorator(
                            'IsSystemClacFee', 
                            {
                                rules: [{
                                    message: '请选择是否由系统计费:',
                                    required: true,
                                    
                                }]
                            })( <Radio.Group  >
                                    <Radio value={'1'}>是</Radio>
                                    <Radio value={'0'}>否</Radio>
                                </Radio.Group>)
                    }
                </Form.Item>
                <Form.Item style={{marginBottom: "4px"}} {...formItemLayout} label="是否随机收费项目">
                    {
                        form.getFieldDecorator(
                            'IsRandClacFee', 
                            {
                                rules: [{
                                    message: '请选择是否随机收费项目',
                                    required: true,
                                }]
                            })(
                            <Radio.Group >
                                <Radio value={'1'}>是</Radio>
                                <Radio value={'0'}>否</Radio>
                            </Radio.Group>
                            )
                    }
                 </Form.Item>
                 <Form.Item style={{marginBottom: "4px"}} {...formItemLayout} label="是否增值税">
                    {
                        form.getFieldDecorator(
                            'IsAddedTax', 
                            {
                                rules: [{
                                    message: '请选择是否增值税',
                                    required: true,
                                }]
                            })(
                            <Radio.Group  >
                                <Radio value={'1'}>是</Radio>
                                <Radio value={'0'}>否</Radio>
                            </Radio.Group>
                            )
                    }
                 </Form.Item>
                 <Form.Item style={{marginBottom: "4px"}} {...formItemLayout} label="是否计算违约金">
                    {
                        form.getFieldDecorator(
                            'IsCalcLateFee', 
                            {
                                rules: [{
                                    message: '请选择是否计算违约金',
                                    required: true,
                                }]
                            })(
                            <Radio.Group  >
                                <Radio value={'1'}>是</Radio>
                                <Radio value={'0'}>否</Radio>
                            </Radio.Group>
                            )
                    }
                 </Form.Item>
                 <Form.Item style={{marginBottom: "4px"}} {...formItemLayout} label="会计科目">
                    {
                        form.getFieldDecorator(
                            'AccountCode', 
                            {
                                rules:[{
                                    max:15,
                                    message:"长度不能大于15"
                                }]
                            })(<Input placeholder="请输入会计科目" />)
                    }
                </Form.Item>
                <Form.Item style={{marginBottom: "4px"}} {...formItemLayout} label="产品类型">
                    {
                        form.getFieldDecorator(
                            'ProductTypeId', 
                            {
                                rules: [{
                                    message: '请选择产品类型',
                                    required: true,
                                }]
                            })(<ProductTypeSelector onChange = {this.uiAction.OnProductTypeSelectChange} />)
                    }
                 </Form.Item>
                <Form.Item 
                    {...formItemLayout} 
                    label="水费价格"
                    style={{display:form.getFieldValue("CalcFeeTypeId")!=="superPlanOuter"&&form.getFieldValue("CalcFeeTypeId")!=="ladder"?"":"none",marginBottom: "4px"}}   
                >
                    {
                        form.getFieldDecorator(
                            'ActualPrice', 
                            {
                                rules: [{
                                    required: true,
                                    validator:this.uiAction.PriceValidator
                                }]
                            })(<Input placeholder={"请输入水费价格"} />)
                    }
                 </Form.Item>
                 <div 
                    style={
                        {
                            color:"#FF9A2B",
                            textAlign:"center",
                            display:form.getFieldValue("CalcFeeTypeId")==="superPlanOuter"?"block":"none"
                        }
                    }  
                 >
                     备注: 超计划外计费方式水价请在超计划水价窗口进行设置
                </div>
                <div 
                    style={
                        {
                            color:"#FF9A2B",
                            textAlign:"center",
                            display:form.getFieldValue("CalcFeeTypeId")==="ladder"?"block":"none"
                        }
                    }  
                 >
                     备注: 阶梯计费方式水价请在阶梯水价窗口进行设置
                </div>
            </Form>

        );

    }
}


const formCreateOption: FormCreateOption<IWaterProductionFormProps> = {
    mapPropsToFields(props) {
        const item = props.GlobalProductionStore!.CurrentEditItem;
        return {
            AccountCode: Form.createFormField({
                value: item.AccountCode,
            }),
            CalcFeeTypeId: Form.createFormField({
                value: item.CalcFeeTypeId,
            }),
            ProductTypeId: Form.createFormField({
                value: item.ProductTypeId,
            }),
            ProductTypeName: Form.createFormField({
                value: item.ProductTypeName,
            }),
            WaterFeeItemId: Form.createFormField({
                value: item.WaterFeeItemId,
            }),
            WaterKindId: Form.createFormField({
                value: item.WaterKindId,
            }),
            WaterKindName: Form.createFormField({
                value: item.WaterKindName,
            }),
            WaterFeeItemName: Form.createFormField({
                value: item.WaterFeeItemName,
            }),
            CalcFeeTypeName: Form.createFormField({
                value: item.CalcFeeTypeName,
            }),
            ActualPrice: Form.createFormField({
                value: item.ActualPrice,
            }),
            IsRandClacFee: Form.createFormField({
                value: item.IsRandClacFee.trim(),
            }),
            IsAddedTax: Form.createFormField({
                value: item.IsAddedTax.trim(),
            }),
            IsCalcLateFee: Form.createFormField({
                value: item.IsCalcLateFee.trim(),
            }),
            IsSystemClacFee: Form.createFormField({
                value: item.IsSystemClacFee.trim(),
            }),
            ProductId: Form.createFormField({
                value: item.ProductId,
            }),
            IsDelete: Form.createFormField({
                value: item.IsDelete,
            })
        };
    }
}



/**
 * 水费项目类型编辑视图
 */
export default Form.create<IWaterProductionFormProps>(formCreateOption)(WaterProductionFormView);