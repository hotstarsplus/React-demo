import { Icon, Modal, Table, } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { LadderCycleEntity } from '../../entity';
import LadderTypeForm from '../ladderTypeForm';
import { ICycleTableProps } from './interface';
import { CycleTableUiAction } from './uiAction';

class CycleTableView extends Table<LadderCycleEntity>{ }

@inject("GlobalLadderPriceUiStore")
@observer
export class CycleTable extends React.Component<ICycleTableProps>{


    private uiAction: CycleTableUiAction

    private copyplancolumns: Array<ColumnProps<LadderCycleEntity>> = Array<ColumnProps<LadderCycleEntity>>(
        {
            key: "CustomerNo",
            render: (text: any, record: LadderCycleEntity, index: number) => {
                return (
                    <div>
                        <a
                            onClick={this.uiAction.RowEdit.bind(undefined, record)}
                            id={record.WaterKindName}
                            title={"编辑"}
                        >
                            <Icon type="edit" style={{ color: '#1890ff' }} />
                        </a>
                    </div>
                )
            },
            title: "操作",
            width: "250px",
        },
        {
            dataIndex: 'WaterKindName',
            key: 'WaterKindName',
            width: 250,
            title: '用水性质名称',
        },
        {
            dataIndex: 'LadderType',
            key: 'LadderType',
            width: 250,
            title: '阶梯类型名称',
        },
        {
            dataIndex: 'Proportion',
            key: 'Proportion',
            // width: 60,
            title: '比例',
        }
    )


    constructor(props: ICycleTableProps) {
        super(props);
        this.uiAction = new CycleTableUiAction(props);
    }

    public render() {
        return (
            <>
                <CycleTableView
                    bordered={true}
                    columns={this.copyplancolumns}
                    dataSource={this.props.GlobalLadderPriceUiStore!.CycleList.slice()}
                    className="ori-table ori-table-scroll"
                    loading={
                        {
                            spinning: this.props.GlobalLadderPriceUiStore!.Loading,
                            tip: "正在加载中..."
                        }
                    }
                    locale={{
                        emptyText: this.props.GlobalLadderPriceUiStore!.Loading ? [] : undefined
                    }}
                    pagination={false}
                    scroll={{ x: true, y: true }}
                    style={{ minHeight: 200 }}
                />
                {this.props.GlobalLadderPriceUiStore!.ladderTypeModalVisible ?
                    <Modal
                        visible={this.props.GlobalLadderPriceUiStore!.ladderTypeModalVisible}
                        title={this.props.GlobalLadderPriceUiStore!.modelType}
                        okText="确定"
                        cancelText="取消"
                        onOk={this.uiAction.OkHandler}
                        onCancel={this.uiAction.CancelHandler}
                    >
                        <LadderTypeForm getUiAction={this.uiAction.getFormUiAction} />
                    </Modal> : null}

            </>


        )
    }

}

