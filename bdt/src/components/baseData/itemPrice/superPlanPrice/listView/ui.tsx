import { Button, message } from "antd";
import { inject, observer } from "mobx-react";
import { HorTwo, VerThr } from "orid";
import * as React from "react";
import { SuperPlanPriceTable } from "../superPlanTable/ui";
import { WaterKindListView } from "../waterKindList/ui";
import { ISuperPlanPriceSuperPlanPriceListViewProps } from "./interface";
import { SuperPlanPriceListViewUiAction } from "./uiAction";

@inject("GlobalSuperPlanPriceUiStore")
@observer
export class SuperPlanPriceListView extends React.Component<ISuperPlanPriceSuperPlanPriceListViewProps>{

    private uiAction:SuperPlanPriceListViewUiAction

    constructor(props:ISuperPlanPriceSuperPlanPriceListViewProps){
        super(props);
        this.uiAction = new SuperPlanPriceListViewUiAction(props);
        this.props.GlobalSuperPlanPriceUiStore!.List=[]

    }
    public componentWillMount(){
        message.destroy()
    }

    public render(){
        return(
                <HorTwo style={{padding:"16px",background:"#fff"}}>
                    <HorTwo.left style={{padding:"0px 8px 16px 8px",borderRight:"1px solid #d9d9d9"}} width="220px">
                        <WaterKindListView
                            onSelect = {this.uiAction.ListOnSelect}
                         />
                    </HorTwo.left>
                    <HorTwo.right style={{paddingLeft:"8px"}}>
                        <VerThr>
                            <VerThr.top style={{paddingBottom:"16px"}}>
                                <Button 
                                    type="primary" 
                                    onClick={this.uiAction.Save}
                                >
                                    保存
                                </Button>
                                <Button 
                                    type="primary"
                                    onClick={this.uiAction.AddRow} 
                                    style={{marginLeft:"8px"}}
                                >
                                        新增
                                </Button>
                            </VerThr.top>
                            <VerThr.middle>
                                <SuperPlanPriceTable />
                            </VerThr.middle>
                        </VerThr>
                        
                    </HorTwo.right>
                </HorTwo>
        )
    }


}