import { Form, Input } from "antd";
import { FormCreateOption } from 'antd/lib/form';
import * as React from "react";
import { WaterKindSelectView } from "../waterKindSelector/ui";
import { IWaterKindFormProps } from "./interface";
import { WaterKindFormUiAction } from "./uiAction";


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
 * 单个用水性质表单视图.（只有表单内容，没有提交按钮）
 */
class WaterKindFormView extends React.Component<IWaterKindFormProps>{

    private uiAction:WaterKindFormUiAction;
    

    /**
     * 构造
     * @param props 
     */
    constructor(props:IWaterKindFormProps){
        
        super(props)
    
        this.uiAction = new WaterKindFormUiAction(props);

    }

    /**
     *  组装组件
     */
    public componentDidMount(){
        this.props.getUiAction(this.uiAction);
    }

    public render(){
        const form = this.props.form;
        return(
            <Form>
                  <Form.Item {...formLayoutStyle} label="请输入用水性质ID" style={{"display":"none"}}>
                    {
                        form.getFieldDecorator(
                            "WaterKindId",
                            {
                            }
                        )(<Input placeholder="请输入用水性质ID" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="上级用水性质" >
                    {
                        form.getFieldDecorator(
                            "FatherId",
                           {
                            rules:[{
                                message:"请选择父级",
                                required:true
                            }]
                           }
                        )(<WaterKindSelectView 
                            WaterKindList={this.props.GlobalWaterKindStore!.WaterKindList.slice()}
                            disabled = {this.props.GlobalWaterKindStore!.SelectorDisabled}
                            />)
                             
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="请输入用水性质">
                    {
                        form.getFieldDecorator(
                            "WaterKindName",
                            {
                                rules:[
                                    {
                                        message:"请输入用水性质",
                                        required:true,
                                    },
                                    {
                                        max:15,
                                        message:"长度不能大于15"
                                    },
                                    {
                                        whitespace:true,
                                        message:"不能为空"
                                    }
                                ]
                            }
                        )(<Input placeholder="请输入用水性质" />)
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
                        )(<WaterKindSelectView 
                            WaterKindList={this.props.GlobalWaterKindStore!.WaterKindList.slice()}
                            disabled = {this.props.GlobalWaterKindStore!.SelectorDisabled}
                            />)
                             
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="请输入综合水价">
                    {
                        form.getFieldDecorator(
                            "ColligationPrice",
                            {
                                initialValue:0,
                                rules:[
                                {
                                    message:"综合水价必须是大于等于零的数字且长度不能大于10位",
                                    type:"number",
                                    transform(value):any{
                                        console.log(value);
                                        if (Number(value)>=0&&value.toString().length<10) {
                                            console.log(value);
                                            return Number(value);
                                        }else{
                                            return "0";
                                        }
                                    }
                                }
                            ]
                            }
                        )(<Input placeholder="请输入综合水价" />)
                    }
                </Form.Item>
            </Form>

        );
    }
}

const formCreateOption : FormCreateOption<IWaterKindFormProps>={
    mapPropsToFields(props){
        const waterKind = props.GlobalWaterKindStore.CurrentEditWaterKind;
        return{
            ColligationPrice:Form.createFormField({
                value:waterKind.ColligationPrice
            }),
            FatherId:Form.createFormField({
                value:waterKind.FatherId
            }),
            WaterKindId:Form.createFormField({
                value:waterKind.WaterKindId
            }),
            WaterKindName:Form.createFormField({
                value:waterKind.WaterKindName
            })

        }
    }
}

/**
 * 用水性质编辑视图
 */
export default Form.create<IWaterKindFormProps>(formCreateOption)(WaterKindFormView);