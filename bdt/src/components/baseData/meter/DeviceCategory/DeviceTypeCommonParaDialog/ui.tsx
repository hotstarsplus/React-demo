import { Button, Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import DeviceTypeCommonParaFormView from "../DeviceTypeCommonParaForm/ui";
import { IDeviceTypeCommonFieldDialogProps } from "./interface";
import { DeviceTypeCommonFieldDialogUiAction } from "./uiAction";


@inject("GlobalDeviceCategoryStore")
@observer
export class DeviceTypeCommonFieldDialogView extends React.Component<IDeviceTypeCommonFieldDialogProps>{

    private uiAction:DeviceTypeCommonFieldDialogUiAction;

    constructor(props:IDeviceTypeCommonFieldDialogProps){
        super(props);
        this.uiAction = new DeviceTypeCommonFieldDialogUiAction(props);

        this.state={
            visiable: false
        }
    }

    public render() {
        return (
            <Modal
                className="bdt-select-tree-overflow"
                // title="查看种类属性"
                title={"查看"+this.props.dialogTitle+"种类属性"}
                visible={this.props.visible}
                onOk={this.uiAction.HandleOk}
                onCancel={this.uiAction.HandleCancel}
                // okText="确定"
                // cancelText="取消"
                destroyOnClose={true}
                footer={[
                    <Button key="ok" type="primary" onClick={this.uiAction.HandleOk}>
                      确定
                    </Button>
                    
                  ]}
            >
                <DeviceTypeCommonParaFormView
                    GlobalDeviceCategoryStore={this.props!.GlobalDeviceCategoryStore}
                />
            </Modal>
        );
    }
}