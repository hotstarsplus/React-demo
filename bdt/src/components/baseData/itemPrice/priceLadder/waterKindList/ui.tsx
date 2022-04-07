import { Tree } from "antd";
import { inject, observer } from "mobx-react";
import { requestJson } from "orid";
import * as React from "react";
import { PriceLadderUiStore } from "../uiStore";
import "./index.scss";
import { IWaterKindListProps } from "./interface";



interface IWaterKindListState {
    selectedId: string
}


@inject("GlobalLadderPriceUiStore")
@observer
export class WaterKindList extends React.Component<IWaterKindListProps, IWaterKindListState>{

    public uiStore: PriceLadderUiStore;

    constructor(props: IWaterKindListProps) {
        super(props);
        this.uiStore = props.GlobalLadderPriceUiStore!
        this.state = {
            selectedId: ""
        }
    }


    public componentDidMount() {
        this.uiStore.defaultKey = []
        this.LoadData();
    }


    public render() {
        return (
            <Tree
                onSelect={this.props.onSelect}
                expandedKeys={this.uiStore.defaultKey}
                onExpand={this.onExpand}
            >
                {this.renderTreeNode(this.uiStore.WaterKindList)}
            </Tree>
        )
    }
    private onExpand = (expandedKeys: any) => {
        this.uiStore.defaultKey = expandedKeys
    }
    private renderTreeNode = (tableData: any[]): any => tableData.map(item => {
        if (item.Children && item.Children.length !== 0) {
            return (
                <Tree.TreeNode disabled={true} key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.IsOrganization + '+' + item.BusinessTypeName} title={item.BusinessTypeName}>
                    {this.renderTreeNode(item.Children)}
                </Tree.TreeNode>);
        }
        if (item.LadderPriceWaterKind && item.LadderPriceWaterKind.length !== 0) {
            return (
                <Tree.TreeNode disabled={true} key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.IsOrganization + '+' + item.BusinessTypeName} title={item.BusinessTypeName}>
                    {this.renderTreeNodes(item.LadderPriceWaterKind)}
                </Tree.TreeNode>);
        }
        return <Tree.TreeNode disabled={true} key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.IsOrganization + '+' + item.BusinessTypeName} title={item.BusinessTypeName} />;
    })
    private renderTreeNodes = (tableData: any[]): any => tableData.map(item => {
        if (item.children && item.children.length !== 0) {
            return (
                <Tree.TreeNode key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.ProductKindId + '+' + item.ProductKindName} title={item.ProductKindName}>
                    {this.renderTreeNodes(item.children)}
                </Tree.TreeNode>);
        }
        return <Tree.TreeNode key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.ProductKindId + '+' + item.ProductKindName} title={item.ProductKindName} />;
    })



    private async LoadData() {

        try {
            this.uiStore.productList = [];
            if (this.uiStore.WaterKindList.length > 0) {
                this.uiStore.WaterKindList.splice(0, this.uiStore.WaterKindList.length);
            }

            const res = await requestJson("/api/bdt/BusinessType/GetBusinessAndProductKindListOfLadderPrice",
                {
                    method: "GET"
                }
            )

            if (res.rtnCode === 0) {
                const data = res.data as any[];
                this.uiStore.defaultKey = [String(data[0].BusinessTypeId + '+' + data[0].CpCode + '+' + data[0].IsOrganization + '+' + data[0].BusinessTypeName)]
                this.uiStore.WaterKindList.push(...data);
                data.map((item: any) => {
                    if (item.LadderPriceWaterKind && item.LadderPriceWaterKind.length > 0) {
                        this.uiStore.productList.push(...item.LadderPriceWaterKind)
                    }
                })
            }



        } catch (error) {
            console.log(error);
        }

    }


}