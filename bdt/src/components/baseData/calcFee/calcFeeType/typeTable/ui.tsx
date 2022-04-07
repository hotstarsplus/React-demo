import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from 'react';
import { CalcFeeType } from "../entity";
import { ICalcFeeTypeTableViewProps } from "./interface";

/**
 * 计费方式表格
 */
class CalcFeeTypeTable extends Table<CalcFeeType>{ };
/**
 * 计费方式表格试图
 */
@inject("GlobalCalcFeeTypeStore")
@observer
export class CalcFeeTypeTableView extends React.Component<ICalcFeeTypeTableViewProps>{
    /**
     * 表格列
     */
    private columns: Array<ColumnProps<CalcFeeType>> = Array<ColumnProps<CalcFeeType>>(
        {
            dataIndex: "CalcFeeTypeId",
            key: "CalcFeeTypeId",
            title: "编码",
            defaultSortOrder: "ascend",
            sorter: (a: any, b: any) => a.CalcFeeTypeId.localeCompare(b.CalcFeeTypeId),
            width:500
        },
        {
            dataIndex: "CalcFeeTypeName",
            key: "CalcFeeTypeName",
            title: "计费类型",
            sorter: (a: any, b: any) => a.CalcFeeTypeName.localeCompare(b.CalcFeeTypeName),
            width:500
        },
        {
            dataIndex: "BusinessTypeName",
            key: "BusinessTypeName",
            title: "业务类型",
            sorter: (a: any, b: any) => a.BusinessType-b.BusinessType,
            // width:'30%'
        }
    );
    constructor(props: ICalcFeeTypeTableViewProps) {
        super(props);
    }
    public render() {
        const { GlobalCalcFeeTypeStore } = this.props;
        return (
            <CalcFeeTypeTable
                bordered={true}
                columns={this.columns}
                dataSource={GlobalCalcFeeTypeStore!.list.slice()}
                pagination={false}
                loading={
                    {
                        spinning:GlobalCalcFeeTypeStore!.isLoading,
                        tip: "正在加载中..."
                    }
                }
                locale = {{
                    emptyText:GlobalCalcFeeTypeStore!.isLoading?[]:undefined
                }}
                rowKey={this.getRowIndex}
                scroll={{y:400}}
                className="ori-table ori-table-scroll"
            />
        );
    }
 
    /**
     * 获取当前行下标
     * @param record 实体类
     * @param index 下标
     */
    private getRowIndex(record: CalcFeeType, index: number): string {
        return index.toString();
    }
}
