import { Divider, Icon, Popconfirm, Table, Tooltip, } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { ControlType } from '../entity';
import { IControlTypeTableProps } from './interface';
import { ControlTypeTableViewUiAction } from './uiAction';

class ControlTypeTable extends Table<ControlType>{ };
@inject('GlobalControlTypeStore')
@observer
export class ControlTypeTableView extends React.Component<IControlTypeTableProps>{
    private uiAction: ControlTypeTableViewUiAction;
    private columns: Array<ColumnProps<ControlType>> = Array<ColumnProps<ControlType>>(
        // 第一列
        {
            dataIndex: "ControlTypeId",
            key: "ControlTypeId",
            sorter: (a: any, b: any) => a.ControlTypeId - b.ControlTypeId,
            title: "编码",
            width: 250,
        },
        // 第二列
        {
            dataIndex: "ControlTypeName",
            key: "ControlTypeName",
            sorter: (a: any, b: any) => a.ControlTypeName.length - b.ControlTypeName.length,
            title: "控制方式名称",
            width: 250,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 250,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                    }
                }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        // 第三列
        {
            dataIndex: "SortNo",
            key: "SortNo",
            title: "排序号",
            width: 250,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 250,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                    }
                }
            },
            sorter: (a: any, b: any) => a.SortNo - b.SortNo,
        },
        // 第四列
        {
            dataIndex: "Description",
            key: "Description",
            title: "备注",
            width: 300,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 300,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                    }
                }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        // 第五列
        {
            key: "action",
            title: "操作",
            // width: "20%",
            render: (text: any, record: ControlType, index: number) => {
                return (
                    <div style={{ display: "inline-block" }}>
                        <a
                            href={"javascript:;"}
                            title="编辑"
                            id={`edit_${record.ControlTypeId}`}
                            onClick={this.uiAction.editClickhandle}
                        >
                            <Icon type='edit' />
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="确定要删除吗?"
                            onConfirm={this.uiAction.deleteClickhandle.bind(undefined, `delete_${record.ControlTypeId}`)}
                            okText="确认" cancelText="取消"
                        >
                            <a
                                id={`delete_${record.ControlTypeId}`}
                                href={"javascript:;"}
                                title="删除"
                            >
                                <Icon type='delete' />
                            </a>
                        </Popconfirm >
                    </div>
                );
            }
        });


    constructor(props: IControlTypeTableProps) {
        super(props);
        // 调用加载数据方法 
        this.uiAction = new ControlTypeTableViewUiAction(this.props);
        this.setRowClassName = this.setRowClassName.bind(this);
    }

    public render() {
        // const { GlobalControlTypeStore } = this.props
        return (
            <ControlTypeTable
                bordered={true}
                columns={this.columns}
                dataSource={this.props.GlobalControlTypeStore!.list.slice()}
                loading={
                    {
                        spinning:this.props.GlobalControlTypeStore!.isLoading,
                        tip: "正在加载中..."
                    }
                  }
                  locale = {{
                    emptyText:this.props.GlobalControlTypeStore!.isLoading?[]:undefined
                  }}
                scroll={{y:400}}
                pagination={false}
                rowClassName={this.setRowClassName}
                className="ori-table ori-table-scroll"
            />
        );
    }
    /**
     * 设置行样式
     * @param record 
     * @param index 
     */
    private setRowClassName(record: any, index: number): string {
        return "tr-class";
    }

}