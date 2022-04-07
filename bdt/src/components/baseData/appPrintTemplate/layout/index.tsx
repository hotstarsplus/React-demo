import { inject, observer } from "mobx-react";
import { VerThr } from "orid";
import { VerMiddle } from "orid/lib/layout/gridBox/verThr/middle";
import { VerTop } from "orid/lib/layout/gridBox/verThr/top";
import React from "react";
import { AddModal } from "../addModal";
import { CopyModal } from "../copyModal/copyModal";
import { PrintTemplateDomainStore } from "../domainStore";
import { EditModal } from "../editModal/editModal";
import { AppPrintCard } from "../middle/AppPrintCard";
import { TemplateEditModal } from "../templateEditModal";
import { TopAdd } from "../top";
import { PrintTemplateUiStore } from "../uiStore";
import { LayoutUiAction } from "./uiAction";



export interface IAppPrintTemplateLayout {
    PrintTemplateUiStore?: PrintTemplateUiStore;
    PrintTemplateDomainStore?: PrintTemplateDomainStore
}

@inject('PrintTemplateUiStore', 'PrintTemplateDomainStore')
@observer
export class AppPrintTemplateLayout extends React.Component<IAppPrintTemplateLayout>{

    public uiAction: LayoutUiAction;

    public constructor(props: IAppPrintTemplateLayout) {
        super(props);
        this.uiAction = new LayoutUiAction(props);
    }

    public render() {
        return (
            <VerThr>
                <VerTop>
                    <TopAdd />
                </VerTop>
                <VerMiddle>
                    <AppPrintCard getList={this.uiAction.getList} />
                </VerMiddle>
                <AddModal getList={this.uiAction.getList} />
                <EditModal getList={this.uiAction.getList} />
                <CopyModal getList={this.uiAction.getList} />
                <TemplateEditModal />
            </VerThr>
        )
    }
}