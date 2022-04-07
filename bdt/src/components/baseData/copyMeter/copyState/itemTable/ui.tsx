import { Table } from "antd";
import { ColumnProps } from 'antd/lib/table';
import { observer } from 'mobx-react';
import * as React from 'react';
import { CopyState } from "../entity";
import { CopyStateTableUiAction } from "./uiAction";
/**
 * 抄见状态表格
 */
class CopyStateTable extends Table<CopyState>{};

/**
 * 抄见状态表格视图
 */
@observer
export  class CopyStateTableView extends React.Component{
    /**
     * 表格列
     */
    private columns: Array<ColumnProps<CopyState>> = Array<ColumnProps<CopyState>>(
        {
            dataIndex: 'id',
            key: 'id',
            title: '抄见状态id',
        }, {
            dataIndex: 'copyStateName',
            key: 'copyStateName',
            title: '抄见状态名称',
        }, {
            dataIndex: 'description',
            key: 'description',
            title: '备注',
        },
    );
    

    /**
     * 领域action
     */
    private uiAction: CopyStateTableUiAction;

    constructor(props: any) {
        
        super(props);
        this.uiAction = new CopyStateTableUiAction();

    }

    public componentDidMount() {
        console.log("CopyStateTableView componentDidMount");
        this.uiAction.loadData();
    }

    public render() {
        console.info("render CopyStateTableView");
        return (
            <CopyStateTable
                columns={this.columns}
                dataSource={this.uiAction.domainStore.list.slice()}
                loading={this.uiAction.domainStore.isLoading}
                locale = {{
                    emptyText:this.uiAction.domainStore.isLoading?[]:undefined
                }}
                rowKey={this.getRowKey}
            />
        );
    }

    /**
     * 获取当前行下标
     * @param record 
     * @param index 
     */
    private getRowKey(record: CopyState, index: number): string {
        return index.toString();
    }
}
