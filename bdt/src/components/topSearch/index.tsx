
import { Button, TreeSelect } from "antd";
import { OridStores } from "orid";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { IOrganizationTopSearch } from "./interface";
// import { CompanyDrawerDomainStore } from "../domainStore";
// import { OrganizationTopSearchUiAction } from "./uiAction";

/**
 * BDT多组织顶部查询组件
 */

export class OrganizationTopSearch extends React.Component<IOrganizationTopSearch>{
    constructor(props: IOrganizationTopSearch) {
        super(props);
        // this.uiAction = new OrganizationTopSearchUiAction();
    }

    public render() {
        console.log("触发渲染",this.props.organizationTreeData)
        return (
            // 判断是否启用多组织及有组织权限 
            OridStores.authStore.currentOperator.IsMultiOrganization && OridStores.authStore.currentOperator.OrganizationCodes.length !== 0
                ?
                // 多组织
                <>
                    <TreeSelect dropdownStyle={{ width: '280px', maxHeight: '300px', zIndex: 0 }} treeDefaultExpandAll={true} value={this.props.organizationTreeValue} style={{ width: '280px' }} onChange={this.props.onOrganizationTreeClickHandler}>
                        {this.renderTreeNode(this.props.organizationTreeData.slice())}
                    </TreeSelect>
                    <Button icon="search" shape="circle" style={{ marginLeft: '8px' }}  onClick={this.props.onSearchClickHandler} />
                    {
                         this.props.isShowAddBtn===true||this.props.isShowAddBtn===undefined 
                            ?
                            <Button
                                icon="plus"
                                onClick={this.props.onAddBtdClickHandler}
                                type={"primary"}
                                style={{ float: 'right' }}
                            >
                                新建企业信息
                            </Button>
                            : ""
                    }
                </>
                :
                    // 非多组织
                    this.props.isShowAddBtn===true||this.props.isShowAddBtn===undefined
                    ?
                    <Button
                        icon="plus"
                        onClick={this.props.onAddBtdClickHandler}
                        type={"primary"}
                    >
                        新建企业信息
                    </Button>
                    : ""
        )
    }

    /** 渲染树节点 */
    private renderTreeNode = (tableData: any[]): any => tableData.map(item => {
        if (item.Children && item.Children.length !== 0) {
            return (
                <TreeSelect.TreeNode key={item.OrganitionCode} value={item.OrganitionCode} title={item.OrganizationName}>
                    {this.renderTreeNode(item.Children)}
                </TreeSelect.TreeNode>);
        }
        return <TreeSelect.TreeNode key={item.OrganitionCode} value={item.OrganitionCode} title={item.OrganizationName} />;
    })
}