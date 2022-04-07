import { Tree } from "antd";
import { inject, observer } from "mobx-react";
import { requestJson } from "orid";
import * as React from "react";
import { SuperPlanPriceUiStore } from "../uiStore";
import "./index.scss";
import { IWaterKindListProps } from "./interface";



interface IWaterKindListState {
    selectedId: string
}


@inject("GlobalSuperPlanPriceUiStore")
@observer
export class WaterKindListView extends React.Component<IWaterKindListProps, IWaterKindListState>{


    public uiStore: SuperPlanPriceUiStore;

    constructor(props: IWaterKindListProps) {
        super(props);
        this.state = {
            selectedId: ""
        }
        this.uiStore = this.props.GlobalSuperPlanPriceUiStore!;

    }

    public componentDidMount() {
        this.uiStore.defaultKey = [];
        this.LoadData();

    }


    public render() {
        return (
            <Tree
                onSelect={this.props.onSelect}
                expandedKeys={this.props.GlobalSuperPlanPriceUiStore!.defaultKey}
                onExpand={this.onExpand}
            >
                {this.renderTreeNode(this.props.GlobalSuperPlanPriceUiStore!.WaterKindList)}
            </Tree>
            // <ul style={{listStyleType:"none",padding:"0px"}} >
            //     {
            //         this.props.GlobalSuperPlanPriceUiStore!.WaterKindList.map((model)=>{
            //             return (
            //                 <li 
            //                     key={model.ProductId} 
            //                     id={model.ProductId}
            //                     title={model.WaterKindName} 
            //                     onClick = {this.onClick}
            //                     className={this.state.selectedId===model.ProductId?"liSelected":"liClass"}
            //                 >
            //                 {
            //                     model.WaterKindName
            //                 }
            //                 </li>
            //             )
            //         })
            //     }
            // </ul>
        )
    }
    private onExpand = (expandedKeys: any) => {
        this.props.GlobalSuperPlanPriceUiStore!.defaultKey = expandedKeys
    }
    // private renderTreeNode = (tableData: any[]): any => tableData.map(item => {
    //     if (item.Children && item.Children.length !== 0) {
    //         return (
    //             <Tree.TreeNode disabled={true} key={item.BusinessTypeId+'+'+item.CpCode+'+'+item.IsOrganization+'+'+item.BusinessTypeName}  title={item.BusinessTypeName}>
    //                 {this.renderTreeNode(item.Children)}
    //             </Tree.TreeNode>);
    //     }
    //     if(item.ProductKinds && item.ProductKinds.length!==0){
    //         return (
    //             <Tree.TreeNode disabled={true} key={item.BusinessTypeId+'+'+item.CpCode+'+'+item.IsOrganization+'+'+item.BusinessTypeName}  title={item.BusinessTypeName}>
    //                 {this.renderTreeNodes(item.ProductKinds)}
    //             </Tree.TreeNode>);
    //     }
    //     return <Tree.TreeNode disabled={true} key={item.BusinessTypeId+'+'+item.CpCode+'+'+item.IsOrganization+'+'+item.BusinessTypeName}  title={item.BusinessTypeName} />;
    // })
    // private renderTreeNodes = (tableData: any[]): any => tableData.map(item => {
    //     if(item.children && item.children.length!==0){
    //         return (
    //             <Tree.TreeNode key={item.BusinessTypeId+'+'+item.CpCode+'+'+item.ProductKindId+'+'+item.ProductKindName}  title={item.ProductKindName}>
    //                 {this.renderTreeNodes(item.children)}
    //             </Tree.TreeNode>);
    //     }
    //     return <Tree.TreeNode key={item.BusinessTypeId+'+'+item.CpCode+'+'+item.ProductKindId+'+'+item.ProductKindName}  title={item.ProductKindName} />;
    // })
    private renderTreeNode = (tableData: any[]): any => tableData.map(item => {
        if (item.Children && item.Children.length !== 0 && item.SuperPlanPriceBase === null) {
            return (
                <Tree.TreeNode disabled={true} key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.IsOrganization + '+' + item.BusinessTypeName} title={item.BusinessTypeName}>
                    {this.renderTreeNodes(item.Children)}
                </Tree.TreeNode>);
        }
        if (item.SuperPlanPriceBase && item.SuperPlanPriceBase.length !== 0 && item.Children === null) {
            return (
                <Tree.TreeNode disabled={true} key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.IsOrganization + '+' + item.BusinessTypeName} title={item.BusinessTypeName}>
                    {this.renderTreeNodes(item.SuperPlanPriceBase)}
                </Tree.TreeNode>);
        }
        return <Tree.TreeNode disabled={true} key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.IsOrganization + '+' + item.BusinessTypeName} title={item.BusinessTypeName} />;
    })
    private renderTreeNodes = (tableData: any[]): any => tableData.map(item => {
        if (item.SuperPlanPriceBase && item.SuperPlanPriceBase.length !== 0 && item.Children === null) {
            return (
                <Tree.TreeNode disabled={true} key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.ProductId + '+' + item.BusinessTypeName} title={item.BusinessTypeName}>
                    {this.renderTreeNodes(item.SuperPlanPriceBase)}
                </Tree.TreeNode>);
        }
        if (item.Children && item.Children.length !== 0 && item.SuperPlanPriceBase === null) {
            return (
                <Tree.TreeNode disabled={true} key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.ProductId + '+' + item.BusinessTypeName} title={item.BusinessTypeName}>
                    {this.renderTreeNode(item.Children)}
                </Tree.TreeNode>);
        }
        if (item.Children && item.Children.length === 0 && item.SuperPlanPriceBase === null) {
            return (<Tree.TreeNode disabled={true} key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.IsOrganization + '+' + item.BusinessTypeName} title={item.BusinessTypeName} />);
        }
        if (item.children && item.children.length !== 0) {
            return (
                <Tree.TreeNode key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.ProductId + '+' + item.WaterKindName} title={item.WaterKindName}>
                    {this.renderTreeNodes(item.children)}
                </Tree.TreeNode>);
        }
        if (item.SuperPlanPriceBase && item.SuperPlanPriceBase.length === 0 && item.Children === null) {
            return <Tree.TreeNode disabled={true} key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.IsOrganization + '+' + item.BusinessTypeName} title={item.BusinessTypeName} />
        }
        return <Tree.TreeNode key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.ProductId + '+' + item.WaterKindName} title={item.WaterKindName} />;
    })


    private async LoadData() {

        try {

            if (this.uiStore.WaterKindList.length > 0) {
                this.uiStore.WaterKindList.splice(0, this.uiStore.WaterKindList.length);
            }

            const res = await requestJson("/api/bdt/BusinessType/GetBusinessAndProductKindListOfSuperPlan",
                {
                    method: "GET"
                }
            )

            if (res.rtnCode === 0) {
                const data = res.data as any[];
                this.uiStore.defaultKey = [String(data[0].BusinessTypeId + '+' + data[0].CpCode + '+' + data[0].IsOrganization + '+' + data[0].BusinessTypeName)]
                this.uiStore.WaterKindList.push(...data);
            }



        } catch (error) {
            console.log(error);
        }

    }



}