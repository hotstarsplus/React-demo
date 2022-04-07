import { DatePicker, Icon, Input, Radio, Select, Switch, TreeSelect } from "antd";
import moment from "moment";
import { FlexAlign, Nodata } from "orid";
import React from "react";
import { TitleTemplate } from "../../../common/titleTemplate/ui";
import { CalcLateFeeRule } from "../entity/calcLateFeeRule";
import "../index.scss";
import { ILateFeeParamDetailProps } from "./interface";
import { MutipleTreeSelect } from "./mutipleTreeSelect";
import { LateFeeParamDetailUiAction, treeNode } from "./uiAction";

class LateFeeParamDetail extends React.Component<ILateFeeParamDetailProps, {}>{

    public static getDerivedStateFromProps(nextProps: ILateFeeParamDetailProps, nextState: {bind: any}) {

        if ( JSON.stringify(nextProps.detail.AutoId) !== JSON.stringify(nextState.bind.props.detail.AutoId) ) {
            nextState.bind['uiAction']['reCalcBindValue'](nextProps.detail?.Detail);
            return {
                scope: LateFeeParamDetailUiAction.splitScope(nextProps.detail.RuleContent),
            };
        };

        return null;
    }

    public state: {bind: any, scope: Array<{
        key?: string,
        operator?: string,
        value?: string
    }>};

    public uiAction: LateFeeParamDetailUiAction;

    public constructor(props: ILateFeeParamDetailProps) {
        super(props);
        this.state = {
            bind: this,
            scope: LateFeeParamDetailUiAction.splitScope(props.detail.RuleContent),
        }
        this.uiAction = new LateFeeParamDetailUiAction(props, this);
    }

    public render() {
        if ( !this.props.detail['Detail'] ) {
            this.uiAction.clearTempoaryState();
            return <React.Fragment>
                <div style={{ height: "100%", paddingTop: "15%", textAlign: "center" }}>
                    <Nodata 
                        decription="请选择违约金参数数据"
                    />
                </div>
            </React.Fragment>
        }

        return <React.Fragment>
            <div style={{ marginLeft: "24px", marginTop: "12px", width: "100%", maxHeight: "calc(100vh - 170px)" }} className="late-fee-middle" > 

                    <FlexAlign className={"row-FlexAlign"}>
                        <div className={"text-col"}>
                            违约金参数名称
                        </div>
                        <div className={"Component-col"} >
                                <Input 
                                    value={this.props.detail?.RuleName} 
                                    onChange={(event)=> this.uiAction.changeDefaultPropsDetail(event, "RuleName", 'input')}
                                    style={{width:'14em'}}
                                />
                        </div>
                    </FlexAlign>

                    <FlexAlign className={"row-FlexAlign"}>
                        <div className={"text-col"}>
                            是否启用违约金参数：
                        </div>
                        <div className={"Component-col"} >
                            <Switch 
                                checked={this.props.detail?.IsUsing === "1"}
                                onChange={(event)=> this.uiAction.changeDefaultPropsDetail(this.props.detail?.IsUsing === "1"? "0": "1", "IsUsing", 'bool')}
                                key="switch" 
                            />
                        </div>
                    </FlexAlign>

                    <FlexAlign className={"row-FlexAlign"}>
                        <div className={"text-col"}>
                            是否进行违约金计算：
                        </div>
                        <div className={"Component-col"} >
                            <Radio.Group
                                className="laterFeeParam-radio"
                                onChange={(radio)=> this.uiAction.changeDefaultPropsDetail(radio.target.value, "IsCalcFee", 'bool')}
                                value={this.props.detail?.IsCalcFee}
                            >
                                <Radio value={false} key={'false'} >否</Radio>
                                <Radio value={true} key={'true'} >是</Radio>
                            </Radio.Group>
                        </div>
                    </FlexAlign>
                    <TitleTemplate
                        title={'计算范围'}
                        key={'calcScrop'}
                    >
                        { this.getCalcScope() }
                    </TitleTemplate>
                    <TitleTemplate
                        title={'起算日期'}
                        key={'Since the date'}
                    >
                        <Radio.Group
                            className="laterFeeParam-radio"
                            value={this.props.detail?.Detail?.CalcType || undefined}
                            onChange={(value)=> this.uiAction.changeReBindValue(value.target.value === this.props.detail?.Detail?.CalcType? undefined: value.target.value, 'CalcType', 'value')}
                        >
                            <FlexAlign  className={"row-FlexAlign"}>
                                <Radio value={1}>
                                    抄表后第
                                    <Input
                                        value={this.uiAction.templateValue.meterDayF}
                                        onChange={(value)=> this.uiAction.changeReBindValue(value.target.value, 'Day', 'value')}
                                    />
                                    天
                                </Radio>
                            </FlexAlign>
                            <FlexAlign  className={"row-FlexAlign"}>
                                <Radio value={2}>
                                    抄表月的下第
                                    <Input
                                        value={this.props.detail?.Detail?.Month || undefined}
                                        onChange={(value)=> this.uiAction.changeDetailDefaultPropsDetail(value, 'Month', 'input')}
                                    />
                                    月 &nbsp;第
                                    <Input
                                        value={this.uiAction.templateValue.meterDayS}
                                        onChange={(value)=> this.uiAction.changeReBindValue(value.target.value, 'Day', 'enum')}
                                    />
                                    天
                                </Radio>
                            </FlexAlign>
                        </Radio.Group>
                    </TitleTemplate>
                    <TitleTemplate
                        title={'计算基数'}
                        key={'Computational base'}
                    >
                        <Radio.Group
                            value={this.props.detail?.Detail?.BaseType}
                            onChange={(radio)=> this.uiAction.changeDetailDefaultPropsDetail(radio.target.value, "BaseType", 'value')}
                            className="laterFeeParam-radio"
                        >
                                <FlexAlign key={11}  className={"row-FlexAlign"}>
                                    <Radio value={0}>
                                        根据水费金额计算违约金
                                    </Radio>
                                </FlexAlign>
                                <FlexAlign key={12}  className={"row-FlexAlign"}>                                    
                                    <Radio value={1}>
                                        根据水费与余额之差计算违约金
                                    </Radio>
                                </FlexAlign>
                        </Radio.Group>
                    </TitleTemplate>
                    <TitleTemplate
                        title={'计算比例'}
                        key={'calc Scale'}
                    >
                        <FlexAlign key={11}  className={"row-FlexAlign"}>
                            <Input 
                                value={this.props.detail?.Detail?.CalcPercent || undefined}
                                style={{ width: "120px", textAlign: "center", margin: "0px 8px 0px 8px"}}
                                onChange={(radio)=> this.uiAction.changeDetailDefaultPropsDetail(radio.target.value, "CalcPercent", 'value')}
                            />
                        </FlexAlign>
                    </TitleTemplate>
                    <TitleTemplate
                        title={'限额'}
                        key={'basic setting'}
                    >
                        <h5 className="late-fee-h5">最大金额</h5>
                            <Radio.Group
                                value={this.props.detail?.Detail?.MaxType}
                                onChange={(radio)=> this.uiAction.changeReBindValue(radio.target.value, 'MaxType', 'value')}
                                className="laterFeeParam-radio"
                            >
                                    <FlexAlign key={11}  className={"row-FlexAlign"}>
                                        <Radio value={0}>
                                            固定金额
                                        </Radio>
                                        <span>
                                            <Input 
                                                value={this.uiAction.templateValue['MaxLineF']}
                                                onChange={(value)=> this.uiAction.changeReBindValue(value.target.value, 'MaxLine', 'value')}
                                            />
                                        </span>
                                    </FlexAlign>
                                    <FlexAlign key={12}  className={"row-FlexAlign"}>                                    
                                        <Radio value={1}>
                                            不超过水费金额的
                                        </Radio>
                                        <span>
                                            <Input 
                                                value={(()=> {
                                                    if ( typeof this.uiAction.templateValue['MaxLineS'] === "undefined" ) {
                                                        return undefined
                                                    }
                                                    return (this.uiAction.templateValue['MaxLineS'])
                                                })()}
                                                onChange={(value)=> this.uiAction.changeReBindValue(value.target.value, 'MaxLine', 'enum')}
                                            />%
                                        </span>
                                    </FlexAlign>
                            </Radio.Group>
                        <h5 className="late-fee-h5">最小金额</h5>
                            <Radio.Group
                                value={this.props.detail?.Detail?.MinType}
                                onChange={(radio)=> this.uiAction.changeReBindValue(radio.target.value, 'MinType', 'value')}
                                className="laterFeeParam-radio"
                            >
                                    <FlexAlign key={11}  className={"row-FlexAlign"}>
                                        <Radio value={0}>
                                            固定金额
                                        </Radio>
                                        <span >
                                            <Input 
                                                value={this.uiAction.templateValue['MinLineF']}
                                                onChange={(value)=> this.uiAction.changeReBindValue(value.target.value, 'MinLine', 'input')}
                                            />
                                        </span>
                                    </FlexAlign>
                                    <FlexAlign key={12}  className={"row-FlexAlign"}>                                    
                                        <Radio value={1}>
                                            不低于水费金额的
                                        </Radio>
                                        <span>
                                            <Input 
                                                value={this.uiAction.templateValue['MinLineS']}
                                                onChange={(value)=> this.uiAction.changeReBindValue(value.target.value, 'MinLine', 'enum')}
                                            />%
                                        </span>
                                    </FlexAlign>
                            </Radio.Group>
                    </TitleTemplate>
                </div>
        </React.Fragment>
    }


    private getCalcScope(detail: CalcLateFeeRule = this.props.detail): React.ReactNode {

        const value = this.state.scope;

        return (value || [{key: undefined, operation: undefined, value: undefined}]).map(( model, index ) => {
            return <div key={index} style={{ margin: "8px 0px"}}>
                <Select<any>
                    style={{ width: '120px' }}
                    value={model.key}
                    onChange={(val)=> this.uiAction.chanleCalcQuery(index, val)}
                >
                    <Select.Option value="all" key="all">全部</Select.Option>
                    <Select.Option value="UserCategoryId" key="UserCategoryId">用户类型</Select.Option>
                    <Select.Option value="CurrentReadDate" key="CurrentReadDate">抄表时间</Select.Option>
                    <Select.Option value="ReadingRegionId" key="ReadingRegionId">片区</Select.Option>
                    <Select.Option value="UserNo" key="UserNo">用户号</Select.Option>
                    <Select.Option value="CustomerNo" key="CustomerNo">客户号</Select.Option>
                    {/* <Select.Option value="date" key="date">固定日期</Select.Option> */}
                    <Select.Option value="YearMonth" key="YearMonth">账期年月</Select.Option>
                </Select>

                {
                    model.key && ["UserNo", "CustomerNo", "CurrentReadDate", "MonthDay", "Day"].includes(model.key!)
                        ? <Select
                            style={{ width: '80px' }}
                            dropdownClassName="advanced-mini-scrollbar"
                            onChange={(val: any)=> this.uiAction.changeOperator(index, val)}
                            value={model.operator}
                        >
                            <Select.Option value="=" key="=">等于</Select.Option>
                            <Select.Option value=">" key=">">大于</Select.Option>
                            <Select.Option value=">=" key=">=">大于等于</Select.Option>
                            <Select.Option value="<" key="<">小于</Select.Option>
                            <Select.Option value="<=" key="<=">小于等于</Select.Option>
                            <Select.Option value="like" key="like">包含</Select.Option>
                            <Select.Option value=" not like" key=" not like">不包含</Select.Option>
                        </Select>
                        : ""
                }

                <CalcQueryContent
                    type={model.key!}
                    value={model.value}
                    interval={model['interval']}
                    usercagegory={this.props.usercategory || []}
                    onChange={this.uiAction.changeContent.bind(undefined, index)}
                />
                {
                    (value || [{key: undefined, operation: undefined, value: undefined}]).length !== 1 && (value || [{key: undefined, operation: undefined, value: undefined}]).filter(( fil ) => fil.key === "all").length
                        ? <Icon title={`计算范围全部不能与其他参数同时存在 ！`} type="info" style={{ color: "red", marginLeft: "4px" }} />
                        : (value || [{key: undefined, operation: undefined, value: undefined}]).map(( iter )=> iter.key === "all").includes(true)
                            ? ""
                            :<span onClick={()=> this.uiAction.addCalcScope(index+ 1)}>
                                <Icon type="plus" style={{marginLeft:8,marginRight:8}}/>
                            </span>
                }
                <span
                    style={{ visibility: (value || []).length > 1 ? 'visible' : 'hidden' }} // 条数大于1才会显示
                    onClick={()=> this.uiAction.deleteCalcScope(index)}
                >
                    <Icon type="delete" />
                </span>
            </div>
        });
    }

}

function CalcQueryContent(props: {type?: string, value?: any, interval?: string, onChange?: (value: any, key: string, interval?: boolean)=> void, usercagegory: any[]}): JSX.Element {

    if ( !props.type ) { return <span /> };

    return <React.Fragment>
        <GetContentFromKey {...props} />
    </React.Fragment>

}
function GetContentFromKey(props: {type?: string, value?: any, interval?: string, onChange?: (value: any, key: string, interval?: boolean)=> void, usercagegory: any[]}): JSX.Element {
    switch(props.type) {
        case "all":
            return <span />;
        case "UserCategoryId":
            return <Select
                style={{ width: '150px' }}
                dropdownClassName="advanced-mini-scrollbar"
                onChange={(val: any)=> props.onChange?.(val, "UserCategoryId")}
                value={props.value}
            >
                {
                    (props.usercagegory || []).map(( model, index ) => {
                        return <Select.Option value={model["UserCategoryId"]} key={model["UserCategoryId"]}>{model['UserCategoryName']}</Select.Option>
                    })
                }
            </Select>;
        case "ReadingRegionId":
            return <MutipleTreeSelect
                key={'ReadingRegionId'}
                onChange={(val: any)=> props.onChange?.(val, "ReadingRegionId")}
                style={{ width: "280px" }}
                placeholder={props.value?.length ?(props.value?.length+ "个片区"): "请选择片区"}
                value={props.value}
                region={treeNode}
                // treeCheckable={true}
            >
                {loop(treeNode)}
            </MutipleTreeSelect>;
        case "UserNo":
            return <React.Fragment>
                <Input
                    style={{ width: '280px' }}
                    onChange={(val: any)=> props.onChange?.(val.target.value, "UserNo")}
                    value={props.value}
                />
            </React.Fragment>;
        case "CustomerNo":
            return <React.Fragment>
                <Input
                    style={{ width: '280px' }}
                    onChange={(val: any)=> props.onChange?.(val.target.value, "CustomerNo")}
                    value={props.value}
                />
            </React.Fragment>;
        case "date":
            return <React.Fragment>
            <DatePicker.RangePicker
                style={{ width: '280px' }}
                dropdownClassName="advanced-mini-scrollbar"
                onChange={(val: any)=> props.onChange?.(val, "date")}
                value={props.value? (props.value || "~").split("~").map(( model: any ) => moment(model || undefined)) as any: undefined} 
                format={'YYYY-MM-DD'}
            />
        </React.Fragment>;
        case "YearMonth":
            return <React.Fragment>
                <Select
                    mode="tags"
                    size={"default"}
                    placeholder="请选择日期"
                    value={props.value as any}
                    onChange={(value: any[])=> {
                        (value.length <= ((props.value || []).length || 0)) && props.onChange?.(value, "YearMonth");
                    }}
                    style={{ width: '280px' }}
                />
                <DatePicker.MonthPicker 
                    value={undefined}
                    style={{ width: '180px' }}
                    onChange={(date)=> {props.onChange?.(Array.from(new Set([...(props.value || []), date?.format('YYYYMM')])), "YearMonth")}}
                />
            </React.Fragment>;
        case "CurrentReadDate":
        case "MonthDay":
        case "Day":
            return <React.Fragment>
                <Select
                    style={{ width: '150px' }}
                    dropdownClassName="advanced-mini-scrollbar"
                    onChange={(val: any)=> props.onChange?.(val, props.type!, true)}
                    value={props.interval || props.type}
                >
                    <Select.Option value="CurrentReadDate" key="CurrentReadDate">年月日</Select.Option>
                    <Select.Option value="MonthDay" key="MonthDay">月日</Select.Option>
                    <Select.Option value="Day" key="Day">日</Select.Option>
                </Select>
                {
                    props.type? 
                        (props.interval || props.type || "").toLowerCase() !== ('day')
                            ? <DatePicker 
                                format={(props.interval || props.type).toLowerCase() === "currentreaddate"? "YYYY-MM-DD": "MM-DD"} 
                                value={props.value? moment(props.value): null}
                                onChange={e=> props.onChange?.(e?.format("YYYY-MM-DD"), 'Day')}
                            />
                            : <Input value={props.value} style={{ width: "140px"}} onChange={e=> props.onChange?.(e.target.value, 'Day')}/>
                    : ""
                }
            </React.Fragment>;
        default: 
            return <span>default{props.value}</span>;
    }
}

function loop(datas: any[]): JSX.Element[] {
    return datas.map((model) => {
        if (model.ChildList && model.ChildList.length) {
            return (
                <TreeSelect.TreeNode  value={model.RegionId} key={model.RegionId} title={model.RegionName} >
                    {loop(model.ChildList)}
                </TreeSelect.TreeNode>
            );
        }
        return <TreeSelect.TreeNode value={model.RegionId} key={model.RegionId} title={model.RegionName} />;
    })
}

export { LateFeeParamDetail };

