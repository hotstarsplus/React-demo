import { Divider, Icon, Popconfirm, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { PayBankUiEntity } from "../entity";
import { IPayBankTableProps } from "./interface";
import { PayBankTableUiAction } from "./uiAction";


class PayBankTable extends Table<PayBankUiEntity>{ };


/**
 * 表格视图
 */
@inject("GlobalPayBankStore")
@observer
export class PayBankTableView extends React.Component<IPayBankTableProps>{

  private uiAction: PayBankTableUiAction;



  private columns: Array<ColumnProps<PayBankUiEntity>> = Array<ColumnProps<PayBankUiEntity>>(

    {
      key:"key" ,
      dataIndex: "key",
      title: "编码",
      width: 150, onCell: () => {
        return {
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }, render: (text) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "title",
      key: "title",
      title: "开户行名称",
      width: 200, onCell: () => {
        return {
          style: {
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }, render: (text) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "AgentBankAccount",
      key: "AgentBankAccount",
      title: "帐号",
      width: 120, onCell: () => {
        return {
          style: {
            maxWidth: 120,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }, render: (text) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "AgentBankEmail",
      key: "AgentBankEmail",
      title: "邮箱",
      width: 150, onCell: () => {
        return {
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }, render: (text) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "Description",
      key: "Description",
      title: "备注",
      width: 200, onCell: () => {
        return {
          style: {
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }, render: (text) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "SortNo",
      key: "SortNo",
      title: "排序号",
      width: 150
    }, 
    {
    key: "action",
    render: (text: any, record: PayBankUiEntity, index: number) => {
      return (
        <div style={{ display: "inline-block" }}>
          <div>
            <a
              href={'javascript:;'}
              onClick={this.uiAction.editClick.bind(undefined,record)}
              id={`edit_${record.key}`}
              title="编辑"
            >
              <Icon type="edit" style={{ color: '#1890ff' }} />
            </a>
            <Divider type="vertical" />
            <Popconfirm placement="top" title={"确定要删除吗？"} 
            onConfirm={this.uiAction.deleteClick.bind(undefined, record)}
            okText="确定" 
            cancelText="取消">
              <a
                href={'javascript:;'}
                // onClick = {this.uiAction.deleteClick}
                id={`delete_${record.key}`}
                title="删除"
              >
                <Icon type="delete" style={{ color: '#1890ff' }} />
              </a>
            </Popconfirm>
          </div>
        </div>
      );
    },
    title: "操作",
    // width: "10%"
  },
  )


  constructor(props: IPayBankTableProps) {

    super(props)

    this.uiAction = new PayBankTableUiAction(props);

    this.setRowClassName = this.setRowClassName.bind(this);

    this.getRowKey = this.getRowKey.bind(this);

  }



  public render() {
    const data = [...this.props.GlobalPayBankStore!.PayBankTypeUiList.slice()]
    deleteChildren(data)
    function deleteChildren(list: any) {
      list.map((element: any) => {
        if (element.children && element.children.length === 0) {
          delete element.children
        }
        if (element.children && element.children.length !== 0) {
          deleteChildren(element.children)
        }
      })
    }
    return (
      <PayBankTable
        bordered={true}
        columns={this.columns}
        dataSource={this.props.GlobalPayBankStore!.PayBankTypeUiList.slice()}
        loading={
          {
            spinning: this.props.GlobalPayBankStore!.Loading,
            tip: "正在加载中..."
          }
        }
        locale={{
          emptyText: this.props.GlobalPayBankStore!.Loading ? [] : undefined
        }}
        rowClassName={this.setRowClassName}
        rowKey={this.getRowKey}
        pagination={false}
        scroll={{ y: 400 }}
        className="ori-table ori-table-scroll"
      />
    );
  }
  /**
   * 设置行样式
   * @param record 
   * @param index 
   */
  private setRowClassName(record: any, index: number) {
    return "tr-class";
  }

  private getRowKey(record: PayBankUiEntity, index: number): string {
    return record.key;
  }

}