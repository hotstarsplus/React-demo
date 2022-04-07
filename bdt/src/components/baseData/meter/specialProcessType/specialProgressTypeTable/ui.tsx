import { Icon, Table} from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { SpecialProcessType } from "../entity";
import { ISpecialProgressTypeTableProps } from "./interface";
import { SpecialProgressTypeTableUiAction } from "./uiAction";



/**
 * 水表特殊型号视图
 */
export class SpecialProgressTypeTable extends Table<SpecialProcessType>{}
/**
 * 水表特殊型号表格
 */
@inject("GlobalSpecialProgressTypeStore")
@observer
export class SpecialProgressTypeTableView extends React.Component<ISpecialProgressTypeTableProps>{
    private uiAction:SpecialProgressTypeTableUiAction;

    /**
     * 表格列
     */
    private columns:Array<ColumnProps<SpecialProcessType>> =Array<ColumnProps<SpecialProcessType>>(
        /**
         * 第一列
         */
        {
            dataIndex:"MeterSpecialTypeId",
            key:"MeterSpecialTypeId",
            sorter: (a:any, b:any) => a.MeterSpecialTypeId - b.MeterSpecialTypeId,
            title:"编码",
            width:250
        },
        /**
         * 第二列
         */
        {
            dataIndex:"MeterSpecialTypeName", 
            key:"MeterSpecialTypeName",
            sorter: (a:any, b:any) => a.MeterSpecialTypeName.length - b.MeterSpecialTypeName.length,
            title:"水表特殊型号名称",
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
         * 第四列
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
         * 第五列
         */{
            key:"action",
            render:(text:any,record:SpecialProcessType,index:number)=>{
                return(
                    <div>
                        <a
                        href={"javascript:;"}
                        id={`edit_${record.MeterSpecialTypeId}`}
                        title="编辑"
                        onClick={this.uiAction.editClick}
                        >
                        <Icon type='edit' />
                        </a>
                    </div>
                );
            },
            
            title:"操作",
            // width:'20%'

        }
    );
    /**
     * 构造方法
     * @param props 
     */
    constructor(props:ISpecialProgressTypeTableProps){
        super(props);
        this.uiAction = new SpecialProgressTypeTableUiAction(this.props);
    }

    public render(){
        console.info("render SpecialProgressTypeTableView");
        const { GlobalSpecialProgressTypeStore} = this.props;
        return(
            <SpecialProgressTypeTable
                bordered={true}
                columns = {this.columns}
                dataSource = {GlobalSpecialProgressTypeStore!.list.slice()}
                pagination={false}
                loading={
                    {
                        spinning:GlobalSpecialProgressTypeStore!.isLoading,
                        tip: "正在加载中..."
                    }
                }
                locale = {{
                    emptyText:GlobalSpecialProgressTypeStore!.isLoading?[]:undefined
                }}
                scroll={{y:400}}
                className="ori-table ori-table-scroll "
            />
        );
    }
}