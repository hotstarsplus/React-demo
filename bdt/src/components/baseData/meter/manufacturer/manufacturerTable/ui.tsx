import { Divider, Icon, Popconfirm, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from 'react';
import { Manufacturer } from '../entity';
import { IManufacturerTableProps } from "./interface";
import { ManufacturerTableUiAction } from './uiAction';


/**
 * 水表厂商表格
 */

/**
 *  水表厂商表格视图
 */
@inject("GlobalManufacturerStore","GlobalManufacturerDomainStore")
@observer
export class ManufacturerTableView extends React.Component<IManufacturerTableProps>{

  private uiAction: ManufacturerTableUiAction;

  /**
   *  组成表格的每一列
   */
  private columns: Array<ColumnProps<Manufacturer>> = Array<ColumnProps<Manufacturer>>(

    /**
     *  第一列
     */
    {
      dataIndex: "ManufacturerId",
      key: "ManufacturerId",
      sorter: (a: any, b: any) => a.ManufacturerId - b.ManufacturerId,
      title: "编号",
      width: 100,
    },
    /**
     * 第二列
     */
    {
      dataIndex: "ManufacturerName",
      key: "ManufacturerName",
      sorter: (a: any, b: any) => a.ManufacturerName.length - b.ManufacturerName.length,
      title: "生产厂家名称",
      width: 200,
      onCell: () => {
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
    /**
     *  第三列
     */
    {
      dataIndex: "ManufacturerFax",
      key: "ManufacturerFax",
      title: "传真",
      width: 100,
      onCell: () => {
        return {
          style: {
            maxWidth: 100,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }, render: (text) => <span title={text}>{text}</span>
    },
    /**
     * 第四列
     */
    {
      dataIndex: "ManufacturerLinkMan",
      key: "ManufacturerLinkMan",
      title: "联系人",
      width: 84,
      onCell: () => {
        return {
          style: {
            maxWidth: 84,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }, render: (text) => <span title={text}>{text}</span>
    },
    /**
     * 第五列
     */
    {
      dataIndex: "ManufacturerTel",
      key: "ManufacturerTel",
      sorter: (a: any, b: any) => a.ManufacturerTel - b.ManufacturerTel,
      title: "电话",
      width: 120,
      onCell: () => {
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
    /**
     * 第六列
     */
    {
      dataIndex: "ManufacturerEmail",
      key: "ManufacturerEmail",
      title: "邮箱",
      width: 180,
      onCell: () => {
        return {
          style: {
            maxWidth: 180,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }, render: (text) => <span title={text}>{text}</span>
    },
    /**
     * 第七列
     */
    {
      dataIndex: "ManufacturerAddress",
      key: "ManufacturerAddress",
      title: "地址",
      width: 200,
      onCell: () => {
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
    /**
     * 第八列
     */
    {
      dataIndex: "SortNo",
      defaultSortOrder: 'ascend',
      key: "SortNo",
      sorter: (a: any, b: any) => a.SortNo - b.SortNo,
      title: "排序号",
      width: 120,
      onCell: () => {
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
    /**
     * 第九列
     */
    {
      dataIndex: "Description",
      key: "Description",
      title: "备注",
      width: 150,
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
      }, render: (text) => <span title={text}>{text}</span>
    },
    
    {
      key: "action",
      render: (text: any, record: Manufacturer, index: number) => {
        return (
          <div >
            <a
              href={"javascript:;"}
              id={`edit_${record.ManufacturerId}`}
              title="编辑"
              onClick={this.uiAction.editClickhandle}
            >
              <Icon type='edit' />
              <Divider type="vertical" />
            </a>
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={this.uiAction.deleteClickhandle.bind(undefined, `delete_${record.ManufacturerId}`)}
              okText="确认" cancelText="取消" >
              <a
                id={`delete_${record.ManufacturerId}`}
                href={"javascript:;"}
                title="删除"
              >
                <Icon type='delete' />
              </a>
            </Popconfirm >
          </div>
        );
      },
      title: "操作",
      // width:'9%'
    }
  );


  /**
   * 构造方法
   * @param props 
   */
  constructor(props: IManufacturerTableProps) {

    super(props);

    this.uiAction = new ManufacturerTableUiAction(props);/*调用加载数据方法 */

    this.setRowClassName = this.setRowClassName.bind(this);

  }

  public render() {
    return (
      <Table
        bordered={true}
        columns={this.columns}
        dataSource={this.props.GlobalManufacturerStore!.list.slice()}
        loading={
          {
            spinning: this.props.GlobalManufacturerStore!.isLoading,
            tip: "正在加载中..."
          }
        }
        locale = {{
          emptyText:this.props.GlobalManufacturerStore!.isLoading?[]:undefined
        }}
        pagination={false}
        rowClassName={this.setRowClassName}
        scroll={{ x: 1450, y: 400 }}
        className="ori-table ori-table-scroll"
      />

    );
  }

  /**
   * 设置行样式
   * @param record 
   * @param index 
   */
  private setRowClassName(record: any, index: number): string {
    return "tr-class";
  }



}