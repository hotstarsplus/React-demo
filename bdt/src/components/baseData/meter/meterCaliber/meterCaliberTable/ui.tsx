import { Divider, Icon, Popconfirm, Table} from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from 'react';
import { MeterCaliber } from '../entity';
import { IMeterCaliberTableViewProps } from './interface';
import { MeterCaliberTableViewUiAction } from './uiAction';

class MeterCaliberTable extends Table<MeterCaliber>{ };
/**
 * 水费项目类型列表表格视图 
 */
@inject('GlobalMeterCaliberStore')
@observer
export class MeterCaliberTableView extends React.Component<IMeterCaliberTableViewProps> {
    /**
     * 表格列
     */
    private columns: Array<ColumnProps<MeterCaliber>> = Array<ColumnProps<MeterCaliber>>(
        {
            dataIndex: "MeterCaliberId",
            key: "MeterCaliberId",
            title: "编码",
            sorter: (a: any, b: any) => a.MeterCaliberId.localeCompare(b.MeterCaliberId),
            width:100
        },
        {
            dataIndex: 'MeterCaliberName',
            key: 'MeterCaliberName',
            title: '水表口径',
            sorter: (a: any, b: any) =>parseFloat(a.MeterCaliberName) - parseFloat(b.MeterCaliberName),
            width:120
            // sorter: (a: any, b: any) => a.MeterCaliberName.replace(/[^0-9]/ig,"")?a.MeterCaliberName.replace(/[^0-9]/ig,""):0 - b.MeterCaliberName.replace(/[^0-9]/ig,"")?b.MeterCaliberName.replace(/[^0-9]/ig,""):0
        },
        {
            dataIndex: 'MaxReading',
            key: 'MaxReading',
            title: '最大读数',
            sorter: (a: any, b: any) => a.MaxReading - b.MaxReading,
            width:150,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 150,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },render: (text) => <span title={text}>{text}</span>
        },
        {
            dataIndex: 'ProofCircleMonth',
            key: 'ProofCircleMonth',
            title: '表鉴定周期',
            sorter: (a: any, b: any) => a.ProofCircleMonth - b.ProofCircleMonth,
            width:250
        },
        {
            dataIndex: 'Description',
            key: 'Description',
            title: '备注',
            sorter: (a: any, b: any) => a.Description - b.Description,
            width:250,
            onCell: () => {
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
        }, {
            dataIndex: "SortNo",
            key: "SortNo",
            title: "排序号",
            defaultSortOrder: "ascend",
            sorter: (a: any, b: any) => a.SortNo - b.SortNo,
            width:120
        }, {
            key: 'action',
            render: (text: any, record: MeterCaliber, index: number) => {
                return (
                    <span>
                        <a
                            href={'javascript:;'}
                            id={`edit_${record.MeterCaliberId}`}
                            onClick={this.uiAction.editClick}
                            title='编辑'
                        >
                            <Icon type='edit' />
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm placement="top" title={"确定要删除吗？"} onConfirm={this.uiAction.deleteClick.bind(undefined, `delete_${record.MeterCaliberId}`)} okText="确定" cancelText="取消">
                            <a
                                href={'javascript:;'}
                                id={`delete_${record.MeterCaliberId}`}
                                // onClick={this.uiAction.deleteClick}
                                title='删除'
                            >
                                <Icon type='delete' />
                        </a>
                        </Popconfirm>
                    </span>
                );
            },
            // width: "20%",
            title: "操作"
        },

    );

    private uiAction: MeterCaliberTableViewUiAction;
    constructor(props: IMeterCaliberTableViewProps) {
        super(props);
        this.uiAction = new MeterCaliberTableViewUiAction(this.props);
        this.setRowClassName = this.setRowClassName.bind(this);
    }
    public render() {
        const { GlobalMeterCaliberStore } = this.props;
        return (
            <MeterCaliberTable
                bordered={true}
                columns={this.columns}
                dataSource={GlobalMeterCaliberStore!.list.slice()}
                pagination={false}
                loading={
                    {
                        spinning:GlobalMeterCaliberStore!.isLoading,
                        tip: "正在加载中..."
                    }
                }
                locale = {{
                    emptyText:GlobalMeterCaliberStore!.isLoading?[]:undefined
                }}
                rowKey={this.getRowKey}
                rowClassName={this.setRowClassName}
                scroll={{y:400}}
              className="ori-table ori-table-scroll"
            />
        );
    }
    @action
    private setRowClassName(record: any, index: number): string {
        return "tr-class";
    }
    private getRowKey(record: MeterCaliber, index: number): string {
        return index.toString();
    }
}

