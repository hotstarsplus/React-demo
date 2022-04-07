import { Divider, Icon, Popconfirm, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { ProductKind } from "../entity";
import { IProductKindTableProps } from "./interface";
import { ProductKindTableUiAction } from "./uiAction";



class ProductKindTables extends Table<ProductKind>{ };


@inject("ProductKindUiStore")
@observer
export class ProductKindTable extends React.Component<IProductKindTableProps>{

  private uiAction: ProductKindTableUiAction;


  private columns: Array<ColumnProps<ProductKind>> = Array<ColumnProps<ProductKind>>(
    {
      dataIndex: "ProductKindId",
      key: "ProductKindId",
      title: "产品性质编码",
      width: 250,
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
      },
      render: (text: any,) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "ProductKindName",
      key: "ProductKindName",
      title: "产品性质名称",
      width: 250,
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
      },
      render: (text: any,) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "ColligationPrice",
      key: "ColligationPrice",
      title: "综合价格",
      width: 250,
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
      },
      render: (text: any,) => <span title={text}>{text}</span>
    },
    {
      key: "action",
      render: (text: any, record: ProductKind, index: number) => {
        return (
          <div style={{ display: "inline-block" }}>
            <span
              onClick={this.uiAction.EditClick.bind(this, record.ProductKindId)}
              title="编辑"
            >
              <Icon type="edit" style={{ color: '#1890ff' }} />
            </span>
            <Divider type="vertical" />
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={this.uiAction.DeleteClick.bind(this, record.ProductKindId)}
              okText="确认"
              cancelText="取消"
            >
              <span
                title="删除"
              >
                <Icon type="delete" style={{ color: '#1890ff' }} />
              </span>
            </Popconfirm >
          </div>
        )
      },
      title: "操作",
      // width:"20%"
    },
  )


  constructor(props: IProductKindTableProps) {
    super(props);
    this.uiAction = new ProductKindTableUiAction(props);
    this.getRowKey = this.getRowKey.bind(this);
  }

  public render() {
    return (
      <ProductKindTables
        bordered={true}
        columns={this.columns}
        rowKey={this.getRowKey}
        dataSource={this.props.ProductKindUiStore!.ProductKindTreeList}
        loading={
          {
            spinning: this.props.ProductKindUiStore!.Loading,
            tip: "正在加载中..."
          }
        }
        locale={{
          emptyText: this.props.ProductKindUiStore!.Loading ? [] : undefined
        }}
        scroll={{ y: 400 }}
        pagination={false}
        className={"ori-table ori-table-scroll"}
      />
    )
  }


  private getRowKey(record: ProductKind, index: number): string {
    return record.ProductKindId;
  }


}