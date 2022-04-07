import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import MeterTypeFormView from "../meterTypeForm/ui";
import { IMeterTypeDialogProps } from "./interface";
import { MeterTypeDialogUiAction } from "./uiAction";



/**
 * 新增/编辑窗口
 */
@inject("GlobalMeterTypeStore")
@observer
export class MeterTypeDialogView extends React.Component<IMeterTypeDialogProps>{

    private uiAction: MeterTypeDialogUiAction;

    constructor(props: IMeterTypeDialogProps) {

        super(props);

        this.uiAction = new MeterTypeDialogUiAction(props);

        this.state = {
            visiable: false
        }

    }

    public componentWillUnmount() {
        this.props.GlobalMeterTypeStore!.MeterTypeList = [];
    }

    public render() {
        return (
            <Modal
                className="bdt-select-tree-overflow"
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.uiAction.HandleOk}
                onCancel={this.props.handleCancel}
                okText="确定"
                cancelText="取消"
                destroyOnClose={true}
            >
                <MeterTypeFormView
                    GlobalMeterTypeStore={this.props.GlobalMeterTypeStore!}
                    getUiAction={this.uiAction.GetSonUiAction}
                    getMaxSortNo={this.props.getMaxSortNo}
                />
            </Modal>
        );
    }


}