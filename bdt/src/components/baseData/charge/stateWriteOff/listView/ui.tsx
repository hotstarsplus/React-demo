import { Card } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { StateWriteOffTableView } from "../stateWriteOffTable/ui";
import { IStateWriteOffViewProps } from "./interface";

/**
 * 销账状态窗口
 */
@inject("GlobalStateWriteOffStore")
@observer
export class StateWriteOffView extends React.Component<IStateWriteOffViewProps>{
    constructor(props:IStateWriteOffViewProps){
        super(props);
    }
    public render(){
        console.info("render StateWriteView");
        return(
            <Card bordered = {false} className = {'card'}>
                <div className={'tableList'}>
                    <StateWriteOffTableView/>
                </div>
            </Card> 
        )
    }
}