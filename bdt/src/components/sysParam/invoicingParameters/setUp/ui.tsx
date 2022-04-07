import { Button, Form, Icon, Input, message, Modal, Table, Tree } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { inject, observer } from "mobx-react";
import { FlexAlign, Nodata } from "orid";
import React from 'react';
import { InvoiceingParametersdoMainStore } from "../doMainStore";
import { FieldNameList, SourceInvoiceingParameters, SourceList } from "../entity";
import { SourceSelectView } from "../SourceSelect/ui";
import './index.scss';
import { ISetupProps } from "./interface";
import { SetupViewUiAction } from "./uiAction";
import Select, { SelectValue } from "antd/lib/select";

@inject("InvoicingParametersdoMainStore")
@observer
export class SetupView extends React.Component<ISetupProps>{

    private uiAction: SetupViewUiAction;

    private columns: any = [
        {
            key: "Action",
            render: (text: any, record: SourceInvoiceingParameters, index: number) => {
                return (
                    <div style={{ display: "inline-block" }}>
                        <a
                            href={'javascript:;'}
                            id={`delete_${record.ReMarkId}`}
                            title="删除"
                        >
                            <Icon type='delete' onClick={this.uiAction.deleteClickhandle.bind(this, record.ReMarkId)} />
                        </a>
                    </div>
                );
            },
            title: "操作",
            width: '20%'
        },
        {
            dataIndex: "RemarkField",
            key: "RemarkField",
            title: "可选字段",
            width: "20%",
            editable: true,
        },
        {
            dataIndex: "DefineRemark",
            key: "DefineRemark",
            title: "打印显示名称",
            width: "20%",
            editable: true,
        },
        {
            dataIndex: "SortNo",
            key: "SortNo",
            title: "打印顺序",
            width: "20%",
            editable: true,
        },
    ]

    constructor(props: ISetupProps) {
        super(props);
        this.uiAction = new SetupViewUiAction(props);
    }

    public handleOk = () => {
        const source = this.props.InvoicingParametersdoMainStore!.list.filter((item) => item.IsDelete !== '1')
        let sortOk: boolean = true;
        let ok: boolean = true;
        source.map((model: SourceInvoiceingParameters) => {
            if (model.RemarkFieldId < 1) {
                ok = false;
            }
            if (model.SortNo < 1) {
                sortOk = false;
            }
            if (model.DefineRemark && model.DefineRemark.length < 1) {
                this.props.InvoicingParametersdoMainStore!.SourceList.map((Imodel: SourceList) => {
                    if (model.RemarkFieldId === Imodel.FieldId) {
                        model.DefineRemark = Imodel.FieldCnName;
                    }
                });
            }
            model.InvoiceKindId = this.props.InvoicingParametersdoMainStore!.currentSelectInvoice;
        });
        if (ok && sortOk) {
            this.props.handleok();
        } else {
            sortOk ?
                message.info('可选字段不能为空') :
                message.info('打印顺序不能小于1')
        }

    }

    public render() {
        const components = {
            body: {
                cell: EditableCell,
                row: EditableFormRow,
            },
        };
        const columns = this.columns.map((col: { editable: any; dataIndex: any; title: any; }) => {

            if (!col.editable) {
                return { ...col };
            }
            return {
                ...col,
                onCell: (record: any, rowindex: number) => {
                    return {
                        dataIndex: col.dataIndex,
                        editable: col.editable,
                        // handleSave: this.uiAction.handleSave,
                        index: rowindex,
                        invoiceingparameterslist: this.props.InvoicingParametersdoMainStore!.list,
                        record,
                        title: col.title,
                    }
                },
            };
        });
        return (
            <Modal
                width="800px"
                title="设置增值税票据的备注字段"
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                footer={<div style={{ textAlign: 'right' }} >
                    <Button onClick={this.props.handleCancel} >关闭</Button>
                </div>}
            >
                <FlexAlign style={{ width: '100%' }}>
                    <div style={{ width: '25%', borderRight: '1px solid #e9e9e9', marginRight: 16, height: 206 }} >
                        <div style={{ marginBottom: 8, height: 32, display: 'flex', alignItems: 'center', fontSize: 15 }} >可设置的票据类型</div>
                        <Tree
                            onSelect={this.uiAction.onTreeSelect}
                            selectedKeys={[this.props.InvoicingParametersdoMainStore!.currentSelectInvoice]}
                        >
                            {this.props.InvoicingParametersdoMainStore!.InvoiceKindList.map((item, index) =>
                                <Tree.TreeNode key={item.InvoiceKindId} title={item.InvoiceKindName}>
                                    {item.InvoiceKindName}
                                </Tree.TreeNode>
                            )}
                        </Tree>

                    </div>
                    <div style={{ width: '75%' }} >
                        <div style={{ display: 'flex' }} >
                            <Button type='primary' onClick={this.uiAction.AddClickhandle} style={{ marginBottom: 8 }} >添加</Button>
                            <Button type='primary' onClick={this.handleOk} style={{ marginBottom: 8, marginLeft: 8 }} >保存</Button>

                        </div>
                        <Table
                            rowKey={(record: SourceInvoiceingParameters, index: number) => String(record.ReMarkId)}
                            columns={columns}
                            components={components}
                            loading={{
                                spinning: this.props.InvoicingParametersdoMainStore!.isLoading,
                                tip: '加载中...'
                            }}
                            locale={{
                                emptyText: <Nodata />
                            }}
                            scroll={{ x: true, y: true }}
                            className='ori-table SetupViewTable'
                            dataSource={this.props.InvoicingParametersdoMainStore!.list.filter((list) => list.IsDelete === '0')}
                            pagination={false}
                        />
                    </div>
                </FlexAlign>

            </Modal>
        )
    }
}
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
    record: any,
    index: number,
    handleSave: (value: any) => void,
    SourceSelectViewList: SourceList[],
    FieldNameSelectViewList: FieldNameList[],
    InvoicingParametersdoMainStore: InvoiceingParametersdoMainStore;
}
interface IEditableCellState {
    editing: boolean;
}
@inject("InvoicingParametersdoMainStore")
@observer
class EditableCell extends React.Component<IEditableCellProps, IEditableCellState> {

    private input: Input;

    private select: Select<SelectValue>;

    constructor(props: IEditableCellProps) {
        super(props);
        this.renderCell = this.renderCell.bind(this);
        this.save = this.save.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
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
            InvoicingParametersdoMainStore,
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
            if (editing && !!this.input && this.input.focus) {
                this.input.focus();
            }
            if (editing && !!this.select && this.select.focus) {
                this.select.focus();
            }
        });
    };

    public handleData = (e: any, index: any) => {
        this.props.InvoicingParametersdoMainStore.SourceList.map((model: SourceList) => {
            if (model.FieldId === e) {
                this.props.InvoicingParametersdoMainStore.list[index].RemarkFieldId = model.FieldId;
                this.props.InvoicingParametersdoMainStore.list[index].RemarkField = model.FieldCnName;
                this.props.InvoicingParametersdoMainStore.list[index].DefineRemark = model.FieldCnName;
            }
            return 0;
        });
    }

    public save(e: any) {
        const { dataIndex, record } = this.props;

        this.props.InvoicingParametersdoMainStore.list.map((model: SourceInvoiceingParameters, index: number) => {
            if (model.ReMarkId === record.ReMarkId) {

                dataIndex === "DefineRemark" ? this.props.InvoicingParametersdoMainStore.list[index].DefineRemark = String(e.target.value) :
                    dataIndex === "RemarkField" ? this.handleData(e, index) :
                        dataIndex === "SortNo" ? this.props.InvoicingParametersdoMainStore.list[index].SortNo = Number(e.target.value) : console.log(" ")

            }
        });
    };


    public onhandleChange = (e: any) => {
        if (String(e.target.value) === "") {
            message.info('打印顺序不能为空')
        } else if (isNaN(e.target.value)) {
            message.info('只能输入数字')
        }
        else {
            this.save(e)
        }
    }

    public renderCell(form: WrappedFormUtils) {
        const { dataIndex, record } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }} >
                {form.getFieldDecorator(dataIndex, {
                    initialValue: record[dataIndex],
                })(
                    dataIndex === "RemarkField" ? <SourceSelectView SourceList={this.props.InvoicingParametersdoMainStore!.SourceList} rebindRef={(e)=> this.select = e!} handlestyle={{ width: "60px" }} onChange={this.save} onBlur={this.toggleEdit} /> :
                        dataIndex === "DefineRemark" ? <Input ref={node => (this.input = node!)} onChange={this.save} onPressEnter={this.toggleEdit} onBlur={this.toggleEdit} defaultValue={record[dataIndex]} /> :
                            dataIndex === "SortNo" ? <Input ref={node => (this.input = node!)} onChange={this.save} onPressEnter={this.toggleEdit} onBlur={this.toggleEdit} defaultValue={record[dataIndex]} /> : <></>
                )
                }
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {record[dataIndex]}
            </div>
        );


    };
}