import { Button, Col, Form, Icon, Input, message, Row, Select } from "antd";
import { FormCreateOption } from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";
import { inject, observer } from "mobx-react";
import React from "react";
import { DeviceDetailField } from "../../DeviceDetailField/entity";
import { DeviceTypeCommonFieldDialogView } from "../DeviceTypeCommonParaDialog/ui";
import { DeviceTypeSelectorView } from "../DeviceTypeSelector/ui";
import { IDeviceTypeFormProps } from "./interface";
import { DeviceTypeFormUiAction } from "./uiAction";


interface IDeviceTypeFormState {
    commomShow: boolean,
    selectType: string
}

/**
 * 表单宽度
 */
const formLayoutStyle = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

@inject("GlobalDeviceTypeStore")
@observer
class DeviceTypeFormView extends React.Component<IDeviceTypeFormProps, IDeviceTypeFormState>{
    private uiAction: DeviceTypeFormUiAction;

    /**
     * 构造方法
     */
    constructor(props: IDeviceTypeFormProps) {
        super(props);
        this.state = {
            commomShow: false,
            selectType: ""
        }
        this.uiAction = new DeviceTypeFormUiAction(props);
        this.HideCommon = this.HideCommon.bind(this);
        this.onShowCommonPara = this.onShowCommonPara.bind(this);
    }

    /**
     * 构造数据
     */
    public componentDidMount() {
        this.props.getAction(this.uiAction);
        this.uiAction.initFormData()
    }

    public render() {
        const form = this.props.form;
        this.uiAction.viewProps = this.props
        const emptyAttr = new DeviceDetailField();
        emptyAttr.KeyTmp = -2
        return (
            <div style={{maxHeight:"500px",overflowY:"auto"}}>
                <Form >
                    <Form.Item {...formLayoutStyle} label="请输入设备ID" style={{ "display": "none" }}>
                        {
                            form.getFieldDecorator(
                                "DeviceTypeId",
                                {
                                }
                            )(<Input placeholder="请输入设备ID" />)
                        }
                    </Form.Item>

                    <Form.Item {...formLayoutStyle} label="设备类型名称">
                        {
                            form.getFieldDecorator("DeviceTypeName", {
                                rules: [{
                                    message: '请输入类型名称(不能全为空格)',
                                    required: true, whitespace: true,
                                }, {
                                    max: 64,
                                    message: '超出长度限制',
                                },],
                                validateTrigger: 'onBlur', // 设置进行表单验证的时机为onblur
                            })(<Input placeholder="请输入类型名称" />)
                        }
                    </Form.Item>

                    <Form.Item {...formLayoutStyle} label="上级类型" style={{ "display": this.props.GlobalDeviceTypeStore!.IsFatherVisiable ? "block" : "none" }}>
                        {
                            form.getFieldDecorator(
                                "FatherId",
                                {}
                            )(<DeviceTypeSelectorView
                                disabled={this.props.GlobalDeviceTypeStore!.SelectorDisabled}
                            />)
                        }
                    </Form.Item>
                    <Form.Item {...formLayoutStyle} label="所属种类">
                        {form.getFieldDecorator('CategoryId', {
                            rules: [{ required: true, message: '所属种类不能为空！' }],
                        })(
                            <Select disabled={this.props.GlobalDeviceTypeStore!.IsCategoryAble} onSelect={this.onSelect}>
                                {this.props.GlobalDeviceTypeStore!.categoryList ? this.selectCategory() : ""}
                            </Select>
                        )
                        }
                    </Form.Item>

                    <Form.Item>

                        <Row>
                            <Col span={22} style={{ textAlign: "right" }}>
                                <Button htmlType="submit" onClick={this.onShowCommonPara}>
                                    种类属性
                    </Button>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item {...formLayoutStyle} label="类型描述">
                        {form.getFieldDecorator('Description', {})(<TextArea placeholder="请输入类型描述" />)
                        }
                    </Form.Item>
                    <Form.Item {...formLayoutStyle} label="属性" >
                        <Button onClick={this.uiAction.add.bind(this, emptyAttr)} >
                            <Icon type="plus" /> 新增设备属性
                  </Button>
                    </Form.Item>
                    {this.getFromItem()}
                </Form>

                <DeviceTypeCommonFieldDialogView
                    dialogTitle={"查看"+this.props.GlobalDeviceTypeStore!.selectCategoryName+"种类属性"}
                    visible={this.state.commomShow}
                    handleCancel={this.HideCommon}
                    handleOk={this.HideCommon}
                />
            </div>
        );
    }

    private onShowCommonPara() {
        if (this.props.GlobalDeviceTypeStore!.selectCategoryId.length <= 0) {
            message.error("请先选择一个种类");
        } else {
            this.setState({
                commomShow: true
            })
        }


    }

    /**
     * 点击map框中的确定
     */
    private HideCommon() {
        this.setState({
            commomShow: false
        });

    }

    private onSelect = (value: any) => {
        this.setState({
            selectType: value
        });
        this.props.GlobalDeviceTypeStore!.selectCategoryId = value;
        const list=this.props.GlobalDeviceTypeStore!.categoryList;


        list.forEach(element => {
            if (this.props.GlobalDeviceTypeStore!.selectCategoryId===element.CategoryId) {
                this.props.GlobalDeviceTypeStore!.selectCategoryName=element.CategoryName;
            }
        });

    }

    // 创建dom
    private getFromItem = () => {
        const getFieldDecorator = this.props.form.getFieldDecorator;
        const getFieldValue = this.props.form.getFieldValue;
        const currentEditItem = this.props.GlobalDeviceTypeStore!;
        const Attributes = { ...currentEditItem.tmpAttr };
        console.log("Attributes is " + JSON.stringify(Attributes));

        const arr: any = []
        for (const key in Attributes) {
            if (key) {
                if (Attributes[key].IsDelete!=='1') {
                    
                    arr.push(Attributes[key].DetailFieldCnName);
                }
            }
        }

        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');

        const formItems = keys.map((k: any, index: any) => (

            <Form.Item
                {...(index === 0 ? formLayoutStyle : formLayoutStyle)}
                label={`属性${index + 1}`}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {   /** here,1 */

                    initialValue: arr[index] ? arr[index] : '',
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: `请输入属性${index + 1}`,/** here,1 */
                        }, {
                            message: '重复属性',
                            validator: this.rules,
                        },
                    ],
                    validateTrigger: ['onBlur', 'onChange']
                })(<Input placeholder={`属性${index + 1}`} style={{ width: '80%', marginRight: 8 }} />)} {/** here,1 */}
                {keys.length > 0 ? (
                    <a
                        href={'javascript:;'}
                        title="删除"
                    >
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={this.uiAction.deleteDom(k)}
                        />
                    </a>
                ) : null}
            </Form.Item>
        ));
        return formItems;
    }

    // 验证自定义属性值是否重复
    private rules = (rule: any, value: any, callback: any) => {
        /** 输入的值  */
        const data = value;
        /** 输入的值在表单中出现的次数 */
        let times = 0;
        /** 输入n内容不为空时判断 */
        if (value === "") {
            callback();
        }
        // 获取表单值中的自定义属性集合
        const formDate = this.props.form.getFieldsValue()
        let names;
        for (const key in formDate) {
            if (key === "names") {
                names = formDate[key]
            }
        }
        // 判断输入属性在自定义属性集合重复次数
        for (const key in names) {
            if (names[key] === data) {
                times++;
            }
        }

        if (times > 1) {
            callback('重复的属性'); // 校验未通过

        }

        callback();   // 验证通过
    }

    private selectCategory(): JSX.Element[] {
        const items: JSX.Element[] = [];

        this.props.GlobalDeviceTypeStore!.categoryList.forEach(item => {
            items.push(<Select.Option key={item.CategoryId} value={item.CategoryId}>{item.CategoryName}</Select.Option>);
        });
        return items;
    }

}
const formCreateOption: FormCreateOption<IDeviceTypeFormProps> = {
    mapPropsToFields(props) {
        const item = props.GlobalDeviceTypeStore.currentEditItem;
        // props.GlobalDeviceTypeStore!.selectCategoryName = item.CategoryName;
        // console.log("props.GlobalDeviceTypeStore!.selectCategoryName"+props.GlobalDeviceTypeStore!.selectCategoryName);
        return {
            DeviceTypeId: Form.createFormField({
                value: item.DeviceTypeId
            }),
            FatherId: Form.createFormField({
                value: item.FatherId
            }),
            DeviceTypeName: Form.createFormField({
                value: item.DeviceTypeName
            }),
            CategoryId: Form.createFormField({
                value: item.CategoryId
            }),
            CategoryName: Form.createFormField({
                value: item.CategoryName
            }),
            DetailTableName: Form.createFormField({
                value: item.DetailTableName
            }),
            Description: Form.createFormField({
                value: item.Description
            })
        }
    }
}

export default Form.create<IDeviceTypeFormProps>(formCreateOption)(DeviceTypeFormView);
