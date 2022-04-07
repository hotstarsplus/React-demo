import { Divider, Icon, Popconfirm, Table, } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from 'react';
import { ProductItem } from '../entity';
import { IProductItemTableViewProps } from './interface';
import { ProductItemTableViewUiAction } from './uiAction';

class ProductItemTable extends Table<ProductItem>{ };
/**
 * 水费项目类型列表表格视图 
 */
@inject('GlobalProductItemStore')
@observer
export class ProductItemTableView extends React.Component<IProductItemTableViewProps> {
    /**
     * 表格列
     */
    private columns: Array<ColumnProps<ProductItem>> = Array<ColumnProps<ProductItem>>(

        {
            dataIndex: 'ProductItemId',
            key: 'ProductItemId',
            title: '项目编码',
            width: 450
        },
        {
            dataIndex: 'ProductItemName',
            key: 'ProductItemName',
            title: '项目名称',
            width: 450
        },
        {
            key: 'action',
            render: (text: any, record: ProductItem, index: number) => {
                return (

                    <div style={{ display: "inline-block" }}>
                        <span
                            onClick={this.uiAction.editClick.bind(this, record.ProductItemId)}
                            title="编辑"
                        >
                            <Icon type="edit" style={{ color: '#1890ff' }} />
                        </span>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="确定要删除吗?"
                            onConfirm={this.uiAction.deleteClick.bind(this, record.ProductItemId)}
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
                );
            },
            title: '操作',
            // width:"20%"
        },
    );

    private uiAction: ProductItemTableViewUiAction;

    constructor(props: IProductItemTableViewProps) {
        super(props);
        this.uiAction = new ProductItemTableViewUiAction(this.props);
        this.setRowClassName = this.setRowClassName.bind(this);
    }

    public render() {
        const { GlobalProductItemStore } = this.props
        return (
            <ProductItemTable
                bordered={true}
                columns={this.columns}
                dataSource={GlobalProductItemStore!.list.slice()}
                loading={
                    {
                        spinning: GlobalProductItemStore!.isLoading,
                        tip: "正在加载中..."
                    }
                }
                locale={{
                    emptyText: GlobalProductItemStore!.isLoading ? [] : undefined
                }}
                rowKey={this.getRowKey}
                scroll={{ x:1350,y: 100 }}
                className={"ori-table ori-table-scroll"}
                pagination={false}
            />
        );
    }

    private getRowKey(record: ProductItem, index: number): string {
        return index.toString();
    }

    private setRowClassName(record: any, index: number): string {
        return "tr-class";
    }

}

