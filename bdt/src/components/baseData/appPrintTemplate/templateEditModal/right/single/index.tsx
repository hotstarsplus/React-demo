import { Button, Checkbox, Icon } from "antd";
import { action } from "mobx";
import { inject, observer } from "mobx-react";
import { HorTwo } from "orid";
import React from "react";
import { PrintModal } from "../../../entity";
import { PrintTemplateUiStore } from "../../../uiStore";
import { SingleInput } from "./input/input";
import { SingleUiAction } from "./uiAction";

export interface ISingleModal {
    /** 单块数据（如：客户，用户等） */
    data: PrintModal;
    loopString: (str: string) => string[]
    PrintTemplateUiStore?: PrintTemplateUiStore;
}

@inject('PrintTemplateUiStore')
@observer
export class SingleModal extends React.Component<ISingleModal>{

    public uiAction: SingleUiAction;

    public constructor(props: ISingleModal) {
        super(props);
        this.uiAction = new SingleUiAction(props, this);
    }

    public render() {
        return (
            <HorTwo>
                <HorTwo.left width='20%'>
                    <Checkbox
                        checked={this.props.data.IsUse === 'true' ? true : false}
                        value={this.props.data.ModuleId}
                        style={{ marginLeft: 4 }}
                        onChange={this.uiAction.checkboxChange}
                    >
                        {this.props.data.ModulesName}
                    </Checkbox>
                    <Button href='#' type="ghost" style={{ margin: 8 }} onClick={this.uiAction.addLine} ><Icon type='plus' />添加行</Button>
                </HorTwo.left>
                <HorTwo.right>
                    {this.props.data.ModuleField && this.props.data.ModuleField.length > 0
                        ? this.props.data.ModuleField.map((item, index) => {
                            return (
                                <SingleInput
                                    key={index}
                                    item={item}
                                    deleteLine={this.uiAction.deleteLine}
                                    flushPage={this.flushPage}
                                    moduleId={this.props.data.ModuleId}
                                    loopString={this.props.loopString}
                                />
                            )
                        }) : ''
                    }
                </HorTwo.right>
            </HorTwo>
        )
    }

    @action.bound
    private flushPage() {
        this.setState({});
    }

}