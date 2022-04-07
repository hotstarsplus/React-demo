import { Button, message, Table, TreeSelect, } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import { OridStores, VerThr } from 'orid';
import * as React from 'react';
import { HeatState } from '../entity';
import { IHeatStateTableViewProps } from './interface';
import { HeatStateTableViewUiAction } from './uiAction';

class HeatStateTable extends Table<HeatState>{ };
@inject('GlobalHeatStateStore')
@observer
export class HeatStateTableView extends React.Component<IHeatStateTableViewProps>{
    private uiAction: HeatStateTableViewUiAction;
    private columns: Array<ColumnProps<HeatState>> = Array<ColumnProps<HeatState>>(
        {
            dataIndex: 'HeatingStateId',
            key: 'HeatingStateId',
            title: '编码',
            sorter: (a: any, b: any) => a.HeatingStateId - b.HeatingStateId,
            width: 500,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 500,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                    }
                }
            },
        }, {
        dataIndex: 'HeatingStateName',
        key: 'HeatingStateName',
        title: '供暖状态',
        sorter: (a: any, b: any) => a.HeatingStateName.length - b.HeatingStateName.length,
        width: 500,
        onCell: () => {
            return {
                style: {
                    maxWidth: 500,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer'
                }
            }
        },
    }, {
        dataIndex: 'Description',
        key: 'Description',
        title: '备注',
        // width: "33%",
        onCell: () => {
            return {
                style: {
                    maxWidth: 500,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer'
                }
            }
        },
    }
    )
    constructor(props: IHeatStateTableViewProps) {
        super(props);
        this.uiAction = new HeatStateTableViewUiAction(this.props)

    }
    public componentWillMount() {
        message.destroy()
        this.props.GlobalHeatStateStore!.getCompanyName()
    }
    public render() {
        console.log("111")
        const { GlobalHeatStateStore } = this.props
        return (
            <VerThr style={{ padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <>
                                <TreeSelect dropdownStyle={{width:'280px',maxHeight:'300px',zIndex:0}} treeDefaultExpandAll={true} value={this.props.GlobalHeatStateStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                                    {this.renderTreeNode(this.props.GlobalHeatStateStore!.CompanyNameData)}
                                </TreeSelect>
                                <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.onSearchData} />
                            </>
                            : ''
                        : ''}
                </VerThr.top>
                <VerThr.middle>
                    <HeatStateTable
                        bordered={true}
                        columns={this.columns}
                        dataSource={GlobalHeatStateStore!.list.slice()}
                        loading={
                            {
                                spinning: GlobalHeatStateStore!.isLoading,
                                tip: "正在加载中..."
                            }
                        }
                        locale = {{
                            emptyText:GlobalHeatStateStore!.isLoading?[]:undefined
                        }}
                        scroll={{y:400}}
                        rowKey={this.getRowKey}
                        pagination={false}
                        className="ori-table ori-table-scroll"

                    />
                </VerThr.middle>
            </VerThr>

        );
    }
    private onSearchData = () => {
        this.props.GlobalHeatStateStore!.CompanyName=this.props.GlobalHeatStateStore!.Name
        this.props.GlobalHeatStateStore!.loadData()
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
    private getRowKey(record: HeatState, index: number) {
        return index.toString();
    }
}