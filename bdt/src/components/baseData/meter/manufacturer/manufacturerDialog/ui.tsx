import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from 'react';
import  ManufacturerFormView from "../manufacturerForm/ui";
import { IManufacturerDialogProps } from "./interface";
import { ManufacturerDialogUiAction } from "./uiAction";

/**
 * 水表厂商新增/编辑弹出层
 */
@inject("GlobalManufacturerStore",)
@observer
export class ManufacturerDialogView  extends React.Component<IManufacturerDialogProps> {

    private uiAction:ManufacturerDialogUiAction;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props:IManufacturerDialogProps){
        super(props);

        this.uiAction = new ManufacturerDialogUiAction(props);

        this.state={
            visiable:false
        };

    }
    
    public render(){

        return (
            <Modal 
                className="bdt-select-tree-overflow"
                title ={this.props.title}
                visible={this.props.visiable}
                onOk = {this.uiAction.handleOk}
                onCancel = {this.props.handleCancel}
                okText={"确定"}
                cancelText={"取消"}
            >
                <ManufacturerFormView 
                store={this.props.GlobalManufacturerStore!} 
                getAction={this.uiAction.getSonUiAction} />
            </Modal>

        );

    }


}