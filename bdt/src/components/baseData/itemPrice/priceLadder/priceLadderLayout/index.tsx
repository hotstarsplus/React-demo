import { Button, message, Tabs } from "antd";
import { inject, observer } from "mobx-react";
import { HorTwo, VerThr } from "orid";
import * as React from "react";
import { CycleTable } from "../priceLadderCycle/cycleTable";
import { PriceLadderTable } from "../priceLadderTable/ui";
import { WaterKindList } from "../waterKindList/ui";
import { IPriceLadderLayoutProps } from "./interface";
import { PriceLadderLayoutUiAction } from "./uiAction";

@inject("GlobalLadderPriceUiStore")
@observer
export class PriceLadderLayout extends React.Component<IPriceLadderLayoutProps>{

    private uiAction: PriceLadderLayoutUiAction

    constructor(props: IPriceLadderLayoutProps) {
        super(props);
        this.uiAction = new PriceLadderLayoutUiAction(props);
    }
    public componentWillMount() {
        message.destroy()
        this.props.GlobalLadderPriceUiStore!.List = []
    }

    public render() {
        return (
            <HorTwo style={{ padding: "16px", background: "#fff" }}>
                <HorTwo.left style={{ padding: "0px 8px 16px 8px  ", borderRight: "1px solid #d9d9d9" }} width="220px">
                    <WaterKindList
                        onSelect={this.uiAction.ListOnSelect}
                    />
                </HorTwo.left>
                <HorTwo.right style={{ paddingLeft: "8px" }}>
                    <VerThr>
                        <VerThr.top style={{ padding: "0px 8px 8px 0px" }}>
                            <Button
                                type="primary"
                                disabled={!(this.props.GlobalLadderPriceUiStore!.List && this.props.GlobalLadderPriceUiStore!.List.length > 0)}
                                onClick={this.uiAction.Save}
                                style={{ display: this.uiAction.TabsKey === "1" ? "" : "none" }}
                            >
                                保存
                            </Button>
                            <Button
                                type="primary"
                                onClick={this.uiAction.AddClick}
                                style={{
                                    display: this.uiAction.TabsKey === "2" ? "" : "none"
                                }}

                                disabled={this.props.GlobalLadderPriceUiStore!.CycleList.length === 0 ? false : true}
                            >
                                新增
                            </Button>
                        </VerThr.top>
                        <VerThr.middle>
                            <Tabs tabBarStyle={{ backgroundColor: "white", padding: 0 }} defaultActiveKey="1" onChange={this.uiAction.tabsOnChange} className="cmm-copy-set-tab">
                                <Tabs.TabPane tab="阶梯水价" key="1">
                                    <PriceLadderTable />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="阶梯周期" key="2">
                                    <CycleTable />
                                </Tabs.TabPane>
                            </Tabs>
                        </VerThr.middle>
                    </VerThr>

                </HorTwo.right>
            </HorTwo>
        )
    }


}