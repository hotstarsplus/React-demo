import { Button, Input, message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr, } from "orid";
import * as React from "react";
import "../../../index.scss";
import { IPayBankListViewProps } from "./interface";
import { PayBankDialogView } from "./payBankDialog/ui";
import { PayBankTableView } from "./payBankTable/ui";
import { PayBankLisViewUiAction } from "./uiAction";

/**
 * 银行视图
 */
@inject("GlobalPayBankStore")
@observer
export class PayBankView extends React.Component<IPayBankListViewProps>{

    private uiAction: PayBankLisViewUiAction;
    constructor(props: IPayBankListViewProps) {
        super(props);
        this.uiAction = new PayBankLisViewUiAction(props);
    }
    public componentWillMount() {
        message.destroy()
        this.props.GlobalPayBankStore!.InputCode = ''
        this.props.GlobalPayBankStore!.InputAccount = ''
        this.props.GlobalPayBankStore!.InputTypeName = ''
        this.uiAction.getCompanyName()
    }
    public render() {
        return (
            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <TreeSelect dropdownStyle={{width:'280px',maxHeight:'300px',zIndex:0}} treeDefaultExpandAll={true} value={this.props.GlobalPayBankStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                {this.renderTreeNode(this.props.GlobalPayBankStore!.CompanyNameData)}
                            </TreeSelect>
                            : ''
                        : ''}
                    <Input placeholder="开户行名称" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeTypeName} />
                    <Input placeholder="编码" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeCode} />
                    <Input placeholder="账号" style={{ marginLeft: '8px', width: '8em' }} onChange={this.uiAction.ChangeAccount} />
                    <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.uiAction.searchData} />
                    <Button icon="plus" type="primary" onClick={this.uiAction.addbtn} style={{ float: 'right' }}> 新建</Button>

                </VerThr.top>
                <VerThr.middle>
                    <PayBankTableView
                        onAdd={this.uiAction.adda}
                        onDelete={this.uiAction.DeletePayBank}
                        onEdit={this.uiAction.edit}
                    />
                </VerThr.middle>
                <PayBankDialogView
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