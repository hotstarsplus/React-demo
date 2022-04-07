import { Col, Form, Input, Row, Select } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
import { SelectValue } from 'antd/lib/select';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import '../../index.scss';
import { ILadderTypeFormProps } from './interface';
import { LadderTypeFormUiAction } from './uiAction';

const formItemLayout = {
    labelCol: {
        xs: 24,
        sm: 8,

    },
    wrapperCol: {
        xs: 24,
        sm: 10,
    }
}
interface ILadderTypeFormState {
    proportionIsCanEdit: boolean;
}

@inject("GlobalLadderPriceUiStore")
@observer
class LadderTypeForm extends React.Component<ILadderTypeFormProps, ILadderTypeFormState>{

    private uiAction: LadderTypeFormUiAction;

    constructor(props: ILadderTypeFormProps) {
        super(props);

        this.uiAction = new LadderTypeFormUiAction(props);
        this.ladderTypeOnChange = this.ladderTypeOnChange.bind(this);
        this.state = {
            proportionIsCanEdit: this.props.GlobalLadderPriceUiStore!.currentLadderTypeEntity.LadderType === "比例"
        }
    }

    public componentDidMount() {
        this.props.getUiAction(this.uiAction);
    }

    public render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Form className="form-more-col" hideRequiredMark={true}>
                    <Row>
                        <Col span={24} >
                            <Form.Item
                                {...formItemLayout}
                                label="用水性质"
                            >
                                {
                                    getFieldDecorator('WaterKindId', {
                                        rules: [{
                                            required: true, message: "请选择用水性质"
                                        }]
                                    })(
                                        this.getAddWaterKindSelect()
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                {...formItemLayout}
                                label="阶梯类型"
                            >
                                {
                                    getFieldDecorator('LadderType', {
                                        rules: [{
                                            required: true, message: "请选择阶梯类型"
                                        }]
                                    })(
                                        this.getAddLadderTypeSelect()
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} >
                            <Form.Item
                                {...formItemLayout}
                                label="阶梯比例"
                            >
                                {
                                    getFieldDecorator('Proportion', {
                                        rules: [{
                                            required: this.state.proportionIsCanEdit,
                                            message: "请输入阶梯比例"
                                        }]
                                    })(
                                        <Input
                                            disabled={!this.state.proportionIsCanEdit}
                                            value={this.state.proportionIsCanEdit === false ? "" : "1"}
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    }
    // 构造新增时用水性质列表
    private getAddWaterKindSelect(): JSX.Element {
        return (
            <Select disabled={true} style={{ width: "100%" }}>
                {this.props.GlobalLadderPriceUiStore!.productList.map((value, index) => 
                     <Select.Option key={value.ProductKindId} value={value.ProductKindId}>{value.ProductKindName}</Select.Option>
                )}
            </Select>
        )

    }

    // 构造新增时阶梯类型列表
    private getAddLadderTypeSelect(): JSX.Element {
        return (
            <Select defaultValue={'比例'} style={{ width: "100%" }} onChange={this.ladderTypeOnChange}>
                <Select.Option value={"比例"} >比例</Select.Option>
                <Select.Option value={"水量"} >水量</Select.Option>
            </Select>
        )

    }
    private ladderTypeOnChange(value: SelectValue) {

        if (value.toString() === "比例") {
            this.setState({
                proportionIsCanEdit: true
            })
            console.log("比例，阶梯可编辑！")
        } else {
            this.setState({
                proportionIsCanEdit: false
            })
            const { setFieldsValue } = this.props.form;
            setFieldsValue({
                Proportion: ""
            });
            console.log("水量，阶梯不可编辑并且为空")
        }
    }
}

const formCreateOption: FormCreateOption<ILadderTypeFormProps> = {
    mapPropsToFields(props) {
        const item = props.GlobalLadderPriceUiStore!.currentLadderTypeEntity;
        return {
            WaterKindId: Form.createFormField({
                value: props.GlobalLadderPriceUiStore!.modelType === '新增' ? props.GlobalLadderPriceUiStore!.currentSelectWateKindId : item.WaterKindId,
            }),
            LadderType: Form.createFormField({
                value: props.GlobalLadderPriceUiStore!.modelType === '新增' ? '水量' : item.LadderType,
            }),
            Proportion: Form.createFormField({
                value: props.GlobalLadderPriceUiStore!.modelType === '新增' ? '1' : item.Proportion,
            }),


        }
    }
}
export default inject("GlobalLadderPriceUiStore")(Form.create<ILadderTypeFormProps>(formCreateOption)(LadderTypeForm));