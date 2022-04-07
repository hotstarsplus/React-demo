import { BackTop, Button, message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr } from "orid";
import * as React from "react";
import { IPayTypeViewProps } from "./interface";
import { PayTypeDialogView } from "./payTypeDialog/ui";
import { PayTypeTableView } from "./payTypeTable/ui";
import { PayTypeListViewUiAction } from "./uiAction";


/**
 * 支付方式视图
 */
@inject("GlobalPayTypeStore")
@observer
export class PayTypeView extends React.Component<IPayTypeViewProps>{

    private uiAction: PayTypeListViewUiAction;

    /**
     * 构造方法
     * @param props
     */
    constructor(props: IPayTypeViewProps) {
        super(props);
        this.state = {
            cardDomNode: undefined,
        }
        this.uiAction = new PayTypeListViewUiAction(props);
    }
    public componentWillMount() {
        message.destroy();
        this.uiAction.getCompanyName();
    }

    public render() {
        return (

            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <>
                                <TreeSelect dropdownStyle={{ width: '280px', maxHeight: '300px', zIndex: 0 }} treeDefaultExpandAll={true} value={this.props.GlobalPayTypeStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                    {this.renderTreeNode(this.props.GlobalPayTypeStore!.CompanyNameData)}
                                </TreeSelect>
                                <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.uiAction.onSearchData} />
                            </>
                            : ''
                        : ''}
                </VerThr.top>
                <VerThr.middle >
                    <PayTypeTableView
                        onEdit={this.uiAction.edit}
                        SelectedItem={this.uiAction.SelectedItem}
                    />
                </VerThr.middle >
                <BackTop target={this.uiAction.backTopTarget} visibilityHeight={400} />
                <PayTypeDialogView
                    handleCancel={this.uiAction.cancel}
                    handleOk={this.uiAction.save}
                    visiable={this.uiAction.isVisiableModal}
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