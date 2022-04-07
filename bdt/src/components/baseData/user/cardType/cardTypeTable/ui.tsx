import { Divider, Icon, Popconfirm, Table } from "antd";
import  { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { CardType } from "../entity";
import { ICardTypeTableProps } from "./interface";
import { CardTypeTableUiAction } from "./uiAction";


class CardTypeTable extends Table<CardType>{};


/**
 * 表格视图
 */
@inject("GlobalCardTypeStore")
@observer
export class CardTypeTableView extends React.Component<ICardTypeTableProps>{

    private uiAction :CardTypeTableUiAction;
    private columns:Array<ColumnProps<CardType>>=Array<ColumnProps<CardType>>(
        {
            dataIndex:"CardTypeId",
            key:"CardTypeId",
            title:"编码",
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
            dataIndex:"CardTypeName",
            key:"CardTypeName",
            title:"客户类型",
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
            width:300,onCell: () => {
                return {
                  style: {
                    maxWidth: 300,
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
            width:250
        },
        {
            key:"action",
            render:(text: any, record: CardType, index: number)=>{
                return(
                    <div style={{display: "inline-block"}}>
                       
                    <div>                    
                        <a
                         href={'javascript:;'}
                         onClick = {this.uiAction.editClick}
                         id = {`edit_${record.CardTypeId}`}
                         title = "编辑"
                        >
                            <Icon type="edit" style={{color:'#1890ff'}}/>
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm placement="top" title={"确定要删除吗？"} onConfirm={this.uiAction.deleteClick.bind(undefined,`delete_${record.CardTypeId}`)} okText="确定" cancelText="取消">
                        <a
                         href={'javascript:;'}
                         id = {`delete_${record.CardTypeId}`}
                         title = "删除"
                        >
                            <Icon type="delete" style={{color:'#1890ff'}}/>
                        </a>                   
                        </Popconfirm>    
                    </div>
                    </div>
                );
            },
            title:"操作",
        },
    )


    constructor(props:ICardTypeTableProps){
        
        super(props)

        this.uiAction = new CardTypeTableUiAction(props);
    }


    public render(){
        return(
            <CardTypeTable
              bordered={true}
              columns = {this.columns}
              dataSource = {this.props.GlobalCardTypeStore!.CardTypeList.slice()}
              loading={
                {
                    spinning:this.props.GlobalCardTypeStore!.isLoading,
                    tip: "正在加载中..."
                }
              }
              locale = {{
                emptyText:this.props.GlobalCardTypeStore!.isLoading?[]:undefined
              }}
              rowClassName={ this.uiAction.setRowClassName }
              rowKey = {this.uiAction.getRowKey}
              pagination={false}
              scroll={{y:400}}
              className="ori-table ori-table-scroll"
            />
        );
    }
    

}