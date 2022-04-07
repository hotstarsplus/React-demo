import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import React from "react";
import { DeviceCategory } from "../entity";
import { IDeviceCategoryTableViewProps } from "./interface";
import { DeviceCategoryUiAction } from "./uiAction";

/**
 * 设备种类表格
 */
class DeviceCategoryTable extends Table<DeviceCategory>{ };

@inject("GlobalDeviceCategoryStore")
@observer
export class DeviceCategoryTableView extends React.Component<IDeviceCategoryTableViewProps>{
    /**
     * 表格列
     */
    private columns: Array<ColumnProps<DeviceCategory>> = Array<ColumnProps<DeviceCategory>>(
        {
            dataIndex: "CategoryId",
            key: "CategoryId",
            title: "编码",
            defaultSortOrder: "ascend",
            width: '30%'
        },
        {
            dataIndex: "CategoryName",
            key: "CategoryName",
            title: "种类名称",
            width: '30%'
        },
        {
            dataIndex: "Description",
            key: "Description",
            title: "种类描述",
            width: '30%'
        },
        {
            title: '查看',
            dataIndex: '',
            key: 'x',
            render: (text: any, record: DeviceCategory, index: number) => <a
            onClick = {this.uiAction.CheckParas}
            id={''+index}
            >
                查看种类属性</a>,
          }
    );
    private uiAction: DeviceCategoryUiAction;

    constructor(props: IDeviceCategoryTableViewProps) {
        super(props);
        this.uiAction = new DeviceCategoryUiAction(this.props);
    }
    public render() {

        return (
            <DeviceCategoryTable
                bordered={true}
                columns={this.columns}
                dataSource={this.props.GlobalDeviceCategoryStore!.list.slice()}
                pagination={false}
                loading={
                    {
                        spinning:this.props.GlobalDeviceCategoryStore!.isLoading,
                        tip: "正在加载中..."
                    }
                }
                locale = {{
                    emptyText:this.props.GlobalDeviceCategoryStore!.isLoading?[]:undefined
                }}
                rowKey={this.getRowIndex}
                scroll={{ y: 400 }}
                className="ori-table ori-table-scroll"
               // locale={{ emptyText: '暂无数据' }}

            />
        );
    }

    /**
     * 获取当前行下标
     * @param record 实体类
     * @param index 下标
     */
    private getRowIndex(record: DeviceCategory, index: number): string {
        return index.toString();
    }

}
