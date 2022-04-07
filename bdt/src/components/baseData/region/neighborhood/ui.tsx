import { BackTop,Button } from "antd";
import { inject, observer } from "mobx-react";
import { FlexAlign,VerThr,  } from "orid";

import * as React from "react";
import { INeighborhoodListViewProps } from "./interface";
import { NeighborhoodDialogView } from "./neighborhoodDialog/ui";
import {NeighborhoodSearchView} from './neighborhoodSearch/ui'
import { NeighborhoodTableView } from "./neighborhoodTable/ui";
import { NeighborhoodLisViewUiAction } from "./uiAction";



/**
 * 缴费网点视图
 */
@inject("GlobalNeighborhoodStore")
@observer
export class NeighborhoodView extends React.Component<INeighborhoodListViewProps>{

    private uiAction:NeighborhoodLisViewUiAction;
    /**
     * 构造
     */
    constructor(props:INeighborhoodListViewProps){

        super(props);

        this.uiAction = new NeighborhoodLisViewUiAction(props);
        this.state = {
            optionType:"缴费网点名称"
        }

    }

    public render(){
        return(
            <VerThr style={{background:"#fff",padding:"16px"}}>
            <VerThr.top style={{paddingBottom:"12px"}}>
                <FlexAlign xAlign="between">
                        <NeighborhoodSearchView />
                        <Button icon="plus" type="primary" onClick={this.uiAction.addbtn}> 新建</Button>
                        </FlexAlign>
                    
                    </VerThr.top>
                    <VerThr.middle>
                     <NeighborhoodTableView 
                        onAdd = {this.uiAction.adda}
                        onEdit = {this.uiAction.edit}
                      />
                 </VerThr.middle>
                <BackTop target={this.uiAction.backTopTarget} visibilityHeight={400} />
                <NeighborhoodDialogView 
                    handleOk= {this.uiAction.save}
                    handleCancel = {this.uiAction.cancel}
                    visible = {this.uiAction.isVisiableModal}
                    title={this.uiAction.modaltitle}
                />
                </VerThr>
        );
    }

    

}