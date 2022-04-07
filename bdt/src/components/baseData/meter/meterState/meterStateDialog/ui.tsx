import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from 'react';
import  MeterStateFormView from "../meterStateForm/ui";
import { IMeterStateDialogProps } from "./interface";
import { MeterStateDialogUiAction } from "./uiAction";

/**
 * 水表状态新增、编辑视图
 */
@inject("GlobalMeterStateStore")
@observer
export class MeterStateDialogView  extends React.Component<IMeterStateDialogProps> {

    private uiAction:MeterStateDialogUiAction;
    /**
     * 构造方法
     */
    constructor(props:IMeterStateDialogProps){
        super(props);

        this.uiAction = new MeterStateDialogUiAction(props);

        this.state={
            visiable:false
        };

    }

    public render(){

        return (
            <Modal 
                className="bdt-select-tree-overflow"
                title ={this.props.title}
                visible={this.props.GlobalMeterStateStore!.isVisibleModal}
                onOk = {this.uiAction.handleOk}
                onCancel = {this.props.handleCancel}
                okText={"确定"}
                cancelText={"取消"}
            >
            <MeterStateFormView 
            store={this.props.GlobalMeterStateStore!} 
            getAction={this.uiAction.getSonUiAction} />
        </Modal>

        );

    }


}