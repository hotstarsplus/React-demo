import { Icon, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from 'react';
import { BusinessType } from '../entity';
import { IBusinessTypeTableProps } from './interface';
import { ThremBusinessUiAction } from './uiAction';



/**
 * 业务类型表格
 */
@inject("GlobalBusinesstypeStore")
@observer
export class BusinessTypeTable extends React.Component<IBusinessTypeTableProps>{

    private uiAction: ThremBusinessUiAction;
    /**
     * 表格列
     */
    private columns: Array<ColumnProps<BusinessType>> = Array<ColumnProps<BusinessType>>(
        {
            title: '业务类别编码',
            dataIndex: 'BusinessTypeId',
            key: 'BusinessTypeId',
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

        {
            title: '业务类别名称',
            dataIndex: 'BusinessTypeName',
            key: 'BusinessTypeName',
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

        {
            title: '排序号',
            dataIndex: 'SortNo',
            defaultSortOrder: "ascend",
            sorter: (a: any, b: any) => a.SortNo - b.SortNo,
            key: 'SortNo',
            width:150,
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
            title: '是否启用',
            key: 'IsEnable',
            render:(record: BusinessType) =>{
               if(record.IsEnable==="1"){
                   return "是"
               }else{
                   return "否"
               }
            },
            width:150
        },

        {
            title: '备注',
            dataIndex: 'Description',
            key: 'Description',
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

        {
            title: '操作',
            key: 'action',
            render: (record: BusinessType) => {
                return (
                    <a
                        href="##"
                        title="编辑"
                        id={`edit_${record.BusinessTypeId}`}
                        onClick={this.uiAction.editClick}
                    >
                        <Icon type="edit" style={{ color: '#1890ff' }} />
                    </a>
                )
            },
            // width:"10%"
        }

    )

    constructor(props: IBusinessTypeTableProps) {
        super(props);

        this.uiAction = new ThremBusinessUiAction(this.props);
    }

    public render() {
        const { GlobalBusinesstypeStore } = this.props;
        return (
            <Table<BusinessType>
                bordered={true}
                columns={this.columns}
                dataSource={GlobalBusinesstypeStore!.BusinessTypeLists.slice()}
                loading={
                    {
                        spinning:GlobalBusinesstypeStore!.Loading,
                        tip: "正在加载中..."
                    }
                  }
                  locale = {{
                    emptyText:GlobalBusinesstypeStore!.Loading?[]:undefined
                  }}
                scroll={{y:400}}
                rowKey={this.getRowkey}
                pagination={false}
                className = {"ori-table ori-table-scroll"}
            />
        )
    }

    private getRowkey(record: BusinessType, index: number): string {
        return record.BusinessTypeId.toString();
    }
}