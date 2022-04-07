import { Divider, Icon, Popconfirm, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { IBusinessOfficeTableProps } from "../businessOfficeTable/interface";
import { BusinessOfficeTableUiAction } from "../businessOfficeTable/uiAction";
import { BusinessOfficeUiEntity } from "../entity";
import './BusinessOfficeTable.scss';
class BusinessOfficeTable extends Table<BusinessOfficeUiEntity>{ };
/**
 * 表格视图
 */
@inject("GlobalBusinessOfficeStore")
@observer
export class BusinessOfficeTableView extends React.Component<IBusinessOfficeTableProps>{

  private uiAction: BusinessOfficeTableUiAction;

  private columns: Array<ColumnProps<BusinessOfficeUiEntity>> = Array<ColumnProps<BusinessOfficeUiEntity>>(
    {
      dataIndex: "key",
      width: 150,
      key: "key",
      sorter: (a: any, b: any) => a.key - b.key,
      title: "编码",
      onCell: () => {
        return {
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      },
      render: (text) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "title",
      key: "title",
      sorter: (a: any, b: any) => a.title.length - b.title.length,
      title: "营业网点名称",
      width: 250, onCell: () => {
        return {
          style: {
            maxWidth: 250,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      },
      render: (text: any,) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "BusinessOfficeAddress",
      key: "BusinessOfficeAddress",
      title: "地址",
      width: 250, onCell: () => {
        return {
          style: {
            maxWidth: 250,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }
      , render: (text: any,) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "BusinessOfficeLinkMan",
      key: "BusinessOfficeLinkMan",
      title: "联系人",
      width: 84, onCell: () => {
        return {
          style: {
            maxWidth: 84,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }
      , render: (text: any,) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "BusinessOfficeTel",
      key: "BusinessOfficeTel",
      title: "电话",
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
      }
      , render: (text: any,) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "SortNo",
      key: "SortNo",
      sorter: (a: any, b: any) => a.SortNo - b.SortNo,
      title: "排序号",
      width: 150
    },

    {
      dataIndex: "Description",
      key: "Description",
      title: "备注",
      width: 250, onCell: () => {
        return {
          style: {
            maxWidth: 250,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }
      , render: (text: any,) => <span title={text}>{text}</span>
    }, {
    key: "Action",
    render: (text: any, record: BusinessOfficeUiEntity, index: number) => {
      return (
        <div style={{ display: "inline-block" }}>
          <a
            href={'javascript:;'}
            onClick={this.uiAction.editClick.bind(undefined, record)}
            id={`edit_${record.key}`}
            title="编辑"
          >
            <Icon type='edit' />
          </a>
          <Divider type="vertical" />
          <Popconfirm title="确定要删除吗?" onConfirm={this.uiAction.deleteClick.bind(undefined, `delete_${record.key}`)} okText="确认" cancelText="取消" >
            <a
              href={'javascript:;'}
              id={`delete_${record.key}`}
              title="删除"
            >
              <Icon type='delete' />
            </a>
          </Popconfirm >
        </div>
      );
    },
    title: "操作",
    // width: "10%"
  },
  )


  constructor(props: IBusinessOfficeTableProps) {

    super(props)

    this.uiAction = new BusinessOfficeTableUiAction(props);

  }




  public render() {
    const data = [...this.props.GlobalBusinessOfficeStore!.BusinessOfficeUiList.slice()]
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
      <>
        <BusinessOfficeTable
          bordered={true}
          columns={this.columns}
          dataSource={this.props.GlobalBusinessOfficeStore!.BusinessOfficeUiList.slice()}
          loading={
            {
              spinning: this.props.GlobalBusinessOfficeStore!.IsLoading,
              tip: "正在加载中..."
            }
          }
          locale={{
            emptyText: this.props.GlobalBusinessOfficeStore!.IsLoading ? [] : undefined
          }}
          rowClassName={this.uiAction.setRowClassName}
          rowKey={this.uiAction.getRowKey}
          pagination={false}
          scroll={{ x:1400,y: 400 }}
          className="ori-table ori-table-scroll"
        />
      </>
    );
  }


}
