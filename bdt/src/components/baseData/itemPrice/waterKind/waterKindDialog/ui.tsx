import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import  WaterKindFormView  from "../waterKindForm/ui";
import { IWaterKindDialogProps } from "./interface";
import { WaterKindDialogUiAction } from "./uiAction";



/**
 * 新增/编辑窗口
 */
@inject("GlobalWaterKindStore")
@observer
export class WaterKindDialogView extends React.Component<IWaterKindDialogProps>{

    private uiAction:WaterKindDialogUiAction;

    constructor(props:IWaterKindDialogProps){

        super(props);

        this.uiAction = new WaterKindDialogUiAction(props);

        this.state={
            visiable:false
        }

    }

    public render(){
        return(
            <Modal 
                className="bdt-select-tree-overflow"
                title ={this.props.title}
                visible = {this.props.visible}
                onOk = {this.uiAction.HandleOk}
                onCancel = {this.props.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <WaterKindFormView 
                 GlobalWaterKindStore={this.props.GlobalWaterKindStore!}
                 getUiAction = {this.uiAction.GetSonUiAction}
                 />
            </Modal>
        );
    }


}