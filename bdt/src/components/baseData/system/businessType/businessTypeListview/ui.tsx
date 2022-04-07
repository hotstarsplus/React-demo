import { Button, message, TreeSelect } from 'antd';
import { inject, observer } from 'mobx-react';
import { OridStores, VerThr } from 'orid';
import * as React from 'react';
import { BusinessTypeDialog } from '../businessTypeDialog/ui';
import { BusinessTypeTable } from '../businessTypeTable/ui';
import { IBusinessTypeListViewProps } from './interface';
import { BusinessTypeViewUiAction } from './uiAction';

/**
 * 业务类别列表
 */
@inject("GlobalBusinesstypeStore")
@observer
export class BusineTypeListview extends React.Component<IBusinessTypeListViewProps>{

    private uiAction: BusinessTypeViewUiAction;

    constructor(props: IBusinessTypeListViewProps) {
        super(props);
        this.uiAction = new BusinessTypeViewUiAction(this.props.GlobalBusinesstypeStore!)
    }


    public componentWillMount() {
        message.destroy()
        this.props.GlobalBusinesstypeStore!.getCompanyNames()
    }


    public render() {
        return (
            <VerThr style={{ backgroundColor: "#fff", padding: "16px" }}>
                <VerThr.top style={{padding: "0px 8px 8px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <>
                                <TreeSelect dropdownStyle={{width:'280px',maxHeight:'300px',zIndex:0}} treeDefaultExpandAll={true} value={this.props.GlobalBusinesstypeStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                    {this.renderTreeNode(this.props.GlobalBusinesstypeStore!.CompanyNameData)}
                                </TreeSelect>
                                <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.onSearchData} />
                            </>
                            : ''
                        : ''}
                </VerThr.top>
                <VerThr.middle style={{ padding: "8px 8px 16px 0px" }} >
                    <BusinessTypeTable
                        onEdit={this.uiAction.onEditClick} />
                    <BusinessTypeDialog
                        handleCancel={this.uiAction.cancelAddOrEdit}
                        handleOk={this.uiAction.saveClick}
                        visible={this.uiAction.isVisiableModal} />
                </VerThr.middle>
            </VerThr>
        )
    }
    private onSearchData = () => {
        this.props.GlobalBusinesstypeStore!.CompanyName=this.props.GlobalBusinesstypeStore!.Name
        this.props.GlobalBusinesstypeStore!.loadDatass()
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