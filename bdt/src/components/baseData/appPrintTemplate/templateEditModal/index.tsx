import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import { HorTwo } from "orid";
import React from "react";
import { PrintTemplateDomainStore } from "../domainStore";
import { PrintTemplateUiStore } from "../uiStore";
import { LeftPart } from "./left";
import { RightPart } from "./right";
import { TemplateEditUiAction } from "./uiAction";

export interface ITemplateEditModal {
    PrintTemplateUiStore?: PrintTemplateUiStore;
    PrintTemplateDomainStore?: PrintTemplateDomainStore;
}

@inject('PrintTemplateUiStore', 'PrintTemplateDomainStore')
@observer
export class TemplateEditModal extends React.Component<ITemplateEditModal>{

    public uiAction: TemplateEditUiAction;

    public constructor(props: ITemplateEditModal) {
        super(props);
        this.uiAction = new TemplateEditUiAction(props, this);
    }

    public render() {
        return (
            <Modal
                cancelText='取消'
                okText='保存'
                title={'打印模板设置'}
                visible={this.props.PrintTemplateUiStore!.templateEditVisible}
                onCancel={this.uiAction.closeModal}
                onOk={this.uiAction.submit}
                maskClosable={false}
                width='80%'
                bodyStyle={{maxHeight:500,overflow:'auto'}}
            >
                <HorTwo>
                    <HorTwo.left width='50%'>
                        <LeftPart loopString={this.uiAction.loopString} />
                    </HorTwo.left>
                    <HorTwo.right>
                        <RightPart loopString={this.uiAction.loopString} />
                    </HorTwo.right>
                </HorTwo>
            </Modal>
        )
    }
}