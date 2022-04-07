import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import  CopeMenuFormView  from "../copeMenuForm/ui";
import { IUserDialogProps } from "./interface";
import { CopeMenuDialogUiAction } from "./uiAction";



/**
 * 新增/编辑窗口
 */
@inject("GlobalUserUiStore")
@observer
export class CopeMenuUserDialogView extends React.Component<IUserDialogProps>{

    private uiAction: CopeMenuDialogUiAction;

    constructor(props:IUserDialogProps){

        super(props);

        this.uiAction = new CopeMenuDialogUiAction(props);
        this.state={
            visiable:false 
        }

    }

    public render(){
        return(
            <Modal 
                className="bdt-select-tree-overflow"
                title ={this.props.title} 
                visible = {this.props.GlobalUserUiStore!.isVisibleModal}
                onOk = {this.uiAction.Handleck}
                onCancel = {this.props.handleCancel}
                okText="确定"
                cancelText="取消"
                destroyOnClose={true}
            >
                <CopeMenuFormView 
                    GlobalUserUiStore={this.props.GlobalUserUiStore!}
                    getUiAction = {this.uiAction.GetSonUiaction}
                />
            </Modal>
        );
    }


}

