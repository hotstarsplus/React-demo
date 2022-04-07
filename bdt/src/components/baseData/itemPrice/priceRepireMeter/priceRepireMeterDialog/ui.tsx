import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import PriceRepireMeterForm from "../priceRepireMeterForm/ui"
import { IPriceRepireMeterDialogProps } from "./interface";
import { PriceRepireMeterDialogUiAction } from "./uiAction";
/**
 * 校表维修费编辑弹出框
 */
@inject("GlobalPriceRepireMeterStore")
@observer
export class PriceRepireMeterDialog extends React.Component<IPriceRepireMeterDialogProps>{
    
    private uiAction:PriceRepireMeterDialogUiAction;

    constructor(props:IPriceRepireMeterDialogProps){
        super(props);
        this.uiAction = new PriceRepireMeterDialogUiAction(this.props);
        this.state = {
            visiable:false,
        }
    }

    public render(){
        console.info("render PriceSupperPlanDialog");
        return(
            <Modal
                title = "编辑普通水费"
                visible = {this.props.visible}
                onOk = {this.uiAction.handleOk}
                onCancel = {this.props.handleCancel}
                okText = "确定"
                cancelText = "取消"
            >
                <PriceRepireMeterForm
                    GlobalPriceRepireMeterStore = {this.props.GlobalPriceRepireMeterStore!}
                    getAction = {this.uiAction.getSonFormUiAction}
                />
            </Modal>
        );
    }

}