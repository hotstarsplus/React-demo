import { Icon,Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { action } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { CardTypeLateFee } from "../entity";
import { ICardTypeLateFeeTableProps } from "./interface";
import { CardTypeLateFeeTableUiAction } from "./uiAction";

export class CardTypeLateFeeTable extends Table<CardTypeLateFee>{}

@inject("GlobalCardTypeLateFeeStore")
@observer
export class CardTypeLateFeeTableView extends React.Component<ICardTypeLateFeeTableProps>{
    
    /**
     * 领域action
     */
    private uiAction:CardTypeLateFeeTableUiAction;

    /**
     * 表格列
     */
    private columns:Array<ColumnProps<CardTypeLateFee>> =  Array<ColumnProps<CardTypeLateFee>>(
        {
            key:"Action",
            render:(text:any,record:CardTypeLateFee,index:number) => {
                return(
                    <div className="div-hide">
                        <a
                            href={'javascript:;'}
                            id={`edit_${record.AutoId}`}
                            onClick={this.uiAction.editClick}
                            title = {"编辑"}
                        >
                            <Icon type='edit' />
                        </a>
                        &nbsp;&nbsp;&nbsp;
                       
                        <a
                            href={'javascript:;'}
                            id={`delete_${record.AutoId}`}
                            onClick={this.uiAction.deleteClick}
                            title = {"删除"}
                        >
                            <Icon type='delete' />
                        </a>
                    </div>
                );
            },
            width:"80px",
        },
        {
            dataIndex:"CardType",
            key:"CardType",
            title:"用户类型"
        },
        {
            dataIndex:"IsLateFee",
            key:"IsLateFee",
            title:"是否计算违约金"
        },

    );
    constructor(props:ICardTypeLateFeeTableProps){
        super(props);
        this.uiAction = new CardTypeLateFeeTableUiAction(this.props);
        this.setRowClassName = this.setRowClassName.bind(this);
    }

    public componentDidMount(){
        this.uiAction.loadData();
    }

    public render(){
        console.log("render CardTypeLateFeeTableView");
        const { GlobalCardTypeLateFeeStore } = this.props;
        return(
            <CardTypeLateFeeTable
                columns = {this.columns}
                dataSource = {GlobalCardTypeLateFeeStore!.list.slice()}
                loading = {GlobalCardTypeLateFeeStore!.isLoading}
                locale = {{
                    emptyText:GlobalCardTypeLateFeeStore!.isLoading?[]:undefined
                }}
                rowKey = {this.getRowIndex}
                rowClassName = {this.setRowClassName}
                size = "middle"
            />
        )
    }

    /**
     * 给行添加className
     * @param record 
     * @param index 
     */
    @action
    public setRowClassName(record:CardTypeLateFee,index:number):string{
        return "tr-class";
    }

    /**
     * 获取行下标
     * @param record 
     * @param index 
     */
    public getRowIndex(record:CardTypeLateFee,index:number):string{
        return index.toString();
    }

}
