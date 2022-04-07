
import { Button, Card, Checkbox, Col, Input, Radio, Select, TimePicker } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React from 'react';
import { PreSaveWriteOffParamEntity } from "../../../entity/PreSaveWriteOffParamEntity";
import { ChargeWriteOffParamUiStore } from '../uiStore';
import './index.scss';
import { ChargeWriteOffParamFormAction } from './uiAction';

export interface IChargeWriteOffParamForm extends FormComponentProps {

    Param: PreSaveWriteOffParamEntity;
    onSave: (param: PreSaveWriteOffParamEntity) => void;
    ChargeWriteOffParamUiStore?: ChargeWriteOffParamUiStore;
}

const formItemLayoutStyle = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 14
    }
};
@inject('ChargeWriteOffParamUiStore')
@observer
class ChargeWriteOffParamForm extends React.Component<IChargeWriteOffParamForm>{

    public uiAction: ChargeWriteOffParamFormAction;

    public uiStore: ChargeWriteOffParamUiStore;

    public constructor(props: IChargeWriteOffParamForm) {
        super(props);
        this.uiAction = new ChargeWriteOffParamFormAction(props);
        this.uiStore = props.ChargeWriteOffParamUiStore!;
    }

    public render() {
        this.uiAction.getInitParam(this.props.Param);
        const { getFieldDecorator } = this.props.form
        return (
            <div style={{height:'calc(100vh - 154px)',overflow:'auto'}}>
                <div style={{ marginBottom: '8px' }} >
                    <Button onClick={this.uiAction.onSave} style={{ marginLeft: '8px' }}>保存</Button>
                </div>
                <Col span={6} style={{ marginLeft: "8px", width: '495px', height: "230px" }}>
                    <Card title={<div>预存款冲减 <Button style={{ marginLeft: "4px" }} onClick={this.uiAction.PrePayNow}>即刻进行预存扣减</Button></div>}>
                        <div style={{ margin: "10px" }}>
                            <Form>
                                <Form.Item
                                    {...formItemLayoutStyle}
                                    label={'冲减方式'}
                                >
                                    {getFieldDecorator('WriteOffType')(
                                        <Radio.Group >
                                            <Radio value={"1"}>隔月冲减</Radio>
                                            <Radio value={"2"}>逐月冲减</Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayoutStyle}
                                    label={'自动扣减'}
                                >
                                    {getFieldDecorator('AutoWriteOff', {
                                        valuePropName: 'checked'
                                    })(
                                        <Checkbox
                                            onChange={this.uiAction.onAutoWriteOffChange}
                                        >
                                            启用
                                        </Checkbox>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayoutStyle}
                                    label={'扣减类型'}
                                >
                                    {getFieldDecorator('DateType')(
                                        <Select
                                            style={{ width: "180px" }}
                                            disabled={!this.uiStore.autoWriteOff}
                                            placeholder={"选择类型"}
                                            onChange={this.uiAction.onTypeChange}
                                        >
                                            <Select.Option value={'每月'}>每月</Select.Option>
                                            <Select.Option value={'每周'}>每周</Select.Option>
                                            <Select.Option value={'每天'}>每天</Select.Option>
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayoutStyle}
                                    label={'扣减日期'}
                                    style={{ display: this.props.ChargeWriteOffParamUiStore!.dateType === '每天' ? 'none' : '' }}
                                >
                                    {getFieldDecorator('TimeType')(
                                        <Radio.Group className='ChargeWriteOffParamForm-RadioGroup' disabled={!this.uiStore.autoWriteOff}>
                                            <Radio value={'1'} >
                                                <div className='Radio-span'>
                                                    第&nbsp;
                                                    <Form.Item>
                                                        {getFieldDecorator('SingleTime', {
                                                            rules: [{
                                                                validator: this.StartTimeValidate
                                                            }]
                                                        })(
                                                            <Input disabled={!this.uiStore.autoWriteOff} type='number' style={{ width: "80px" }} />
                                                        )}
                                                    </Form.Item>
                                                    &nbsp;天
                                                </div>
                                            </Radio>
                                            <Radio value={'2'}>
                                                <div className='Radio-span'>
                                                    第&nbsp;
                                                    <Form.Item>
                                                        {getFieldDecorator('StartTime', {
                                                            rules: [{
                                                                validator: this.StartTimeValidate
                                                            }]
                                                        })(
                                                            <Input disabled={!this.uiStore.autoWriteOff} type='number' style={{ width: "80px" }} />
                                                        )}
                                                    </Form.Item>
                                                    &nbsp;天&nbsp;至&nbsp;第&nbsp;
                                                    <Form.Item>
                                                        {getFieldDecorator('EndTime', {
                                                            rules: [{
                                                                validator: this.EndTimeValidate
                                                            }]
                                                        })(
                                                            <Input disabled={!this.uiStore.autoWriteOff} type='number' style={{ width: "80px" }} />
                                                        )}
                                                    </Form.Item>
                                                    &nbsp;天
                                                </div>
                                            </Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayoutStyle}
                                    label='扣减时间'
                                >
                                    {getFieldDecorator('WriteOffTime')(
                                        <TimePicker
                                            popupStyle={{ width: '140px' }}
                                            popupClassName="time-picker"
                                            format={'HH:mm'}
                                            disabled={!this.uiStore.autoWriteOff}
                                        />
                                    )}
                                </Form.Item>
                            </Form>
                        </div>
                    </Card>
                </Col>
            </div>
        )
    }

    public StartTimeValidate = (rule: any, value: any, callback: any) => {
        if (value && value.length > 0) {
            switch (this.uiStore.dateType) {
                case '每周':
                    if (Number(value) < 1 || Number(value) > 7) {
                        callback('每周日期不能小于1，不能大于7')
                    } else {
                        callback();
                    }
                    return
                case '每月':
                    if (Number(value) < 1 || Number(value) > 31) {
                        callback('每月日期不能小于1，不能大于31')
                    } else {
                        callback();
                    }
                    return
                default:
                    callback();
                    return
            }
        } else {
            callback();
        }
    }
    public EndTimeValidate = (rule: any, value: any, callback: any) => {
        if (value && value.length > 0) {
            switch (this.uiStore.dateType) {
                case '每周':
                    if (Number(value) < 1 || Number(value) > 7) {
                        callback('每周日期不能小于1，不能大于7')
                    } else {
                        callback();
                    }
                case '每月':
                    if (Number(value) < 1 || Number(value) > 31) {
                        callback('每月日期不能小于1，不能大于31')
                    } else {
                        callback();
                    }
                    return
                default:
                    callback();
                    return
            }
        } else {
            callback()
        }
    }
}


export const ChargeWriteOffParamFormUI = Form.create<IChargeWriteOffParamForm>(
    {
        mapPropsToFields(props) {
            return {
                WriteOffType: Form.createFormField({
                    value: props.Param.WriteOffType
                }),
                AutoWriteOff: Form.createFormField({
                    value: props.Param.AutoWriteOff
                }),
                DateType: Form.createFormField({
                    value: props.Param.WriteOffDate.DateType
                }),
                TimeType: Form.createFormField({
                    value: props.Param.WriteOffDate.SelectType
                }),
                SingleTime: Form.createFormField({
                    value: props.Param.WriteOffDate.Time
                }),
                StartTime: Form.createFormField({
                    value: props.Param.WriteOffDate.StartTime
                }),
                EndTime: Form.createFormField({
                    value: props.Param.WriteOffDate.EndTime
                }),
                WriteOffTime: Form.createFormField({
                    value: moment(props.Param.WriteOffDate.WriteOffTime, 'YYYY-MM-DD HH:mm:ss')
                }),
            }
        }
    }
)(ChargeWriteOffParamForm);

