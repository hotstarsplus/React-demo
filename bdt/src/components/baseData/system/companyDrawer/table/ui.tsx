import { Icon,  Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { CompanyInvoice } from "../entity";
import { ICompanyDrawerTableProps } from "./interface";
import { CompanyDrawerTableUiAction } from "./uiAction";



@inject("GlobalCompanyDrawerDomainStore")
@observer
export class CompanyDrawerTable extends React.Component<ICompanyDrawerTableProps>{


    private uiAction:CompanyDrawerTableUiAction;


    private columns:Array<ColumnProps<CompanyInvoice>>=Array<ColumnProps<CompanyInvoice>>(
        {
            key:"action",
            render:(text: any, record: CompanyInvoice, index: number)=>{
                return(
                    <div>
                        <a 
                            id={record.CompanyId}
                            onClick = {this.uiAction.OnEdit}
                        >
                            <Icon type="edit" title={"编辑"} />
                        </a>
                        {/* <a 
                            id={record.CompanyId}
                            style={{marginLeft:"5px"}}
                            onClick = {this.uiAction.OnAddUser}
                        >
                            <Icon type="user-add" title={"新增用户"} />
                        </a> */}
                        {/* <Popconfirm  
                            title="确定要删除吗?"  
                            onConfirm={this.uiAction.OnDelete.bind(undefined,record.CompanyId)}  
                            okText="确认" 
                            cancelText="取消" 
                        >
                           <a
                            id={record.CompanyId}
                            style={{marginLeft:"5px"}}
                            >
                                <Icon type="delete" title={"删除"} />
                            </a>
                        </Popconfirm > */}
                       
                    </div>
                )
            },
            title:"操作",
            width:84
        },
        {
            dataIndex:"CompanyName",
            key:"CompanyName",
            title:"企业名称",
            width:250,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 250,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer'
                  }
                }
              }, render: (text) => <span title={text}>{text}</span>
        },
        {
            dataIndex:"CompanyTaxNo",
            key:"CompanyTaxNo",
            title:"企业税号",
            width:250,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 250,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer'
                  }
                }
              }, render: (text) => <span  title={text}>{text}</span>
        },
        {
            dataIndex:"CompanyAddress",
            key:"CompanyAddress",
            title:"企业地址",
            width:250,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 250,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer'
                  }
                }
              }, render: (text) => <span title={text}>{text}</span>
        },
        {
            dataIndex:"CompanyTel",
            key:"CompanyTel",
            title:"企业电话",
            width:116,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 116,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer'
                  }
                }
              }, render: (text) => <span title={text}>{text}</span>
            
        },
        {
            dataIndex:"CompanyBankName",
            key:"CompanyBankName",
            title:"企业银行名称",
            width:250,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 250,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer'
                  }
                }
              }, render: (text) => <span title={text}>{text}</span>
        },
        {
            dataIndex:"CompanyBankAccount",
            key:"CompanyBankAccount",
            title:"企业银行账号",
            // width:162,
            onCell: () => {
                return {
                  style: {
                    maxWidth: 250,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer'
                  }
                }
              }, render: (text) => <span title={text}>{text}</span>
        },
    );

    constructor(props:ICompanyDrawerTableProps){
        super(props);
        this.uiAction = new CompanyDrawerTableUiAction(props);
        this.getRowkey = this.getRowkey.bind(this);
    }



    public render(){
        return(
            <Table<CompanyInvoice>
                bordered={true}
                columns = {this.columns}
                rowKey = {this.getRowkey}
                pagination = {false} 
                className = {"ori-table ori-table-scroll"}
                loading={
                    {
                        spinning:this.props.GlobalCompanyDrawerDomainStore!.Loading,
                        tip: "正在加载中..."
                    }
                  }
                  locale = {{
                    emptyText:this.props.GlobalCompanyDrawerDomainStore!.Loading?[]:undefined
                  }}
                scroll={{y:400}}
                dataSource = {this.props.GlobalCompanyDrawerDomainStore!.CompanyInvoiceList.slice()}
            />
        )
    }


    private getRowkey(record: CompanyInvoice, index: number):string{
        return record.CompanyId;
    }


}