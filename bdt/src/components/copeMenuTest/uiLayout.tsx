import { Button, Input } from "antd";
import { inject, observer } from "mobx-react";
import { VerThr } from "orid";
import React from "react";
import { CopeMenuUserDialogView } from "./copeMenuDialog/ui";
import { CopeMenuTabView } from "./copeMenuTable/ui";
import { UserListUiAction } from "./uiAction";

/**
 * 组件主视图，所有的组件都要在此进行组装
 */
 @inject("GlobalUserUiStore")
 @observer
export class CopeMenuView extends React.Component<any,any>{

    private uiAction: UserListUiAction;

    constructor(props:any){
        super(props)

        this.uiAction = new UserListUiAction(props);
    }
        public render(){
        return(
            <VerThr style={{ background: "#fff", padding: "16px" }}>
            <VerThr.top style={{ padding: "0px 8px 16px 0px" }}>
                <Input placeholder="用户号" style={{ marginLeft: '8px', width: '8em' }}  />
                <Input placeholder="用户名" style={{ marginLeft: '8px', width: '8em' }}  />
                <Button icon="search" shape="circle" style={{ marginLeft: '8px' }}  />
                <Button icon="plus" type="primary" onClick={this.uiAction.addbtn}  style={{ float: 'right' }}> 新建</Button>

            </VerThr.top>
            <VerThr.middle>
                <CopeMenuTabView
                onEdit={this.uiAction.edit}
                />
            </VerThr.middle>
                <CopeMenuUserDialogView
                    title={this.uiAction.modaltitle}
                    handleCancel={this.uiAction.cancel}
                />
        </VerThr>
        );
    }
}