import { Divider, Icon, Popconfirm,Table, } from "antd";
import  { ColumnProps } from "antd/lib/table";
import { action } from "mobx";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { WaterKind } from "../entity";
import { IWaterKindTableProps } from "./interface";
import { WaterKindTableUiAction } from "./uiAction";

class WaterKindTable extends Table<WaterKind>{};


/**
 * 表格视图
 */
@inject("GlobalWaterKindStore")
@observer
export class WaterKindTableView extends React.Component<IWaterKindTableProps>{

    private uiAction :WaterKindTableUiAction;


    private columns:Array<ColumnProps<WaterKind>>=Array<ColumnProps<WaterKind>>(
        {
            dataIndex:"WaterKindId",
            key:"WaterKindId",
            title:"用水性质编码",
            width: "20%"
        },
        {
            dataIndex:"WaterKindName",
            key:"WaterKindName",
            title:"用水性质名称",
            width: "20%"
        },
        {
            dataIndex:"BusinessType",
            key:"BusinessType",
            title:"业务类别",
            width:"20%"
        },
        {
            dataIndex:"ColligationPrice",
            key:"ColligationPrice",
            title:"综合水价",
            width: "20%"
        },
        {
            key:"Action",
            render:(text: any, record: WaterKind, index: number)=>{
                return(
                    <div style={{display: "inline-block"}}>
                        <a
                         href={'javascript:;'}
                         onClick = {this.uiAction.editClick}
                         id = {record.WaterKindId}
                         title = "编辑"
                        >
                            <Icon type="edit" style={{color:'#1890ff'}}/>
                        </a>
                        <Divider type="vertical" />
                    <Popconfirm  
                        title="确定要删除吗?"  
                        onConfirm={this.uiAction.deleteClick.bind(undefined,record.WaterKindId)}  
                        okText="确认" 
                        cancelText="取消" 
                    >
                        <a
                         href={'javascript:;'}
                         title = "删除"
                         id={record.WaterKindId}
                        >
                            <Icon type="delete" style={{color:'#1890ff'}}/>
                        </a>
                    </Popconfirm >
                    </div>
                );
            },
            title:"操作",
            width:"20%"
        },
    
    )


    constructor(props:IWaterKindTableProps){
        
        super(props)

        this.uiAction = new WaterKindTableUiAction(props);

        this.getRowKey =this.getRowKey.bind(this);

    }

    /**
     * 组装组件
     */
    public componentDidMount(){
        this.uiAction.loadData();

    }


    public render(){
        return(
            <WaterKindTable
              columns = {this.columns}
              dataSource = {this.props.GlobalWaterKindStore!.WaterKindList.slice()}
              loading = {this.props.GlobalWaterKindStore!.Loading}
              locale = {{
                emptyText:this.props.GlobalWaterKindStore!.Loading?[]:undefined
               }}
              rowKey = {this.getRowKey}
              scroll = {{y:100}}
              pagination={false}
              className = {"ori-table ori-table-scroll"}
            />
        );
    }

    /**
     * 获取行下标
     * @param record 
     * @param index 
     */
    @action
    private getRowKey(record: WaterKind, index: number): string {
        return record.WaterKindId;
    }

}