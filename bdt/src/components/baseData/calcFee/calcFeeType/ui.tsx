import { BackTop, Button, message, TreeSelect, } from 'antd';
import { inject, observer, } from 'mobx-react';
import { OridStores, VerThr } from "orid";
import * as React from 'react';
import '../../../index.scss';
import { CalcFeeTypeDialog } from './calcFeeTypeDialog/ui';
import { ICalcFeeTypeViewProps } from './interface';
import { CalcFeeTypeTableView } from './typeTable/ui';
import { CalcFeeTypeViewUiAction } from './uiAction';

/**
 * 计费方式
 */
@inject("GlobalCalcFeeTypeStore")
@observer
export class CalcFeeTypeView extends React.Component<ICalcFeeTypeViewProps>{
    private uiAction: CalcFeeTypeViewUiAction;
    constructor(props: ICalcFeeTypeViewProps) {
        super(props);
        this.uiAction = new CalcFeeTypeViewUiAction(props);
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
                                <TreeSelect dropdownStyle={{ width: '280px', maxHeight: '300px', zIndex: 0 }} treeDefaultExpandAll={true} value={this.props.GlobalCalcFeeTypeStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                    {this.renderTreeNode(this.props.GlobalCalcFeeTypeStore!.CompanyNameData)}
                                </TreeSelect>
                                <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.uiAction.onSearchData} />
                            </>
                            : ''
                        : ''}

                </VerThr.top>
                <VerThr.middle>
                    <CalcFeeTypeTableView
                        onEdit={this.uiAction.onEditClick}
                        selectItem={this.uiAction.selectItem}
                    />
                </VerThr.middle>
                <BackTop target={this.uiAction.targetFunc} visibilityHeight={400} />
                <CalcFeeTypeDialog
                    handleCancel={this.uiAction.cancelAddOrEdit}
                    handleOk={this.uiAction.saveClick}
                    visible={this.uiAction.isVisiableModal}
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