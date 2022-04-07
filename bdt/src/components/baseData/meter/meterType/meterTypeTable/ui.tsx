import { Divider, Icon, Popconfirm, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { MeterTypeUiEntity } from "../entity";
import { IMeterTypeTableProps } from "./interface";
import { MeterTypeTableUiAction } from "./uiAction";


class MeterTypeTable extends Table<MeterTypeUiEntity>{};

/**
 * 表格视图
 */
@inject("GlobalMeterTypeStore")
@observer
export class MeterTypeTableView extends React.Component<IMeterTypeTableProps>{

    private uiAction :MeterTypeTableUiAction;

    /**
     * 表格每一行
     */

    private columns:Array<ColumnProps<MeterTypeUiEntity>>=Array<ColumnProps<MeterTypeUiEntity>>(
      
        {
            key:"key",
            dataIndex:"key",
            sorter: (a:any, b:any) => a.key - b.key,
            title:"编码",
            width:250,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 250,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },
            render: (text) => <span title={text}>{text}</span>
        }, 
        {
            dataIndex:"title",
            key:"title",
            title:"水表类型名称",
            width:250,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 250,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },
            render: (text) => <span title={text}>{text}</span>
        },     
        {
            dataIndex:"Description",
            key:"Description",
            title:"备注",
            width:300,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 300,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },
            render: (text) => <span title={text}>{text}</span>
        },
        {
            dataIndex:"SortNo",
            key:"SortNo",
            defaultSortOrder: 'ascend',
            title:"排序号",
            // sorter: (a: any, b: any) => a.SortNo - b.SortNo,
            width:250
        },{
            key:"action",
            render:(text: any, record: MeterTypeUiEntity, index: number)=>{
                return(
                    <div style={{display: "inline-block"}}>                      
                    <div>                      
                        <a
                         href={'javascript:;'}
                         onClick = {this.uiAction.editClick.bind(undefined,record)}
                         id = {`edit_${record.key}`}
                         title = "编辑"
                        >
                            <Icon type="edit" title="编辑" />
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm placement="top" title={"确定要删除吗？"} onConfirm={this.uiAction.deleteClick.bind(undefined,record)} okText="确定" cancelText="取消">
                        <a
                         href={'javascript:;'}
                        // onClick = {this.uiAction.deleteClick}
                         id = {`delete_${record.key}`}
                         title = "删除"
                        >
                            <Icon type="delete" title = "删除" />
                        </a>
                        </Popconfirm>
                    </div>
                    </div>
                );
            },
            title:"操作",
            // width:"20%"
        },
    )


    constructor(props:IMeterTypeTableProps){
        
        super(props)

        this.uiAction = new MeterTypeTableUiAction(props);

        this.setRowClassName = this.setRowClassName.bind(this);

        this.getRowKey =this.getRowKey.bind(this);

    }



    public render(){
        console.log("render() MeterTypeTable");
        return(
            <MeterTypeTable
              bordered={true}
              columns = {this.columns}
              dataSource = {this.props.GlobalMeterTypeStore!.MeterTypeUiList.slice()}
              rowClassName={ this.setRowClassName }
              loading={
                {
                    spinning:this.props.GlobalMeterTypeStore!.IsLoading,
                    tip: "正在加载中..."
                }}
              locale = {{
                  emptyText:this.props.GlobalMeterTypeStore!.IsLoading?[]:undefined
              }}
              rowKey = {this.getRowKey}
              pagination={false}
              scroll={{y:400}}
              className="ori-table ori-table-scroll"
            />
        );
    }
    /**
     * 设置行样式
     * @param record 
     * @param index 
     */
    private setRowClassName(record:any,index:number){

        return "tr-class";
    }

    private getRowKey(record: MeterTypeUiEntity, index: number): string {
        return record.key;
    }

}