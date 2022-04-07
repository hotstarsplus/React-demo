import { Button, message } from "antd";
import { inject, observer } from "mobx-react";
import { VerThr } from "orid";
import React from "react";
import { ReceiveMessage } from "../../../common/webSocket/messageBase";
import { WebSocketUtil } from "../../../common/webSocket/webSocketUtil";
import { BillTemplateCard } from "../card/ui";
import { BillTemplateJsonModal } from "../modal/jsonUi";
import { BillTemplateModal } from "../modal/operationUi";
import { BillTemplateLayoutStore } from "./store";


export interface IBillTempalteLayoutProps {
    /**
     * 票据模板layoutStore
     */
    BillTemplateLayoutStore?: BillTemplateLayoutStore
}

@inject("BillTemplateLayoutStore")
@observer
export class BillTemplateLayout extends React.Component<IBillTempalteLayoutProps>{

    constructor(props: IBillTempalteLayoutProps) {
        super(props);
        WebSocketUtil.Instance.Open();
        WebSocketUtil.Instance.OnMessage(this.receiveMessage);
    }

    public render() {
        console.log("BillTemplateLayout__render")
        const layoutStore = this.props.BillTemplateLayoutStore!;
        return (
            < VerThr style={{ height: "100%" }}>
                <VerThr.top style={{ padding: "16px 8px 8px 10px" }}>
                    <Button type="primary" onClick={layoutStore.HandleAddBillTemplate}>新建票据模板</Button>
                </VerThr.top>
                <VerThr.middle style={{ padding: "8px 8px 8px 8px;" }}>
                    <BillTemplateCard />
                    <BillTemplateModal />
                    <BillTemplateJsonModal />
                </VerThr.middle>
            </VerThr >
        )
    }
    /**
     * 接收webSocket返回信息
     */
    private receiveMessage(msg: ReceiveMessage) {
        message.info(msg.ReturnMsg);
    }
}