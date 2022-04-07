import { TreeSelect, } from "antd";
import { action } from "mobx";
import * as React from "react";
import { WaterKind } from "../entity";
import { IWaterKindSelectorProps } from "./interface";



/**
 * 用水性质下拉选视图
 */
export class WaterKindSelectView extends React.Component<IWaterKindSelectorProps>{


    constructor(props:IWaterKindSelectorProps){
        super(props);
    }

    public render(){

        const data = this.props.WaterKindList;

        return (
            <TreeSelect
             onChange={this.props.onChange}
             value = {this.props.value}
             disabled = {this.props.disabled}
             treeDefaultExpandAll = {true}
             labelInValue={false}
            >
            <TreeSelect.TreeNode 
                key={"00"} 
                value={"00"}
                 title={"根"} >
                {this.loop(data)}
            </TreeSelect.TreeNode>
            </TreeSelect>
        );
    }

    @action
    private loop(datas:WaterKind[]):React.ReactNode{
        return datas.map((model)=>{
            if (model.children && model.children.length) {
                return (
                    <TreeSelect.TreeNode key={model.WaterKindId} value={model.WaterKindId} title={model.WaterKindName} >
                        {this.loop(model.children)}
                    </TreeSelect.TreeNode>
                );
              }
              return <TreeSelect.TreeNode  key={model.WaterKindId} value={model.WaterKindId} title={model.WaterKindName} />;
        })

    }


}