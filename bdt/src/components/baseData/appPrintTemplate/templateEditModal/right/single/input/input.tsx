import { Icon, Input, Popover } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { ModuleField } from "../../../../entity";
import { PrintTemplateUiStore } from "../../../../uiStore";
import { InputUiAction } from "./uiAction";

export interface ISingleInput {
    /** 单行数据（如：客户中的客户号一行） */
    item: ModuleField;
    /** 单块数据的ID（如：客户模块的ID） */
    moduleId: string;
    PrintTemplateUiStore?: PrintTemplateUiStore;
    loopString: (str: string) => string[];
    deleteLine: (sortNo: number) => void;
    flushPage: () => void;
}

@inject('PrintTemplateUiStore')
@observer
export class SingleInput extends React.Component<ISingleInput>{

    public uiAction: InputUiAction;

    public constructor(props: ISingleInput) {
        super(props);
        this.uiAction = new InputUiAction(props, this);
    }

    public render() {
        return (
            <div
                onMouseEnter={this.uiAction.onMouseEnter}
                onMouseLeave={this.uiAction.onMouseLeave}
                style={{ width: '100%' }}
            >
                <Input
                    value={this.props.item.FieldName}
                    name={String(this.props.item.SortNo)}
                    onChange={this.uiAction.FieldNameChange}
                    style={{ marginLeft: 8, marginTop: 4, width: '20%' }} />
                <Input
                    className={"content-textArea"}
                    value={this.props.item.FieldValue}
                    name={String(this.props.item.SortNo)}
                    onChange={this.uiAction.FieldValueChange}
                    style={{ marginLeft: 8, marginTop: 4, width: '70%' }}
                    addonAfter={
                        this.uiAction.show ?
                            <div>
                                <Icon type="up" onClick={this.uiAction.moveUp} style={{ marginRight: 5, color: 'blue' }} />
                                <Icon type="down" onClick={this.uiAction.moveDown} style={{ marginRight: 5, color: 'blue' }} />
                                <Icon type="delete" onClick={this.props.deleteLine.bind(undefined, this.props.item.SortNo)} style={{ marginRight: 5, color: 'blue' }} />
                                <Popover
                                    placement="bottomLeft"
                                    content={this.uiAction.bindProviderContent(this.props.PrintTemplateUiStore!.dataSource, this.props.moduleId, this.uiAction.insertAntistop.bind(this, "content"))}
                                >
                                    <Icon style={{ color: 'blue' }} type="setting" />
                                </Popover>
                            </div> :
                            <Popover
                                placement="bottomLeft"
                                content={this.uiAction.bindProviderContent(this.props.PrintTemplateUiStore!.dataSource, this.props.moduleId, this.uiAction.insertAntistop.bind(this, "content"))}
                            >
                                <Icon style={{ color: 'blue' }} type="setting" />
                            </Popover>
                    } />
            </div>
        )
    }
}