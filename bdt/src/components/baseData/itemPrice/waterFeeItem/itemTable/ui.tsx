import { Divider,Icon, Popconfirm,Table,  } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from 'react';
import { WaterFeeItem } from '../entity';
import { IWaterFeeItemTableViewProps } from './interface';
import { WaterFeeItemTableViewUiAction } from './uiAction';

class WaterFeeItemTable extends Table<WaterFeeItem>{ };
/**
 * 水费项目类型列表表格视图 
 */
@inject('GlobalWaterFeeItemStore')
@observer
export class WaterFeeItemTableView extends React.Component<IWaterFeeItemTableViewProps> {
    /**
     * 表格列
     */
    private columns: Array<ColumnProps<WaterFeeItem>> = Array<ColumnProps<WaterFeeItem>>(
        
        {
            dataIndex: 'WaterFeeItemId',
            key: 'WaterFeeItemId',
            title: '项目编码',
            width:"25%"
        }, 
        {
            dataIndex: 'WaterFeeItemName',
            key: 'WaterFeeItemName',
            title: '项目名称',
            width:"30%"
        },
        {
            dataIndex:'BussinessType',
            key: 'BussinessType',
            title:'业务类别',
            width:'25%',
        },
        {
            key: 'action',
            render: (text: any, record: WaterFeeItem, index: number) => {
                return (
                   
                    <div style={{display: "inline-block"}}>
                        <a
                         href={'javascript:;'}
                         onClick = {this.uiAction.editClick}
                         id = {record.WaterFeeItemId}
                         title = "编辑"
                        >
                            <Icon type="edit" style={{color:'#1890ff'}}/>
                        </a>
                        <Divider type="vertical" />
                    <Popconfirm 
                        title="确定要删除吗?"  
                        onConfirm={this.uiAction.deleteClick.bind(undefined,record.WaterFeeItemId)}  
                        okText="确认" 
                        cancelText="取消" 
                    >
                        <a
                         href={'javascript:;'}
                         title = "删除"
                         id={record.WaterFeeItemId}
                        >
                            <Icon type="delete" style={{color:'#1890ff'}}/>
                        </a>
                    </Popconfirm >
                    </div>
                );
            },
            title: '操作',
            width:"20%"
        },
    );

    private uiAction: WaterFeeItemTableViewUiAction;

    constructor(props: IWaterFeeItemTableViewProps) {
        super(props);
        this.uiAction = new WaterFeeItemTableViewUiAction(this.props);
        this.setRowClassName = this.setRowClassName.bind(this);
    }

    public componentDidMount() {
        this.uiAction.loadData();
    }

    public render() {
        const { GlobalWaterFeeItemStore } = this.props
        return (
            <WaterFeeItemTable
                columns={this.columns}
                dataSource={GlobalWaterFeeItemStore!.list.slice()}
                loading={GlobalWaterFeeItemStore!.isLoading}
                locale = {{
                    emptyText:GlobalWaterFeeItemStore!.isLoading?[]:undefined
                }}
                rowKey={this.getRowKey}
                scroll={{y:100}}
                className = {"ori-table ori-table-scroll"}
                pagination = {false}
            />
        );
    }

    private getRowKey(record: WaterFeeItem, index: number): string {
        return index.toString();
    }

    private setRowClassName(record:any,index:number):string{
        return "tr-class";
    }

}

