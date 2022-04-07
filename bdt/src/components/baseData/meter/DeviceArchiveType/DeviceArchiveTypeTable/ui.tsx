import { Button, message, Table, TreeSelect } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr } from "orid";
import React from "react";
import { DeviceArchiveType } from "../entity";
import { IDeviceArchiveTypeTableViewProps } from "./interface";
import { DeviceArchiveTypeUIAction } from "./uiAction";


class DeviceArchiveTypeTable extends Table<DeviceArchiveType>{ };

@inject('GlobalDeviceArchiveTypeStore')
@observer
export class DeviceArchiveTypeTableView extends React.Component<IDeviceArchiveTypeTableViewProps>{

    private columns: Array<ColumnProps<DeviceArchiveType>> = Array<ColumnProps<DeviceArchiveType>>(
        {
            dataIndex: "ArchiveTypeId",
            key: "ArchiveTypeId",
            title: "编码",
            defaultSortOrder: "ascend",
            width: 700
        },
        {
            dataIndex: "ArchiveTypeAlias",
            key: "ArchiveTypeAlias",
            title: "档案类别名称",
            // width: '40%'
        },
    );

    private uiAciton: DeviceArchiveTypeUIAction;

    constructor(props: IDeviceArchiveTypeTableViewProps) {
        super(props);
        this.uiAciton = new DeviceArchiveTypeUIAction(this.props);
    }
    public componentWillMount(){
        message.destroy()
        this.props.GlobalDeviceArchiveTypeStore!.getCompanyName()
    }


    public render() {
        return (
            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px"  }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization ?
                        OridStores.authStore.currentOperator.OrganizationCodes.length !== 0 ?
                            <>
                                <TreeSelect dropdownStyle={{width:'280px',maxHeight:'300px',zIndex:0}} treeDefaultExpandAll={true} value={this.props.GlobalDeviceArchiveTypeStore!.InfoName} style={{ width: '280px' }} onChange={this.uiAciton.selectedContent}>
                                    {this.renderTreeNode(this.props.GlobalDeviceArchiveTypeStore!.CompanyNameData)}
                                </TreeSelect>
                                <Button icon="search" shape="circle" style={{ marginLeft: '8px' }} onClick={this.onSearchData} />
                            </>
                            : ''
                        : ''}
                </VerThr.top>
                <VerThr.middle>
                    <DeviceArchiveTypeTable
                        bordered={true}
                        columns={this.columns}
                        dataSource={this.props.GlobalDeviceArchiveTypeStore!.list.slice()}
                        pagination={false}
                        loading={
                            {
                                spinning: this.props.GlobalDeviceArchiveTypeStore!.isLoading,
                                tip: "正在加载中..."
                            }
                        }
                        locale = {{
                            emptyText:this.props.GlobalDeviceArchiveTypeStore!.isLoading?[]:undefined
                        }}
                        rowKey={this.getRowIndex}
                        scroll={{ y: 400 }}
                        className="ori-table ori-table-scroll"
                       // locale={{ emptyText: '暂无数据' }}

                    />
                </VerThr.middle>

            </VerThr>
        )
    }
    private onSearchData = () => {
        this.props.GlobalDeviceArchiveTypeStore!.CompanyName=this.props.GlobalDeviceArchiveTypeStore!.Name
        this.props.GlobalDeviceArchiveTypeStore!.loadData()
    }
    private renderTreeNode = (tableData: any[]): any => tableData.map(item => {
        if (item.Children && item.Children.length !== 0) {
            return (
                <TreeSelect.TreeNode key={item.OrganitionCode} value={item.OrganitionCode} title={item.OrganizationName}>
                    {this.renderTreeNode(item.Children)}
                </TreeSelect.TreeNode>);
        }
        return <TreeSelect.TreeNode key={item.OrganitionCode} value={item.OrganitionCode} title={item.OrganizationName} />;
    })

    /**
     * 获取当前行下标
     * @param record 实体类
     * @param index 下标
     */
    private getRowIndex(record: DeviceArchiveType, index: number): string {
        return index.toString();
    }

}