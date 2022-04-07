import { Button, Col, DatePicker, Divider, Row, Select, Tooltip } from "antd";
import { RangePickerValue } from "antd/lib/date-picker/interface";
import { SelectValue } from "antd/lib/select";
import Table, { ColumnProps } from "antd/lib/table";
import { action } from "mobx";
import moment from "moment";
import { OridPagination } from "orid";
import React from "react";
import { ChargeHallDrawer } from "./ui";
import { IChargeHallDrawerUiAction, pageList } from "./uiAction";

/**
 * @author zyl 2020-12-01
 * @description 用户看板 组件库
 */
export class ChargeHallCommon {

    private uiAction: IChargeHallDrawerUiAction
    private cite: ChargeHallDrawer;
    constructor(uiAction: IChargeHallDrawerUiAction,cite: ChargeHallDrawer){
        this.uiAction = uiAction;
        this.cite = cite;
    }  
    
    @action.bound
    public StructureTable<T extends any>(
        props: {
            columns: Array<ColumnProps<T>>,
            dataSource: any[],
            loading?: boolean,
            rowKey?:string,
            className?: string,
            pagination?: {
                bottom: boolean,
                pageSize: number,
                pageCount: number,
                pageIndex: number,
                onChange: (page: number, pageSize?: number) => void;
                onShowSizeChange: (startIndex: number, size: number) => void;
            },
            onRowClick?: (record: any) => any;
        }
    ):JSX.Element{
        return (
            <React.Fragment>
                <Table<T>
                    columns={props.columns}
                    dataSource={props.dataSource}
                    loading={props.loading}
                    pagination={false}
                    rowKey={props.rowKey || "AutoId"}
                    scroll={{y: props.pagination && props.pagination.bottom ? 700 : 400 || 400}}        
                    style={{minHeight: "250px"}}
                    className={props.className || "" +"ori-table ori-table-fixed"}
                    onRow={
                        props.onRowClick ? 
                            (record) => ({ onClick: () => props.onRowClick!(record) })
                        : undefined
                    }
                />
                {
                    props.pagination ? 
                        <div style={{ textAlign:"right",paddingTop: "12px",position: props.pagination.bottom ? "absolute": "relative",bottom: "0px", right: "8px" }}>
                            <OridPagination 
                                getPageSize={()=>{""}}
                                menuId={"0000000"}  // 前端取消这个功能 仅存储在内存中
                                pageSize={props.pagination.pageSize}
                                pageCount={props.pagination.pageCount}
                                pageIndex={props.pagination.pageIndex}
                                onChange={props.pagination.onChange} 
                                onShowSizeChange={props.pagination.onShowSizeChange} 
                            />
                            <Divider style={{margin: "8px 0"}}/>
                        </div>
                    : ""
                }
            </React.Fragment>
        )
    }

    @action.bound
    public StructureSearch(
        props: {
            mode: Array<("账期年月" | "核销状态" | "交易日期" | "交易类型" | "拆换日期" | "修改日期" | "处理类型" | "变更日期" | "变更类型")>,
            type: pageList,
            child?: React.ReactNode[],
        }
    ): JSX.Element{
        // 查询变量池
        const searchCondition = this.uiAction.getProxy(props.type,"search");
        const m = [...props.mode,"查询","导出"];
        const t = this.cite;
        const p = this;
        const c = getRender();
        return c;

        // 考虑将这些action方法移至commonAction 暂未操作
        function handlePanelChange(value: RangePickerValue, modes?: string | string[]) {
            const data = value as [moment.Moment, moment.Moment];
            searchCondition["YearMonth"] = value;
            const formatVal = [];
            JSON.stringify(data).length !== 0 ? (
                formatVal[0] = data[0] ? moment(data[0]).format("YYYY-MM") : undefined,
                formatVal[1] = data[1] ? moment(data[1]).format("YYYY-MM") : undefined
            ) : (
                formatVal[0] = undefined, formatVal[1] = undefined
            );
            t.setState({});
        };
        function handleSelect(valueType: string): (value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>)=>void{
            return (value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => {
                searchCondition[valueType] = value;
                t.setState({});
            }
        };
        function handleSelectTime(valueType: string): (dates: RangePickerValue, dateStrings: [string, string]) => void {
            return (dates: RangePickerValue, dateStrings: [string, string]) => {
                searchCondition[valueType] = dates;
                t.setState({});
            }
        }
        function getArgument(model: string): object | undefined {
            switch(model){
                case "账期年月": return {onPanelChange: handlePanelChange,value: searchCondition["YearMonth"]}
                case "核销状态": return {onChange: handleSelect("FeeBillWriteOffStatus"),value: searchCondition["FeeBillWriteOffStatus"]}
                case "交易日期": return {onChange: handleSelectTime("DealTime"),value: searchCondition["DealTime"]}
                case "交易类型": return {onChange: handleSelect("DealType"),value: searchCondition["DealType"]}
                case "拆换日期": return {onChange: handleSelectTime("CanelTime"),value: searchCondition["CanelTime"]}
                case "修改日期": return {onChange: handleSelectTime("ChangeTime"),value: searchCondition["ChangeTime"]}
                case "处理类型": return {onChange: handleSelect("ProcessType"),value: searchCondition["ProcessType"]}
                case "变更日期": return {onChange: handleSelectTime("ChangeTime"),value: searchCondition["ChangeTime"]}
                case "变更类型": return {onChange: handleSelect("ChangeType"),value: searchCondition["ChangeType"]}
                case "查询": return {onClick: p.uiAction.handleSearch}
                case "导出": return {onClick: p.uiAction.exportExcel}
                default: return 
            }
        };
        function getRender() {
            return (
                <React.Fragment>
                    <Row style={{ marginBottom: "16px",width: "100%" }}>
                        {
                            m.map(( model ) => {
                                return p.SearchComponent({
                                    type: props.type
                                })[model](
                                    getArgument(model)
                                );
                            })
                        }{
                            props.child?props.child.map(( model,index ) => {
                                return <Col key={index + 50} span={4}>{model}</Col>
                            }):""
                        }
                    </Row>
                </React.Fragment>
            )
        }
    }

    @action.bound
    public SearchComponent(
        props: {
            type: pageList
        }
    ): object{
        const Component: object = new Object();
        const style = {
            "button": { width: "100%",margin: "0 0.2rem" },
            "default": { width: "100%",margin: "0 0.2rem" },
            "interval": { width: "100%",margin: "0 0.2rem" },
            "margin": { margin: "0 0.2rem" },
        }
        const dateTimeUnit = (
            prop: {
                onChange: (dates: RangePickerValue, dateStrings: [string, string]) => void,
                value: RangePickerValue,
                title: string
            }
        ) => (
            <Col key={props.type + prop.title} span={6} style={style.margin}>
                <Tooltip title={prop.title} style={{ height: '1rem' }} trigger='hover' key={props.type + prop.title} placement="top">
                    <div style={{ height:"100%" }}>
                        <DatePicker.RangePicker
                            style={style.interval}
                            allowClear={true}
                            placeholder={["请选择", "请选择"]}
                            mode={["day","day"]}
                            value={(()=> prop.value)()} // 异常时 测试数据使用 IIFE不消耗内存
                            format={"YYYY-MM-DD"}
                            onChange={prop.onChange}
                        />
                    </div>
                </Tooltip>
            </Col>
        )
        const selectedUnit = (
            prop: {
                onChange: (value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void,
                value: SelectValue,
                options: Array<{key: React.ReactText,value: React.ReactText}>
                title: string,
            }
        ) => (
            <Col key={props.type + prop.title} span={4} style={style.margin}>
                <Tooltip title={prop.title} style={{ height: '1rem' }} trigger='hover' key={props.type + prop.title} placement="top">
                    <Select
                        style={style.default}
                        dropdownStyle={{ maxHeight: '320px' }}
                        dropdownClassName="advanced-mini-scrollbar"
                        value={(()=> prop.value)()}
                        placeholder={prop.title}
                        allowClear={false}
                        onChange={prop.onChange}
                    >
                        {
                            prop.options.map(( model ) => {
                                return <Select.Option key={model.key} >{model.value}</Select.Option>
                            })
                        }
                    </Select>
                </Tooltip>
            </Col>
        );
        Component["账期年月"] = (
            prop: {
                onPanelChange: ((value?: RangePickerValue) => void) | undefined,
                value: RangePickerValue
            }
        ) => (
            <Col key={props.type + "YearMonth"} span={6} style={style.margin}>
                <Tooltip title={"账期年月"} style={{ height: '1rem' }} trigger='hover' key={props.type + "YearMonth"} placement="top">
                    <div style={{ height:"100%" }}>
                        <DatePicker.RangePicker
                            style={style.interval}
                            allowClear={true}
                            placeholder={["请选择", "请选择"]}
                            mode={["month","month"]}
                            value={(()=> prop.value)()} // 异常时 测试数据使用 IIFE不消耗内存
                            format={"YYYY-MM"}
                            onPanelChange={prop.onPanelChange}
                        />
                    </div>
                </Tooltip>
            </Col>
        );
        Component["核销状态"] = (
            prop: {
                onChange: (value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void,
                value: SelectValue
            }
        ) => (
            selectedUnit({
                onChange:prop.onChange,
                options:[{key: "0",value: "未核销"},{key: "1",value: "部分核销"},{key: "2",value: "全部核销"}],
                title:"核销状态",
                value:prop.value,
            })
        );
        Component["交易日期"] = (
            prop: {
                onChange: (dates: RangePickerValue, dateStrings: [string, string]) => void,
                value: RangePickerValue,
            }
        ) => (
            dateTimeUnit({
                onChange: prop.onChange,
                title: "交易日期",
                value: prop.value,
            })
        )
        Component["交易类型"] = (
            prop: {
                onChange: (value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void,
                value: SelectValue
            }
        ) => (
            selectedUnit({
                onChange:prop.onChange,
                options:[{key: "充值",value: "充值"},{key: "扣费",value: "扣费"},{key: "退款",value: "退款"},{key: "取消扣费",value: "取消扣费"}],
                title:"交易类型",
                value:prop.value,
            })
        );
        Component["拆换日期"] = (
            prop: {
                onChange: (dates: RangePickerValue, dateStrings: [string, string]) => void,
                value: RangePickerValue,
            }
        ) => (
            dateTimeUnit({
                onChange: prop.onChange,
                title: "拆换日期",
                value: prop.value,
            })
        )
        Component["修改日期"] = (
            prop: {
                onChange: (dates: RangePickerValue, dateStrings: [string, string]) => void,
                value: RangePickerValue,
            }
        ) => (
            dateTimeUnit({
                onChange: prop.onChange,
                title: "修改日期",
                value: prop.value,
            })
        )
        Component["处理类型"] = (
            prop: {
                onChange: (value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void,
                value: SelectValue
            }
        ) => (
            selectedUnit({
                onChange:prop.onChange,
                options:[
                    {key: "更改抄见",value: "更改抄见"},{key: "追加水量",value: "追加水量"},{key: "减免水量",value: "减免水量"},{key: "减免超计划",value: "减免超计划"}
                ],
                title:"处理类型",
                value:prop.value,
            })
        );
        Component["变更日期"] = (
            prop: {
                onChange: (dates: RangePickerValue, dateStrings: [string, string]) => void,
                value: RangePickerValue,
            }
        ) => (
            dateTimeUnit({
                onChange: prop.onChange,
                title: "变更日期",
                value: prop.value,
            })
        )
        Component["变更类型"] = (
            prop: {
                onChange: (value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void,
                value: SelectValue
            }
        ) => (
            selectedUnit({
                onChange:prop.onChange,
                options:[
                    {key: "过户",value: "过户"},                
                    {key: "开票地址",value: "开票地址"},
                    {key: "客户档案编辑",value: "客户档案编辑"},
                    {key: "更改所属区段",value: "更改所属区段"},
                    {key: "停水恢复",value: "停水恢复"},{key: "更改总分表类型",value: "更改总分表类型"},
                    {key: "停水",value: "停水"},
                    {key: "设置是否开电子票据",value: "设置是否开电子票据"},
                    {key: "核增",value: "核增"},
                    {key: "核减",value: "核减"},
                    {key: "更改基数水量",value: "更改基数水量"},
                    {key: "更改是否开增值税票据",value: "更改是否开增值税票据"},
                    {key: "销户恢复",value: "销户恢复"},
                    {key: "销户",value: "销户"},
                    {key: "更改用水性质",value: "更改用水性质"},
                ],
                title:"变更类型",
                value:prop.value,
            })
        );
        Component["查询"] = (
            prop:{
                onClick:()=>void
            }
        ) => <Col key={props.type + "Search"} span={2} style={style.margin}><Button type={"primary"} style={style.button} onClick={prop.onClick}>查询</Button></Col>;
        Component["导出"] = (
            prop:{
                onClick:()=>void
            }
        ) => <Col key={props.type + "Export"} span={2} style={style.margin}><Button type={"default"} style={style.button} onClick={prop.onClick}>导出</Button></Col>;
        return Component
    }; 
}