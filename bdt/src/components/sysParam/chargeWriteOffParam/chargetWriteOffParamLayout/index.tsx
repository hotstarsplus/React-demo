import { inject, observer } from "mobx-react";
import React from "react";
import { ChargeWriteOffParamFormUI } from "./chargeWriteOffForm/ui";
import { ChargeWriteOffLayoutUiAction } from "./uiAction";
import { ChargeWriteOffParamUiStore } from "./uiStore";

interface IChargeWriteOffParamLayout {
    ChargeWriteOffParamUiStore?: ChargeWriteOffParamUiStore
}

@inject('ChargeWriteOffParamUiStore')
@observer
export class ChargeWriteOffParamLayout extends React.Component<IChargeWriteOffParamLayout>{

    private uiAction: ChargeWriteOffLayoutUiAction = new ChargeWriteOffLayoutUiAction(this.props.ChargeWriteOffParamUiStore!);

    public componentDidMount() {
        this.uiAction.loadData();
    }

    public render() {
        return (
            <>
                <ChargeWriteOffParamFormUI
                    Param={this.uiAction.WriteOffParamEntity}
                    onSave={this.uiAction.save}
                />
            </>
        )
    }

}