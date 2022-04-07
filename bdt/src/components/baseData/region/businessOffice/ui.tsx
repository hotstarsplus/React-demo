import { BackTop, Button, Input, message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr, } from "orid";
import * as React from "react";
import { BusinessOfficeDialogView } from "./businessOfficeDialog/ui";
import './businessOfficeTable/BusinessOfficeTable.scss'
import { BusinessOfficeTableView } from "./businessOfficeTable/ui";
import { IBusinessOfficeListViewProps } from "./interface";
import { BusinessOfficeLisViewUiAction } from "./uiAction";

/**
 * 营业网点视图
 */
@inject("GlobalBusinessOfficeStore")
@observer
export class BusinessOfficeView extends React.Component<IBusinessOfficeListViewProps>{


    private uiAction: BusinessOfficeLisViewUiAction;

    constructor(props: IBusinessOfficeListViewProps) {

        super(props);

        this.uiAction = new BusinessOfficeLisViewUiAction(props);

        this.state = {
            optionType: "营业网点名称"
        }
    }
    public componentWillMount() {
        message.destroy()
        this.props.GlobalBusinessOfficeStore!.InputTypeName = '';
        this.props.GlobalBusinessOfficeStore!.InputAddress = '';
        this.props.GlobalBusinessOfficeStore!.InputlinkName = '';
        this.props.GlobalBusinessOfficeStore!.InputCode = '';
        this.uiAction.getCompanyName();
    }

    public render() {
        return (
            < VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px" }}>
                    {/* <FlexAlign xAlign="between">
                        <BusinessOfficeSearchView /> */}
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <TreeSelect dropdownStyle={{ width: '280px', maxHeight: '300px', zIndex: 0 }}
                                style={{ width: '280px' }}
                                treeDefaultExpandAll={true}
                                value={this.props.GlobalBusinessOfficeStore!.InfoName}
                                onChange={this.uiAction.selectedContent}>
                                {this.renderTreeNode(this.props.GlobalBusinessOfficeStore!.CompanyNameData)}
                            </TreeSelect>
                            : ''
                        : ''}
                    <Input placeholder="营业网点名称" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeTypeName} />
                    <Input placeholder="编码" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeCode} />
                    <Input placeholder="联系人" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangelinkName} />
                    <Input placeholder="地址" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeAddress} />
                    <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.uiAction.searchData} />
                    <Button icon="plus" type="primary" onClick={this.uiAction.addbtn} style={{ float: 'right' }}> 新建</Button>
                    {/* </FlexAlign> */}

                </VerThr.top>
                <VerThr.middle className='BusinessOffice-Table-ClassName'>
                    <BusinessOfficeTableView
                        onAdd={this.uiAction.adda}
                        onEdit={this.uiAction.edit}
                        refreshUi={this.uiAction.refreshUi}
                    />
                </VerThr.middle>
                <BackTop target={this.uiAction.backTopTarget} visibilityHeight={400} />
                <BusinessOfficeDialogView
                    handleOk={this.uiAction.save}
                    handleCancel={this.uiAction.cancel}
                    visible={this.uiAction.isVisiableModal}
                    title={this.uiAction.modaltitle}
                    getMaxSortNo={this.uiAction.getMaxSortNo}
                />
            </VerThr >

        );
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