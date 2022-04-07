import { BackTop, Button, message, TreeSelect } from 'antd';
import { inject, observer } from 'mobx-react';
import { OridStores, VerThr } from 'orid';
import * as React from 'react';
import '../../../index.scss';
import { IQuantityTapyViewProps } from './interface';
import { QuantityTapyDialog } from './tapyDialog/ui';
import { QuantityTapyTableView } from './tapyTable/ui';
import { QuantityTapyViewUiAction } from './uiAction';


/**
 * 水量类型列表视图 
 * 
 */
@inject('GlobalQuantityTapyStore')
@observer
export class QuantityTapyView extends React.Component<IQuantityTapyViewProps> {
    private uiAction: QuantityTapyViewUiAction;
    constructor(props: IQuantityTapyViewProps) {
        super(props);
        this.uiAction = new QuantityTapyViewUiAction(props);
    }
    public componentWillMount() {
        message.destroy()
        this.uiAction.getCompanyName();
    }

    public render() {
        return (
            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 8px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <>
                                <TreeSelect dropdownStyle={{ width: '280px', maxHeight: '300px', zIndex: 0 }} treeDefaultExpandAll={true} value={this.props.GlobalQuantityTapyStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                    {this.renderTreeNode(this.props.GlobalQuantityTapyStore!.CompanyNameData)}
                                </TreeSelect>
                                <Button icon="search" shape="circle" style={{ marginLeft: '5px' }} onClick={this.uiAction.onSearchData} />
                            </>
                            : ''
                        : ""}
                </VerThr.top>
                <VerThr.middle style={{ padding: "8px 8px 16px 0px" }}>
                    {/* <div className={'tableListOperator'}>
                       <Button icon="plus" type="primary" onClick={this.uiAction.addClick}>
                            新建
                        </Button>
                    </div> */}
                    <QuantityTapyTableView
                        onEdit={this.uiAction.onEditClick}
                        onRemove={this.uiAction.remove}
                        selectItem={this.uiAction.selectItem}
                    />
                </VerThr.middle>
                <BackTop target={this.uiAction.targetFunc} visibilityHeight={400} />
                <QuantityTapyDialog
                    handleCancel={this.uiAction.cancelAddOrEdit}
                    handleOk={this.uiAction.saveClick}
                    visible={this.uiAction.isVisiableModal}
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
