import { Form, Input, Modal, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react";
import React from "react";
import { KnowledgeBaseDomainStore } from "../../domainStore";
import { KnowledgeBaseTypeEntity } from "../../entity";
import { KnowledgeBaseUiStore } from "../../uiStore";
import { QuestionTypeTags } from "./tagSetting";
import { KnowledgeBasePopUpFormUiAction } from "./uiAction";

export interface IKnowledgeBasePopUpForm extends FormComponentProps{
    uiStore:KnowledgeBaseUiStore;
    domainStore:KnowledgeBaseDomainStore;
    getdata:()=>void;
}

const formItemLayout = {
    labelCol: {
        md: { span: 6 },
        sm: { span: 24 },
        xs: { span: 24 }
    },
    wrapperCol: {
        md: { span: 16 },
        sm: { span: 24 },
        xs: { span: 24 }
    }
}

@observer
class KnowledgeBasePopUpForm extends React.Component<IKnowledgeBasePopUpForm,any>{

    public uiAction : KnowledgeBasePopUpFormUiAction;
    public uiStore:KnowledgeBaseUiStore;

    constructor(props:IKnowledgeBasePopUpForm){
        super(props);
        this.uiAction = new KnowledgeBasePopUpFormUiAction(props);
        this.uiStore = props.uiStore;

    }

    public render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Modal
            title={this.props.uiStore.popUpFormType === 'add'?"新增知识库":"编辑知识库"}
            visible={this.props.uiStore.editVisible}
            maskClosable={false}
            destroyOnClose={true}
            onOk={this.uiAction.handleOk}
            onCancel={this.uiAction.handleCancel}
        >
            <Form>
                <Form.Item
                    {...formItemLayout}
                    label="知识类别"
                >
                    {getFieldDecorator('KnowledgeTypeId', {
                        initialValue: this.props.uiStore.editData.KnowledgeTypeId,
                        rules: [{
                            required: true,
                            message: '不能为空'
                        }]
                    })(<Select>
                        {this.props.uiStore.knowledgeBaseTypeTableData ? this.props.uiStore.knowledgeBaseTypeTableData.map((item: KnowledgeBaseTypeEntity) => {
                           return <Select.Option value={item.Id} key={item.Id} >{item.TypeName}</Select.Option>
                        }) : <></>}
                    </Select>)}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="知识标题"
                >
                    {getFieldDecorator('Title', {
                        initialValue: this.props.uiStore.editData.Title,
                        rules: [{
                            required: true,
                            message: '不能为空'
                        }],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="知识回复"
                >
                    {getFieldDecorator('Content', {
                        initialValue: this.props.uiStore.editData.Content,
                        rules: [{
                            required: true,
                            message: '不能为空'
                        }]
                    })(<TextArea />)}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="是否热门"
                >
                    {getFieldDecorator('IsHot', {
                        initialValue: String(this.props.uiStore.editData.IsHot),
                        rules: [{
                            required: false,
                            message: '不能为空'
                        }],

                    })(
                    <Select>
                        <Select.Option value={'true'} key={'true'} >是</Select.Option>
                        <Select.Option value={'false'} key={'false'} >否</Select.Option>
                    </Select>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="知识标签"
                >
                    {getFieldDecorator('KnowledgeTag', {
                        initialValue: this.props.uiStore.editData.KnowledgeTag,
                        rules: [{
                            required: false,
                            message: '不能为空'
                        }],
                        valuePropName:'tags',
                    })(<QuestionTypeTags />)}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="备注"
                >
                    {getFieldDecorator('Remark',{
                        initialValue: this.props.uiStore.editData.Remark,
                    })(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
        );
    }
} 
export const KnowledgeBasePopUpFormView = Form.create<IKnowledgeBasePopUpForm>()(KnowledgeBasePopUpForm);

