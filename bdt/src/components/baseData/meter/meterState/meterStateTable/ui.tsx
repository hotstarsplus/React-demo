import { Icon,Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { MeterState } from "../entity";
import { IMeterStateTableProps } from "./interface";
import { MeterStateTableUiAction } from "./uiAction";

/**
 * 创建水表状态表格类
 */
export class MeterStateTble extends Table<MeterState>{};

/**
 *  创建水表状态视图
 */
@inject("GlobalMeterStateStore")
@observer
export class MeterStateTableView extends React.Component<IMeterStateTableProps>{
    

    private uiAction:MeterStateTableUiAction;

    /**
     *  构造表格列
     */
    private columns:Array<ColumnProps<MeterState>> = Array<ColumnProps<MeterState>>(
        /**
         * 第一列
         */
        {
            dataIndex:"MeterStateId",
            key:"MeterStateId",
            sorter: (a:any, b:any) => a.MeterStateId - b.MeterStateId,
            title:"编码",
            width:250
        },
        /**
         * 第二列
         */
        {
            dataIndex:"MeterStateName",
            key:"MeterStateName",
            sorter: (a:any, b:any) => a.MeterStateName.length - b.MeterStateName.length,
            title:"水表状态名称",
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
              },render: (text) => <span title={text}>{text}</span>
        },
        /**
         * 第三列
         */
        {
            dataIndex:"Description",
            key:"Description",
            sorter: (a:any, b:any) => a.Description.length - b.Description.length,
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
              },render: (text) => <span title={text}>{text}</span>
        },
        /**
         * 第三列
         */
        {
            dataIndex:"SortNo",
            key:"SortNo",
            sorter: (a:any, b:any) => a.SortNo - b.SortNo,
            defaultSortOrder:"ascend",
            title:"排序号",
            width:250
        },
        /**
         * 第三列
         */
        {
            key:"Action",
            render:(text: any, record: MeterState, index: number)=>{
                return(
                    <div >
                        <a
                         href={"javascript:;"}
                         id={`edit_${record.MeterStateId}`}
                         title="编辑"
                         onClick={this.uiAction.editClickHandle}
                         >
                        <Icon type='edit' />
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
    constructor(props : IMeterStateTableProps){

        super(props);

        this.uiAction = new MeterStateTableUiAction(this.props);/*调用加载数据方法 */

    }

    public render() {
        const { GlobalMeterStateStore } = this.props;
        return (
            <MeterStateTble 
                bordered={true}
                columns={this.columns}
                dataSource={GlobalMeterStateStore!.list.slice()}
                loading={
                    {
                        spinning:GlobalMeterStateStore!.isLoading,
                        tip: "正在加载中..."
                    }
                }
                locale = {{
                    emptyText:GlobalMeterStateStore!.isLoading?[]:undefined
                }}
                pagination={false}
                rowClassName={this.uiAction.setRowClassName}
                scroll={{y:400}}
                className="ori-table ori-table-scroll"
            />
        );
    }
    


}