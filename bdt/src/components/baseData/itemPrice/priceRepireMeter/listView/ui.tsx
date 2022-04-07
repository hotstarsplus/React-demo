import { Card } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PriceRepireMeterDialog } from "../priceRepireMeterDialog/ui";
import { PriceRepireMeterTableView } from "../priceRepireMeterTable/ui";
import { IPriceRepireMeterViewProps } from "./interface";
import { PriceRepireMeterViewUiAction } from "./uiAction";

/**
 * 校表维修费
 */
@inject("GlobalPriceRepireMeterStore")
@observer
export class PriceRepireMeterView extends React.Component<IPriceRepireMeterViewProps>{
    private uiAction:PriceRepireMeterViewUiAction;

    constructor(props:IPriceRepireMeterViewProps){
        super(props);
        this.uiAction = new PriceRepireMeterViewUiAction(this.props.GlobalPriceRepireMeterStore!);
        
    }

    public render(){
        console.info("render GlobalPriceRepireMeterStore");
        return(
            <Card bordered={false} className={'card'}>
                <div className = "tableList">
                    
                    <PriceRepireMeterTableView onEdit={this.uiAction.editClick}/>

                </div>
                <PriceRepireMeterDialog
                    handleCancel={this.uiAction.cancleAddOrEdit}
                    handleOk={this.uiAction.saveClick}
                    visible={this.uiAction.isVisiableModal}
                />
            </Card>
        );
    }
}