import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { PrintTemplateDomainStore } from "../domainStore";
import BillForm from '../form/billForm';
import { PrintTemplateUiStore } from "../uiStore";
import { CopyUiAction } from "./uiAction";

export interface ICopyModal{
    /** 获取模板列表 */
    getList: () => void;
    PrintTemplateUiStore?: PrintTemplateUiStore;
    PrintTemplateDomainStore?: PrintTemplateDomainStore
}

@inject('PrintTemplateUiStore', 'PrintTemplateDomainStore')
@observer
export class CopyModal extends React.Component<ICopyModal> {

    public uiAction:CopyUiAction;

    public constructor(props:ICopyModal){
        super(props);
        this.uiAction = new CopyUiAction(props)
    }

    public render(){
        return(
            <Modal
                title="复制"
                visible={this.props.PrintTemplateUiStore!.copyVisible}
                onCancel={this.uiAction.closeCopyModal}
                onOk={this.uiAction.submit}
                destroyOnClose={true}
                cancelText={"取消"}
                okText={"确定"}
            >
                <BillForm
                    PrintTemplateUiStore={this.props.PrintTemplateUiStore!}
                    TypeDisabled={false}
                    IsDefaultVisible={false}
                    RemarkVisible={false} />
            </Modal>
        )
    }
}