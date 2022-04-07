import { Form, Input, Radio } from "antd";
import * as React from "react";
import { TaxPreConSelect } from "../../taxPreConSelect/ui";
import { TaxRateSelect } from "../../taxRateSelect/ui";
import { IThirdPartyInvoiceParamAddFormProps } from "./interface";
import { ThirdPartyInvoiceParamAddFormUiAction } from "./uiAction";


const formItemLayoutStyle={
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 15
    }
}



class ThirdPartyInvoiceParamAddForm extends React.Component<IThirdPartyInvoiceParamAddFormProps>{

        private uiAction:ThirdPartyInvoiceParamAddFormUiAction;

        constructor(props:IThirdPartyInvoiceParamAddFormProps){
            super(props);
            this.uiAction = new ThirdPartyInvoiceParamAddFormUiAction(props);
        }

        public componentWillMount(){
            this.props.getValidate(this.uiAction.validate);
        }


        public render(){
            const form = this.props.form;
            return(
                <Form>
                    <Form.Item  {...formItemLayoutStyle} label={"税率"} style={{marginBottom:"12px"}} >
                        {
                            form.getFieldDecorator("TaxRate",
                                {
                                    rules:[
                                        {
                                            required:true,
                                            message:"不能为空",
                                            whitespace:true,
                                            type:"number"
                                        }
                                    ]
                                }
                            )(<TaxRateSelect />)
                        }
                    </Form.Item>
                    <Form.Item  {...formItemLayoutStyle} label={"商品分类编码"} style={{marginBottom:"12px"}} >
                        {
                            form.getFieldDecorator("GoodsNo",
                                {
                                    rules:[
                                        {
                                            required:true,
                                            pattern:new RegExp("^\\d+$"),
                                            message:"必须是数字"
                                        },
                                        {
                                            required:true,
                                            len:19,
                                            message:"长度必须是19位"
                                        }
                                    ]
                                }
                            )(<Input />)
                        }
                    </Form.Item>
                    <Form.Item  {...formItemLayoutStyle} label={"计量单位"} style={{marginBottom:"12px"}} >
                        {
                            form.getFieldDecorator("Uom",
                                {
                                    rules:[
                                        {
                                            message:"最大长度不能超过5",
                                            max:5,
                                        }
                                    ]
                                }
                            )(<Input />)
                        }
                    </Form.Item>
                    <Form.Item  {...formItemLayoutStyle} label={"优惠政策标识"} style={{marginBottom:"12px"}} >
                        {
                            form.getFieldDecorator("TaxPre",
                                {
                                    initialValue:"0",
                                    rules:[
                                        {
                                            required:true,
                                            message:"不能为空",
                                            whitespace:true
                                        }
                                    ]
                                }
                            )(<Radio.Group>
                                <Radio value={"1"} >享受</Radio>
                                <Radio value={"0"} >不享受</Radio>
                            </Radio.Group>)
                        }
                    </Form.Item>
                    <Form.Item  {...formItemLayoutStyle} label={"优惠政策类型"} style={{marginBottom:"12px"}} >
                        {
                            form.getFieldDecorator("TaxPreCon",
                                {
                                  initialValue:""
                                }
                            )(<TaxPreConSelect />)
                        }
                    </Form.Item>
                    <Form.Item  {...formItemLayoutStyle} label={"规格型号"} style={{marginBottom:"12px"}} >
                        {
                            form.getFieldDecorator("Spec",
                                {
                                    rules:[
                                        {
                                            required:true,
                                            message:"不能为空",
                                            whitespace:true
                                        },
                                        {
                                            message:"最大长度不能超过15",
                                            max:15
                                        }
                                    ]
                                }
                            )(<Input />)
                        }
                    </Form.Item>
                    <Form.Item  {...formItemLayoutStyle} label={"编码版本号"} style={{marginBottom:"12px"}} >
                        {
                            form.getFieldDecorator("GoodsNoVer",
                                {
                                    rules:[
                                        {
                                            message:"最大长度不能超过15",
                                            max:15
                                        }
                                    ]
                                }
                            )(<Input />)
                        }
                    </Form.Item>
                    <Form.Item  {...formItemLayoutStyle} label={"含税标志"} style={{marginBottom:"12px"}} >
                        {
                            form.getFieldDecorator("PriceKind",
                                {
                                    initialValue:"1",
                                    rules:[
                                        {
                                            required:true
                                        }
                                    ]
                                }
                            )(<Radio.Group>
                                <Radio value={"1"} >含税</Radio>
                                <Radio value={"0"} >不含税</Radio>
                            </Radio.Group>)
                        }
                    </Form.Item>
                </Form>
            )
        }

}


export default Form.create<IThirdPartyInvoiceParamAddFormProps>()(ThirdPartyInvoiceParamAddForm);


