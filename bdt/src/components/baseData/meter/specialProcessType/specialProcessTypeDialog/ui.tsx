import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from 'react';
import  SpecialProcessTypeFormView from "../specialProgressTypeForm/ui";
import { ISpecialProcessTypeDialogProps } from "./interface";
import { SpecialProcessTypeDialogUiAction } from "./UiAction";

/**
 * 水表特殊型号新增、编辑弹出层视图
 */
@inject("GlobalSpecialProgressTypeStore")
@observer
export class SpecialProcessTypeDialogView  extends React.Component<ISpecialProcessTypeDialogProps> {

    private uiAction:SpecialProcessTypeDialogUiAction;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props:ISpecialProcessTypeDialogProps){
        super(props);

        this.uiAction = new SpecialProcessTypeDialogUiAction(props);

        this.state={
            visiable:false
        };

    }

    public render(){

        return (
            <Modal 
                className="bdt-select-tree-overflow"
                title="编辑水表特殊型号"
                visible={this.props.GlobalSpecialProgressTypeStore!.isVisibleModal}
                onOk = {this.uiAction.handleOk}
                onCancel = {this.props.handleCancel}
                okText={"确定"}
                cancelText={"取消"}
            >
                <SpecialProcessTypeFormView 
                store={this.props.GlobalSpecialProgressTypeStore!} 
                getAction={this.uiAction.getSonUiAction} />
            </Modal>

        );

    }


}