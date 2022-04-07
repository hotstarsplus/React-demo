import { Button, Checkbox, Col, Icon, Input, message, Radio } from 'antd';
import { inject, observer } from 'mobx-react';
import { FlexAlign } from 'orid';
import * as React from 'react';
import '../index.scss';
import { ILateFeeParamLayoutProps } from './interface';
import { LateFeeParamLayoutUiAction } from './uiAction';


@inject('lateFeeParamStore', 'sysParamStore')
@observer
export class LateFeeParamLayout extends React.Component<ILateFeeParamLayoutProps>{

    private uiAction: LateFeeParamLayoutUiAction;

    constructor(props: ILateFeeParamLayoutProps) {
        super(props);
        this.uiAction = new LateFeeParamLayoutUiAction(props);
    }

    public componentWillMount() {
        message.destroy();
        this.uiAction.getLateFeeSysParam();
    }
    public componentWillUnmount() {
        this.uiAction.clear();
    }

    public render() {
        console.log("LateFeeParamLayout_render");
        return (
            <>
                <FlexAlign>
                    <Button onClick={this.uiAction.save} style={{ marginRight: 16 }}>保存</Button>
                    <Button onClick={this.uiAction.CanelPenalty} style={{ marginRight: 16 }}>违约金立即计算</Button>
                    <div>
                        <Icon type="info-circle" style={{ color: 'orange', marginRight: 8 }} />
                        <span>可在参数变动后或者需要重进计算时进行操作</span>
                    </div>
                </FlexAlign>

                <div style={{ marginLeft: "8px", marginTop: "12px" }}>
                    <FlexAlign className={"row-FlexAlign"}>
                        <div className={"text-col"}>
                            是否启用：
                        </div>
                        <div className={"Component-col"} >
                            <Col span={6} >
                                <Checkbox
                                    checked={this.uiAction.currentLateFeeParam.LateFeeIsEnable === "1"}
                                    onChange={this.uiAction.lateFeeIsEnableCheckedChange}
                                >
                                    是
                                </Checkbox>
                                <span style={{ display: this.uiAction.isDisable ? "block" : "none" }}
                                    className="Component-col-span">
                                    <Icon type="info-circle" /> 若进行违约金参数设置，请启用
                                </span>
                            </Col>
                        </div>
                    </FlexAlign>
                    <FlexAlign className={"row-FlexAlign"}>
                        <div className={"text-col"}>
                            基础设置：
                        </div>
                        <div className={"Component-col"}>
                            <Col span={6}>
                                <FlexAlign>
                                    <Checkbox
                                        className="laterFeeParam-checkBox"
                                        defaultChecked={this.uiAction.currentLateFeeParam.IsLateFeeNoExceedFee === "1"}
                                        onChange={this.uiAction.IsLateFeeNoExceedFeeCheckedChange}
                                        disabled={this.uiAction.isDisable} >
                                        违约金不超过本金的
                                        <Input
                                            defaultValue={this.uiAction.currentLateFeeParam.LateFeeNoExceedFeeProportion}
                                            disabled={this.uiAction.isDisable}
                                            onChange={this.uiAction.IsLateFeeNoExceedFeeInputOnChange} />
                                        %
                                    </Checkbox>
                                </FlexAlign>
                            </Col>
                            <Col span={6}>
                                <FlexAlign>
                                    <Checkbox
                                        className="laterFeeParam-checkBox"
                                        defaultChecked={this.uiAction.currentLateFeeParam.IsLateFeeMinAmount === "1"}
                                        onChange={this.uiAction.IsLateFeeMinAmountCheckedChange}
                                        disabled={this.uiAction.isDisable} >
                                        最小金额 :
                                        <Input
                                            defaultValue={this.uiAction.currentLateFeeParam.LateFeeMinAmount}
                                            onChange={this.uiAction.lateFeeMinAmountInputOnChange}
                                            disabled={this.uiAction.isDisable} />

                                    </Checkbox>
                                </FlexAlign>
                            </Col>
                        </div>

                    </FlexAlign>
                    <FlexAlign className={"row-FlexAlign"}>
                        <div className={"text-col"}>
                            计算基数：
                        </div>
                        <div className={"Component-col"}>
                            <Col span={6}>
                                <Radio.Group
                                    disabled={this.uiAction.isDisable}
                                    defaultValue={this.uiAction.currentLateFeeParam.LateFeeComputeBase}
                                    onChange={this.uiAction.lateFeeComputeBaseRadioOnChange}>
                                    <Radio value={"1"}>
                                        根据水费金额计算违约金
                                    </Radio>
                                    <Radio value={"2"}>
                                        根据水费与余额之差计算违约金
                                    </Radio>
                                </Radio.Group>
                            </Col>
                        </div>

                    </FlexAlign>
                    <FlexAlign className={"row-FlexAlign"}>
                        <div className={"text-col"}>
                            计算比例：
                        </div>
                        <div className={"Component-col"}>
                            <Col span={6}>
                                <Input
                                    className="lateFeeComputeProportion-input"
                                    defaultValue={this.uiAction.currentLateFeeParam.LateFeeComputeProportion}
                                    disabled={this.uiAction.isDisable}
                                    onChange={this.uiAction.lateFeeComputeProportionOnChange}
                                />
                            </Col>
                        </div>

                    </FlexAlign>
                    <FlexAlign className={"row-FlexAlign"}>
                        <div className={"text-col"}>
                            起算日期：
                        </div>
                        <div className={"Component-col"}>
                            <Col span={6}>
                                <Radio.Group
                                    className="laterFeeParam-radio"
                                    value={this.uiAction.currentLateFeeParam.LateFeeBeginDateType}
                                    onChange={this.uiAction.lateFeeBeginDateTypeOnChange}
                                    disabled={this.uiAction.isDisable}
                                >

                                    <FlexAlign>
                                        <Radio value={"1"}>
                                            抄表后第
                                            <Input
                                                value={this.uiAction.currentLateFeeParam.LateFeeBeginDateCopeMeterDay}
                                                onChange={this.uiAction.lateFeeBeginDateCopeMeterDayOnChange}
                                                disabled={this.uiAction.isDisable}
                                            />
                                            天
                                        </Radio>
                                    </FlexAlign>
                                    <FlexAlign>
                                        <Radio value={"2"}>
                                            抄表月的下第
                                            <Input
                                                value={this.uiAction.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterMonth}
                                                onChange={this.uiAction.lateFeeBeginDateAfterCopyMeterMonthOnChange}
                                                disabled={this.uiAction.isDisable}
                                            />
                                            月 &nbsp;第
                                            <Input
                                                value={this.uiAction.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterDay}
                                                onChange={this.uiAction.LateFeeBeginDateAfterCopyMeterDayOnChange}
                                                disabled={this.uiAction.isDisable}
                                            />
                                            天
                                        </Radio>
                                    </FlexAlign>
                                    <FlexAlign>
                                        <Radio value={"3"}>
                                            自定义违约金起算日期
                                        </Radio>
                                    </FlexAlign>
                                </Radio.Group>
                            </Col>
                        </div>
                    </FlexAlign>
                </div>
            </>
        );
    }
}