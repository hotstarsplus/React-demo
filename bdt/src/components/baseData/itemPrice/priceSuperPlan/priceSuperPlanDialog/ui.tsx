import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import PriceSuperPlanForm from "../priceSuperPlanForm/ui"
import { IPriceSuperPlanDialogProps } from "./interface";
import { PriceSuperPlanDialogUiAction } from "./uiAction";
/**
 * 超计划水价新增编辑弹出框
 */
@inject("GlobalPriceSuperPlanStore")
@observer
export class PriceSuperPlanDialog extends React.Component<IPriceSuperPlanDialogProps>{
    
    private uiAction:PriceSuperPlanDialogUiAction;

    constructor(props:IPriceSuperPlanDialogProps){
        super(props);
        this.uiAction = new PriceSuperPlanDialogUiAction(this.props);
        this.state = {
            visiable:false,
        }
    }

    public render(){
        console.info("render PriceSupperPlanDialog");
        return(
            <Modal
                title = "编辑超计划水费"
                visible = {this.props.visible}
                onOk = {this.uiAction.handleOk}
                onCancel = {this.props.handleCancel}
                okText = "确定"
                cancelText = "取消"
            >
                <PriceSuperPlanForm
                    store = {this.props.GlobalPriceSuperPlanStore!}
                    getAction = {this.uiAction.getSonFormUiAction}
                />
            </Modal>
        );
    }

}