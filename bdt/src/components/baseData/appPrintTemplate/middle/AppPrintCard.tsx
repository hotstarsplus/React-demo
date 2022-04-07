import { Card, Col, Icon, Popconfirm, Row, Spin, Switch, Tooltip } from "antd";
import { inject, observer } from "mobx-react";
import { Nodata } from "orid";
import React from "react";
import { PrintTemplateDomainStore } from "../domainStore";
import { PrintTemplateUiStore } from "../uiStore";
import './ui.scss';
import { CardUiAction } from "./uiAction";

export interface IAppPrintCard {
    /** 获取模板列表 */
    getList: () => void;
    PrintTemplateUiStore?: PrintTemplateUiStore;
    PrintTemplateDomainStore?: PrintTemplateDomainStore;
}

@inject('PrintTemplateUiStore', 'PrintTemplateDomainStore')
@observer
export class AppPrintCard extends React.Component<IAppPrintCard> {

    public uiAction: CardUiAction;

    public constructor(props: IAppPrintCard) {
        super(props);
        this.uiAction = new CardUiAction(props);
    }
    public render() {
        const store = this.props.PrintTemplateUiStore!
        let num: number = 0;
        let name = "";
        return (
            <div className="bdt-AppCard">
                <Spin tip="正在加载中..." spinning={store.cardLoading} style={{ paddingTop: 120, verticalAlign: "middle" }}>
                    {
                        store.KindList && store.KindList.length > 0 ? store.KindList.map((items) => {
                            const cardList = new Array<React.ReactNode>();
                            num = 0;
                            items.AppPrintTemplates.map((template, index) => {
                                num++;
                                name = template.TempLateName === null ? "" : template.TempLateName.length > 6 ? template.TempLateName.substr(0, 6) + "..." : template.TempLateName;
                                cardList.push(
                                    <Col span={6} key={index}>
                                        <Card
                                            key={template.TempLateId}
                                            style={{ marginTop: 10, marginBottom: 10, width: 280 }}
                                            type="inner"
                                            actions={[
                                                <a
                                                    title="编辑模板"
                                                    key={1}
                                                    id={template.TempLateId.toString()}
                                                    onClick={this.uiAction.OpenEditTemplateModal.bind(undefined,template)}
                                                >
                                                    <Icon type="edit" />
                                                </a>,
                                                <Popconfirm
                                                    key={2}
                                                    title="确定要删除吗?"
                                                    onConfirm={this.uiAction.delete.bind(undefined, template.TempLateId)}
                                                    okText="确认"
                                                    cancelText="取消"
                                                >
                                                    <Icon type="delete" title="删除" />
                                                </Popconfirm>,
                                                <a
                                                    title="复制"
                                                    key={1}
                                                    id={template.TempLateId.toString()}
                                                    onClick={this.uiAction.copyTemplate.bind(undefined, template)}
                                                >
                                                    <Icon type="copy" />
                                                </a>,

                                            ]}
                                        >
                                            <Card.Meta
                                                title={
                                                    <div style={{ padding: "16px" }}>
                                                        <Tooltip title={template.TempLateName}>
                                                            <div
                                                                id={template.TempLateId.toString()}
                                                                style={{ display: "inline-block", width: "70%", overflow: "hidden", textOverflow: "ellipsis", height: 60 }}
                                                                onMouseEnter={this.uiAction.HandleMouseEnter}
                                                                onMouseLeave={this.uiAction.HandleMouseLeave}
                                                            >
                                                                {
                                                                    store.ShowTempId === template.TempLateId.toString() ?
                                                                        <div> {num + "." + name}
                                                                            <a
                                                                                title="编辑"
                                                                                id={template.TempLateId.toString()}
                                                                                onClick={this.uiAction.openEdit.bind(undefined, template)}
                                                                            >
                                                                                <Icon type="edit" />
                                                                            </a>
                                                                        </div> : num + "." + name}
                                                            </div>
                                                        </Tooltip>

                                                        <div style={{ display: "inline-block", float: "right" }}>
                                                            {
                                                                template.IsDefault === "1" ?
                                                                    <div className="Applabel" >默认</div>
                                                                    : ""
                                                            }

                                                            <Switch
                                                                checkedChildren="启用"
                                                                unCheckedChildren="禁用"
                                                                size="small"
                                                                checked={template.IsUse === "1" ? true : false}
                                                                onChange={this.uiAction.handelIsUse.bind(undefined, template)}
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
                                        key={items.AppPrintTypeId}
                                        title={items.AppPrintTypeName}
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
                                return '';
                            }
                        }) : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}><Nodata /></div>
                    }
                </Spin>
            </div>
        )
    }
}