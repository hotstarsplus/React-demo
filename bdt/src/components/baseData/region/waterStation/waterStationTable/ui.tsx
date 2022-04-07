import {Divider,Icon,Popconfirm, Table} from "antd";
import  { ColumnProps } from "antd/lib/table";
import { inject,observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import {  WaterStationUiEntity} from "../entity";
import { IWaterStationTableProps } from "./interface";
import { WaterStationTableUiAction } from "./uiAction";

class WaterStationTable extends Table<WaterStationUiEntity>{};



/**
 * 表格视图
 */
@inject("GlobalWaterStationStore")
@observer
export class WaterStationTableView extends React.Component<IWaterStationTableProps>{

    private uiAction :WaterStationTableUiAction;

    private columns:Array<ColumnProps<WaterStationUiEntity>>=Array<ColumnProps<WaterStationUiEntity>>(
        {
            dataIndex:"key",
            key:"key",
            sorter: (a:any, b:any) => a.key - b.key,
            title:"编码",
            width: 150,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 150,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },render: (text) => <span title={text}>{text}</span>
        },
        {
            dataIndex:"title",
            key:"title",
            sorter: (a:any, b:any) => a.title.length - b.title.length,
            title:"供水所名称",
            width: 250,
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
              },render: (text) => <span title={text}>{text}</span>
        },
        {
            dataIndex:"WaterStationAddress",
            key:"WaterStationAddress",
            // sorter: (a:any, b:any) => a.WaterStationAddress.length - b.WaterStationAddress.length,
            title:"地址",
            width: 250,
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
            dataIndex:"WaterStationLinkMan",
            key:"WaterStationLinkMan",
            // sorter: (a:any, b:any) => a.WaterStationLinkMan.length - b.WaterStationLinkMan.length,
            title:"联系人",
            width:84,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 84,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },render: (text) => <span title={text}>{text}</span>
        },
        {
            dataIndex:"WaterStationTel",
            key:"WaterStationTel",
            // sorter: (a:any, b:any) => a.WaterStationTel - b.WaterStationTel,
            title:"电话",
            width: 120,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 120,
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
            defaultSortOrder: 'ascend',
            key:"SortNo",
            sorter: (a:any, b:any) => a.SortNo - b.SortNo,
            title:"排序号",
            width: 150
        },
       
        {
            dataIndex:"Description",
            key:"Description",
            sorter: (a:any, b:any) => a.Description.length - b.Description.length,
            title:"备注",
            width: 250,
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
              },render: (text) => <span title={text}>{text}</span>
        },{
            key:"Action",
            render:(text: any, record: WaterStationUiEntity, index: number)=>{
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
            // width:"10%"
        },
    )

    /**
     * 构造方法
     * @param props 
     */
    constructor(props:IWaterStationTableProps){
        
        super(props)

        this.uiAction = new WaterStationTableUiAction(props);

        this.setRowClassName = this.setRowClassName.bind(this);

        this.getRowKey =this.getRowKey.bind(this);

    }



    public render(){
      const data=[...this.props.GlobalWaterStationStore!.WaterStationUiList.slice()]
      deleteChildren(data)
      function deleteChildren(list:any){
        list.map((element:any)=>{
            if(element.children && element.children.length===0){
                delete element.children
            }
            if(element.children && element.children.length!==0){
                deleteChildren(element.children)
            }
        })
    }
        return(
            <WaterStationTable
              bordered={true}
              columns = {this.columns}
              dataSource = {this.props.GlobalWaterStationStore!.WaterStationUiList.slice()}
              rowClassName={ this.setRowClassName }
              loading={
                {
                    spinning:this.props.GlobalWaterStationStore!.IsLoading,
                    tip: "正在加载中..."
                }
              }
              locale = {{
                emptyText:this.props.GlobalWaterStationStore!.IsLoading?[]:undefined
              }}
              rowKey = {this.getRowKey}
              pagination = {false}
              scroll={{x:1400,y:400}}
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

    private getRowKey(record: WaterStationUiEntity, index: number): string {
        return record.key;
    }

}