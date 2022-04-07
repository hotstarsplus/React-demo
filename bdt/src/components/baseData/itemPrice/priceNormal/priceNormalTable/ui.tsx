import { Icon,Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { action } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PriceNormal } from "../entity";
import { IPriceNormalTableProps } from "./interface";
import { PriceNormalTableUiAction } from "./uiAction";

/**
 * 普通水价表格
 */
export class PriceNormalTable extends Table<PriceNormal>{}

/**
 * 普通表格视图
 */
@inject("GlobalPriceNormalStore")
@observer
export class PriceNormalTableView extends React.Component<IPriceNormalTableProps>{

    /**
     * 领域action
     */
    private uiAction: PriceNormalTableUiAction;

    /**
     * 表格列
     */
    private columns:Array<ColumnProps<PriceNormal>>=Array<ColumnProps<PriceNormal>>(
        {
            key:"action",
            render:(text:any,record:PriceNormal,index:number) => {
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
    constructor(props:IPriceNormalTableProps){
        super(props);

        this.uiAction = new PriceNormalTableUiAction(this.props);
    }
    public componentDidMount(){
        this.uiAction.loadData();
    }
    public  render(){
        console.info("render PriceNormalTableView");
        const { GlobalPriceNormalStore } = this.props;
        return(
            <PriceNormalTable
                columns = {this.columns}
                dataSource = {GlobalPriceNormalStore!.list.slice()}
                loading = {GlobalPriceNormalStore!.isLoading}
                locale = {{
                    emptyText:GlobalPriceNormalStore!.isLoading?[]:undefined
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
    public setRowClassName(record:PriceNormal,index:number):string{
        return "tr-class";
    }

    /**
     * 获取行下标
     * @param record 
     * @param index 
     */
    public getRowIndex(record:PriceNormal,index:number):string{
        return index.toString();
    }

}

