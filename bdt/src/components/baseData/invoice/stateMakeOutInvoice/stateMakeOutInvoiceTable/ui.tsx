import {Table} from 'antd';
import {ColumnProps} from 'antd/lib/table';
import {inject,observer} from 'mobx-react';
import * as React from 'react';
import {StateMakeOutInvoice} from '../entity';
import {IStateMakeOutInvoiceTableViewProps} from './interface';
import {StateMakeOutInvoiceTableViewUiAction} from './uiAction';

class StateMakeOutInvoiceTable extends Table<StateMakeOutInvoice>{};
    @inject('GlobalStateMakeOutInvoiceStore')
    @observer
    export class StateMakeOutInvoiceTableView extends React.Component<IStateMakeOutInvoiceTableViewProps>{
            private columns:Array<ColumnProps<StateMakeOutInvoice>>=Array<ColumnProps<StateMakeOutInvoice>>(
                {
                    dataIndex:'id',
                    key:'id',
                    title:'票据状态id',
                },{
                    dataIndex:'invoiceStateName',
                    key:'invoiceStateName',
                    title:'票据状态',
                },{
                    dataIndex:'description',
                    key:'description',
                    title:'备注说明',
                }

            )
        private uiAction:StateMakeOutInvoiceTableViewUiAction;
        constructor(props:IStateMakeOutInvoiceTableViewProps){
            super(props);
            this.uiAction=new StateMakeOutInvoiceTableViewUiAction(this.props);
             this.getRowKey = this.getRowKey.bind(this);
        }

        public componentDidMount(){
            this.uiAction.loadData();
        }
        public render(){
            const{GlobalStateMakeOutInvoiceStore}=this.props
            return(
                <StateMakeOutInvoiceTable
                    columns={this.columns}
                    dataSource={GlobalStateMakeOutInvoiceStore!.list.slice()}
                    loading={GlobalStateMakeOutInvoiceStore!.isLoading}
                    locale = {{
                        emptyText:GlobalStateMakeOutInvoiceStore!.isLoading?[]:undefined
                    }}
                    rowKey={this.getRowKey}
                />
            );
        }

        private getRowKey(record: StateMakeOutInvoice,index:number):string{
            return index.toString();
        }
    }