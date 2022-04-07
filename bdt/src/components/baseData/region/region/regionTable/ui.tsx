import { Divider, Icon, Popconfirm, Table} from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { Region } from "../entity";
import { IRegionTableProps } from "./interface";
import { RegionTableUiAction } from "./uiAction";


class RegionTable extends Table<Region>{ };



/**
 * 表格视图
 */
@inject("GlobalRegionStore")
@observer
export class RegionTableView extends React.Component<IRegionTableProps>{

  private uiAction: RegionTableUiAction;
  /**
   * 表格的每一行
   */
  private columns: Array<ColumnProps<Region>> = Array<ColumnProps<Region>>(
    {
      dataIndex: "RegionId",
      key: "RegionId",
      sorter: (a: any, b: any) => a.RegionId - b.RegionId,
      title: "编码",
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
      }, render: (text) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "RegionName",
      key: "RegionName",
      sorter: (a: any, b: any) => a.RegionName.length - b.RegionName.length,
      title: "片区名称",
      width: 250,
      onCell: () => {
        return {
          style: {
            maxWidth: 250,
            overflow: 'hidden',
            whiteSpace: 'pre',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }, render: (text) => <span title={text}>{text}</span>
    },
    {
      dataIndex: "SortNo",
      defaultSortOrder: 'ascend',
      key: "SortNo",
      sorter: (a: any, b: any) => a.SortNo - b.SortNo,
      title: "排序号",
      width: 250
    },

    {
      dataIndex: "Description",
      key: "Description",
      sorter: (a: any, b: any) => a.Description.length - b.Description.length,
      title: "备注",
      width: 300,
      onCell: () => {
        return {
          style: {
            maxWidth: 300,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        }
      }, render: (text) => <span title={text}>{text}</span>
    }, {
    key: "Action",
    render: (text: any, record: Region, index: number) => {
      return (
        <div style={{ display: "inline-block" }}>
          <a
            href={'javascript:;'}
            onClick={this.uiAction.EditClick}
            id={`edit_${record.RegionId}`}
            title="编辑">
            <Icon type='edit' />
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={this.uiAction.DeleteClick.bind(undefined, `delete_${record.RegionId}`)}
            okText="确认"
            cancelText="取消" >
            <a
              href={'javascript:;'}
              id={`delete_${record.RegionId}`}
              title="删除">
              <Icon type='delete' />
            </a>
          </Popconfirm >
        </div>
      );
    },
    title: "操作",
  },
  )

  /**
   * 构造方法
   */
  constructor(props: IRegionTableProps) {

    super(props)

    this.uiAction = new RegionTableUiAction(props);

    this.setRowClassName = this.setRowClassName.bind(this);

    this.getRowKey = this.getRowKey.bind(this);

  }

  public render() {
    const data=[...this.props.GlobalRegionStore!.RegionList.slice()]
    deleteChildren(data)
    function deleteChildren(list:any){
      list.map((element:any)=>{
          if(element.children && element.children.length===0){
              delete element.children
          }
          if(element.children && element.children.length!==0){
              deleteChildren(element.children)
          }
      })
  }
    return (
      <RegionTable
        bordered={true}
        columns={this.columns}
        dataSource={data.slice()}
        loading={
          {
            spinning: this.props.GlobalRegionStore!.IsLoading,
            tip: "正在加载中..."
          }
        }
        locale = {{
          emptyText:this.props.GlobalRegionStore!.IsLoading?[]:undefined
        }}
        rowClassName={this.setRowClassName}
        rowKey={this.getRowKey}
        pagination={false}
        scroll={{ y: 400 }}
        className="ori-table ori-table-scroll"/>
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
  /**
   * 根据自增id设置表格每一行的key
   */
  private getRowKey(record: Region, index: number): string {
    return record.RegionId;
  }

}