import { Tree } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ProductItem } from "../entity";
import { IProductItemTreeListProps } from "./interface";
import { ProductItemTreeListUiAction } from "./uiAction";





@inject("GlobalThirdPartyInvoiceParamDomainStore")
@observer
export class ProductItemTreeList extends React.Component<IProductItemTreeListProps, { list: ProductItem[],defaultKey:any[] }>{

    public uiAction:ProductItemTreeListUiAction;

    constructor(props: IProductItemTreeListProps) {
        super(props);
        this.state = {
            list: [],
            defaultKey:[]
        }
        this.uiAction = new ProductItemTreeListUiAction(props,this);
    }


    public componentWillMount() {
        this.setState({
            defaultKey:[]
        })
        this.uiAction.loadData()
    }


    public render() {
        return (
            <Tree
                onSelect={this.uiAction.onSelect}
                expandedKeys={this.state.defaultKey}
                onExpand={this.uiAction.onExpand}
            >
                {this.uiAction.renderTreeNode(this.state.list)}
            </Tree>
        )
    }
   

   


    




}