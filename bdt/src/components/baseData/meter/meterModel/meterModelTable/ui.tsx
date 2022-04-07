import { Divider, Icon, Popconfirm, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { action } from "mobx";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from 'react';
import { MeterModel } from "../entity";
import { IMeterModelTableViewProps } from "./interface";
import { MeterModelTableUiAction } from "./uiAction";

class MeterModelTable extends Table<MeterModel>{ }

@inject('GlobalMeterModelStore')
@observer
export class MeterModelTableView extends React.Component<IMeterModelTableViewProps>{

    private columns: Array<ColumnProps<MeterModel>> = Array<ColumnProps<MeterModel>>(
        {
            dataIndex: "MeterModelId",
            key: "MeterModelId",
            title: "编码",
            sorter: (a: any, b: any) => a.MeterModelId.localeCompare(b.MeterModelId),
            width: 250,
        },
        {
            dataIndex: "MeterModelName",
            key: "MeterModelName",
            title: "水表型号名称",
            sorter: (a: any, b: any) => a.MeterModelName.localeCompare(b.MeterModelName), 
            width: 250,onCell: () => {
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
            dataIndex: "Description",
            key: "Description",
            title: "备注",
            sorter: (a: any, b: any) => a.Description.localeCompare(b.Description),
            width: 300,onCell: () => {
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
        },
        {
            dataIndex: "SortNo",
            key: "SortNo",
            title: "排序号",
            defaultSortOrder: "ascend",
            sorter: (a: any, b: any) => a.SortNo - b.SortNo,
            width: 250,
        },
        {
            key: "action",
            render: (text: any, record: MeterModel, index: number) => {
                return (
                    <div>
                        <a
                            href={'javascript:;'}
                            id={`edit_${record.MeterModelId}`}
                            onClick={this.uiAction.editClick}
                            title={"编辑"}
                        >
                            <Icon type='edit' />
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm placement="top" title={"确定要删除吗？"} onConfirm={this.uiAction.deleteClick.bind(undefined, `delete_${record.MeterModelId}`)} okText="确定" cancelText="取消" >
                            <a
                                href={'javascript:;'}
                                id={`delete_${record.MeterModelId}`}
                                // onClick={this.uiAction.deleteClick}
                                title={"删除"}
                            >
                                <Icon type='delete' />
                        </a>
                        </Popconfirm>
                    </div>
                );
            },
            title: "操作",
            // width: "20%",
        },

    );

    private uiAction: MeterModelTableUiAction;
    constructor(props: IMeterModelTableViewProps) {
        super(props);
        this.uiAction = new MeterModelTableUiAction(this.props);
    }
    public render() {
        console.log("render MeterModelTableView");
        const { GlobalMeterModelStore } = this.props;
        return (
            <MeterModelTable
                bordered={true}
                columns={this.columns}
                dataSource={GlobalMeterModelStore!.list.slice()}
                loading={
                    {
                        spinning:GlobalMeterModelStore!.isLoading,
                        tip: "正在加载中..."
                    }
                }
                locale = {{
                    emptyText:GlobalMeterModelStore!.isLoading?[]:undefined
                }}
                rowKey={this.getRowIndex}
                rowClassName={this.setRowClassName}
                pagination={false}
                scroll={{y:400}}
                className="ori-table ori-table-scroll"
            />
        );
    }
    @action
    private setRowClassName(record: any, index: number): string {
        return "tr-class";
    }
    private getRowIndex(record: MeterModel, index: number): string {
        return index.toString();
    }
}