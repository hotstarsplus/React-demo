import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import BillTemplateForm from "./opertionFormUi";
import { BillTemplateModalStore } from "./store";

interface IBillTemplateModalProps {

    /**
     * 票据模板弹窗store
     */
    BillTemplateModalStore?: BillTemplateModalStore;

}

/**
 * 票据模板弹窗
 */
@inject("BillTemplateModalStore")
@observer
export class BillTemplateModal extends React.Component<IBillTemplateModalProps>{

    constructor(props: IBillTemplateModalProps) {
        super(props);

    }
    public render() {
        const modalStore = this.props.BillTemplateModalStore!;
        return (
            <Modal
                title={modalStore.OpertionModalTitle}
                visible={modalStore.OpertionModalVisible}
                onOk={modalStore.HandleOk}
                onCancel={modalStore.HandleCancel}
                okText={"确定"}
                cancelText={"取消"}
                bodyStyle={{ alignItems: "center" }}
                destroyOnClose={true}
                okButtonProps={{ disabled: modalStore.BtnDisible }}
            >
                <BillTemplateForm BillTemplateModalStore={this.props.BillTemplateModalStore!} />
            </Modal>
        )
    }
}