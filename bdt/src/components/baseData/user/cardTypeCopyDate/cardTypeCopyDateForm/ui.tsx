import {Form,Input} from 'antd';
import {FormCreateOption} from 'antd/lib/form';
import * as React from 'react';
import {ICardTypeCopyDateFormProps} from './interface';
import {CardTypeCopyDateFormUiAction} from './uiAction';

class CardTypeCopyDateForm extends React.Component<ICardTypeCopyDateFormProps>{
    public uiAction:CardTypeCopyDateFormUiAction;

    private fromItemLayoutStyle:{
        labelCol:{
            span:6
        },
        wrapperCol:{
            span:15
        }
    };


    constructor(props:ICardTypeCopyDateFormProps){
        super(props);
        this.uiAction=new CardTypeCopyDateFormUiAction(this.props);
    }

    public componentDidMount(){
        this.props.getAction(this.uiAction);
    }
    public render(){
        const form =this.props.form;
        return(
            <Form>
                <Form.Item {...this.fromItemLayoutStyle} label="序号" style={{"display":"none"}}>
                {
                    form.getFieldDecorator(
                        'Autoid',{}
                    )(<Input placeholder='序号' disabled={true} />)
                }
                </Form.Item>
                <Form.Item {...this.fromItemLayoutStyle} label="编码" style={{"display":"none"}}>
                {
                    form.getFieldDecorator('CardTypeId',{})(<Input placeholder='编码' disabled={true} />)
                }
                </Form.Item>
                <Form.Item {...this.fromItemLayoutStyle} label="抄表开始日期" style={{"display":"none"}}>
                {
                    form.getFieldDecorator('CopyDayBegin',{})(<Input placeholder='抄表开始日期' disabled={true} />)
                }
                </Form.Item>        
                <Form.Item {...this.fromItemLayoutStyle} label="抄表结束日期" style={{"display":"none"}}>
                {
                    form.getFieldDecorator('CopyDayEnd',{})(<Input placeholder='抄表结束日期' disabled={true} />)
                }
                </Form.Item>  
                <Form.Item {...this.fromItemLayoutStyle} label="水卡类型编码">
                    {
                        form.getFieldDecorator(
                            'CardTypeId',
                            {
                                rules:[{
                                    message:'请输入水卡类型编码',
                                    required:true,
                                }]
                            })(<Input placeholder='水卡类型编码' />)
                    } 
                </Form.Item> 
                <Form.Item {...this.fromItemLayoutStyle} label="抄表开始日期">
                    {
                        form.getFieldDecorator(
                            'CopyDayBegin',
                            {
                                rules:[{
                                    message:'请输入抄表开始日期',
                                    required:true,
                                }]
                            })(<Input placeholder='抄表开始日期' />)
                    } 
                </Form.Item> 
                <Form.Item {...this.fromItemLayoutStyle} label="抄表结束日期">
                    {
                        form.getFieldDecorator(
                            'CopyDayEnd',
                            {
                                rules:[{
                                    message:'请输入抄表结束日期',
                                    required:true,
                                }]
                            })(<Input placeholder='抄表结束日期' />)
                    } 
                </Form.Item>                   
            </Form>
        );
    }
}
const formCreateOption : FormCreateOption<ICardTypeCopyDateFormProps>={
    mapPropsToFields(props){
        const cardTypeCopyDateModel=props.store.currentEditItem;
        return {
            AutoId:Form.createFormField({value:cardTypeCopyDateModel.AutoId}),
            CardTypeId:Form.createFormField({value:cardTypeCopyDateModel.CardTypeId}),
            CopyDayBegin:Form.createFormField({value:cardTypeCopyDateModel.CopyDayBegin}),
            CopyDayEnd:Form.createFormField({value:cardTypeCopyDateModel.CopyDayEnd})
        };
    }
}


export default Form.create<ICardTypeCopyDateFormProps>(formCreateOption)(CardTypeCopyDateForm);