import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import ResidenceFormView from "../residenceForm/ui";
import { IResidenceDialogProps } from "./interface";
import { ResidenceDialogUiAction } from "./uiAction";



/**
 * 新增/编辑窗口
 */
@inject("GlobalResidenceStore")
@observer
export class ResidenceDialogView extends React.Component<IResidenceDialogProps>{

    private uiAction: ResidenceDialogUiAction;

    constructor(props: IResidenceDialogProps) {

        super(props);

        this.uiAction = new ResidenceDialogUiAction(props);

        this.state = {
            visiable: false
        }

    }

    public render() {
        return (
            <Modal
                className="bdt-select-tree-overflow"
                title={this.props.title}
                visible={this.props.GlobalResidenceStore!.isVisibleModal}
                onOk={this.uiAction.HandleOk}
                onCancel={this.props.handleCancel}
                okText="确定"
                cancelText="取消"
                destroyOnClose={true}
            >
                <ResidenceFormView
                    GlobalResidenceStore={this.props.GlobalResidenceStore!}
                    getUiAction={this.uiAction.GetSonUiAction}
                    getMaxSortNo={this.props.getMaxSortNo}
                />
            </Modal>
        );
    }


}