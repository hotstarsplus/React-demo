import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IDeviceTypeDialogProps } from "./interface";
import { DeviceTypeDialogUiAction } from "./uiAction";

import  DeviceTypeFormView  from "../DeviceTypeForm/ui";

/**
 * 新增/编辑窗口
 */
@inject("GlobalDeviceTypeStore")
@observer
export class DeviceTypeDialogView extends React.Component<IDeviceTypeDialogProps>{

    private uiAction: DeviceTypeDialogUiAction;

    constructor(props: IDeviceTypeDialogProps) {

        super(props);

        this.uiAction = new DeviceTypeDialogUiAction(props);

        this.state = {
            visiable: false
        }

    }

    public render() {
        return (
            <Modal
                className="bdt-select-tree-overflow"
                title ={this.props.title}
                visible={this.props.GlobalDeviceTypeStore!.isShowEditDialog}
                onOk={this.uiAction.HandleOk}
                onCancel={this.uiAction.HandleCancel}
                okText="确定"
                cancelText="取消"
                destroyOnClose={true}
            >
                <DeviceTypeFormView
                    GlobalDeviceTypeStore={this.props.GlobalDeviceTypeStore!}
                    getAction={this.uiAction.GetSonUiAction}
                />
            </Modal>
        );
    }


}