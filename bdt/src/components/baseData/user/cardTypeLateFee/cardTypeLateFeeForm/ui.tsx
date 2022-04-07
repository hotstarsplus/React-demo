import { Form, Input, Select } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import * as React from 'react';
import { ICardTypeLateFeeFormProps } from "./interface";
import { CardTypeLateFeeFormUiAction } from "./uiAction";

/**
 *  用户类型违约金表单视图.（只有表单内容，没有提交按钮）
 */
class CardTypeLateFeeForm extends React.Component<ICardTypeLateFeeFormProps>{
    private uiAction : CardTypeLateFeeFormUiAction;

    private formItemLayoutStyle:{
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 15
        }
    };

    constructor(props:ICardTypeLateFeeFormProps){
        super(props);
        this.uiAction = new CardTypeLateFeeFormUiAction(this.props);
    }

    public componentDidMount(){
        this.props.getAction(this.uiAction);

    }

    public render(){
        const form = this.props.form;
        return(
            <Form>
                <Form.Item {...this.formItemLayoutStyle} label="序号" style = {{"display":"none"}}>
                    {
                        form.getFieldDecorator(
                            'AutoId', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                            })(<Input placeholder='序号' disabled={true} />)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="水卡型号">
                    {
                        form.getFieldDecorator(
                            'CardType', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                rules: [{
                                    message: '请选择水卡型号',
                                    required: true,
                                }]
                            })(<Input placeholder='水卡型号'/>)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="是否计算违约金" style={{"display":"none"}}>
                    {
                        form.getFieldDecorator(
                            'IsLateFee', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                rules: [{
                                    message: '请选择是否计算违约金',
                                    required: true,
                                }]
                            })(<Select
                              >
                                <Select.Option value="是" key="true">是</Select.Option>
                                <Select.Option value="否" key="false">否</Select.Option>
                              </Select>)
                    }
                </Form.Item>
                <Form.Item {...this.formItemLayoutStyle} label="是否删除">
                    {
                        form.getFieldDecorator(
                            'IsDelete', // 注意 :此处的id必须与实体的属性名称完全一致。
                            {
                                
                            })(<Input placeholder='是否删除' />)
                    }
                </Form.Item>
            </Form>
        );
    }

}

const formCreateOption: FormCreateOption<ICardTypeLateFeeFormProps> = {
    mapPropsToFields(props){
        const priceNormal = props.store.currentEditRow;
        return{
            AutoId:Form.createFormField({
                value: priceNormal.AutoId,
            }),
            CardType:Form.createFormField({
                value: priceNormal.CardType,
            }),
            IsDelete:Form.createFormField({
                value: priceNormal.IsDelete,
            }),
            IsLateFee:Form.createFormField({
                value: priceNormal.IsLateFee,
            }),
        }
    }
}
/**
 * 用户类型违约金编辑视图
 */
export default Form.create<ICardTypeLateFeeFormProps>(formCreateOption)(CardTypeLateFeeForm);




















