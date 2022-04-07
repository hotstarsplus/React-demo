import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import CardTypeFormView from "../cardTypeForm/ui";
import { ICardTypeDialogProps } from "./interface";
import { CardTypeDialogUiAction } from "./uiAction";

/**
 * 新增/编辑窗口
 */
@inject("GlobalCardTypeStore")
@observer
export class CardTypeDialogView extends React.Component<ICardTypeDialogProps>{

    private uiAction: CardTypeDialogUiAction;

    constructor(props: ICardTypeDialogProps) {
        super(props);
        this.uiAction = new CardTypeDialogUiAction(props);
        this.state = {
            visiable: false
        }
    }

    public render() {
        return (
            <Modal
                className="bdt-select-tree-overflow"
                title={this.props.title}
                visible={this.props.GlobalCardTypeStore!.isVisibleModal}
                onOk={this.uiAction.HandleOk}
                onCancel={this.props.handleCancel}
                okText="确定"
                cancelText="取消"
                destroyOnClose={true}
            >
                <CardTypeFormView
                    GlobalCardTypeStore={this.props.GlobalCardTypeStore!}
                    getUiAction={this.uiAction.GetSonUiAction}
                    getMaxSortNo={this.props.getMaxSortNo}
                />
            </Modal>
        );
    }
}