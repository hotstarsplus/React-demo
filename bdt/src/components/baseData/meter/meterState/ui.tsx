import { BackTop, Button, message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr } from "orid";
import * as React from "react";
import { IMeterStateListViewProps } from "./interface";
import { MeterStateDialogView } from './meterStateDialog/ui';
import { MeterStateTableView } from "./meterStateTable/ui";
import { MeterStateListViewUiAction } from "./uiAction";


/**
 * 水表状态管理视图
 */
@inject("GlobalMeterStateStore")
@observer
export class MeterStateView extends React.Component<IMeterStateListViewProps>{
    private uiAction: MeterStateListViewUiAction;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IMeterStateListViewProps) {
        super(props);
        this.state = {
            cardDomNode: undefined,
        }
        this.uiAction = new MeterStateListViewUiAction(props);
    }

    public componentWillMount() {
        message.destroy()
        this.uiAction.getCompanyName();
    }

    public render() {
        return (
            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <>
                                <TreeSelect dropdownStyle={{ width: '280px', zIndex: 0, maxHeight: '300px' }} treeDefaultExpandAll={true} value={this.props.GlobalMeterStateStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                    {this.renderTreeNode(this.props.GlobalMeterStateStore!.CompanyNameData)}
                                </TreeSelect>
                                <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.uiAction.onSearchData} />
                            </>
                            : ''
                        : ''}
                </VerThr.top>
                <VerThr.middle>
                    <MeterStateTableView
                        onEdit={this.uiAction.edit} />
                </VerThr.middle>
                <BackTop target={this.uiAction.backTopTarget} visibilityHeight={400} />
                <MeterStateDialogView
                    handleCancel={this.uiAction.cancel}
                    handleOk={this.uiAction.save}
                    visiable={this.uiAction.isVisiableModal}
                    title={this.uiAction.modaltitle}
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