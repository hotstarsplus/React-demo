import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { MainBranchType } from "../entity";
import { IMainBranchTypeTableProps } from "./interface";
import { MainBranchTypeTableUiAction } from "./uiAction";

/**
 * 总分表类型表格
 */
export class MainBranchTypeTable extends Table<MainBranchType>{}

/**
 * 总分表类型表格视图
 */
@inject("GlobalMainBranchTypeStore")
@observer
export class MainBranchTypeTableView extends React.Component<IMainBranchTypeTableProps>{

    /**
     * 领域action
     */
    private uiAction:MainBranchTypeTableUiAction;

    /**
     * 表格列
     */
    private columns:Array<ColumnProps<MainBranchType>> = Array<ColumnProps<MainBranchType>>(
        {
            dataIndex:"id",
            key:"id",
            title:"总分表类型编码",
        },
        {
            dataIndex:"meterBranchTypeName",
            key:"meterBranchTypeName",
            title:"总分表类型名称",
        },
        {
            dataIndex:"description",
            key:"description",
            title:"备注描述",
        }
    );

    constructor(props:IMainBranchTypeTableProps){
        super(props);

        this.uiAction = new MainBranchTypeTableUiAction(this.props);

    }

    public componentDidMount(){
        this.uiAction.loadData();
    }

    public render(){
        console.info("render MainBranchTypeTableView");
        const { GlobalMainBranchTypeStore } = this.props;
        return(
            <MainBranchTypeTable
                columns = {this.columns}
                dataSource = {GlobalMainBranchTypeStore!.list.slice()}
                loading = {GlobalMainBranchTypeStore!.isLoading}
                locale = {{
                    emptyText:GlobalMainBranchTypeStore!.isLoading?[]:undefined
                }}
                rowKey = {this.getRowIndex}
             />
        );
    }

    public getRowIndex(record:MainBranchType,index:number):string{
        return index.toString();
    }
}