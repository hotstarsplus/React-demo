import { Button, Card, Checkbox, Col, Form, Input, message, Radio } from 'antd';
import { inject, observer } from 'mobx-react';
import { FlexAlign } from 'orid';
import React from 'react';
import { MakeOutInvoiceTypeSelector } from '../selector/MakeOutInvoiceTypeSelector';
import { SetupView } from '../setUp/ui';
import { IInvoicingParametersLayoutProps, } from './interface';
import { InvoicingParametersUiAction } from './uiAction';
import  './ui.scss';
/**
 * 开票参数
 */
@inject("InvoicingParametersdoMainStore", "sysParamStore")
@observer
class InvoicingParametersLayout extends React.Component<IInvoicingParametersLayoutProps> {

    private uiAction: InvoicingParametersUiAction;

    constructor(props: IInvoicingParametersLayoutProps) {
        super(props);
        this.uiAction = new InvoicingParametersUiAction(props);
    }

    public componentWillMount() {
        message.destroy()
        this.uiAction.getInvoicingParametersLayout();
    }

    public render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div style={{ overflowY: 'auto', height: 'calc(100% - 80px)' }}>
                <Button onClick={this.uiAction.SaveBtn} style={{ marginLeft: '16px' }}>保存</Button>
                <div className="invoice_param_box">
                    <Col span={6} style={{ marginLeft: "16px", width: '495px',marginTop: "16px" }}>
                        <Card title={"开票参数"}>
                            <div style={{ margin: "10px" }}>
                                <FlexAlign>
                                    <div className="invoice_param_flex">
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isAutoBinary === "1"}
                                            onChange={this.uiAction.IsAutoBinaryChange}>
                                            到户收费票据的票据金额等于"应收金额"进位调整
                                        </Checkbox>
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isTotalReceivablePrintFirstInvoice === "1"}
                                            onChange={this.uiAction.IsTotalReceivablePrintFirstInvoiceChange}>
                                            如果票据打印两种或者多种票据总的实收应收打在第一张票据上
                                        </Checkbox>
                                        <Radio.Group
                                            // value = {this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.LateFeeOnInvoiceKind}
                                            defaultValue={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.LateFeeOnInvoiceKind?this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.LateFeeOnInvoiceKind:""}
                                            onChange={this.uiAction.LateFeeOnInvoiceKindChange}
                                            style={{marginBottom:'8px'}}
                                        >
                                            违约金开票类型：
                                            <Radio value={"1"}>全部在专票</Radio>
                                            <Radio value={"0"}>全部在普票</Radio>
                                            <div style={{ marginLeft: 112 }}>
                                                <Radio value={"2"}>根据产品项目决定</Radio>
                                            </div>
                                        </Radio.Group>
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.IsMergeProductItem === "1"}
                                            onChange={this.uiAction.IsMergeProductItemChange}>
                                            开票时水费项目合并显示
                                        </Checkbox>
                                        {/* <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isPrintLateFeeToNormalInvoice === "1"}
                                            onChange={this.uiAction.IsPrintLateFeeToNormalInvoiceChange}>
                                            开增值税专用票据时是否将违约金全部打在增值税普通票据上
                                        </Checkbox> */}
                                    </div>
                                </FlexAlign>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6} style={{ marginLeft: "16px", width: '495px',marginTop: "16px"}}>
                        <Card title={"提示参数"}>
                            <div style={{ margin: "10px" }}>
                                <FlexAlign>
                                    <div  className="invoice_param_flex">
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isSelectInvoice === "1"}
                                            onChange={this.uiAction.IsSelectInvoiceChange}>
                                            显示选票据窗口
                                        </Checkbox>
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isCheckInvoice === "1"}
                                            onChange={this.uiAction.IsCheckInvoiceChange}>
                                            显示票据代码和票据号码是否正确的提示
                                        </Checkbox>
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isCheckMakeOutInvoice === "1"}
                                            onChange={this.uiAction.IsCheckMakeOutInvoiceChange}>
                                            显示"确认是否已经正确打印了票据"的提示
                                        </Checkbox>
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isInvoiceCount === "1"}
                                            onChange={this.uiAction.IsInvoiceCountChange}>
                                            显示"票据张数"的提示
                                        </Checkbox>
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isSinglePrint === "1"}
                                            onChange={this.uiAction.IsSinglePrintChange}>
                                            显示发票单张打印的提示
                                        </Checkbox>
                                    </div>
                                </FlexAlign>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6} style={{ marginLeft: "16px", width: '495px',marginTop: "16px" }}>
                        <Card title={"增值税开票参数"}>
                            <div style={{ margin: "10px" }}>
                                <FlexAlign>
                                    <div className="invoice_param_flex">
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isSetAddedInvoiceNoteField === "1"}
                                            onChange={this.uiAction.IsSetAddedInvoiceNoteFieldChange}>
                                            是否定义票据备注
                                            <Button
                                            style={{marginLeft:'8px'}}
                                            disabled={this.props.sysParamStore!.isButton === "1" ? false : true}
                                            onClick={this.uiAction.setupBtn}>设置</Button>
                                        </Checkbox>
                                       
                                       
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isInvoiceNotChangeAddTaxFee === "1"}
                                            onChange={this.uiAction.IsInvoiceNotChangeAddTaxFeeChange}>
                                            是否默认不收取专票水费
                                        </Checkbox>
                                       
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isPrintList === "1"}
                                            onChange={this.uiAction.IsPrintListChange}>
                                            是否打印票据
                                        </Checkbox>
                                        
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.InvoiceisDisplayBankInfo === "1"}
                                            onChange={this.uiAction.InvoiceisDisplayBankInfoChange}>
                                            是否显示税号及银行信息
                                        </Checkbox>
                                    </div>
                                </FlexAlign>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6} style={{ marginLeft: "16px", width: '495px',marginTop: "16px" }}>
                        <Card title={"作废参数"}>
                            <div style={{ margin: "10px" }}>
                                <FlexAlign>
                                    <div className="invoice_param_flex">
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isCancelAccountByAnother === "1"}
                                            onChange={this.uiAction.IsCancelAccountByAnotherChange}>
                                            是否可以作废别人领用的票据
                                        </Checkbox>
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isCancelOtherReceipt === "1"}
                                            onChange={this.uiAction.IsCancelOtherReceiptChange}>
                                            是否可以作废别人开的票据
                                        </Checkbox>
                                    </div>
                                </FlexAlign>
                            </div>
                        </Card>
                    </Col>

                    <Col span={6} style={{ marginLeft: "16px", width: '495px',marginTop: "16px" }}>
                        <Card title={"票据限额参数"}>
                            <div style={{ margin: "10px" }}>
                                <FlexAlign>
                                    <div style={{ marginBottom: '-24px' }} className="invoice_param_flex">
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.isOutOfTotalShowMessage === "1"}
                                            onChange={this.uiAction.IsOutOfTotalShowMessageChange}>
                                            票据超过最大金额时给出提示
                                        </Checkbox>
                                        <FlexAlign className="invoice_param_space">
                                            <div className={"text-col"}>
                                                提示参考金额：
                                            </div>
                                            <div className={"Component-col"}>
                                                <Radio.Group defaultValue={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.showMessageReferenceType}
                                                    onChange={this.uiAction.ReferenceTypeRadioOnChange}
                                                >
                                                    <Radio value={"1"}>应收金额</Radio>
                                                    <Radio value={"2"}>实收金额</Radio>
                                                </Radio.Group>

                                            </div>
                                        </FlexAlign>
                                        <FlexAlign  className="invoice_param_space">
                                            <div className={"text-col"}>
                                                票据最大金额：
                                            </div>
                                            <div className={"Component-col"}>
                                                <Col span={6}>
                                                    <FlexAlign>
                                                        <Form.Item
                                                            style={{ marginBottom: '0px' }}
                                                        >
                                                            {getFieldDecorator('MaxMoney', {
                                                                initialValue: this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.maxInvoiceAmount,
                                                            })(
                                                                <Input
                                                                    onChange={this.uiAction.MaxInvoiceAmountOnChange}
                                                                    style={{ width: "200px", marginTop: '10px',marginRight:'8px' }} />
                                                            )}
                                                        </Form.Item>元


                                                    </FlexAlign>

                                                </Col>
                                            </div>
                                        </FlexAlign>
                                    </div>
                                </FlexAlign>
                            </div>
                        </Card>
                    </Col>

                    <Col span={6} style={{ marginLeft: "16px", width: '495px',marginTop: "16px" }}>
                        <Card title={"线上支付开票参数"}>
                            <div style={{ margin: "10px" }}>
                                <FlexAlign>
                                    <div style={{ marginBottom: '-24px' }} className="invoice_param_flex">
                                        <Checkbox defaultChecked={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.OnlinePayOverIsEInvoice === "1"}
                                            onChange={this.uiAction.OnlinePayOverIsEInvoiceChange}>
                                            线上支付完成后立刻开电子票据
                                        </Checkbox>
                                        <FlexAlign className="invoice_param_space">
                                            <div>
                                                票据抬头：
                                            </div>
                                            <div style={{ marginBottom: '10px', marginTop: '3px' }}>
                                                <Radio.Group defaultValue={this.props.InvoicingParametersdoMainStore!.CurrentInvoiceParam.PayableInvoiceType}
                                                    onChange={this.uiAction.PayableInvoiceTypeRadioOnChange}
                                                >
                                                    <Radio value={"0"}>客户号票据抬头</Radio>
                                                    <Radio value={"1"}>用户号票据抬头</Radio>
                                                </Radio.Group>
                                            </div>
                                        </FlexAlign>
                                        <FlexAlign className="invoice_param_space">
                                            <div>
                                                开票方式：
                                            </div>
                                            <div className={"Component-col"}>
                                                <Col span={23}>
                                                    <MakeOutInvoiceTypeSelector
                                                        value={this.props.InvoicingParametersdoMainStore!.MakeOutInvoiceTypeIndex}
                                                        onChange={this.uiAction.MakeOutInvoiceTypeOnChange}
                                                    />
                                                </Col>
                                            </div>
                                        </FlexAlign>
                                    </div>
                                </FlexAlign>
                            </div>
                        </Card>
                    </Col>

                    <SetupView
                        visible={this.uiAction.isVisiableModal}
                        handleCancel={this.uiAction.cancel}
                        handleok={this.uiAction.ok}
                    />
                </div>
            </div>
        )
    }
}
const InvoicingParametersLayoutX = Form.create()(InvoicingParametersLayout);
export { InvoicingParametersLayoutX as InvoicingParametersLayout }