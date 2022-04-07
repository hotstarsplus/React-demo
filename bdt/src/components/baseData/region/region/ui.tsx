import { BackTop, Button, Input, message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr } from "orid";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { IOrganition } from "./entity";
import { IRegionListViewProps } from "./interface";
import { RegionDialogView } from "./regionDialog/ui";
import { RegionTableView } from "./regionTable/ui";
import { RegionLisViewUiAction } from "./uiAction";



/**
 * 片区视图
 */
@inject("GlobalRegionStore")
@observer
export class RegionView extends React.Component<IRegionListViewProps>{

    private uiAction: RegionLisViewUiAction;


    constructor(props: IRegionListViewProps) {

        super(props);

        this.uiAction = new RegionLisViewUiAction(props);

    }
    public componentWillMount() {
        message.destroy()
        this.uiAction.GetCompanyName();
        this.uiAction.LoadData(OridStores.authStore.currentOperator.CpCode, "");
    }

    public render() {
        return (
            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px" }}>
                    {/* <FlexAlign xAlign="between"> */}
                    {/* <RegionSearchView /> */}
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        this.props.GlobalRegionStore!.CompanyNameData.length !== 0 ?
                            <TreeSelect
                                dropdownStyle={{ width: '280px', maxHeight: '300px', zIndex: 0 }}
                                treeDefaultExpandAll={true}
                                onChange={this.uiAction.HandleChangeOrgin}
                                style={{ width: '280px' }}
                                defaultValue={OridStores.authStore.currentOperator.CpCode}>
                                {this.renderTreeNode(this.props.GlobalRegionStore!.CompanyNameData)}
                            </TreeSelect>
                            : ''
                        : ""}
                    <Input
                        placeholder="片区名称"
                        style={{ marginLeft: '8px', width: '8em' }}
                        onChange={this.uiAction.ChangeTypeName} />
                    <Input
                        placeholder="编码"
                        style={{ marginLeft: '8px', width: '8em' }}
                        onChange={this.uiAction.ChangeCode} />
                    <Button
                        icon="search"
                        shape="circle"
                        style={{ marginLeft: '8px' }}
                        onClick={this.uiAction.SearchData} />
                    <Button
                        icon="plus"
                        type="primary"
                        onClick={this.uiAction.Addbtn}
                        style={{ float: 'right' }}>
                        新建
                    </Button>
                    {/* </FlexAlign> */}

                </VerThr.top>
                <VerThr.middle>
                    <RegionTableView
                        // onAdd={this.uiAction.adda}
                        onEdit={this.uiAction.Edit} />
                    <BackTop target={this.uiAction.BackTopTarget} visibilityHeight={400} />
                </VerThr.middle>
                <RegionDialogView
                    handleOk={this.uiAction.Save}
                    handleCancel={this.uiAction.Cancel}
                    visible={this.props.GlobalRegionStore!.IsVisiableModal}
                    title={this.uiAction.modaltitle}
                    GetMaxSortNo={this.uiAction.GetMaxSortNo}/>
            </VerThr>

        );
    }

    private renderTreeNode = (tableData: IOrganition[]): any => tableData.map(item => {
        if (item.Children && item.Children.length !== 0) {
            return (
                <TreeSelect.TreeNode
                    key={item.OrganitionCode}
                    value={item.OrganitionCode}
                    title={item.OrganizationName}>
                    {this.renderTreeNode(item.Children)}
                </TreeSelect.TreeNode>);
        }
        return <TreeSelect.TreeNode
            key={item.OrganitionCode}
            value={item.OrganitionCode}
            title={item.OrganizationName} />;
    })
}