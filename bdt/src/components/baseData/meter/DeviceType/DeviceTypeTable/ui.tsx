import { Divider, Icon, Popconfirm, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import React from "react";
// import "../../../../index.scss";
import { DeviceType } from "../entity";
import { IDeviceTypeTableViewProps } from "./interface";
import { DeviceTypeUiAction } from "./uiaction";


class DeviceTypeTable extends Table<DeviceType>{ };

@inject("GlobalDeviceTypeStore")
@observer
export class DeviceTypeTableView extends React.Component<IDeviceTypeTableViewProps>{

    /**
     * 表格列
     */
    private columns: Array<ColumnProps<DeviceType>> = Array<ColumnProps<DeviceType>>(
        {
            dataIndex: "DeviceTypeId",
            key: "DeviceTypeId",
            title: "编码",
            defaultSortOrder: "ascend",
            width: 250
        },
        {
            dataIndex: "DeviceTypeName",
            key: "DeviceTypeName",
            title: "类型名称",
            width: 250
        },
        {
            dataIndex: "CategoryName",
            key: "CategoryName",
            title: "所属种类",
            width: 250
        },
        {
            dataIndex: "DetailTableName",
            key: "DetailTableName",
            title: "扩展表名",
            width: 250
        },
        {
            dataIndex: "Description",
            key: "Description",
            title: "描述",
            width: 300
        }, {
        key: "action",
        render: (text: any, record: DeviceType, index: number) => {
            return (
                <div style={{ display: "inline-block" }}>
                    <div>
                        <a
                            href={'javascript:;'}
                            onClick={this.uiAction.addClick}
                            id={`add_${record.DeviceTypeId}`}
                            title="新增"
                        >
                            <Icon type="plus" style={{ color: '#1890ff' }} />
                        </a>
                        <Divider type="vertical" />
                        <a
                            href={'javascript:;'}
                            onClick={this.uiAction.editClick}
                            id={`edit_${record.DeviceTypeId}`}
                            title="编辑"
                        >
                            <Icon type="edit" style={{ color: '#1890ff' }} />
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm placement="top" title={"确定要删除吗？"} onConfirm={this.uiAction.deleteClick.bind(undefined, `delete_${record.DeviceTypeId}`)} okText="确定" cancelText="取消">
                            <a
                                href={'javascript:;'}
                                // onClick = {this.uiAction.deleteClick}
                                id={`delete_${record.DeviceTypeId}`}
                                title="删除"
                            >
                                <Icon type="delete" style={{ color: '#1890ff' }} />
                            </a>
                        </Popconfirm>
                    </div>
                </div>
            );
        },
        title: "操作",
        // width: "15%"
    },
    );

    private uiAction: DeviceTypeUiAction;

    constructor(props: IDeviceTypeTableViewProps) {
        super(props);
        this.uiAction = new DeviceTypeUiAction(this.props);
    }

    public render() {
        return (
            <DeviceTypeTable
                // bordered={false}
                bordered={true}
                columns={this.columns}
                dataSource={this.props.GlobalDeviceTypeStore!.list.slice()}
                pagination={false}
                loading={
                    {
                        spinning:this.props.GlobalDeviceTypeStore!.isLoading,
                        tip: "正在加载中..."
                    }
                }
                locale = {{
                    emptyText:this.props.GlobalDeviceTypeStore!.isLoading?[]:undefined
                }}
                rowClassName={this.setRowClassName}
                rowKey={this.getRowIndex}
                scroll={{ y: 400 }}
                className="ori-table ori-table-scroll"
              //  locale={{ emptyText: '暂无数据' }}

            />
        );
    }

    /**
     * 设置行样式
     * @param record 
     * @param index 
     */
    private setRowClassName(record: any, index: number) {
        return "tr-class";
    }
    /**
     * 获取当前行下标
     * @param record 实体类
     * @param index 下标
     */
    private getRowIndex(record: DeviceType, index: number): string {
        return index.toString();
    }

}