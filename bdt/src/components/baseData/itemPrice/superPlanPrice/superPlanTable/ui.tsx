import { Form, Icon, Input, Popconfirm, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { SuperPlanPrice } from '../entity';
import "./index.scss";
import { ISuperPlanPriceTableProps } from './interface';
import { SuperPlanPriceTableUiAction } from './uiAction';


const EditableContext = React.createContext({});


const EditableRow = ({ form, index, ...props }: any) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

interface IEditableCellProps extends FormComponentProps {
    editable: boolean,
    dataIndex: string,
    title: string,
    record: SuperPlanPrice,
    index: number,
    handleSave: (value: SuperPlanPrice) => void,
}
interface IEditableCellState {
    editing: boolean;
}


class EditableCell extends React.Component<IEditableCellProps, IEditableCellState> {

    private form: any

    private input: Input;

    constructor(props: IEditableCellProps) {
        super(props);
        this.form = this.props.form;
        this.renderCell = this.renderCell.bind(this);
        this.save = this.save.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.inputValidator = this.inputValidator.bind(this);
        this.state = {
            editing: false
        }
    }



    public render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }

    public toggleEdit() {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    public save(e: any) {
        const { record, handleSave } = this.props;
        this.form.validateFields((error: any, values: any) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    public renderCell(form: any) {
        this.form = form;
        const { children, dataIndex, record } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }} >
                {
                    form.getFieldDecorator(dataIndex, {
                        rules: [
                            {
                                required: true,
                                validator: this.inputValidator
                            }
                        ],
                        initialValue: record[dataIndex],
                    })(<Input
                        ref={node => (this.input = node!)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                        style={{ width: "100%" }}
                    />)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ width: "100%" }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };


    private inputValidator(rule: any, value: any, callback: any, source?: any, options?: any): any {
        if (rule.field !== "MaxQuantityPercent") {
            if (value.toString().trim().length === 0) {
                callback("值不能为空");
                return;
            }
            if (Number(value) < 0) {
                callback("输入值需要是大于0的数字");
                return;
            }
        }
 
        if (isNaN(Number(value))) {
            callback("请输入正确的数值");
            return;
        }
        if (value.toString().trim().length > 15) {
            callback("长度不能大于15位");
            return;
        }

        callback();
    }

}
@inject("GlobalSuperPlanPriceUiStore")
@observer
export class SuperPlanPriceTable extends React.Component<ISuperPlanPriceTableProps>{

    private uiAction: SuperPlanPriceTableUiAction;

    private columns = [
        {
            key: "action",
            render: (text: any, record: SuperPlanPrice, index: number) => {
                return (
                    <div>
                        <Popconfirm
                            title={"确定删除?"}
                            visible={record.AutoId === this.uiAction.SelectedId}
                            onCancel={this.uiAction.OnCancel}
                            onConfirm={this.uiAction.Delete.bind(undefined, record.AutoId)}
                            okText={"确定"}
                            cancelText={"取消"}
                        >
                            <a
                                onClick={this.uiAction.DeleteOnClick}
                                id={record.AutoId.toString()}
                            >
                                <Icon type="delete" style={{ color: '#1890ff' }} />
                            </a>
                        </Popconfirm>
                    </div>
                )
            },
            title: "操作",
            editable: false,
            width: 200
        },
        {
            key: "WaterKindName",
            dataIndex: "WaterKindName",
            title: "用水性质",
            editable: false,
            width: 250
        },
        {
            key: "MinQuantityPercent",
            dataIndex: "MinQuantityPercent",
            title: "水量比例下限",
            editable: true,
            width: 250
        },
        {
            key: "MaxQuantityPercent",
            dataIndex: "MaxQuantityPercent",
            title: "水量比例上限",
            editable: true,
            width: 250
        },
        {
            key: "Price",
            dataIndex: "Price",
            title: "价格",
            editable: true,
            // width:"20%"
        }]

    constructor(props: ISuperPlanPriceTableProps) {
        super(props);
        this.getRowKey = this.getRowKey.bind(this);
        this.getRowClassName = this.getRowClassName.bind(this);
        this.uiAction = new SuperPlanPriceTableUiAction(props);
    }


    public render() {

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record: any) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.uiAction.handleSave,
                }),
            };
        });
        return (
            <Table<SuperPlanPrice>
                bordered={true}
                rowKey={this.getRowKey}
                components={{
                    body: {
                        row: EditableFormRow,
                        cell: EditableCell,
                    }
                }
                }
                rowClassName={this.getRowClassName}
                dataSource={
                    this.props.GlobalSuperPlanPriceUiStore!.List.filter((model => {
                        return model.IsDelete === '0'
                    })).slice()}
                columns={columns}
                loading={
                    {
                        spinning: this.props.GlobalSuperPlanPriceUiStore!.Loading,
                        tip: "正在加载中..."
                    }
                }
                locale={{
                    emptyText: this.props.GlobalSuperPlanPriceUiStore!.Loading ? [] : undefined
                }}
                scroll={{ y: 100 }}
                pagination={false}
                className="ori-table ori-table-scroll"
            />
        )
    }



    private getRowKey(record: SuperPlanPrice, index: number): string {
        return record.AutoId.toString();
    }

    private getRowClassName(record: SuperPlanPrice, index: number): string {
        return "editable-row"
    }

}


