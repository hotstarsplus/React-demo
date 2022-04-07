import { Form, Input } from "antd";
import { FormCreateOption } from "antd/lib/form";
import * as React from "react";
import { ICopeUserFormProps } from "./interface";
import { CopeMenuFromUiAction } from "./uiAction"

/**
 * 表单样式布局
 */
const formLayoutStyle = {
    /**
     * lable标签
     */
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    /**
     * 输入控件，xs <576px; sm >= 576px
     */
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};


class CopeMenuFormView extends React.Component<ICopeUserFormProps,any>{

    private uiAction : CopeMenuFromUiAction; 

    constructor(props:ICopeUserFormProps){
        super(props);

        this.uiAction = new CopeMenuFromUiAction(props);
    }

    /**
     * 填充getUiAction，使得父组件可以获取到CopeMenuFromUiAction
     */
    public componentDidMount() {
        this.props.getUiAction(this.uiAction);
    }

    public render(){
        const form = this.props.form;
        return(
            <Form>
               <Form.Item {... formLayoutStyle} label="用户名">
                   {
                       form.getFieldDecorator(
                           "UserName",
                           {
                               rules:[{
                                   required:true,
                                   whitespace:true,
                                   message:"请输入用户名"
                               },{
                                   max:20,
                                   message:"输入超过限度"
                               }]
                           }
                       )(<Input placeholder="请输入用户名" />)
                   }
               </Form.Item>
               <Form.Item {... formLayoutStyle} label="隶属">
                   {
                       form.getFieldDecorator(
                           "FatherId",
                           {
                           }
                       )(<Input placeholder="改为下拉菜单"/>)
                   }
               </Form.Item>
               <Form.Item {... formLayoutStyle} label="性别">
                   {
                       form.getFieldDecorator(
                           "UserSex",
                           {
                               rules:[{
                                   required:true,
                                   whitespace:true,
                                   /* 正则表达式验证输入内容 */
                                   pattern: new RegExp("[/^男$|^女&/]"),
                                   message:"请输入性别，男/女"
                               }]
                           }
                       )(<Input placeholder="请输入性别"/>)
                   }
               </Form.Item>
               <Form.Item {... formLayoutStyle} label="地址">
                   {
                       form.getFieldDecorator(
                           "UserAddress",
                           {
                               rules:[{
                                   required:true,
                                   whitespace:true,
                                   message:"请输入地址（不能为空）"
                               },{
                                   max:200,
                                   message:"输入地址超出最大限度，请精简不必要的部分"
                               }]
                           }
                       )(<Input placeholder="请输入地址"/>)
                   }
               </Form.Item>
               <Form.Item {... formLayoutStyle} label="状态">
                   {
                       form.getFieldDecorator(
                           "UserState",
                           {
                               rules:[{
                                  /*  正则表达式验证输入内容 */
                                   pattern: new RegExp("在用|停用"),
                                   message:"请输入状态，在用/停用"
                               }]
                           }
                       )(<Input placeholder="请输入状态，在用/停用"/>)
                   }
               </Form.Item>
               <Form.Item {... formLayoutStyle} label="联系方式">
                   {
                       form.getFieldDecorator(
                           "PhoneNumber",
                           {
                               rules:[{
                                   required:true,
                                   whitespace:true,
                                   /* 正则表达式验证输入内容 */
                                   pattern: new RegExp(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/),
                                   message:"请输入正确的手机号码"
                               }]
                           }
                       )(<Input placeholder="请输入联系方式"/>)
                   }
               </Form.Item>
            </Form>
        );
    }
}

const formCreateOption: FormCreateOption<ICopeUserFormProps> = {
    mapPropsToFields(props) {
        const CopeMenuUser = props.GlobalUserUiStore.CurrentEditUser;
        return {
            UserName: Form.createFormField({
                value: CopeMenuUser.UserName
            }),
            FatherId: Form.createFormField({
                value: CopeMenuUser.FatherId
            }),
            UserSex: Form.createFormField({
                value: CopeMenuUser.UserSex
            }),
            UserAddress: Form.createFormField({
                value: CopeMenuUser.UserAddress
            }),
            UserState: Form.createFormField({
                value: CopeMenuUser.UserState
            }),
            PhoneNumber: Form.createFormField({
                value: CopeMenuUser.PhoneNumber
            })
        }
    }
}
 
export default Form.create<ICopeUserFormProps>(formCreateOption)(CopeMenuFormView);
