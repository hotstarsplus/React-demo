import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import  NeighborhoodFormView  from "../neighborhoodForm/ui";
import { INeighborhoodDialogProps } from "./interface";
import { NeighborhoodDialogUiAction } from "./uiAction";



/**
 * 新增/编辑窗口
 */
@inject("GlobalNeighborhoodStore")
@observer
export class NeighborhoodDialogView extends React.Component<INeighborhoodDialogProps>{

    private uiAction:NeighborhoodDialogUiAction;
    /**
     * 构造方法
     */
    constructor(props:INeighborhoodDialogProps){

        super(props);

        this.uiAction = new NeighborhoodDialogUiAction(props);

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
                destroyOnClose={true}
            >
                <NeighborhoodFormView 
                 GlobalNeighborhoodStore={this.props.GlobalNeighborhoodStore!}
                 getUiAction = {this.uiAction.GetSonUiAction}
                 />
            </Modal>
        );
    }


}