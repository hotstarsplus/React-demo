import { Button, Input, message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr } from "orid";
import React from "react";
import "../../../index.scss";
import { DeviceTypeDialogView } from "./DeviceTypeDialog/ui";
import { DeviceTypeTableView } from "./DeviceTypeTable/ui";
import { IDeviceTypeListViewProps } from "./interface";
import { DeviceTypeListViewUiAction } from "./uiAction";

@inject("GlobalDeviceTypeStore")
@observer
export class DeviceTypeView extends React.Component<IDeviceTypeListViewProps>{

    private uiAction: DeviceTypeListViewUiAction;

    constructor(props: IDeviceTypeListViewProps) {
        super(props);
        this.uiAction = new DeviceTypeListViewUiAction(props);
    }
    public componentWillMount() {
        message.destroy()
        this.props.GlobalDeviceTypeStore!.InputTypeName = ''
        this.props.GlobalDeviceTypeStore!.InputCode = ''
        this.props.GlobalDeviceTypeStore!.getCompanyName()
    }

    public render() {
        return (

            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px"  }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <TreeSelect dropdownStyle={{width:'280px',maxHeight:'300px',zIndex:0}} treeDefaultExpandAll={true} value={this.props.GlobalDeviceTypeStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                {this.renderTreeNode(this.props.GlobalDeviceTypeStore!.CompanyNameData)}
                            </TreeSelect>
                            : ''
                        : ''}
                    <Input placeholder="类型编码" style={{ marginLeft: '8px', width: '150px' }} onChange={this.uiAction.ChangeCode} />
                    <Input placeholder="类型名称" style={{ marginLeft: '8px', width: '150px' }} onChange={this.uiAction.ChangeTypeName} />
                    <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.searchData} />
                    <Button icon="plus" type="primary" onClick={this.uiAction.addbtn} style={{ float: "right" }}> 新建一级设备类型</Button>
                    {/* <FlexAlign xAlign="between">
                        <DeviceTypeSearchView/>
                        <Button icon="plus" type="primary" onClick={this.uiAction.addbtn}>新建一级设备类型</Button>
                    </FlexAlign> */}

                </VerThr.top>
                <VerThr.middle>
                    <DeviceTypeTableView
                        onAdd={this.uiAction.adda}
                        onEdit={this.uiAction.edit}
                    />
                </VerThr.middle>
                <DeviceTypeDialogView
                    handleOk={this.uiAction.save}
                    handleCancel={this.uiAction.cancel}
                    visible={this.uiAction.isVisiableModal}
                    title={this.uiAction.modaltitle}
                />

            </VerThr>
        );
    }
    private searchData = () => {
        this.props.GlobalDeviceTypeStore!.CompanyName=this.props.GlobalDeviceTypeStore!.Name
        this.props.GlobalDeviceTypeStore!.loadData()
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