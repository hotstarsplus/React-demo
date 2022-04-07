
import { Tree } from "antd";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { action } from "mobx";
import { requestJson } from "orid";
import * as React from "react";
import { ProductItemTreeList } from "..";
import { ThirdPartyInvoiceParamDomainStore } from "../../../../baseData/invoice/ThirdPartyInvoiceParam/domainStore";
import { ThirdPartyInvoiceParam } from "../../../../baseData/invoice/ThirdPartyInvoiceParam/entity";
import { ProductItem } from "../entity";
import { IProductItemTreeListProps } from "./interface";


export class ProductItemTreeListUiAction {

    public props: IProductItemTreeListProps;

    public cite: ProductItemTreeList;

    public domainStore: ThirdPartyInvoiceParamDomainStore;


    public constructor(props: IProductItemTreeListProps, cite: ProductItemTreeList) {
        this.props = props;
        this.cite = cite;
        this.domainStore = new ThirdPartyInvoiceParamDomainStore();
    }

    /** 展开收起节点时触发 */
    @action.bound
    public onExpand = (expandedKeys: any) => {
        this.cite.setState({
            defaultKey: expandedKeys
        })
    }

    /** 渲染组织/业务/产品项目树 */
    @action.bound
    public renderTreeNode = (tableData: any[]): any => tableData.map(item => {

        if (item.IsOrganization) {
            // 节点为组织时
            return (
                <Tree.TreeNode disabled={true} key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.BusinessTypeName} title={item.BusinessTypeName}>
                    {this.renderTreeNode(item.Children)}
                </Tree.TreeNode>);
        } else {
            if (item.ProductItemId) {
                // 节点为产品项目时  
                return <Tree.TreeNode key={item.ProductItemId + "_" + item.CpCode} data-name={item.ProductItemName} data-cpcode={item.CpCode} title={item.ProductItemName} />;
            } else {
                // 节点为业务类型时  
                return (<Tree.TreeNode disabled={true} key={item.BusinessTypeId + '+' + item.CpCode + '+' + item.BusinessTypeName} title={item.BusinessTypeName}>
                    {this.renderTreeNode(item.ProductItems)}
                </Tree.TreeNode>);
            }
        }
    })

    /**
     * 树节点点击事件
     * @param selectedKeys 
     * @param e 
     */
    @action.bound
    public onSelect(selectedKeys: string[], e: AntTreeNodeSelectedEvent) {
        this.props.GlobalThirdPartyInvoiceParamDomainStore!.name = ''
        this.props.GlobalThirdPartyInvoiceParamDomainStore!.id = ''
        this.props.GlobalThirdPartyInvoiceParamDomainStore!.TableSelectedRowKeys = [];
        if (e.selected) {
            const selectedKey = selectedKeys[0].split("_")[0];
            console.log("TreeCliCk..:", e.node.props['data-name'], e.node.props['data-cpcode'])
            this.props.GlobalThirdPartyInvoiceParamDomainStore!.CompanyCpCode = e.node.props['data-cpcode'];
            this.props.GlobalThirdPartyInvoiceParamDomainStore!.name = e.node.props['data-name']
            this.props.GlobalThirdPartyInvoiceParamDomainStore!.id = selectedKey
            this.GetListByProductItemId(selectedKey, e.node.props['data-cpcode']);
            this.props.GlobalThirdPartyInvoiceParamDomainStore!.TableSelectedRowKeys = [];
            this.props.GlobalThirdPartyInvoiceParamDomainStore!.TableSelectedRows = [];
        }

    }

    /** 根据产品id获取列表 */
    @action.bound
    public GetListByProductItemId(productItemId: string, cpcode: string) {
        const store = this.props.GlobalThirdPartyInvoiceParamDomainStore!;
        try {
            store.Loading = true;
            this.domainStore.getListByProductItemId(productItemId, cpcode).then((res) => {
                if (res.rtnCode === 0) {
                    const datas = res.data as ThirdPartyInvoiceParam[];
                    store.maxSortNo = 0;
                    datas.map((item) => {
                        if (item.SortNo >store.maxSortNo) {
                           store.maxSortNo = item.SortNo;
                        }
                    })
                    if (store.List.length > 0) {
                        store.List.splice(0, store.List.length);
                    }
                    store.List.push(...datas);
                }
                store.Loading = false;
            })
        } catch (error) {
            store.Loading = false;
        }
    }

    @action.bound
    public async loadData() {
        this.props.GlobalThirdPartyInvoiceParamDomainStore!.LeftTreeData = []
        try {

            const res = await requestJson('/api/bdt/BusinessType/GetBusinessAndProductProductItem', {
                method: "GET"
            });

            if (res.rtnCode === 0) {

                const data = res.data as ProductItem[];

                this.cite.setState({
                    list: data,
                    defaultKey: [String(data[0].BusinessTypeId + '+' + data[0].CpCode + '+' + data[0].BusinessTypeName)]
                })
                this.props.GlobalThirdPartyInvoiceParamDomainStore!.LeftTreeData = data

            }


        } catch (error) {
            console.log(error);
        }

    }

}