import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { observer } from "mobx-react";
import * as React from "react";
import { CopyType } from "../entity";
import { CopyTypeTableUiAction } from "./uiAction";

/**
 * 抄表类型表格
 */
class CopyTypeTable extends Table<CopyType>{};

/**
 * 抄表类型表格视图
 */
@observer
export class CopyTypeTableView extends React.Component {

    /**
     * 表格列
     */
    private cloumns:Array<ColumnProps<CopyType>> = Array<ColumnProps<CopyType>>(

        {
            dataIndex:"id",
            key:"id",
            title:"抄表类型id"
        },
        {
            dataIndex:"copyTypeName",
            key:"copyTypeName",
            title:"抄表类型名称"
        },
        {
            dataIndex:"description",
            key:"description",
            title:"备注"
        }
    );

    /**
     * 领域action
     */
    private uiAction:CopyTypeTableUiAction;

    constructor(props:any){
        super(props);
        this.uiAction = new CopyTypeTableUiAction();
    }

    public componentDidMount(){
        this.uiAction.loadData();
    }
    public render(){
        console.info("render CopyTypeTableView");
        return(
        <CopyTypeTable
        columns = {this.cloumns}
        dataSource = {this.uiAction.domainStore.list.slice()} 
        loading = {this.uiAction.domainStore.isLoading}
        locale = {{
            emptyText:this.uiAction.domainStore.isLoading?[]:undefined
        }}
        rowKey = {this.getRowKey}
        />)
    }

    /**
     * 获取当前行下标
     * @param record 
     * @param index 
     */
    public getRowKey(record:CopyType,index:number):string
    {
        return index.toString();
    }

    
}