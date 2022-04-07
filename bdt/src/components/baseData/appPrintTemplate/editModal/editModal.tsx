import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { PrintTemplateDomainStore } from "../domainStore";
import BillForm from "../form/billForm";
import { PrintTemplateUiStore } from "../uiStore";
import { EditUiAction } from "./uiAction";

export interface IEditModal {
    /** 获取模板列表 */
    getList: () => void;
    PrintTemplateUiStore?: PrintTemplateUiStore;
    PrintTemplateDomainStore?: PrintTemplateDomainStore;
}

@inject('PrintTemplateUiStore', 'PrintTemplateDomainStore')
@observer
export class EditModal extends React.Component<IEditModal>{

    public uiAction: EditUiAction;

    public constructor(props: IEditModal) {
        super(props);
        this.uiAction = new EditUiAction(props);
    }
    

    public render() {
        return (
            <Modal
                title="编辑"
                visible={this.props.PrintTemplateUiStore!.editVisible}
                onCancel={this.uiAction.closeEditModal}
                onOk={this.uiAction.submit}
                destroyOnClose={true}
                okText={"确定"}
                cancelText={"取消"}
            >
                <BillForm
                    PrintTemplateUiStore={this.props.PrintTemplateUiStore!}
                    TypeDisabled={true}
                    IsDefaultVisible={true}
                    RemarkVisible={true}
                    message={"编辑"}
                    />
            </Modal>
        )
    }
}