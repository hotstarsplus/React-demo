import { Form, Input } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { IPriceRepireMeterFormProps } from "./interface";
import { PriceRepireMeterFormUiAction } from "./uiAction";

/**
 *  校表维修费表单视图.（只有表单内容，没有提交按钮）
 */
class PriceRepireMeterForm extends React.Component<IPriceRepireMeterFormProps>{
    private uiAction : PriceRepireMeterFormUiAction;

    private formItemLayoutStyle:{
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 15
        }
    };

    constructor(props:IPriceRepireMeterFormProps){
        super(props);
        this.uiAction = new PriceRepireMeterFormUiAction(this.props);
    }

    public componentDidMount(){
        this.props.getAction(this.uiAction);

    }

    public render(){
        const form = this.props.form;
        return(
            <Form>
                <Form.Item {...this.formItemLayoutStyle} label="水表口径Id" style = {{"display":"none"}}>
                    {
                        form.getFieldDecorator(
                            'MeterCaliberId', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                            })(<Input placeholder='水表口径Id' disabled={true} />)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="水表口径">
                    {
                        form.getFieldDecorator(
                            'MeterCaliber', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                            })(<Input placeholder='水表口径' disabled = {true}/>)
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

const formCreateOption: FormCreateOption<IPriceRepireMeterFormProps> = {
    mapPropsToFields(props){
        const priceRepireMeter = props.GlobalPriceRepireMeterStore!.currentEditRow;
        return{
            AutoId:Form.createFormField({
                value: priceRepireMeter.AutoId,
            }),
            MeterCaliberId:Form.createFormField({
                value: priceRepireMeter.MeterCaliberId,
            }),
            Price:Form.createFormField({
                value: priceRepireMeter.Price,
            }),
        }
    }
}
/**
 * 校表维修费编辑视图
 */
export default Form.create<IPriceRepireMeterFormProps>(formCreateOption)(PriceRepireMeterForm);