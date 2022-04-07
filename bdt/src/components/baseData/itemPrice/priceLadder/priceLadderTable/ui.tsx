import { Form, Input, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { LadderInfoSelector } from '../../../../common/selector/certTypeSelector';
import { PriceLadderEntity } from '../entity';
// import { EditComponentInput, EditComponentSelect } from './EditComponent';
import "./index.scss";
import { IPriceLadderTableProps } from './interface';
import { SuperPlanPriceTableUiAction as PriceLadderTableUiAction } from './uiAction';


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
    record: PriceLadderEntity,
    index: number,
    handleSave: (value: PriceLadderEntity) => void,
    componentType: string;
}
interface IEditableCellState {
    editing: boolean;
}


class EditableCell extends React.Component<IEditableCellProps, IEditableCellState> {

    private form: any

    private compoent: any;


    constructor(props: IEditableCellProps) {
        super(props);
        this.form = this.props.form;
        this.renderCell = this.renderCell.bind(this);
        this.save = this.save.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.getRef = this.getRef.bind(this);
        this.selectSave = this.selectSave.bind(this);
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
                this.compoent.focus();
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
            console.log(e.currentTarget)
            handleSave({ ...record, ...values });
        });
    };

    public selectSave() {
        const { record, handleSave } = this.props;
        this.form.validateFieldsAndScroll((error: any, values: any) => {
            if (error) {
                console.log('error:', error)
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    public renderCell(form: any) {
        this.form = form;
        const { dataIndex, componentType, title, record } = this.props;
        console.log("r-dataIndex",dataIndex,componentType)
        return <Form.Item style={{ margin: 0 }} >
            {
                form.getFieldDecorator(dataIndex, {
                    initialValue: record[dataIndex],
                })(
                    componentType === "MinQuantity" ?
                        <Select
                            ref={this.getRef}
                            onBlur={this.selectSave}
                            style={{ width: "100%", height: "100%" }} placeholder={"请选择" + title}
                        >
                            <Select.Option key={1} value={"0"}>0</Select.Option>
                            <Select.Option key={2} value={"first"}>一阶水量</Select.Option>
                            <Select.Option key={3} value={"second"}>二阶水量</Select.Option>
                        </Select>
                        : componentType ==="MaxQuantity" ?
                            <Select
                                ref={this.getRef}
                                onBlur={this.selectSave}
                                style={{ width: "100%", height: "100%" }} placeholder={"请选择" + title}
                            >
                                <Select.Option key={1} value={"first"}>一阶水量</Select.Option>
                                <Select.Option key={2} value={"second"}>二阶水量</Select.Option>
                                <Select.Option key={3} value={"third"}>三阶水量</Select.Option>
                            </Select>
                            : componentType ==="Price" ?
                                <Input
                                    ref={this.getRef}
                                    onPressEnter={this.save}
                                    onBlur={this.save}
                                    style={{ width: "100%" }}
                                /> :
                                <></>
                )}
        </Form.Item>
    };

    private getRef(node: any) {
        this.compoent = node
    }

}
/**
 * 阶梯表格组件
 */
@inject("GlobalLadderPriceUiStore")
@observer
export class PriceLadderTable extends React.Component<IPriceLadderTableProps>{
    private uiAction: PriceLadderTableUiAction;

    private columns: any[] = [
        {
            key: "WaterFeeItemName",
            dataIndex: "WaterFeeItemName",
            title: "水费项目名称",
            editable: false,
            width: "250px"
        },
        {
            key: "LadderLevel",
            dataIndex: "LadderLevel",
            title: "阶梯级别",
            editable: false,
            width: "250px",
            className: "bdt-ladder-grid",
            render: (text: any, record: any, index: number) => this.loopComponent(text, record, index)
        },
        {
            key: "MinQuantity",
            dataIndex: "MinQuantity",
            title: "阶梯下限",
            editable: true,
            width: "250px"
        },
        {
            key: "MaxQuantity",
            dataIndex: "MaxQuantity",
            title: "阶梯上限",
            editable: true,
            width: "250px"
        },
        {
            key: "Price",
            dataIndex: "Price",
            title: "价格",
            editable: true,
            // width: "250px"
        }]

    constructor(props: IPriceLadderTableProps) {
        super(props);
        this.getRowKey = this.getRowKey.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getRowClassName = this.getRowClassName.bind(this);
        this.uiAction = new PriceLadderTableUiAction(props, this);
    }


    public render() {
        console.log("PriceLadderTable__render")
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record: PriceLadderEntity) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    componentType: col.dataIndex,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <Table<PriceLadderEntity>
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
                loading={
                    {
                        spinning: this.props.GlobalLadderPriceUiStore!.Loading,
                        tip: "正在加载中..."
                    }
                }
                locale={{
                    emptyText: this.props.GlobalLadderPriceUiStore!.Loading ? [] : undefined
                }}
                dataSource={
                    this.props.GlobalLadderPriceUiStore!.List.slice()}
                columns={columns}
                scroll={{ x: true, y: true }}
                style={{ minHeight: 200 }}
                pagination={false}
                className="ori-table ori-table-fixed-col ori-table-fixed   ori-table-scroll"
            />
        )
    }
    private loopComponent = (text: any, record: any, index: number): JSX.Element => {
        return <LadderInfoSelector
            key={index}
            list={this.props.GlobalLadderPriceUiStore!.ladderInfoArray}
            className="bdt-ladder-select"
            defaultValue={text}
            value={record.LadderLevel}
            onChange={this.uiAction.handleOnChange.bind(undefined, record)}
            placeholder="请选择阶梯级别"
        />
    }
    private getRowKey(record: PriceLadderEntity, index: number): string {
        return record.WaterFeeItemId.toString();
    }

    private getRowClassName(record: PriceLadderEntity, index: number): string {
        return "editable-row"
    }


    private handleSave(model: PriceLadderEntity) {

        console.log("handleSabe", toJS(model))


        const ladder = this.props.GlobalLadderPriceUiStore!.List.find((entity) => {
            return entity.WaterFeeItemId === model.WaterFeeItemId;
        });
        ladder!.MinQuantity = model.MinQuantity;
        ladder!.MaxQuantity = model.MaxQuantity;
        ladder!.Price = Number(model.Price);

    }

}


