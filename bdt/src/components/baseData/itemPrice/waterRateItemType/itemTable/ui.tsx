import { Icon, Table, } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WaterRateItemType } from '../entity';
import { IWaterRateItemTypeTableViewProps } from './interface';
import { WaterRateItemTypeTableViewUiAction } from './uiAction';

class WaterRateItemTypeTable extends Table<WaterRateItemType>{ };
/**
 * 水费项目类型列表表格视图 
 */
@inject('GlobalWaterRateItemTypeStore')
@observer
export class WaterRateItemTypeTableView extends React.Component<IWaterRateItemTypeTableViewProps> {
    /**
     * 表格列
     */
    private columns: Array<ColumnProps<WaterRateItemType>> = Array<ColumnProps<WaterRateItemType>>(
        {
            key: 'action',
            render: (text: any, record: WaterRateItemType, index: number) => {
                return (
                    <div className="div-hide">
                        <a
                            href={'javascript:;'}
                            id={`edit_${record.ItemTypeId}`}
                            onClick={this.uiAction.editClick}
                            title="编辑"
                        >
                            <Icon type='edit' title="编辑" />
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a
                            href={'javascript:;'}
                            id={`delete_${record.ItemTypeId}`}
                            onClick={this.uiAction.deleteClick}
                            title="删除"
                        >
                            <Icon type='delete' title="删除" />
                        </a>
                    </div>
                );
            },
            width:"80px"
        },
        {
            dataIndex: 'ItemTypeId',
            key: 'ItemTypeId',
            title: '项目类型代码',
        },
        {
            dataIndex: 'ItemTypeName',
            key: 'ItemTypeName',
            title: '项目类型名称',
        }
    );

    private uiAction: WaterRateItemTypeTableViewUiAction;

    constructor(props: IWaterRateItemTypeTableViewProps) {
        super(props);
        this.uiAction = new WaterRateItemTypeTableViewUiAction(this.props);
        this.setRowClassName = this.setRowClassName.bind(this);
    }

    public componentDidMount() {
        this.uiAction.loadData();
    }

    public render() {
        console.log("render WaterRateItemTypeTableView");
        const { GlobalWaterRateItemTypeStore } = this.props
        return (
            <WaterRateItemTypeTable
                columns={this.columns}
                dataSource={GlobalWaterRateItemTypeStore!.list.slice()}
                loading={GlobalWaterRateItemTypeStore!.isLoading}
                locale = {{
                    emptyText:GlobalWaterRateItemTypeStore!.isLoading?[]:undefined
                }}
                rowKey={this.getRowKey}
                rowClassName = {this.setRowClassName}
            />
        );
    }

    private getRowKey(record: WaterRateItemType, index: number): string {
        return index.toString();
    }

    private setRowClassName(record:any,index:number):string{
        return "tr-class";
    }

}

