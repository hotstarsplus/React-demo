import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import PriceNormalForm from "../priceNormalForm/ui"
import { IPriceNormalDialogProps } from "./interface";
import { PriceNormalDialogUiAction } from "./uiAction";
/**
 * 普通水价新增编辑弹出框
 */
@inject("GlobalPriceNormalStore")
@observer
export class PriceNormalDialog extends React.Component<IPriceNormalDialogProps>{
    
    private uiAction:PriceNormalDialogUiAction;

    constructor(props:IPriceNormalDialogProps){
        super(props);
        this.uiAction = new PriceNormalDialogUiAction(this.props);
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
                <PriceNormalForm
                    store = {this.props.GlobalPriceNormalStore!}
                    getAction = {this.uiAction.getSonFormUiAction}
                />
            </Modal>
        );
    }

}