import {Divider,Icon,Popconfirm, Table, Tooltip} from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject,observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss'
import * as React from "react";
import {  NeighborhoodUiEntity} from "../entity";
import { INeighborhoodTableProps } from "./interface";
import { NeighborhoodTableUiAction } from "./uiAction";

class NeighborhoodTable extends Table<NeighborhoodUiEntity>{};



/**
 * 表格视图
 */
@inject("GlobalNeighborhoodStore")
@observer
export class NeighborhoodTableView extends React.Component<INeighborhoodTableProps>{

    private uiAction :NeighborhoodTableUiAction;
    /**
     * 设置表格的每一行
     */
    private columns:Array<ColumnProps<NeighborhoodUiEntity>>=Array<ColumnProps<NeighborhoodUiEntity>>(
        {
            dataIndex:"key",
            key:"key",
            sorter: (a:any, b:any) => a.key - b.key,
            title:"编码",
            width: "11%",onCell: () => {
                return {
                  style: {
                    maxWidth: 150,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
            dataIndex:"title",
            key:"title",
            sorter: (a:any, b:any) => a.title.length - b.title.length,
            title:"缴费网点",
            width: "15%",onCell: () => {
                return {
                  style: {
                    maxWidth: 150,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
            dataIndex:"NeighborhoodAddress",
            key:"NeighborhoodAddress",
            title:"地址",
            width: "14%",onCell: () => {
                return {
                  style: {
                    maxWidth: 150,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
            dataIndex:"NeighborhoodLinkMan",
            key:"NeighborhoodLinkMan",
            title:"联系人",
            width: "9%",onCell: () => {
                return {
                  style: {
                    maxWidth: 150,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
            dataIndex:"NeighborhoodTel",
            key:"NeighborhoodTel",
            title:"电话",
            width: "10%",onCell: () => {
                return {
                  style: {
                    maxWidth: 150,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
            dataIndex:"SortNo",
            defaultSortOrder: 'ascend',
            key:"SortNo",
            sorter: (a:any, b:any) => a.SortNo - b.SortNo,
            title:"排序号",
            width: "12%"
        },
       
        {
            dataIndex:"Description",
            key:"Description",
            title:"备注",
            width: "12%",onCell: () => {
                return {
                  style: {
                    maxWidth: 150,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },{
            key:"Action",
            render:(text: any, record: NeighborhoodUiEntity, index: number)=>{
                return(
                    <div style={{display: "inline-block"}}>
                        <a
                         href={'javascript:;'}
                         onClick = {this.uiAction.editClick}
                         id = {`edit_${record.key}`}
                         title = "编辑"
                        >
                        <Icon type='edit' />
                        </a>
                        <Divider type="vertical" />
                    <Popconfirm  title="确定要删除吗?"  onConfirm={this.uiAction.deleteClick.bind(undefined,`delete_${record.key}`)}  okText="确认" cancelText="取消" >
                        <a
                         href={'javascript:;'}
                         id = {`delete_${record.key}`}
                         title = "删除"
                        >
                        <Icon type='delete' />
                        </a>
                    </Popconfirm >
                    </div>
                );
            },
            title:"操作",
            width:"20%"
        },
    )

    /**
     * 构造方法
     */
    constructor(props:INeighborhoodTableProps){
        
        super(props)

        this.uiAction = new NeighborhoodTableUiAction(props);

        this.setRowClassName = this.setRowClassName.bind(this);

        this.getRowKey =this.getRowKey.bind(this);

    }

    /**
     * 组装组件
     */
    public componentDidMount(){
        this.uiAction.loadData();
    }


    /**
     * 返回组件
     */
    public render(){
        console.log("render() NeighborhoodTable");
        return(
            <NeighborhoodTable
              columns = {this.columns}
              dataSource = {this.props.GlobalNeighborhoodStore!.NeighborhoodUiList.slice()}
              loading = {this.props.GlobalNeighborhoodStore!.IsLoading}
              locale = {{
                emptyText:this.props.GlobalNeighborhoodStore!.IsLoading?[]:undefined
              }}
              rowClassName={ this.setRowClassName }
              rowKey = {this.getRowKey}
              pagination = {false}
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
    /**
     * 根据自增id设置表格每行的key值
     */
    private getRowKey(record: NeighborhoodUiEntity, index: number): string {
        return record.key;
    }

}