import { Icon, Table} from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from 'react';
import { QuantityTapy } from '../entity';
import { IQuantityTapyTableViewProps } from './interface';
import { QuantityTapyTableViewUiAction } from './uiAction';

class QuantityTapyTable extends Table<QuantityTapy>{ };

@inject('GlobalQuantityTapyStore')
@observer
export class QuantityTapyTableView extends React.Component<IQuantityTapyTableViewProps>{
    /**
     * 表格列
     */
    private columns: Array<ColumnProps<QuantityTapy>> = Array<ColumnProps<QuantityTapy>>(
        {
            dataIndex: "QuantityTypeId",
            key: "QuantityTypeId",
            title: "编码",
            sorter: (a: any, b: any) => a.QuantityTypeId.localeCompare(b.QuantityTypeId),
            width:250
        },
        {
            dataIndex: 'QuantityTypeName',
            key: 'QuantityTypeName',
            title: '水量类型名称',
            sorter: (a: any, b: any) => a.QuantityTypeName.localeCompare(b.QuantityTypeName),
            width:250,onCell: () => {
                return {
                  style: {
                    maxWidth: 250,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },render: (text) => <span title={text}>{text}</span>
        },
        {
            dataIndex: 'Description',
            key: 'Description',
            title: '备注',
            sorter: (a: any, b: any) => a.Description - b.Description,
            width:300,onCell: () => {
                return {
                  style: {
                    maxWidth: 300,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },render: (text) => <span title={text}>{text}</span>
        }, {
            dataIndex: "SortNo",
            key: "SortNo",
            title: "排序号",
            defaultSortOrder: "ascend",
            sorter: (a: any, b: any) => a.SortNo - b.SortNo,
            width:250
        }, {
            key: 'action',
            render: (text: any, record: QuantityTapy, index: number) => {
                return (
                    <span>
                        <a
                            href={'javascript:;'}
                            id={`edit_${record.QuantityTypeId}`}
                            onClick={this.uiAction.editClick}
                            title='编辑'
                        >
                            <Icon type="edit" style={{color:'#1890ff'}}/>
                        </a>
                        {/* <Divider type="vertical" />
                        <Popconfirm placement="top" title={"确定删除？"} onConfirm={this.uiAction.deleteClick.bind(undefined,`delete_${record.QuantityTypeId}`)} okText="是" cancelText="否" okType='danger'>
                        <a 
                            href={'javascript:;'}
                            id={`delete_${record.QuantityTypeId}`}
                           // onClick={this.uiAction.deleteClick}
                            title='删除'
                        >
                            <Icon type='delete'/>
                        </a>
                        </Popconfirm> */}
                    </span>
                );
            },
            // width:'20%',
            title: "操作"
        },
    );
    private uiAction: QuantityTapyTableViewUiAction;
    constructor(props: IQuantityTapyTableViewProps) {
        super(props);
        this.uiAction = new QuantityTapyTableViewUiAction(this.props);
    }
    public render() {
        const { GlobalQuantityTapyStore } = this.props
        return (
            <QuantityTapyTable
                bordered={true}
                columns={this.columns}
                dataSource={GlobalQuantityTapyStore!.list.slice()}
                loading={
                    {
                        spinning:GlobalQuantityTapyStore!.isLoading,
                        tip: "正在加载中..."
                    }}
                locale = {{
                    emptyText:GlobalQuantityTapyStore!.isLoading?[]:undefined
                }}
                rowKey={this.uiAction.getRowKey}
                pagination={false}
                scroll={{y:400}}
                className="ori-table ori-table-scroll"
           
            />
        );
    }
    
}