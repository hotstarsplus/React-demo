import { Divider } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { PrintTemplateUiStore } from "../../uiStore";
import { BrowseModal } from "./single";
import { LeftUiAction } from "./uiAction";

export interface ILeftPart {
    loopString: (str: string) => string[];
    PrintTemplateUiStore?: PrintTemplateUiStore;
}

@inject('PrintTemplateUiStore')
@observer
export class LeftPart extends React.Component<ILeftPart>{

    public uiAction: LeftUiAction;

    public constructor(props: ILeftPart) {
        super(props)
        this.uiAction = new LeftUiAction(props, this);
    }

    public render() {
        return (
            <div>
                <div><span style={{ display: 'flex', justifyContent: 'center', fontSize: 18 }}>{this.props.PrintTemplateUiStore!.templateName + '(预览)'}</span></div>
                {this.props.PrintTemplateUiStore!.templateData && this.props.PrintTemplateUiStore!.templateData.length > 0
                    ? this.props.PrintTemplateUiStore!.templateData.map((modal, index) => {
                        return (
                            modal.IsUse === "true" ?
                                <div key={index}>
                                    <Divider />
                                    <BrowseModal
                                        data={modal}
                                        loopString={this.props.loopString}
                                    />
                                </div> : ''
                        )
                    })
                    : ''
                }
            </div>
        )
    }

}