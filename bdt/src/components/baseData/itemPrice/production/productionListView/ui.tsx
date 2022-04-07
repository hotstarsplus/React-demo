import { inject, observer } from "mobx-react";
import { HorTwo, VerThr } from "orid";
import * as React from "react";
import { WaterKindTree } from "../../waterKind";
import { WaterProductionDialogView } from "../productionDialog/ui";
import { WaterProductionTable } from "../productionTable/ui";
import { IWaterProductionListViewProps } from "./interface";
import { WaterProductionListViewUiAction } from "./uiAction";



@inject("GlobalWaterProductionStore")
@observer
export class WaterProductionView extends React.Component<IWaterProductionListViewProps>{

    private uiAction:WaterProductionListViewUiAction;

    constructor(props:IWaterProductionListViewProps){

        super(props);

        this.uiAction = new WaterProductionListViewUiAction(props);

    }

    public componentDidMount(){
        this.uiAction.InitTable();
    }

    public render(){
        return(
            <HorTwo style={{padding:"16px"}} >
               <HorTwo.left style={{padding:"15px",borderRight:"1px solid #ccc"}}>
                 <WaterKindTree onSelect={this.uiAction.OnTreeSelect} />
               </HorTwo.left>
               <HorTwo.right>
                       <VerThr >
                           <VerThr.middle>
                             <WaterProductionTable 
                                onEdit={this.uiAction.Edit}
                                onChecked = {this.uiAction.OnTableRowSelect} 
                                onCancelChecked = {this.uiAction.OnTableCancelChecked}
                             />
                           </VerThr.middle>
                       </VerThr>
                    <WaterProductionDialogView 
                        visiable = {this.uiAction.IsVisiableModal}
                        handleCancel = {this.uiAction.Cancel} 
                        handleOk = {this.uiAction.saveClick}
                        title={this.uiAction.modaltitle}
                    />
               </HorTwo.right>
            </HorTwo>
        );

    }



}