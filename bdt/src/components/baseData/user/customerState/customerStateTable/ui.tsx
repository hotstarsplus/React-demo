import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { CustomerState } from '../entity';
import { ICustomerStateTableViewProps } from './interface';
import { CustomerStateTableViewUiAction } from './uiAction';

class CustomerStateTable extends Table<CustomerState>{ };
@inject('GlobalCustomerStateStore')
@observer
export class CustomerTableView extends React.Component<ICustomerStateTableViewProps>{
    private columns: Array<ColumnProps<CustomerState>> = Array<ColumnProps<CustomerState>>(
        {
            dataIndex: 'CustomerStateId',
            key: 'CustomerStateId',
            title: '用户状态id',
        }, {
            dataIndex: 'CustomerStateName',
            key: 'CustomerStateName',
            title: '用户状态',
        }, {
            dataIndex: 'Description',
            key: 'Description',
            title: '描述',
        }
    )
    private uiAction: CustomerStateTableViewUiAction;
    constructor(props: ICustomerStateTableViewProps) {
        super(props);
        this.uiAction = new CustomerStateTableViewUiAction(this.props);
    }

    public componentDidMount() {
        this.uiAction.loadData();
    }
    public render() {
        const { GlobalCustomerStateStore } = this.props
        return (
            <CustomerStateTable
                columns={this.columns}
                dataSource={GlobalCustomerStateStore!.list.slice()}
                loading={GlobalCustomerStateStore!.isLoading}
                locale = {{
                    emptyText:GlobalCustomerStateStore!.isLoading?[]:undefined
                }}
                rowKey={this.getRowKey}
            />
        );
    }
    private getRowKey(record: CustomerState, index: number): string {
        return index.toString();
    }
}