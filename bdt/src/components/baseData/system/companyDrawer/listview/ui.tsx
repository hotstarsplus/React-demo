import {  message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import {  VerThr } from "orid";
import * as React from "react";
import { OrganizationTopSearch } from "../../../../topSearch";
import { CompanyDialog } from "../dialog/addCompanyDialog/ui";
import { UserDialog } from "../dialog/addUserDialog/ui";
import { CompanyDrawerTable } from "../table/ui";
import { ICompanyDrawerListViewProps } from "./interface";
import { CompanyDrawerListViewUiAction } from "./uiAction";



@inject("GlobalCompanyDrawerDomainStore")
@observer
export class CompanyDrawerListView extends React.Component<ICompanyDrawerListViewProps>{


    private uiAction: CompanyDrawerListViewUiAction;

    constructor(props: ICompanyDrawerListViewProps) {
        super(props);
        this.uiAction = new CompanyDrawerListViewUiAction(props);
    }

    public componentWillMount() {
        message.destroy()
        this.props.GlobalCompanyDrawerDomainStore!.getCompanyName()
    }

    public render() {
        return (
            <VerThr style={{ backgroundColor: "#fff", padding: "16px" }}>
                <VerThr.top style={{padding: "0px 8px 16px 0px" }}>
                <OrganizationTopSearch  
                    organizationTreeData={this.props.GlobalCompanyDrawerDomainStore!.CompanyNameData.slice()}
                    organizationTreeValue={this.props.GlobalCompanyDrawerDomainStore!.InfoName}
                    isShowAddBtn={this.props.GlobalCompanyDrawerDomainStore!.isShowAddBtn}
                    onSearchClickHandler = {this.onSearchData}
                    onAddBtdClickHandler = {this.uiAction.OnAddCompany}
                    onOrganizationTreeClickHandler = {this.uiAction.selectedContent}
                />
                    {/* {
                        OridStores.authStore.currentOperator.IsMultiOrganization && OridStores.authStore.currentOperator.OrganizationCodes.length !== 0
                            ?
                            <>
                                <TreeSelect dropdownStyle={{ width: '280px', maxHeight: '300px', zIndex: 0 }} treeDefaultExpandAll={true} value={this.props.GlobalCompanyDrawerDomainStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                    {this.renderTreeNode(this.props.GlobalCompanyDrawerDomainStore!.CompanyNameData)}
                                </TreeSelect>
                                <Button icon="search" shape="circle" style={{ marginLeft: '5px' }} onClick={this.onSearchData} />
                                <Button
                                    icon="plus"
                                    onClick={this.uiAction.OnAddCompany}
                                    type={"primary"}
                                    style={{ float: 'right' }}
                                >
                                    新建企业信息
                                </Button>
                            </>
                            :
                            <Button
                                icon="plus"
                                onClick={this.uiAction.OnAddCompany}
                                type={"primary"}
                            >
                                新建企业信息
                    </Button>} */}
                </VerThr.top>
                <VerThr.middle>
                    <CompanyDrawerTable
                        onAddUser={this.uiAction.OnAddUser}
                        onEditCompany={this.uiAction.OnEditCompany}
                    />
                    <CompanyDialog
                        onCancel={this.uiAction.OnCancelCompanyModal}
                        onOk={this.uiAction.SaveCompany}
                        visible={this.uiAction.ShowCompanyModal}
                        title={this.uiAction.modaltitle}
                    />
                    <UserDialog
                        visible={this.uiAction.ShowUserModal}
                        onCancel={this.uiAction.OnCancelUserModal}
                        onOk={this.uiAction.SaveUser}
                    />
                </VerThr.middle>
            </VerThr>
        )
    }
    private onSearchData = () => {
        this.props.GlobalCompanyDrawerDomainStore!.CompanyName = this.props.GlobalCompanyDrawerDomainStore!.Name
        this.props.GlobalCompanyDrawerDomainStore!.LoadData()
    }
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