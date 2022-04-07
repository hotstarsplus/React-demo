import { Card } from "antd";
import { inject, observer } from "mobx-react";
import * as React from 'react';
import { CalcFeeStateTableView } from "../calcFeeStateTable/ui";
import { ICalcFeeStateProps } from "./interface";

@inject("GlobalCalcFeeStateStore")
@observer
export class CalcFeeStateView extends React.Component<ICalcFeeStateProps>{
    constructor(props:ICalcFeeStateProps){
        super(props);

    }

    public render(){
        console.info("render CalcFeeStateView");
        return(
            <Card bordered={false} className={'card'}>
                <div className={'tableList'}>
                    <CalcFeeStateTableView/>
                </div>

            </Card>
        );
    }
}