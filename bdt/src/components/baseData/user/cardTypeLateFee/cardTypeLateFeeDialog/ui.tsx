import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import CardTypeLateFeeForm from "../cardTypeLateFeeForm/ui"
import { ICardTypeLateFeeDialogProps } from "./interface";
import { CardTypeLateFeeDialogUiAction } from "./uiAction";
/**
 * 普通水价新增编辑弹出框
 */
@inject("GlobalCardTypeLateFeeStore")
@observer
export class CardTypeLateFeeDialog extends React.Component<ICardTypeLateFeeDialogProps>{
    
    private uiAction:CardTypeLateFeeDialogUiAction;

    constructor(props:ICardTypeLateFeeDialogProps){
        super(props);
        this.uiAction = new CardTypeLateFeeDialogUiAction(this.props);
        this.state = {
            visiable:false,
        }
    }

    public render(){
        console.info("render CardTypeLateFeeDialog");
        return(
            <Modal
                title ={this.props.title}
                visible = {this.props.visible}
                onOk = {this.uiAction.handleOk}
                onCancel = {this.props.handleCancel}
                okText = "确定"
                cancelText = "取消"
            >
                <CardTypeLateFeeForm
                    store = {this.props.GlobalCardTypeLateFeeStore!}
                    getAction = {this.uiAction.getSonFormUiAction}
                />
            </Modal>
        );
    }

}