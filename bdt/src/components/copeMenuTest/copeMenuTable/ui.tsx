import { Divider, Icon, Popconfirm, Table } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { CopeMenu } from "../entity";
import { UserTableUiAction } from "./uiAction";


class UserTable extends Table<CopeMenu>{ };


/**
 * 表格视图
 */
@inject("GlobalUserUiStore")
@observer
export
class CopeMenuTabView extends React.Component<any, any>{

    private uiAction: UserTableUiAction;

    private _columns = [
        {
            key: "UserName",
            dataIndex: "UserName",
            title: "用户名",
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
            },
            render: (text:string) => <span title={text}>{text}</span>
        },
        {
            key: "Subord",
            dataIndex: "Subord",
            title: "隶属",
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
            },
            render: (text:string) => <span title={text}>{text}</span>
        },
        {
            key: "UserSex",
            dataIndex: "UserSex",
            title: "性别",
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
            },
            render: (text:string) => <span title={text}>{text}</span>
        },
        {
            key: "UserAddress",
            dataIndex: "UserAddress",
            title: "地址",
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
            },
            render: (text:string) => <span title={text}>{text}</span>
        },
        {
            key: "UserState",
            dataIndex: "UserState",
            title: "状态",
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
            },
            render: (text:string) => <span title={text}>{text}</span>
        },
        {
            key: "PhoneNumber",
            dataIndex: "PhoneNumber",
            title: "联系方式",
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
            },
            render: (text:string) => <span title={text}>{text}</span>
        },
        {
            key: "action",
            render: (text: any, record: CopeMenu, index: number) => {
              return (
                <div style={{ display: "inline-block" }}>
                  <div>
                    <a
                      href={'javascript:;'}
                      onClick={this.uiAction.editClick.bind(undefined,record)}
                    //   id={`edit_${record.key}`}
                      title="编辑"
                    >
                      <Icon type="edit" style={{ color: '#1890ff' }} />
                    </a>
                    <Divider type="vertical" />
                    <Popconfirm placement="top" title={"确定要删除吗？"} 
                    // onConfirm={this.uiAction.deleteClick.bind(undefined, record)}
                    okText="确定" 
                    cancelText="取消">
                      <a
                        href={'javascript:;'}
                        // onClick = {this.uiAction.deleteClick}
                        // id={`delete_${record.key}`}
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
    ]

    /**
     * 假数据
     */
    private _dataSource:CopeMenu[]=[
        {
            AutoId:0,
            UserId:"0000000",
            FatherId:"0",
            UserName:"张三",
            UserSex:"男",
            UserState:"在用",
            UserAddress:"翻斗大街",
            PhoneNumber:"18765251245",

        },
        {
            AutoId:1,
            UserId:"0000001",
            FatherId:"0",
            UserName:"李四",
            UserSex:"男",
            UserState:"在用",
            UserAddress:"翻斗大街",
            PhoneNumber:"15654842548",

        },
        {
            AutoId:2,
            UserId:"0000002",
            FatherId:"0",
            UserName:"季思深",
            UserSex:"男",
            UserState:"在用",
            UserAddress:"崇明阳路8825号",
            PhoneNumber:"17896352569",

        },
    ]

    constructor(props:any){
        super(props);

        this.uiAction = new UserTableUiAction(props);
    }

    public render() {
        return (
            <>
                <UserTable
                bordered={true}
                columns={this._columns}
                dataSource={this._dataSource}
                // dataSource={this.props.GlobalPayBankStore!.PayBankTypeUiList.slice()}
                // loading={
                //   {
                //     spinning: this.props.GlobalPayBankStore!.Loading,
                //     tip: "正在加载中..."
                //   }
                // }
                // locale={{
                //   emptyText: this.props.GlobalPayBankStore!.Loading ? [] : undefined
                // }}
                // rowClassName={this.setRowClassName}
                // rowKey={this.getRowKey}
                pagination={false}
                scroll={{ y: 400 }}
                className="ori-table ori-table-scroll"
                />
            </>
        );
    }
}