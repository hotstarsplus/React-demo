import { Button,Card } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { CardTypeLateFeeDialog } from "../cardTypeLateFeeDialog/ui";
import { CardTypeLateFeeTableView } from "../cardTypeLateFeeTable/ui";
import { ICardTypeLateFeeViewProps } from "./interface";
import { CardTypeLateFeeViewUiAction } from "./uiAction";

/**
 * 用户类型违约金
 */
@inject("GlobalCardTypeLateFeeStore")
@observer
export class CardTypeLateFeeView extends React.Component<ICardTypeLateFeeViewProps>{
    private uiAction:CardTypeLateFeeViewUiAction;

    constructor(props:ICardTypeLateFeeViewProps){
        super(props);
        this.uiAction = new CardTypeLateFeeViewUiAction(this.props.GlobalCardTypeLateFeeStore!);
        
    }

    public render(){
        console.info("render GlobalCardTypeLateFeeStore");
        return(
            <Card bordered={false} className={'card'}>
                <div className = "tableList">
                    <div className="tableListOperator">
                        <Button icon = "plus" type ="primary" onClick = {this.uiAction.addClick}>
                            新建
                        </Button>
                    </div>
                    <CardTypeLateFeeTableView onEdit={this.uiAction.editClick}/>

                </div>
                <CardTypeLateFeeDialog
                    handleCancel={this.uiAction.cancleAddOrEdit}
                    handleOk={this.uiAction.saveClick}
                    visible={this.uiAction.isVisiableModal}
                    title={this.uiAction.modaltitle}
                />
            </Card>
        );
    }
}