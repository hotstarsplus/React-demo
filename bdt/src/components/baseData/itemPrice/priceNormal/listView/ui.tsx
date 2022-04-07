import { Card } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PriceNormalDialog } from "../priceNormalDialog/ui";
import { PriceNormalTableView } from "../priceNormalTable/ui";
import { IPriceNormalViewProps } from "./interface";
import { PriceNormalViewUiAction } from "./uiAction";

/**
 * 普通水价
 */
@inject("GlobalPriceNormalStore")
@observer
export class PriceNormalView extends React.Component<IPriceNormalViewProps>{
    private uiAction:PriceNormalViewUiAction;

    constructor(props:IPriceNormalViewProps){
        super(props);
        this.uiAction = new PriceNormalViewUiAction(this.props.GlobalPriceNormalStore!);
        
    }

    public render(){
        console.info("render GlobalPriceNormalStore");
        return(
            <Card bordered={false} className={'card'}>
                <div className = "tableList">
                    
                    <PriceNormalTableView onEdit={this.uiAction.editClick}/>

                </div>
                <PriceNormalDialog
                    handleCancel={this.uiAction.cancleAddOrEdit}
                    handleOk={this.uiAction.saveClick}
                    visible={this.uiAction.isVisiableModal}
                />
            </Card>
        );
    }
}