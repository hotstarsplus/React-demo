import { Card } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { MainBranchTypeTableView } from "../mainBranchTypeTable/ui";
import { IMainBranchTypeViewProps } from "./interface";

@inject("GlobalMainBranchTypeStore")
@observer
export class MainBranchTypeView extends React.Component<IMainBranchTypeViewProps>{
    constructor(props:IMainBranchTypeViewProps){
        super(props);
    }

    public render(){
        console.info("render MainBranchTypeView");
        return(
            <Card bordered={false} className={'card'}>
            <div className = "tableList">
                
                <MainBranchTypeTableView />

            </div>
        </Card>
        );
    }
}