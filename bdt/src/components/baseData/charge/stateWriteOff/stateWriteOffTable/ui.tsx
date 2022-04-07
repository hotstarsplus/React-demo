import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { StateWriteOff } from "../entity";
import { IStateWriteOffTableProps } from "./interface";
import { StateWriteOffTableUiAction } from "./uiAction";
/**
 * 销账状态表格
 */
export class StateWriteOffTable extends Table<StateWriteOff>{}

/**
 * 销账状态表格
 */
@inject("GlobalStateWriteOffStore")
@observer
export class StateWriteOffTableView extends React.Component<IStateWriteOffTableProps>{
    /**
     * 领域action
     */
    private uiAction:StateWriteOffTableUiAction;

    /**
     * 表格列
     */
    private columns :Array<ColumnProps<StateWriteOff>> = Array<ColumnProps<StateWriteOff>>(
        {
            dataIndex:"id",
            key:"id",
            title:"销账状态编码",
        },
        {
            dataIndex:"writeOffStateName",
            key:"writeOffStateName",
            title:"销账状态",
        },
        {
            dataIndex:"description",
            key:"description",
            title:"备注说明",
        }
    );

    constructor(props:IStateWriteOffTableProps){
        super(props);
        this.uiAction = new StateWriteOffTableUiAction(this.props);
    }

    public componentDidMount(){
        this.uiAction.loadData();
    }

    public render(){
        console.info("render StateWriteOffTableView");
        const { GlobalStateWriteOffStore } = this.props;
        return(
            <StateWriteOffTable 
                columns = {this.columns}
                dataSource = {GlobalStateWriteOffStore!.list.slice()}
                loading = {GlobalStateWriteOffStore!.isLoading}
                locale = {{
                    emptyText:GlobalStateWriteOffStore!.isLoading?[]:undefined
                }}
                rowKey = {this.getRowIndex}
            />
        );
    }

    /**
     * 获取行下标
     * @param record 
     * @param index 
     */
    public getRowIndex(record:StateWriteOff,index:number):string{
        return index.toString();
    }
}