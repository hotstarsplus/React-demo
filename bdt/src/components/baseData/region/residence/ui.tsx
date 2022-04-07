import { BackTop, Button, Input, message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr, } from "orid";
import * as React from "react";
import '../../../index.scss';
import { IResidenceListViewProps } from "./interface";
import { ResidenceDialogView } from "./residenceDialog/ui";
import { ResidenceTableView } from "./residenceTable/ui";
import { ResidenceLisViewUiAction } from "./uiAction";


/**
 * 小区视图
 */
@inject("GlobalResidenceStore")
@observer
export class ResidenceView extends React.Component<IResidenceListViewProps>{
    private uiAction: ResidenceLisViewUiAction;
    constructor(props: IResidenceListViewProps) {
        super(props);
        this.uiAction = new ResidenceLisViewUiAction(props);
    }
    public componentWillMount() {
        message.destroy()
        this.props.GlobalResidenceStore!.InputTypeName = '';
        this.props.GlobalResidenceStore!.InputCode = '';
        this.props.GlobalResidenceStore!.InputAddress = '';
        this.uiAction.getCompanyName();
    }

    public render() {
        return (
            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <TreeSelect dropdownStyle={{ width: '280px', maxHeight: '300px', zIndex: 0 }}
                                treeDefaultExpandAll={true} value={this.props.GlobalResidenceStore!.InfoName}
                                style={{ width: '280px' }}
                                onChange={this.uiAction.selectedContent}>
                                {this.renderTreeNode(this.props.GlobalResidenceStore!.CompanyNameData)}
                            </TreeSelect>
                            : ''
                        : ''}
                    <Input placeholder="小区名称" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeTypeName} />
                    <Input placeholder="编码" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeCode} />
                    <Input placeholder="地址" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeAddress} />
                    <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.uiAction.searchData} />
                    <Button icon="plus" type="primary" onClick={this.uiAction.addbtn} style={{ float: "right" }}> 新建</Button>
                    {/* </FlexAlign> */}

                </VerThr.top>
                <VerThr.middle>
                    <ResidenceTableView
                        onAdd={this.uiAction.adda}
                        onEdit={this.uiAction.edit}
                    />
                </VerThr.middle>
                <BackTop target={this.targetFunc} visibilityHeight={400} />
                <ResidenceDialogView
                    handleOk={this.uiAction.save}
                    handleCancel={this.uiAction.cancel}
                    visible={this.uiAction.isVisiableModal}
                    title={this.uiAction.modaltitle}
                    getMaxSortNo={this.uiAction.getMaxSortNo}
                />
            </VerThr>
        );
    }
    
    private targetFunc = (): any => {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
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