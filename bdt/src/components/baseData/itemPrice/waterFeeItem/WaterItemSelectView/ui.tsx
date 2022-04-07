import { TreeSelect } from "antd";
import { action } from "mobx";
import * as React from "react";
import { WaterFeeItem } from "../entity";
import { IWaterFeeItemSelectorProps } from "./interface";


export class WaterItemSelectView extends React.Component<IWaterFeeItemSelectorProps>{


    constructor(props:IWaterFeeItemSelectorProps){
        super(props);
    }
    public render(){
        
        const data = this.props.WaterFeeItemList

        return(
            <TreeSelect
            onChange={this.props.onChange}
            value={this.props.value}
            disabled={this.props.disabled}
            treeDefaultExpandAll={true}
            labelInValue={false}
            >
            <TreeSelect.TreeNode
                key={"00"}
                value={"00"}
                title={"根"}>
                {this.loop(data)}
            </TreeSelect.TreeNode>
            </TreeSelect>
        );
    }

    @action
    private loop(datas:WaterFeeItem[]):React.ReactNode{
        return datas.map((model)=>{
            if(model.children &&model.children.length){
                return(
                    <TreeSelect.TreeNode key={model.WaterFeeItemId} value={model.WaterFeeItemId} title={model.WaterFeeItemName}>
                        {this.loop(model.children)}
                    </TreeSelect.TreeNode>
                );
            }
            return <TreeSelect.TreeNode key={model.WaterFeeItemId} value={model.WaterFeeItemId} title={model.WaterFeeItemName}/>
        })
    }
}