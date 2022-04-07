import { Button, Card, Checkbox, Col, Input, message, Spin } from "antd";
import { inject, observer } from "mobx-react";
import { FlexAlign } from "orid";
import React from "react";
import { AlarmQauntitySelector } from "../selector/AlarmQuantitySelector";
import { ICopyMeterParamLayoutProps } from "./interface";
import { CopyMeterParaLayoutUiAction } from "./uiAction";
import './ui.scss'
@inject("copyMeterParamDoMainStore", "sysParamStore")
@observer
export class CopyMeterParamLayout extends React.Component<ICopyMeterParamLayoutProps>{

    private uiAction: CopyMeterParaLayoutUiAction;

    constructor(props: ICopyMeterParamLayoutProps) {
        super(props);
        this.uiAction = new CopyMeterParaLayoutUiAction(props);
    }
    public componentWillMount() {
        message.destroy()
    }
    public componentDidMount() {
        this.uiAction.loadData();
    }

    public render() {
        console.log("QuantityParamDto", this.props.copyMeterParamDoMainStore!.QuantityParamDto, this.props.copyMeterParamDoMainStore!.QuantityParamDto.QuantityCompareIsEnable !== "0")
        return (
            <>
                <Spin tip="Loading..." spinning={this.uiAction.quantityParamDtoLoading}>
                    <Button onClick={this.uiAction.save} style={{marginLeft:'16px'}}>保存</Button>
                    <div className="copy-meter-param-box">
                        <Col span={6} style={{ width: "500px",marginLeft: "16px" }}>
                            <Card title={"手工抄表参数"}>
                                    <Checkbox checked={this.props.copyMeterParamDoMainStore!.QuantityParamDto.IsCopyAddOne !== "0"} onChange={this.uiAction.IsCopyAddOneOnChange}>
                                        表读数归零时是否需要加1
                                    </Checkbox>
                                    <Checkbox checked={this.props.copyMeterParamDoMainStore!.QuantityParamDto.IsCanChangeAfterCopid !== "0"} onChange={this.uiAction.IsCanChangeAfterCopidOnChange}>
                                        抄表之后不允许直接修改本次表底数
                                    </Checkbox>
                            </Card>
                        </Col>
                        <Col span={6} style={{ width: "500px" ,marginLeft: "16px"}}>
                            <Card title={"水量对比参数"}>
                                    <FlexAlign className="row-FlexAlign copy-param-space">
                                        <div className={"text-col"} style={{ width: '150px', textAlign: 'right', marginRight: '20px' }}>
                                            是否启用：
                                        </div>
                                        <div className={"Component-col"}>
                                            <Col span={6}>
                                                <Checkbox checked={this.props.copyMeterParamDoMainStore!.QuantityParamDto.QuantityCompareIsEnable !== "0"} onChange={this.uiAction.QuantityParamEnableOnChange}>
                                                    是
                                        </Checkbox>
                                            </Col>
                                        </div>

                                    </FlexAlign>
                                    <FlexAlign className="copy-param-space">
                                        <div className={"text-col"} style={{ width: '150px', textAlign: 'right', marginRight: '20px' }}>
                                            报警参考水量：
                                        </div>
                                        <div className={"Component-col"}>
                                            <Col span={23}>
                                                <AlarmQauntitySelector
                                                    value={this.props.copyMeterParamDoMainStore!.AlarmQuantityIndex}
                                                    onChange={this.uiAction.AlarmQuantityOnChange}
                                                />
                                            </Col>
                                        </div>
                                    </FlexAlign>
                                    <FlexAlign className="copy-param-space">
                                        <div className={"text-col"} style={{ width: '150px', textAlign: 'right', marginRight: '20px' }}>
                                            参考水量上限：
                                        </div>
                                        <div className={"Component-col"}>
                                            <Col span={24}>
                                                <FlexAlign>
                                                    <Input
                                                        value={this.props.copyMeterParamDoMainStore!.QuantityParamDto.ReferQuantityUp}
                                                        onChange={this.uiAction.ReferQuantityUpOnChange}
                                                        className="copy-param-right-space"
                                                    />%
                                            </FlexAlign>
                                            </Col>
                                        </div>
                                    </FlexAlign>
                                    <FlexAlign className="copy-param-space">
                                        <div className={"text-col"} style={{ width: '150px', textAlign: 'right', marginRight: '20px' }}>
                                            参考水量下限：
                                        </div>
                                        <div className={"Component-col"}>
                                            <Col span={24}>
                                                <FlexAlign>
                                                    <Input
                                                        value={this.props.copyMeterParamDoMainStore!.QuantityParamDto.ReferQuantityDown}
                                                        onChange={this.uiAction.ReferQuantityDownOnChange}
                                                        className="copy-param-right-space"
                                                    />%
                                            </FlexAlign>
                                            </Col>
                                        </div>
                                    </FlexAlign>
                            </Card>
                        </Col>

                    </div>
                </Spin>
            </>
        )
    }

}