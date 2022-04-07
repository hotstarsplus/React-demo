import { Card } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PriceSuperPlanDialog } from "../priceSuperPlanDialog/ui";
import { PriceSuperPlanTableView } from "../priceSuperPlanTable/ui";
import { IPriceSuperPlanViewProps } from "./interface";
import { PriceSuperPlanViewUiAction } from "./uiAction";

/**
 * 超计划水价
 */
@inject("GlobalPriceSuperPlanStore")
@observer
export class PriceSuperPlanView extends React.Component<IPriceSuperPlanViewProps>{
    private uiAction:PriceSuperPlanViewUiAction;

    constructor(props:IPriceSuperPlanViewProps){
        super(props);
        this.uiAction = new PriceSuperPlanViewUiAction(this.props.GlobalPriceSuperPlanStore!);
        
    }

    public render(){
        console.info("render GlobalPriceSuperPlanStore");
        return(
            <Card bordered={false} className={'card'}>
                <div className = "tableList">
                    
                    <PriceSuperPlanTableView onEdit={this.uiAction.editClick}/>

                </div>
                <PriceSuperPlanDialog
                    handleCancel={this.uiAction.cancleAddOrEdit}
                    handleOk={this.uiAction.saveClick}
                    visible={this.uiAction.isVisiableModal}
                />
            </Card>
        );
    }
}