import { Tree } from "antd";
import { inject,observer,  } from "mobx-react";
import * as React from "react";
import { WaterKind } from "../entity";
import { IWaterKindTreeProps } from "./interface";
import { WaterKindTreeUiAction } from "./uiAction";


@inject("GlobalWaterKindStore")
@observer
export class WaterKindTree extends React.Component<IWaterKindTreeProps>{

    private uiAction:WaterKindTreeUiAction;

    constructor(props:IWaterKindTreeProps){
        super(props);
        this.uiAction = new WaterKindTreeUiAction(props);
        this.loop = this.loop.bind(this);
    }

    public componentDidMount(){
        this.uiAction.LoadData();
    }

    public render(){
        return(
            <Tree
                onSelect= {this.props.onSelect}
            >
             {
                 this.loop(this.props.GlobalWaterKindStore!.WaterKindList)
             }
            </Tree>
        )
    }

    private loop(list:WaterKind[]):JSX.Element[]{
      return  list.map((item:WaterKind)=>{
            if (item.children && item.children.length) {
                return <Tree.TreeNode key={item.WaterKindId} title={item.WaterKindName}>{this.loop(item.children)}</Tree.TreeNode>;
              }
              return <Tree.TreeNode key={item.WaterKindId} title={item.WaterKindName} />;
        })
    }


}