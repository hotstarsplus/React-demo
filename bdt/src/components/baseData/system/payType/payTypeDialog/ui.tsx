import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from 'react';
import  PayTypeFormView from "../payTypeform/ui";
import { IPayTypeDialogProps } from "./interface";
import { PayTypeDialogUiAction } from "./uiAction";

/**
 * 支付方式新增编辑弹出层视图
 */
@inject("GlobalPayTypeStore")
@observer
export class PayTypeDialogView  extends React.Component<IPayTypeDialogProps> {

    private uiAction:PayTypeDialogUiAction;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props:IPayTypeDialogProps){
        super(props);

        this.uiAction = new PayTypeDialogUiAction(props);

        this.state={
            visiable:false
        };

    }

    public render(){

        return (
            <Modal 
            className="bdt-select-tree-overflow"
                title="编辑支付方式"
                visible={this.props.visiable}
                onOk = {this.uiAction.handleOk}
                onCancel = {this.props.handleCancel}
                okText={"确定"}
                cancelText={"取消"}
            >
                <PayTypeFormView 
                store={this.props.GlobalPayTypeStore!} 
                getAction={this.uiAction.getSonUiAction} />
            </Modal>

        );

    }


}