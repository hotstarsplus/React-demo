import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { inject, observer } from "mobx-react";
import React from "react";
import { BillTemplateModalStore } from "./store";


interface IBillTemplateJsonModalProps {

    /**
     * 票据模板弹窗store
     */
    BillTemplateModalStore?: BillTemplateModalStore;

}

@inject("BillTemplateModalStore")
@observer
export class BillTemplateJsonModal extends React.Component<IBillTemplateJsonModalProps>{
    constructor(props: IBillTemplateJsonModalProps) {
        super(props);
    }
    public render() {
        const modalStore = this.props.BillTemplateModalStore!;
        return (
            <Modal
                title="编辑模板文件"
                visible={modalStore.JsonModalVisible}
                destroyOnClose={true}
                onCancel={modalStore.HandleJsonCancel}
                onOk={modalStore.HandleJsonOk}
                okText="确定"
                cancelText="取消"
            >
                <TextArea style={{height:350}} onChange={modalStore.HandleJsonChange} defaultValue={modalStore.CurrentEditItem.HtmlSource}>
                    {modalStore.CurrentEditItem.HtmlSource}
                </TextArea>
            </Modal>
        )
    }


}