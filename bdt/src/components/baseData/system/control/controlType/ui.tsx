import { Button, message, TreeSelect } from 'antd';
import { inject, observer } from 'mobx-react';
import { OridStores, VerThr } from 'orid';
import * as React from 'react';
import { ControlTypeDiglogView } from './controlTypeDialog/ui';
import { ControlTypeTableView } from './controlTypeTable/ui';
import { IControlTypeTableViewProps } from './interface';
import { ControlTypeListViewUiAction } from './uiAction';
/**
 * 控制方式视图
 */
@inject("GlobalControlTypeStore")
@observer
export class ControlTypeView extends React.Component<IControlTypeTableViewProps>{
    private uiAction: ControlTypeListViewUiAction;
    constructor(props: IControlTypeTableViewProps) {
        super(props);
        this.state = {
            cardDomNode: undefined
        };
        this.uiAction = new ControlTypeListViewUiAction(props);
    }
    public componentWillMount() {
        message.destroy()
        this.props.GlobalControlTypeStore!.getCompanyName()
    }
    public render() {
        return (
            <VerThr>
                <VerThr.top style={{ padding: "16px 16px 0px 16px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <>
                                <TreeSelect dropdownStyle={{width:'280px',maxHeight:'300px',zIndex:0}} treeDefaultExpandAll={true} value={this.props.GlobalControlTypeStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                    {this.renderTreeNode(this.props.GlobalControlTypeStore!.CompanyNameData)}
                                </TreeSelect>
                                <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.onSearchData} />
                                <Button icon="plus" type="primary" onClick={this.uiAction.add} style={{ float: 'right',margin: "0px 8px 0px 0px" }}> 新建</Button>
                            </>
                            : <Button icon="plus" type="primary" onClick={this.uiAction.add} > 新建</Button>
                        : <Button icon="plus" type="primary" onClick={this.uiAction.add} > 新建</Button>}
                </VerThr.top>
                <VerThr.middle style={{ padding: "16px" }}>
                    <ControlTypeTableView onEdit={this.uiAction.edit} />
                </VerThr.middle>
                <ControlTypeDiglogView
                    handleCancel={this.uiAction.cancel}
                    handleOk={this.uiAction.save}
                    visiable={this.uiAction.isVisiableModal}
                    title={this.uiAction.modaltitle}
                />
            </VerThr>
        );

    }
    private onSearchData = () => {
        this.props.GlobalControlTypeStore!.CompanyName=this.props.GlobalControlTypeStore!.Name
        this.props.GlobalControlTypeStore!.loadData()
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