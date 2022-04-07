import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import * as React from 'react';
import { CalcFeeState } from "../entity";
import { ICalcFeeStateTableProps } from "./interface";
import { CalcFeeStateTableUiAction } from "./uiAction";

/**
 * 计费状态表格
 */
export class CalcFeeStateTable extends Table<CalcFeeState>{}

/**
 * 计费状态表格视图
 */
@inject("GlobalCalcFeeStateStore")
@observer
export class CalcFeeStateTableView extends React.Component<ICalcFeeStateTableProps>{
    /**
     * 领域action
     */
    private uiAction:CalcFeeStateTableUiAction;

    private columns: Array<ColumnProps<CalcFeeState>> = Array<ColumnProps<CalcFeeState>>(
        {
            dataIndex:"id",
            key:"id",
            title:"计费状态编码",
        },
        {
            dataIndex:"calcFeeStateName",
            key:"calcFeeStateName",
            title:"计费状态",
        },
    );

    constructor(props:ICalcFeeStateTableProps){
        super(props);
        this.uiAction = new CalcFeeStateTableUiAction(this.props);

    }

    public componentDidMount(){
        this.uiAction.loadData();
    }

    public render(){
        console.info("render CalcFeeStateTableView");
        const { GlobalCalcFeeStateStore } = this.props;
        return(
            <CalcFeeStateTable
                columns = {this.columns}
                dataSource = {GlobalCalcFeeStateStore!.list.slice()}
                loading={GlobalCalcFeeStateStore!.isLoading}
                locale = {{
                    emptyText:GlobalCalcFeeStateStore!.isLoading?[]:undefined
                }}
                rowKey={this.getRowIndex}
            />
        );
    }

    /**
     * 获取行下标
     * @param record 
     * @param index 
     */
    public getRowIndex(record:CalcFeeState,index:number):string{
        return index.toString();
    }
}