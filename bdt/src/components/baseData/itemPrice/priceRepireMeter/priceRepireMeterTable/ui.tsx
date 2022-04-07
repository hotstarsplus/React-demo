import { Icon,Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { action } from "mobx";
import { inject,observer } from "mobx-react";
import * as React from "react";
import { PriceRepireMeter } from "../entity";
import { IPriceRepireMeterTableProps } from "./interface";
import { PriceRepireMeterTableUiAction } from "./uiAction";

/**
 * 校表维修费表格
 */
export class PriceRepireMeterTable extends Table<PriceRepireMeter>{}

/**
 * 校表维修费表格视图
 */
@inject('GlobalPriceRepireMeterStore')
@observer
export class PriceRepireMeterTableView extends React.Component<IPriceRepireMeterTableProps>{

    
    /**
     * 领域action
     */
    private uiAction:PriceRepireMeterTableUiAction;


    /**
     * 表格列
     */
    private columns: Array<ColumnProps<PriceRepireMeter>> = Array<ColumnProps<PriceRepireMeter>>(
        {
            key:"action",
            render:(text:any,record:PriceRepireMeter,index:number) => {
                return(
                    <div  className="div-hide">
                        <a
                            href={'javascript:;'}
                            id={`edit_${record.MeterCaliberId}`}
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
            dataIndex:"MeterCaliber",
            key:"MeterCaliber",
            title:"水表口径"
        },
        {
            dataIndex:"Price",
            key:"Price",
            title:"单价"
        },
    );

    constructor(props:IPriceRepireMeterTableProps){
        super(props);
        this.uiAction = new PriceRepireMeterTableUiAction(this.props);
    }

    public componentDidMount(){
        this.uiAction.loadData();
    }
    public render(){
        console.info("render PriceRepireMeterTableView");
        const {GlobalPriceRepireMeterStore} = this.props;
        return(
            <PriceRepireMeterTable
                columns = {this.columns}
                dataSource = {GlobalPriceRepireMeterStore!.list.slice()}
                loading = {GlobalPriceRepireMeterStore!.isLoading}
                locale = {{
                    emptyText:GlobalPriceRepireMeterStore!.isLoading?[]:undefined
                }}
                rowKey = {this.getRowIndex}
                rowClassName = {this.setRowClassName}
                size = "middle"
            />
        );
    }
    /**
     * 设置行className
     * @param record 
     * @param index 
     */
    @action
    private setRowClassName(record:PriceRepireMeter, index:number):string{
        return "tr-class";
    }


    /**
     * 获取行下标
     * @param record 
     * @param index 
     */
    private getRowIndex(record:PriceRepireMeter,index:number):string
    {
        return index.toString();
    }
}
