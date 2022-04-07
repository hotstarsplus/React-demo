import { BackTop, Button, message, TreeSelect } from 'antd';
import { inject, observer } from 'mobx-react';
import { OridStores, VerThr } from "orid";
import * as React from 'react';
import '../../../index.scss';
import { IMeterCaliberViewProps } from './interface';
import { MeterCaliberDialog } from './meterCaliberDialog/ui';
import { MeterCaliberTableView } from './meterCaliberTable/ui';
import { MeterCaliberViewUiAction } from './uiAction'

/**
 * 水表口径类型列表视图 
 * 
 */
@inject('GlobalMeterCaliberStore')
@observer
export class MeterCaliberView extends React.Component<IMeterCaliberViewProps> {
    private uiAction: MeterCaliberViewUiAction;

    constructor(props: IMeterCaliberViewProps) {
        super(props);
        this.uiAction = new MeterCaliberViewUiAction(props,this);
    }
    public componentWillMount() {
        message.destroy()
        this.uiAction.getCompanyName()
    }

    public render() {
        return (
            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <>
                                <TreeSelect dropdownStyle={{ width: '280px', zIndex: 0, maxHeight: '300px' }} treeDefaultExpandAll={true} value={this.props.GlobalMeterCaliberStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                    {this.renderTreeNode(this.props.GlobalMeterCaliberStore!.CompanyNameData)}
                                </TreeSelect>
                                <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.uiAction.onSearchData} />
                                <Button icon="plus" type="primary" onClick={this.uiAction.addClick} style={{ float: 'right' }}>
                                    新建
                                </Button>
                            </>
                            :
                            <Button icon="plus" type="primary" onClick={this.uiAction.addClick} >
                                新建
                            </Button>
                        :
                        <Button icon="plus" type="primary" onClick={this.uiAction.addClick} >
                            新建
                        </Button>}
                </VerThr.top>
                <VerThr.middle>
                    <MeterCaliberTableView
                        loadData={this.uiAction.loadData}
                        onEdit={this.uiAction.onEditClick}
                    />
                </VerThr.middle>
                <BackTop target={this.targetFunc} visibilityHeight={400} />
                <MeterCaliberDialog
                    handleCancel={this.uiAction.cancelAddOrEdit}
                    handleOk={this.uiAction.saveClick}
                    visible={this.uiAction.isVisiableModal}
                    title={this.uiAction.modaltitle}
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
