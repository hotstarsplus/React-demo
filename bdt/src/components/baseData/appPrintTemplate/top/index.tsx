import { Button } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { PrintTemplateUiStore } from "../uiStore";
import { TopAddUiAction } from "./uiAction";


export interface ITopAdd{
    PrintTemplateUiStore?:PrintTemplateUiStore;
}

@inject('PrintTemplateUiStore')
@observer
export class TopAdd extends React.Component<ITopAdd>{

    public uiAction:TopAddUiAction;

    public constructor(props:ITopAdd){
        super(props)
        this.uiAction = new TopAddUiAction(props)
    }
    public render(){
        return (
            <div>
                <Button type='primary' style={{margin:16}} onClick={this.uiAction.openAddModal} >新增打印模板</Button>
            </div>
        )
    }
}