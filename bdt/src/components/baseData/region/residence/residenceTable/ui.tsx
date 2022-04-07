import { Divider, Icon, Popconfirm, Table } from "antd";
import  { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { Residence } from "../entity";
import { IResidenceTableProps } from "./interface";
import { ResidenceTableUiAction } from "./uiAction";

class ResidenceTable extends Table<Residence>{};


/**
 * 表格视图
 */
@inject("GlobalResidenceStore")
@observer
export class ResidenceTableView extends React.Component<IResidenceTableProps>{

    private uiAction :ResidenceTableUiAction;

    private columns:Array<ColumnProps<Residence>>=Array<ColumnProps<Residence>>(
        {
            key:"GardenId",
            dataIndex:"GardenId",
            sorter: (a:any, b:any) => a.GardenId - b.GardenId,
            title:"编码",
            width:150,onCell: () => {
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
            dataIndex:"GardenName",
            key:"GardenName",
            title:"小区名称",
            sorter: (a:any, b:any) => a.GardenName.length - b.GardenName.length,
            width:250,onCell: () => {
                return {
                  style: {
                    maxWidth: 250,
                    overflow: 'hidden',
                    whiteSpace: 'pre',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                  }
                }
              },render: (text) => <span title={text}>{text}</span>
        },
        
        {
            dataIndex:"GardenAddress",
            key:"GardenAddress",
            title:"地址",
            sorter: (a:any, b:any) => a.GardenAddress.length - b.GardenAddress.length,
            width:250,onCell: () => {
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
            dataIndex:"Description",
            key:"Description",
            title:"备注",
            sorter: (a:any, b:any) => a.Description.length - b.Description.length,
            width:250,onCell: () => {
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
            dataIndex:"SortNo",
            key:"SortNo",
            title:"排序号",
            width:100,
            sorter: (a:any, b:any) => a.SortNo - b.SortNo,
        },  {
            key:"action",
            // width:100,
            render:(text: any, record: Residence, index: number)=>{
                return(
                    <div style={{display: "inline-block"}}>         
                    <div>                     
                        <a
                         href={'javascript:;'}
                         onClick = {this.uiAction.editClick}
                         id = {`edit_${record.GardenId}`}
                         title = "编辑"
                        >
                            <Icon type="edit" title="编辑" />
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm placement="top" title={"确定要删除吗？"} onConfirm={this.uiAction.deleteClick.bind(undefined,`delete_${record.GardenId}`)} okText="确定" cancelText="取消">
                        <a
                         href={'javascript:;'}
                        //  onClick = {this.uiAction.deleteClick}
                         id = {`delete_${record.GardenId}`}
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


    constructor(props:IResidenceTableProps){
        
        super(props)

        this.uiAction = new ResidenceTableUiAction(props);

        this.setRowClassName = this.setRowClassName.bind(this);

        this.getRowKey =this.getRowKey.bind(this);

    }

    
    public render(){
      const data=[...this.props.GlobalResidenceStore!.ResidenceList.slice()]
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
            <ResidenceTable
              bordered={true}
              columns = {this.columns}
              dataSource = {this.props.GlobalResidenceStore!.ResidenceList.slice()}
              loading={
                {
                    spinning:this.props.GlobalResidenceStore!.Loading,
                    tip: "正在加载中..."
                }
              }
              locale = {{
                emptyText:this.props.GlobalResidenceStore!.Loading?[]:undefined
              }}
              rowClassName={ this.setRowClassName }
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

    private getRowKey(record: Residence, index: number): string {
        return record.GardenId;
    }

}