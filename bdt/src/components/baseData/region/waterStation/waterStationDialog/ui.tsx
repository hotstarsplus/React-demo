import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import WaterStationFormView from "../waterStationForm/ui";
import { IWaterStationDialogProps } from "./interface";
import { WaterStationDialogUiAction } from "./uiAction";



/**
 * 新增/编辑窗口
 */
@inject("GlobalWaterStationStore")
@observer
export class WaterStationDialogView extends React.Component<IWaterStationDialogProps>{

    private uiAction: WaterStationDialogUiAction;

    constructor(props: IWaterStationDialogProps) {

        super(props);

        this.uiAction = new WaterStationDialogUiAction(props);

        this.state = {
            visiable: false
        }

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
                <WaterStationFormView
                    GlobalWaterStationStore={this.props.GlobalWaterStationStore!}
                    getUiAction={this.uiAction.GetSonUiAction}
                    getMaxSortNo={this.props.getMaxSortNo}
                 />
            </Modal>
        );
    }


}