import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import PriceFixForm from "../priceFixForm/ui"
import { IPriceFixDialogProps } from "./interface";
import { PriceFixDialogUiAction } from "./uiAction";
/**
 * 固定费用价格编辑弹出框
 */
@inject("GlobalPriceFixStore")
@observer
export class PriceFixDialog extends React.Component<IPriceFixDialogProps>{
    
    private uiAction:PriceFixDialogUiAction;

    constructor(props:IPriceFixDialogProps){
        super(props);
        this.uiAction = new PriceFixDialogUiAction(this.props);
        this.state = {
            visiable:false,
        }
    }

    public render(){
        console.info("render PriceSupperPlanDialog");
        return(
            <Modal
                title = "编辑固定费用价格"
                visible = {this.props.visible}
                onOk = {this.uiAction.handleOk}
                onCancel = {this.props.handleCancel}
                okText = "确定"
                cancelText = "取消"
            >
                <PriceFixForm
                    store = {this.props.GlobalPriceFixStore!}
                    getAction = {this.uiAction.getSonFormUiAction}
                />
            </Modal>
        );
    }

}