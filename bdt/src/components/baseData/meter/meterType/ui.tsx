import { BackTop, Button, Input, message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr } from "orid";
import * as React from "react";
import "../../../index.scss";
import { IMeterTypeListViewProps } from "./interface";
import { MeterTypeDialogView } from "./meterTypeDialog/ui";
import { MeterTypeTableView } from "./meterTypeTable/ui";
import { MeterTypeLisViewUiAction } from "./uiAction";


/**
 * 水表类型视图
 */
@inject("GlobalMeterTypeStore")
@observer
export class MeterTypeView extends React.Component<IMeterTypeListViewProps>{

    private uiAction: MeterTypeLisViewUiAction;

    constructor(props: IMeterTypeListViewProps) {
        super(props);
        this.uiAction = new MeterTypeLisViewUiAction(props);
    }
    public componentDidMount() {
        message.destroy()
        this.props.GlobalMeterTypeStore!.InputCode = ''
        this.props.GlobalMeterTypeStore!.InputTypeName = ''
        this.uiAction.getCompanyName()
    }

    public render() {
        console.log("OridStores.authStore.currentOperator.CpCode",OridStores.authStore.currentOperator.CpCode)
        return (
            < VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px"  }}>
                    {/* <FlexAlign xAlign="between"> */}
                    {/* <MeterTypeSearchView  loadingData={this.uiAction.LoadingData} /> */}
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <TreeSelect dropdownStyle={{width:'280px',zIndex:0,maxHeight:'300px'}} treeDefaultExpandAll={true} value={this.props.GlobalMeterTypeStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                {this.renderTreeNode(this.props.GlobalMeterTypeStore!.CompanyNameData)}
                            </TreeSelect>
                            : ''
                        : ''}
                    <Input placeholder="水表类型名称" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeTypeName} />
                    <Input placeholder="编码" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeCode} />
                    <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.uiAction.searchData} />
                    <Button icon="plus" type="primary" onClick={this.uiAction.addbtn} style={{ float: "right" }}> 新建</Button>
                    {/* </FlexAlign> */}
                </VerThr.top>
                <VerThr.middle>
                    <MeterTypeTableView
                        loadingData={this.uiAction.LoadingData}
                        onAdd={this.uiAction.adda}
                        onEdit={this.uiAction.edit}
                    />
                </VerThr.middle>
                <BackTop visibilityHeight={400} />
                <MeterTypeDialogView
                    handleOk={this.uiAction.save}
                    handleCancel={this.uiAction.cancel}
                    visible={this.props.GlobalMeterTypeStore!.isVisiableModal}
                    title={this.uiAction.modaltitle}
                    getMaxSortNo={this.uiAction.getMaxSortNo}
                />
            </VerThr>
        );
    }
    
    private renderTreeNode = (tableData: any[]): any => tableData.map(item => {
        if (item.Children && item.Children.length !== 0) {
            console.log('11',item,item.OrganizationCode)
            return (
                <TreeSelect.TreeNode key={item.OrganitionCode} value={item.OrganitionCode} title={item.OrganizationName}>
                    {this.renderTreeNode(item.Children)}
                </TreeSelect.TreeNode>);
        }
        return <TreeSelect.TreeNode key={item.OrganitionCode} value={item.OrganitionCode} title={item.OrganizationName} />;
    })

}