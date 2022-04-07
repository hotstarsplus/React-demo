import { Card, Col, Dropdown, Icon, Menu, Popconfirm, Row, Switch, Tooltip } from "antd";
import { action } from "mobx";
import React from "react";
import { AgentBankList } from "../entity/invoiceKind";
import { BillTemplateCard, IBillTemplateCardProps } from "./ui";

export class BillTemplateCardUiAction {

    public props: IBillTemplateCardProps;

    public cite: BillTemplateCard;

    public constructor(props: IBillTemplateCardProps, cite: BillTemplateCard) {
        this.props = props;
        this.cite = cite;
    }

    /** 票据模板 */
    public renderBill = () => {
        const cardStore = this.props.BillTemplateCardUiStore!;
        let num: number = 0;
        let name = "";
        return cardStore.RootStore.BillTemplateLayoutStore.InvoiceKindList.filter(x => x.IsCustomTemplate === "1").map((invoiceKind) => {
            const cardList = new Array<React.ReactNode>();
            num = 0;
            cardStore.RootStore.BillTemplateLayoutStore.BillTemplateList.filter(x => x.Type === "1").forEach((template, index) => {
                if (template.BillTypeId === invoiceKind.InvoiceKindId) {
                    num++;
                    name = template.Name === null ? "" : template.Name.length > 8 ? template.Name.substr(0, 8) + "..." : template.Name;
                    cardList.push(
                        <Col span={6} key={index}>
                            <Card
                                key={template.PrintTempLateId}
                                style={{ marginTop: 10, marginBottom: 10, width: 280 }}
                                type="inner"
                                actions={[
                                    <a
                                        title="复制"
                                        key={1}
                                        id={template.PrintTempLateId.toString()}
                                        onClick={cardStore.HandleCopyClick}
                                    >
                                        <Icon type="copy" />
                                    </a>,
                                    <Popconfirm
                                        key={2}
                                        title="确定要删除吗?"
                                        onConfirm={cardStore.HandleDeleteClick.bind(undefined, template.BillTypeId, template.PrintTempLateId)}
                                        okText="确认"
                                        cancelText="取消"
                                    >
                                        <Icon type="delete" title="删除" />
                                    </Popconfirm>,
                                    <Dropdown key={3} overlay={
                                        <Menu>
                                            <Menu.Item>
                                                <a id="1" onClick={(event) => cardStore.HandleMoreBtn(event, template.PrintTempLateId + "")}>
                                                    打开设计器
                                                </a>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <a id="2" onClick={(event) => cardStore.HandleMoreBtn(event, template.PrintTempLateId + "")}>
                                                    打开json文件
                                                </a>
                                            </Menu.Item>
                                        </Menu>
                                    } >
                                        <a
                                            title="更多"
                                            key={1}
                                            id={template.PrintTempLateId.toString()}
                                            onClick={cardStore.HandleOpenDesigner}
                                        >
                                            更多
                                            <Icon type="down" />
                                        </a>
                                    </Dropdown>,
                                ]}
                            >
                                <Card.Meta
                                    title={
                                        <div style={{ padding: "16px" }}>
                                            <Tooltip title={template.Name}>
                                                <div
                                                    id={template.PrintTempLateId.toString()}
                                                    style={{ display: "inline-block", width: "70%", overflow: "hidden", textOverflow: "ellipsis", height: 60 }}
                                                    onMouseEnter={cardStore.HandleMouseEnter}
                                                    onMouseLeave={cardStore.HandleMouseLeave}
                                                >
                                                    <div>
                                                        <a
                                                            style={{ position: 'absolute', left: 16 }}
                                                            title="编辑"
                                                            id={template.PrintTempLateId.toString()}
                                                            onClick={cardStore.HandleTemplateEditClick}>
                                                            <Icon type="edit" />
                                                        </a>
                                                        {num + "." + name}
                                                    </div>
                                                </div>
                                            </Tooltip>
                                            <div style={{ display: "inline-block", float: "right" }}>
                                                {
                                                    template.IsDefault === "1" ?
                                                        <div className="label" >默认</div>
                                                        : ""
                                                }
                                                <Switch
                                                    checkedChildren="启用"
                                                    unCheckedChildren="禁用"
                                                    size="small"
                                                    checked={template.IsTurnOn === "0" ? false : true}
                                                    onChange={cardStore.HandleSwitchOnChange.bind(undefined, template.BillTypeId, template.PrintTempLateId)}
                                                />
                                            </div>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    )
                }
            })
            if (cardList.length > 0) {
                return (
                    <Card
                        key={invoiceKind.InvoiceKindId}
                        title={invoiceKind.InvoiceKindName}
                        style={{ margin: 10, marginBottom: 0 }}
                    >
                        <div style={{ width: "100%" }}>
                            <Row gutter={16} style={{ margin: 8 }}>
                                {
                                    cardList
                                }
                            </Row>
                        </div>
                    </Card >
                )
            } else {
                return "";
            }
        }) // 以上为票据模板
    }


    /** 银行托收单模板 */
    public renderBank = (): React.ReactNode => {
        const cardStore = this.props.BillTemplateCardUiStore!;
        const banklist: AgentBankList[] = [];
        const banklistFilter: AgentBankList[] = [];
        const BillTemplateList = cardStore.RootStore.BillTemplateLayoutStore.BillTemplateList.filter(x => x.Type === "3")
        cardStore.RootStore.BillTemplateLayoutStore.AgentBankList.map((item) => {
            banklist.push(item)
            if (item.children && item.children.length > 0) {
                banklist.push(...item.children)
            }
        })
        banklist.map((bank) => {
            BillTemplateList.map((item) => {
                if (item.AgentBankId === bank.AgentBankId) {
                    let isRepeat: boolean = false;
                    banklistFilter.map((data) => {
                        if (data.AgentBankId === bank.AgentBankId) {
                            isRepeat = true;
                        }
                    })
                    if (!isRepeat) {
                        banklistFilter.push(bank)
                    }
                }
            })
        })

        return banklistFilter.map((bank: AgentBankList) => {
            const cardList = new Array<React.ReactNode>();
            let num: number = 0;
            let name = "";
            BillTemplateList.forEach((template, index) => {
                if (template.AgentBankId === bank.AgentBankId) {
                    num++;
                    name = template.Name === null ? "" : template.Name.length > 8 ? template.Name.substr(0, 8) + "..." : template.Name;
                    cardList.push(
                        <Col span={6} key={index}>
                            <Card
                                key={template.PrintTempLateId}
                                style={{ marginTop: 10, marginBottom: 10, width: 280 }}
                                type="inner"
                                actions={[
                                    <a
                                        title="复制"
                                        key={1}
                                        id={template.PrintTempLateId.toString()}
                                        onClick={cardStore.HandleCopyClick}
                                    >
                                        <Icon type="copy" />
                                    </a>,
                                    <Popconfirm
                                        key={2}
                                        title="确定要删除吗?"
                                        onConfirm={cardStore.HandleDeleteClick.bind(undefined, template.BillTypeId, template.PrintTempLateId)}
                                        okText="确认"
                                        cancelText="取消"
                                    >
                                        <Icon type="delete" title="删除" />
                                    </Popconfirm>,
                                    <Dropdown key={3} overlay={
                                        <Menu>
                                            <Menu.Item>
                                                <a id="1" onClick={(event) => cardStore.HandleMoreBtn(event, template.PrintTempLateId + "")}>
                                                    打开设计器
                                                </a>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <a id="2" onClick={(event) => cardStore.HandleMoreBtn(event, template.PrintTempLateId + "")}>
                                                    打开json文件
                                                </a>
                                            </Menu.Item>
                                        </Menu>
                                    } >
                                        <a
                                            title="更多"
                                            key={1}
                                            id={template.PrintTempLateId.toString()}
                                            onClick={cardStore.HandleOpenDesigner}
                                        >
                                            更多
                                            <Icon type="down" />
                                        </a>
                                    </Dropdown>,
                                ]}
                            >
                                <Card.Meta
                                    title={
                                        <div style={{ padding: "16px" }}>
                                            <Tooltip title={template.Name}>
                                                <div
                                                    id={template.PrintTempLateId.toString()}
                                                    style={{ display: "inline-block", width: "70%", overflow: "hidden", textOverflow: "ellipsis", height: 60 }}
                                                    onMouseEnter={cardStore.HandleMouseEnter}
                                                    onMouseLeave={cardStore.HandleMouseLeave}
                                                >
                                                    <div>
                                                        <a
                                                            style={{ position: 'absolute', left: 16 }}
                                                            title="编辑"
                                                            id={template.PrintTempLateId.toString()}
                                                            onClick={cardStore.HandleTemplateEditClick}>
                                                            <Icon type="edit" />
                                                        </a>
                                                        {num + "." + name}
                                                    </div>
                                                </div>
                                            </Tooltip>

                                            <div style={{ display: "inline-block", float: "right" }}>
                                                {
                                                    template.IsDefault === "1" ?
                                                        <div className="label" >默认</div>
                                                        : ""
                                                }

                                                <Switch
                                                    checkedChildren="启用"
                                                    unCheckedChildren="禁用"
                                                    size="small"
                                                    checked={template.IsTurnOn === "0" ? false : true}
                                                    onChange={cardStore.HandleSwitchOnChange.bind(undefined, template.BillTypeId, template.PrintTempLateId)}
                                                />

                                            </div>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    )
                }

            })
            if (cardList.length > 0) {
                return (
                    < Card
                        key={bank.AgentBankId}
                        title={bank.AgentBankName}
                        style={{ margin: 10, marginBottom: 0 }}
                    >
                        <div style={{ width: "100%" }}>
                            <Row gutter={16} style={{ margin: 8 }}>
                                {
                                    cardList
                                }
                            </Row>
                        </div>
                    </Card >
                )
            } else {
                return "";
            }
        })
    }

    @action.bound
    public CreateCard() {
        const list:React.ReactNode[]=[];
        // console.log("this.props.BillTemplateLayoutStore!.PrintTemplateTypeIdArray====",this.props.BillTemplateLayoutStore!.PrintTemplateTypeIdArray)
        this.props.BillTemplateLayoutStore!.PrintTemplateTypeIdArray.map((item) => {
            if (item !== 1 && item !== 3) {
               list.push(this.renderElse(String(item)));
            }
        })
        console.log(list)
        return list;
    }

    /** 通用 */
    public renderElse = (type:string): React.ReactNode => {
        const cardStore = this.props.BillTemplateCardUiStore!;
        let num: number = 0;
        let name = "";
        const cardList = new Array<React.ReactNode>();
        num = 0;
        cardStore.RootStore.BillTemplateLayoutStore.BillTemplateList.filter(x => x.Type === type).forEach((template, index) => {
            num++;
            name = template.Name === null ? "" : template.Name.length > 8 ? template.Name.substr(0, 8) + "..." : template.Name;
            cardList.push(
                <Col span={6} key={index}>
                    <Card
                        key={template.PrintTempLateId}
                        style={{ marginTop: 10, marginBottom: 10, width: 280 }}
                        type="inner"
                        actions={[
                            <a
                                title="复制"
                                key={1}
                                id={template.PrintTempLateId.toString()}
                                onClick={cardStore.HandleCopyClick}
                            >
                                <Icon type="copy" />
                            </a>,
                            <Popconfirm
                                key={2}
                                title="确定要删除吗?"
                                onConfirm={cardStore.HandleDeleteClick.bind(undefined, template.BillTypeId, template.PrintTempLateId)}
                                okText="确认"
                                cancelText="取消"
                            >
                                <Icon type="delete" title="删除" />
                            </Popconfirm>,
                            <Dropdown key={3} overlay={
                                <Menu>
                                    <Menu.Item>
                                        <a id="1" onClick={(event) => cardStore.HandleMoreBtn(event, template.PrintTempLateId + "")}>
                                            打开设计器
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a id="2" onClick={(event) => cardStore.HandleMoreBtn(event, template.PrintTempLateId + "")}>
                                            打开json文件
                                        </a>
                                    </Menu.Item>
                                </Menu>
                            } >
                                <a
                                    title="更多"
                                    key={1}
                                    id={template.PrintTempLateId.toString()}
                                    onClick={cardStore.HandleOpenDesigner}
                                >
                                    更多
                                    <Icon type="down" />
                                </a>
                            </Dropdown>,
                        ]}
                    >
                        <Card.Meta
                            title={
                                <div style={{ padding: "16px" }}>
                                    <Tooltip title={template.Name}>
                                        <div
                                            id={template.PrintTempLateId.toString()}
                                            style={{ display: "inline-block", width: "70%", overflow: "hidden", textOverflow: "ellipsis", height: 60 }}
                                            onMouseEnter={cardStore.HandleMouseEnter}
                                            onMouseLeave={cardStore.HandleMouseLeave}
                                        >
                                            <div>
                                                <a
                                                    style={{ position: 'absolute', left: 16 }}
                                                    title="编辑"
                                                    id={template.PrintTempLateId.toString()}
                                                    onClick={cardStore.HandleTemplateEditClick}>
                                                    <Icon type="edit" />
                                                </a>
                                                {num + "." + name}
                                            </div>
                                        </div>
                                    </Tooltip>

                                    <div style={{ display: "inline-block", float: "right" }}>
                                        {
                                            template.IsDefault === "1" ?
                                                <div className="label" >默认</div>
                                                : ""
                                        }

                                        <Switch
                                            checkedChildren="启用"
                                            unCheckedChildren="禁用"
                                            size="small"
                                            checked={template.IsTurnOn === "0" ? false : true}
                                            onChange={cardStore.HandleSwitchOnChange.bind(undefined, template.BillTypeId, template.PrintTempLateId)}
                                        />

                                    </div>
                                </div>
                            }
                        />
                    </Card>
                </Col>
            )


        })
        if (cardList.length > 0) {
            return (
                < Card
                    key={type}
                    title={this.getName(Number(type))}
                    style={{ margin: 10, marginBottom: 0 }}
                >
                    <div style={{ width: "100%" }}>
                        <Row gutter={16} style={{ margin: 8 }}>
                            {
                                cardList
                            }
                        </Row>
                    </div>
                </Card >
            )
        } else {
            return "";
        }
    }

    /** 获取模板块名称 */
    @action.bound
    public getName(id: number) {
        let name = "";
        if (id && this.props.BillTemplateLayoutStore!.PrintTemplateTypeList && this.props.BillTemplateLayoutStore!.PrintTemplateTypeList.length > 0) {
            this.props.BillTemplateLayoutStore!.PrintTemplateTypeList.map((item) => {
                if (item.PrintTemplateTypeId === id) {
                    name = item.PrintTemplateTypeName;
                }
            })
        }
        return name;
    }

}