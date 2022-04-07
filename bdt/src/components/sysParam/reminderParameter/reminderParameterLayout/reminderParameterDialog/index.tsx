import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import ReminderParameterFormView from "../reminderParameterForm"
import { IReminderParameterDialogProps } from "./interface";
import { ReminderParamDialogUiAction } from "./uiAction";
/**
 * 新增/编辑窗口弹出层
 */
@inject("reminderParameterStore")
@observer
export class ReminderParameterDialogView extends React.Component<IReminderParameterDialogProps>{
    private uiAction:ReminderParamDialogUiAction
    constructor(props:IReminderParameterDialogProps){
        super(props);
        this.state={
            visiable:false,
        }
        this.uiAction= new ReminderParamDialogUiAction(props);
    }

    public componentDidMount(){
        this.props.reminderParameterStore!.loadCpMenu();
        this.props.reminderParameterStore!.loadAlertMessageType();

    }

    public render () {
        return(
            <Modal
                    title="添加提醒参数"
                    visible = {this.props.visiable}
                    onOk={this.uiAction.handleOk}
                    onCancel = {this.props.handleCancel}
                    okText="确定"
                    cancelText="取消"
                    destroyOnClose={true}
                >
                <ReminderParameterFormView
                    getAction={this.uiAction.getSonUiAction}
                />
        </Modal>
        );
    }
}