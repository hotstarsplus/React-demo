import { Card } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PriceFixDialog } from "../priceFixDialog/ui";
import { PriceFixTableView } from "../priceFixTable/ui";
import { IPriceFixViewProps } from "./interface";
import { PriceFixViewUiAction } from "./uiAction";

/**
 * 固定费用价格
 */
@inject("GlobalPriceFixStore")
@observer
export class PriceFixView extends React.Component<IPriceFixViewProps>{
    private uiAction:PriceFixViewUiAction;

    constructor(props:IPriceFixViewProps){
        super(props);
        this.uiAction = new PriceFixViewUiAction(this.props.GlobalPriceFixStore!);
        
    }

    public render(){
        console.info("render GlobalPriceFixStore");
        return(
            <Card bordered={false} className={'card'}>
                <div className = "tableList">
                    
                    <PriceFixTableView onEdit={this.uiAction.editClick}/>

                </div>
                <PriceFixDialog
                    handleCancel={this.uiAction.cancleAddOrEdit}
                    handleOk={this.uiAction.saveClick}
                    visible={this.uiAction.isVisiableModal}
                />
            </Card>
        );
    }
}