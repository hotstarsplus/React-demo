import { BackTop, Button, Input, message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr, } from "orid";
import * as React from "react";
import '../../../index.scss';
import { CardTypeDialogView } from "./cardTypeDialog/ui";
import { CardTypeTableView } from "./cardTypeTable/ui";
import { ICardTypeListViewProps } from "./interface";
import { CardTypeLisViewUiAction } from "./uiAction";


/**
 * 水卡类型视图
 */
@inject("GlobalCardTypeStore")
@observer
export class CardTypeView extends React.Component<ICardTypeListViewProps>{
    private uiAction: CardTypeLisViewUiAction;
    constructor(props: ICardTypeListViewProps) {
        super(props);
        this.uiAction = new CardTypeLisViewUiAction(props);
    }
    public componentWillMount() {
        message.destroy();
        this.props.GlobalCardTypeStore!.InputCode = '';
        this.props.GlobalCardTypeStore!.InputTypeName = '';
        this.uiAction.getCompanyName();
    }

    public render() {
        return (
            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px" }}>
                    {/* <FlexAlign xAlign="between">
                        <CardTypeSearchView /> */}
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <TreeSelect dropdownStyle={{ width: '280px', maxHeight: '300px', zIndex: 0 }} treeDefaultExpandAll={true} value={this.props.GlobalCardTypeStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                {this.renderTreeNode(this.props.GlobalCardTypeStore!.CompanyNameData)}
                            </TreeSelect>
                            : ''
                        : ''}
                    <Input placeholder="客户类型名称" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeTypeName} />
                    <Input placeholder="编码" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeCode} />
                    <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.uiAction.searchData} />
                    <Button icon="plus" type="primary" onClick={this.uiAction.addbtn} style={{ float: "right" }}> 新建</Button>
                    {/* </FlexAlign> */}
                </VerThr.top>
                <VerThr.middle>
                    <CardTypeTableView
                        onAdd={this.uiAction.adda}
                        onEdit={this.uiAction.edit}
                    />
                </VerThr.middle>
                <BackTop target={this.uiAction.targetFunc} visibilityHeight={400} />
                <CardTypeDialogView
                    handleOk={this.uiAction.save}
                    handleCancel={this.uiAction.cancel}
                    visible={this.uiAction.isVisiableModal}
                    title={this.uiAction.modaltitle}
                    getMaxSortNo={this.uiAction.getMaxSortNo}
                />
            </VerThr>
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