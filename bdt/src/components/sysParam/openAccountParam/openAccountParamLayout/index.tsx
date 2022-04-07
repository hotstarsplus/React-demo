import { Button, Card, Col, Input, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { FlexAlign } from 'orid';
import * as React from 'react';
import { IdRuleSelector } from '../selector/IdRuleSelector';
import { IOpenAccountParamLayoutProps } from './interface';
import { OpenAccountParamLayoutUiAction } from './uiAction';

@inject("openAccountParamStore", "sysParamStore")
@observer
export class OpenAccountParamLayout extends React.Component<IOpenAccountParamLayoutProps>{

    private uiAction: OpenAccountParamLayoutUiAction;

    constructor(props: IOpenAccountParamLayoutProps) {
        super(props);
        this.uiAction = new OpenAccountParamLayoutUiAction(props);
    }
    public componentWillMount(){
        message.destroy()
    }
    public componentDidMount() {
        this.uiAction.loadData();
    }

    public render() {
        return (
            <>
                <Button onClick={this.uiAction.save}>保存</Button>
                <div style={{ marginTop: "16px" }}>
                    <Col span={6} style={{ width: "500px" }}>
                        <Card title={"客户号生成规则"}>
                            <div style={{ margin: "10px" }}>
                                <FlexAlign>
                                    <div className={"text-col"} style={{ width: '150px' }}>
                                        客户号生成规则：
                                </div>
                                    <div className={"Component-col"}>
                                        <Col span={24}>
                                            <IdRuleSelector
                                                value={this.props.openAccountParamStore!.CurrentCustomerNoRule.RuleId}
                                                list={this.props.openAccountParamStore!.CustomerNoRules}
                                                onChange={this.uiAction.customerNoRuleSelectOnChange}
                                            />
                                        </Col>
                                    </div>
                                </FlexAlign>
                            </div>
                            <div style={{ margin: "10px", display: this.uiAction.customerNoRule === "02" ? "" : "none" }}>
                                <FlexAlign>
                                    <div className={"text-col"} style={{ width: '150px' }}>
                                        前缀：
                            </div>
                                    <div className={"Component-col"}>
                                        <Col span={24}>
                                            <Input
                                                value={this.props.openAccountParamStore!.CurrentCustomerNoRule.PreFix}
                                                onChange={this.uiAction.customerNoPreFixOnChange}
                                            />
                                        </Col>
                                    </div>
                                </FlexAlign>
                            </div>
                            <div style={{ margin: "10px", display: this.uiAction.customerNoRule !== "03" ? "" : "none" }}>
                                <FlexAlign>
                                    <div className={"text-col"} style={{ width: '150px' }}>
                                        开始号码：
                            </div>
                                    <div className={"Component-col"}>
                                        <Col span={24}>
                                            <Input
                                                value={String(this.props.openAccountParamStore!.CurrentCustomerNoRule.StartNumber) ==='NaN'?'':this.props.openAccountParamStore!.CurrentCustomerNoRule.StartNumber}
                                                onChange={this.uiAction.customerNoStartNumberOnChange}
                                            />
                                        </Col>
                                    </div>
                                </FlexAlign>
                            </div>
                            <div style={{ margin: "10px", display: this.uiAction.customerNoRule === "04" ? "" : "none" }}>
                                <FlexAlign>
                                    <div className={"text-col"} style={{ width: '150px' }}>
                                        客户号总长度：
                            </div>
                                    <div className={"Component-col"}>
                                        <Col span={24}>
                                            <Input
                                                value={String(this.props.openAccountParamStore!.CurrentCustomerNoRule.NumberLength)==='NaN'?'':this.props.openAccountParamStore!.CurrentCustomerNoRule.NumberLength}
                                                onChange={this.uiAction.customerNoNumberLengthOnChange}
                                            />
                                        </Col>
                                    </div>
                                </FlexAlign>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6} style={{ marginLeft: "10px", width: "500px" }}>
                        <Card title={"水费用户号生成规则"} >
                            <div style={{ margin: "10px" }}>
                                <FlexAlign>
                                    <div className={"text-col"} style={{ width: '150px' }}>
                                        水费用户号生成规则：
                            </div>
                                    <div className={"Component-col"}>
                                        <Col span={24}>
                                            <IdRuleSelector
                                                list={this.props.openAccountParamStore!.WaterUserNoRules}
                                                value={this.props.openAccountParamStore!.CurrentWaterUserNoRule.RuleId}
                                                onChange={this.uiAction.waterUserNoRuleSelectOnChange}
                                            />
                                        </Col>
                                    </div>
                                </FlexAlign>
                            </div>
                            <div style={{ margin: "10px", display: this.uiAction.waterUserNoRule === "06" ? "" : "none" }}>
                                <FlexAlign>
                                    <div className={"text-col"} style={{ width: '150px' }}>
                                        前缀：
                            </div>
                                    <div className={"Component-col"}>
                                        <Col span={24}>
                                            <Input
                                                value={this.props.openAccountParamStore!.CurrentWaterUserNoRule.PreFix}
                                                onChange={this.uiAction.waterUserNoPreFixOnChange}
                                            />
                                        </Col>
                                    </div>
                                </FlexAlign>
                            </div>
                            <div style={{ margin: "10px", display: this.uiAction.waterUserNoRule !== "07" ? "" : "none" }}>
                                <FlexAlign>
                                    <div className={"text-col"} style={{ width: '150px' }}>
                                        开始号码：
                            </div>
                                    <div className={"Component-col"}>
                                        <Col span={24}>
                                            <Input
                                                value={String(this.props.openAccountParamStore!.CurrentWaterUserNoRule.StartNumber)==='NaN'?'':this.props.openAccountParamStore!.CurrentWaterUserNoRule.StartNumber}
                                                onChange={this.uiAction.waterUserNoStartNumberOnChange}
                                            />
                                        </Col>
                                    </div>
                                </FlexAlign>
                            </div>
                            <div style={{ margin: "10px", display: this.uiAction.waterUserNoRule === "09" ? "" : "none" }}>
                                <FlexAlign>
                                    <div className={"text-col"} style={{ width: '150px' }}>
                                        水费用户号总长度：
                            </div>
                                    <div className={"Component-col"}>
                                        <Col span={24}>
                                            <Input
                                                value={String(this.props.openAccountParamStore!.CurrentWaterUserNoRule.NumberLength)==='NaN'?'':this.props.openAccountParamStore!.CurrentWaterUserNoRule.NumberLength}
                                                onChange={this.uiAction.waterUserNoNumberLengthOnChange}
                                            />
                                        </Col>
                                    </div>
                                </FlexAlign>
                            </div>
                        </Card>
                    </Col>
                </div>
            </>
        );
    }
}