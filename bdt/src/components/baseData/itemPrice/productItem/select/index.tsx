import { TreeSelect } from "antd";
import { action } from "mobx";
import * as React from "react";
import { ProductItem } from "../entity";
import { IProductItemSelectorProps } from "./interface";


export class ProductItemSelectView extends React.Component<IProductItemSelectorProps>{


    constructor(props:IProductItemSelectorProps){
        super(props);
    }
    public render(){
        
        const data = this.props.ProductItemList

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
    private loop(datas:ProductItem[]):React.ReactNode{
        return datas.map((model)=>{
            return <TreeSelect.TreeNode key={model.ProductItemId} value={model.ProductItemId} title={model.ProductItemName}/>
        })
    }
}