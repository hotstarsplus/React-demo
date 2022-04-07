import {  Icon,Table} from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { inject,observer  } from 'mobx-react';
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from 'react';
import { PayType } from '../entity';
import { IPayTypeTableProps } from "./interface";
import { PayTypeTableUiAction } from './uiAction';

/**
 * 支付方式表格
 */
class PayTypeTable extends Table<PayType>{};

/**
 *  支付方式表格视图
 */
@inject("GlobalPayTypeStore")
@observer
export class PayTypeTableView extends React.Component<IPayTypeTableProps>{

    private uiAction:PayTypeTableUiAction;

    /**
     *  组成表格的每一列
     */
    
   
    private columns: Array<ColumnProps<PayType>> = Array<ColumnProps<PayType>>(
        
        /**
         *  第一列
         */
        {
            dataIndex:"PayTypeId",
            key:"PayTypeId",
            sorter: (a:any, b:any) => a.PayTypeId - b.PayTypeId,
            title:"编号",
            width:250
        },
        /**
         * 第二列
         */
        {
            dataIndex:"PayTypeName",
            key:"PayTypeName",
            sorter: (a:any, b:any) => a.PayTypeName.length - b.PayTypeName.length,
            title:"支付方式名称",
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
        /**
         * 第三列
         */
        {
            dataIndex:"SortNo",
            defaultSortOrder: 'ascend',
            key:"SortNo",
            sorter: (a:any, b:any) => a.SortNo - b.SortNo,
            title:"排序号",
            width:250
        },
        /**
         * 第四列
         */
        {
            dataIndex:"Description",
            key:"Description",
            sorter: (a:any, b:any) => a.Description.length - b.Description.length,
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
        /**
         * 第五列
         */
        {
            key:"action",
            render:(text: any, record: PayType, index: number)=>{
                return(
                    <div >
                        <a
                         href={"javascript:;"}
                         id={`edit_${record.PayTypeId}`}
                         title="编辑"
                         onClick={this.uiAction.editClick}
                         >
                            <Icon type="edit" style={{color:'#1890ff'}}/>
                        </a>
                    </div>
                );
            },
            title:"操作", 
            // width:"20%"
        }
    );
    

    /**
     * 构造方法
     * @param props 
     */
    constructor(props:IPayTypeTableProps){

        super(props);

        this.uiAction = new PayTypeTableUiAction(props);/*调用加载数据方法 */

    }




    public render(){
        return(

            <PayTypeTable 
              bordered={true}
              columns = {this.columns}
              dataSource = {this.props.GlobalPayTypeStore!.list.slice()}
              loading={
                {
                    spinning:this.props.GlobalPayTypeStore!.isLoading,
                    tip: "正在加载中..."
                }
              }
              locale = {{
                emptyText:this.props.GlobalPayTypeStore!.isLoading?[]:undefined
              }}
              pagination={false}
              rowClassName={this.uiAction.setRowClassName}
              scroll={{y:400}}
              className="ori-table ori-table-scroll"
            />

        );
    }

    



}