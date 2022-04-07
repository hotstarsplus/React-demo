import { Icon,Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { action } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PriceSuperPlan } from "../entity";
import { IPriceSuperPlanTableProps } from "./interface";
import { PriceSuperPlanTableUiAction } from "./uiAction";

/**
 * 超计划水价表格
 */
export class PriceSuperPlanTable extends Table<PriceSuperPlan>{}

/**
 * 超计划表格视图
 */
@inject("GlobalPriceSuperPlanStore")
@observer
export class PriceSuperPlanTableView extends React.Component<IPriceSuperPlanTableProps>{

    /**
     * 领域action
     */
    private uiAction: PriceSuperPlanTableUiAction;

    /**
     * 表格列
     */
    private columns:Array<ColumnProps<PriceSuperPlan>>=Array<ColumnProps<PriceSuperPlan>>(
        {
            key:"action",
            render:(text:any,record:PriceSuperPlan,index:number) => {
                return(
                    <div  className="div-hide">
                        <a
                            href={'javascript:;'}
                            id={`edit_${record.WaterKindId+"+"+record.WaterRateItemId}`}
                            onClick={this.uiAction.editClick}
                            title = {"编辑"}
                        >
                            <Icon type="edit" style={{color:'#1890ff'}}/>
                        </a>
                        
                    </div>
                );
            },
            width:"80px",
        },
        {
            dataIndex:"Levels",
            key:"Levels",
            title:"级别"
        },
        {
            dataIndex:"waterKind",
            key:"waterKind",
            title:"用水性质"
        },
        {
            dataIndex:"WaterRateItem",
            key:"WaterRateItem",
            title:"水费项目"
        },
        {
            dataIndex:"minQuantityPercent",
            key:"minQuantityPercent",
            title:"水量比例下限"
        },
        {
            dataIndex:"maxQuantityPercent",
            key:"maxQuantityPercent",
            title:"水量比例上限"
        },
        {
            dataIndex:"Price",
            key:"Price",
            title:"单价"
        },
    );
    constructor(props:IPriceSuperPlanTableProps){
        super(props);

        this.uiAction = new PriceSuperPlanTableUiAction(this.props);
    }
    public componentDidMount(){
        this.uiAction.loadData();
    }
    public  render(){
        console.info("render PriceSuperPlanTableView");
        const { GlobalPriceSuperPlanStore } = this.props;
        return(
            <PriceSuperPlanTable
                columns = {this.columns}
                dataSource = {GlobalPriceSuperPlanStore!.list.slice()}
                loading = {GlobalPriceSuperPlanStore!.isLoading}
                locale = {{
                    emptyText:GlobalPriceSuperPlanStore!.isLoading?[]:undefined
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
    public setRowClassName(record:PriceSuperPlan,index:number):string{
        return "tr-class";
    }

    /**
     * 获取行下标
     * @param record 
     * @param index 
     */
    public getRowIndex(record:PriceSuperPlan,index:number):string{
        return index.toString();
    }

}

