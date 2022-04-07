import { Divider } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { PrintTemplateUiStore } from "../../uiStore";
import { SingleModal } from "./single";

export interface IRightPart {
    loopString: (str: string) => string[];
    PrintTemplateUiStore?: PrintTemplateUiStore;
}

@inject('PrintTemplateUiStore')
@observer
export class RightPart extends React.Component<IRightPart>{
    public constructor(props: IRightPart) {
        super(props);
    }

    public render() {
        return (
            <div>
                <div><span style={{ display: 'flex', justifyContent: 'center', fontSize: 18 }}>{this.props.PrintTemplateUiStore!.templateName}</span></div>
                {this.props.PrintTemplateUiStore!.templateData && this.props.PrintTemplateUiStore!.templateData.length > 0
                    ? this.props.PrintTemplateUiStore!.templateData.map((modal, index) => {
                        return (
                            <div key={index}>
                                <Divider />
                                <SingleModal
                                    data={modal}
                                    loopString={this.props.loopString}
                                />
                            </div>
                        )
                    })
                    : ''
                }
            </div>
        )
    }
}