import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { PrintTemplateDomainStore } from "../domainStore";
import BillForm from "../form/billForm";
import { PrintTemplateUiStore } from "../uiStore";
import { AddUiAction } from "./uiAction";

export interface IAddModal {
    /** 获取模板列表 */
    getList: () => void;
    PrintTemplateUiStore?: PrintTemplateUiStore;
    PrintTemplateDomainStore?: PrintTemplateDomainStore
}



@inject('PrintTemplateUiStore', 'PrintTemplateDomainStore')
@observer
export class AddModal extends React.Component<IAddModal>{

    public uiAction: AddUiAction;

    public constructor(props: IAddModal) {
        super(props);
        this.uiAction = new AddUiAction(props)
        
    }

    

    public render() {

        return (
            <Modal
                title="新增打印模板"
                visible={this.props.PrintTemplateUiStore!.addVisible}
                onCancel={this.uiAction.closeAddModal}
                onOk={this.uiAction.submit}
                destroyOnClose={true}
                okText={"确定"}
                cancelText={"取消"}
            >
                <BillForm
                    PrintTemplateUiStore={this.props.PrintTemplateUiStore!}
                    TypeDisabled={false}
                    IsDefaultVisible={true}
                    RemarkVisible={true}
                    message={'新增'}
                    />
            </Modal>
        )
    }
}




