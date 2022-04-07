import { Button } from "antd";
import { inject, observer } from "mobx-react";
import { VerThr } from "orid";
import * as React from "react";
import { WaterKindDialogView } from "../waterKindDialog/ui";
import { WaterKindTableView } from "../waterKindTable/ui";
import { IWaterKindListViewProps } from "./interface";
import { WaterKindLisViewUiAction } from "./uiAction";





/**
 * 用水性质视图
 */
@inject("GlobalWaterKindStore")
@observer
export class WaterKindView extends React.Component<IWaterKindListViewProps>{


    private uiAction:WaterKindLisViewUiAction;


    constructor(props:IWaterKindListViewProps){

        super(props);

        this.uiAction = new WaterKindLisViewUiAction(props);

    }

    public render(){
        return(
            <VerThr style={{backgroundColor:"#fff",padding:"16px"}}>
                <VerThr.top style={{paddingBottom:"12px"}} >
                    <Button icon="plus" type="primary" onClick={this.uiAction.addbtn}> 新建</Button>
                </VerThr.top>
                <VerThr.middle >
                    <WaterKindTableView 
                        onAdd = {this.uiAction.adda}
                        onEdit = {this.uiAction.edit}
                    />
                </VerThr.middle>
                    <WaterKindDialogView 
                        handleOk= {this.uiAction.save}
                        handleCancel = {this.uiAction.cancel}
                        visible = {this.uiAction.isVisiableModal}
                        title={this.uiAction.modaltitle}
                    />
            </VerThr>
        );
    }


}