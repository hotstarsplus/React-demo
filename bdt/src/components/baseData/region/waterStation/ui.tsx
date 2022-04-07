import { BackTop, Button, Input, message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr } from "orid";
import * as React from "react";
import { IWaterStationListViewProps } from "./interface";
import { WaterStationLisViewUiAction } from "./uiAction";
import { WaterStationDialogView } from "./waterStationDialog/ui";
import { WaterStationTableView } from "./waterStationTable/ui";



/**
 * 供水所视图
 */
@inject("GlobalWaterStationStore")
@observer
export class WaterStationView extends React.Component<IWaterStationListViewProps>{


    private uiAction: WaterStationLisViewUiAction;



    constructor(props: IWaterStationListViewProps) {

        super(props);
        this.uiAction = new WaterStationLisViewUiAction(props);
        this.state = {
            optionType: "供水所名称"
        }

    }
    public componentWillMount() {
        message.destroy()
        this.props.GlobalWaterStationStore!.InputAddress = '';
        this.props.GlobalWaterStationStore!.InputCode = '';
        this.props.GlobalWaterStationStore!.InputLinkName = '';
        this.props.GlobalWaterStationStore!.InputTypeName = '';
        this.uiAction.getCompanyName();
    }

    public render() {
        return (
            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <TreeSelect dropdownStyle={{ width: '280px', maxHeight: '300px', zIndex: 0 }} treeDefaultExpandAll={true} value={this.props.GlobalWaterStationStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                {this.renderTreeNode(this.props.GlobalWaterStationStore!.CompanyNameData)}
                            </TreeSelect>
                            : ''
                        : ''}
                    <Input placeholder="供水所名称" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeTypeName} />
                    <Input placeholder="编码" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeCode} />
                    <Input placeholder="联系人" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangelinkName} />
                    <Input placeholder="地址" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeAddress} />
                    <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.uiAction.searchData} />
                    <Button icon="plus" type="primary" onClick={this.uiAction.addbtn} style={{ float: 'right' }}> 新建</Button>
                    {/* </FlexAlign> */}
                </VerThr.top>
                <VerThr.middle>
                    <WaterStationTableView
                        onAdd={this.uiAction.adda}
                        onEdit={this.uiAction.edit}
                        refreshUi={this.uiAction.refreshUi}
                    />
                </VerThr.middle>
                <BackTop target={this.uiAction.backTopTarget} visibilityHeight={400} />
                <WaterStationDialogView
                    handleOk={this.uiAction.save}
                    handleCancel={this.uiAction.cancel}
                    visible={this.uiAction.isVisiableModal}
                    title={this.uiAction.modaltitle}
                    getMaxSortNo={this.uiAction.getMaxSortNo}
                />
            </ VerThr>
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