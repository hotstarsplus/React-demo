import { Tree } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IBusinessTypeTreeListProps } from "./interface";


@inject("GlobalBusinesstypeStore")
@observer
export class BusinessTypeTreeList extends React.Component<IBusinessTypeTreeListProps>{


    constructor(props:IBusinessTypeTreeListProps){
        super(props);
    }


    public componentWillMount(){
        this.props.GlobalBusinesstypeStore!.defaultKey=[]
            this.props.GlobalBusinesstypeStore!.loadDatas();
    }


    public render(){
        return(
            <Tree
                onSelect = {this.props.onSelect}
                expandedKeys = {this.props.GlobalBusinesstypeStore!.defaultKey}
                onExpand={this.onExpand}
            >
                {this.renderTreeNode(this.props.GlobalBusinesstypeStore!.BusinessTypeList.filter(x=>x.IsEnable==="1"))}
            </Tree>
        )
    }
    private onExpand=(expandedKeys:any)=>{
        this.props.GlobalBusinesstypeStore!.defaultKey=expandedKeys
    }
    private renderTreeNode = (tableData: any[]): any => tableData.map(item => {
        if (item.Children && item.Children.length !== 0) {
            return (
                <Tree.TreeNode disabled={true} key={item.BusinessTypeId+'+'+item.CpCode+'+'+item.IsOrganization}  title={item.BusinessTypeName}>
                    {this.renderTreeNode(item.Children)}
                </Tree.TreeNode>);
        }
        if (item.Children && item.Children.length === 0) {
            return <Tree.TreeNode disabled={true} key={item.BusinessTypeId+'+'+item.CpCode+'+'+item.IsOrganization}  title={item.BusinessTypeName} />;
        }
        return <Tree.TreeNode key={item.BusinessTypeId+'+'+item.CpCode+'+'+item.IsOrganization}  title={item.BusinessTypeName} />;
    })



}