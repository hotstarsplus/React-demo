import { Icon,Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { action } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PriceFix } from "../entity";
import { IPriceFixTableProps } from "./interface";
import { PriceFixTableUiAction } from "./uiAction";

/**
 * 普通水价表格
 */
export class PriceFixTable extends Table<PriceFix>{}

/**
 * 表格视图
 */
@inject("GlobalPriceFixStore")
@observer
export class PriceFixTableView extends React.Component<IPriceFixTableProps>{

    /**
     * 领域action
     */
    private uiAction: PriceFixTableUiAction;

    /**
     * 表格列
     */
    private columns:Array<ColumnProps<PriceFix>>=Array<ColumnProps<PriceFix>>(
        {
            key:"action",
            render:(text:any,record:PriceFix,index:number) => {
                return(
                    <div  className="div-hide">
                        <a
                            href={'javascript:;'}
                            id={`edit_${record.WaterKindId+"+"+record.itemId}`}
                            onClick={this.uiAction.editClick}
                            title = {"编辑"}
                        >
                            <Icon type='edit' />
                        </a>
                        
                    </div>
                );
            },
            width:"80px",
        },
        {
            dataIndex:"WaterKind",
            key:"WaterKind",
            title:"用水性质"
        },
        {
            dataIndex:"WaterRateItem",
            key:"WaterRateItem",
            title:"水费项目"
        },
        {
            dataIndex:"Price",
            key:"Price",
            title:"单价"
        },
    );
    constructor(props:IPriceFixTableProps){
        super(props);

        this.uiAction = new PriceFixTableUiAction(this.props);
    }
    public componentDidMount(){
        this.uiAction.loadData();
    }
    public  render(){
        console.info("render PriceFixTableView");
        const { GlobalPriceFixStore } = this.props;
        return(
            <PriceFixTable
                columns = {this.columns}
                dataSource = {GlobalPriceFixStore!.list.slice()}
                loading = {GlobalPriceFixStore!.isLoading}
                locale = {{
                    emptyText:GlobalPriceFixStore!.isLoading?[]:undefined
                }}
                rowKey = {this.getRowIndex}
                rowClassName = {this.setRowClassName}
                size="middle"
             />
        );
    }

    /**
     * 给行添加classname
     * @param record 
     * @param index 
     */
    @action
    public setRowClassName(record:PriceFix,index:number):string{
        return "tr-class";
    }

    /**
     * 获取行下标
     * @param record 
     * @param index 
     */
    public getRowIndex(record:PriceFix,index:number):string{
        return index.toString();
    }

}

