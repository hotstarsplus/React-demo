import { action } from "mobx";
import { OridFunction, OridStores, requestJson } from 'orid';
import { CalcLateFeeRule } from "../entity/calcLateFeeRule";
import { CalcLateFeeRuleDetail } from "../entity/calcLateFeeRuleDetail";
import { ILateFeeParamDetailProps } from "./interface";
import { LateFeeParamDetail } from "./ui";

const treeNode: any[] = [];

function loadTreeNode(call?: ()=> void) {
    if ( treeNode.length ) {
        call?.();
        return;

    }
    requestJson('api/cmm/MeterCopyPlanNew/CopyPlan/GetRegionTreeByCpCode?CpCode=' + OridStores.authStore.currentOperator.CpCode).then((res) => {
        if (res.rtnCode === 0) {
            treeNode.splice(0,0,...res.data)
        }
        call?.();
    })
} 


class LateFeeParamDetailUiAction{

    public static splitScope(values: string): Array<{[key in keyof {key: string, value: string, operator: string}]: string}> {
        const result: any[] = [];
        ((values || "").split("and") || []).forEach(( iterator ) => {
            const loadKey = OridFunction.ruleValue(undefined, ['>=', '<=',' not like', 'like', ' in ',  '>', "<", "="]).getInstance(iterator, []);
            // 获取到需求数据 对数据进行清空格
            let insertValue: any;
            if ( !!iterator && !loadKey )  {
                insertValue = {
                    key: "all",
                };
            }else if ( !!iterator ){
                insertValue = {
                    key: (iterator.split(loadKey instanceof Array? loadKey[0]: loadKey)[0])?.trim() || iterator.split(loadKey instanceof Array? loadKey[0]: loadKey)[0],
                    operator: (loadKey instanceof Array? loadKey[0]: loadKey)?.trim() || loadKey instanceof Array? loadKey[0]: loadKey,
                    value: ((`${iterator.split(loadKey instanceof Array? loadKey[0]: loadKey)[1]}` || "").split(/'|"/g).join("")?.trim()) 
                        || (`${iterator.split(loadKey instanceof Array? loadKey[0]: loadKey)[1]}` || "").split(/'|"/g).join(""),
                };
                if ( ["MonthDay", "Day"].includes(insertValue['key']) ) {
                    insertValue['interval'] = insertValue['operator'];
                    insertValue['key'] = 'CurrentReadDate';
                };
                if ( ['YearMonth', 'ReadingRegionId'].includes(insertValue['key']) ) {
                    const thatValueContent = String((insertValue['value'] || "()")).split(/\(|\)|\[|\]/g).join("");
                    insertValue['value'] = thatValueContent.length !== 0? thatValueContent.split(','): undefined;
                }
            }

            insertValue && result.push(insertValue);
        });

        
        if ( !(result.length) ) {
            result.push({key: undefined === values? undefined: 'all', operator: undefined === values? undefined: '', value: undefined})
        }

        return result;
    } 

    public props: ILateFeeParamDetailProps;

    public cite: LateFeeParamDetail;

    public templateValue: {
        meterDayF: string,
        meterDayS: string,
        MaxLineF: string,
        MaxLineS: string,
        MinLineF: string,
        MinLineS: string,
    }

    public constructor(props: ILateFeeParamDetailProps, cite: LateFeeParamDetail) {
        this.props = props;
        this.cite = cite;
        loadTreeNode(()=> this.flushPage());
        this.templateValue = {
            meterDayF: '',
            meterDayS: '',
            MaxLineF: '',
            MaxLineS: '',
            MinLineF: '',
            MinLineS: '',
        };
    }


    /**
     * 外部删除状态的时候 里面随时清空临时数据
     */
    @action.bound
    public clearTempoaryState() {
        this.templateValue = { meterDayF: '',meterDayS: '',MaxLineF: '',MaxLineS: '',MinLineF: '',MinLineS: '' };
    };


    /**
     * 代理 处理外部数据
     * @param event 
     * @param keys 
     * @param type 
     */
    @action.bound
    public changeDefaultPropsDetail(event: any, keys: keyof CalcLateFeeRule, type: "input" | "bool") {
        const resultValue = type === "input"? event.target.value: type === "bool"? event: event;
        this.props.onChange(resultValue, keys);
    }

    /**
     * 代理 处理外部明细数据
     * @param event 
     * @param keys 
     * @param type 
     */
    @action.bound
    public changeDetailDefaultPropsDetail(event: any, keys: keyof CalcLateFeeRuleDetail, type: "input" | "bool" | 'value'): boolean {
        const resultValue = type === "input"? event.target.value: type === "bool"? event: type === 'value'? event: event;
        this.props.onDetailChange(resultValue, keys);
        return true;
    }

    /**
     * 代理 修改重复数据
     * @param event 
     * @param keys 
     * @param type 
     */
    @action.bound
    public changeReBindValue(event: any, keys: keyof CalcLateFeeRuleDetail, type: "input" | "bool" | 'value' | 'enum') {
        const isLineValue = (keys === "MaxLine" || keys === "MinLine") && type === 'enum';
        // const isPercent = this.props.detail[keys.substr(0,3)+ "Type"] === 1;

        let isThenChecked: boolean = false;

        switch(keys) {
            case "Day":
                this.templateValue[type !== "enum"? "meterDayF": "meterDayS"] = event;
                (+(this.cite.props?.detail?.Detail?.CalcType) === (type === "enum"? 2: 1)) && (isThenChecked = true);
                break;
            case "MaxLine":
                this.templateValue[type !== "enum"? "MaxLineF": "MaxLineS"] = event;
                (+(this.cite.props?.detail?.Detail?.MaxType) === (type === "enum"? 1: 0)) && (isThenChecked = true);
                break;
            case "MinLine":
                this.templateValue[type !== "enum"? "MinLineF": "MinLineS"] = event;
                (+(this.cite.props?.detail?.Detail?.MinType) === (type === "enum"? 1: 0)) && (isThenChecked = true);
                break;
            case "CalcType":
                (this.changeDetailDefaultPropsDetail(this.templateValue[+(event) === 1? "meterDayF": "meterDayS"], "Day", 'value')) && (isThenChecked = true);
                break;
            case "MaxType":
                (this.changeDetailDefaultPropsDetail(this.templateValue[event === 0? "MaxLineF": "MaxLineS"], "MaxLine", "value")) && (isThenChecked = true);
                break;
            case "MinType":
                (this.changeDetailDefaultPropsDetail(this.templateValue[event === 0? "MinLineF": "MinLineS"], "MinLine", "value")) && (isThenChecked = true);
                break; 
        }

        const calcUploadLineValue = isLineValue? event / 100: event;
        isThenChecked && this.changeDetailDefaultPropsDetail(calcUploadLineValue, keys, 'value');
        (!isThenChecked) && this.flushPage();
    }
 

    /***
     * 添加一个计算记录
     */
    @action.bound
    public chanleCalcQuery(source: number, value: string) {
        const sourceValue = OridFunction.DeepCopy.deepClone(this.cite.state.scope);
        sourceValue[source].key = value;
        sourceValue[source].value = undefined;
        sourceValue[source].operator = value === "all"? "": ((value === "ReadingRegionId" || value === "YearMonth")? " in ": "=");
        this.flushPage({scope: sourceValue}, ()=> {
            this.changeContent(sourceValue.length - 1, undefined, "all",);
        });
    }

    /**
     * 修改操作符 根据下标
     * @param source 
     * @param value 
     */
    @action.bound
    public changeOperator(source: number, value: string) {
        const sourceValue = OridFunction.DeepCopy.deepClone(this.cite.state.scope);
        sourceValue[source].operator = value;
        const ruleContent: string = this.getRuleContent(sourceValue);
        this.props.onChange(ruleContent, 'RuleContent')
        this.reCalcBindValue(this.props.detail.Detail);
        this.flushPage({scope: sourceValue});
    }
    
    /**
     * 修改内容
     */
    @action.bound
    public changeContent(source: number,value: any, key: string, interval?: boolean) {
        const sourceValue = OridFunction.DeepCopy.deepClone(this.cite.state.scope);
        if ( key === "date" ) {
            sourceValue[source].value = value.length && value[0] && value[1]? value[0].format('YYYY-MM-DD')+"~"+ value[1].format("YYYY-MM-DD"): "";
        }else if (interval) {
            sourceValue[source]['interval'] = value;
        }else {
            sourceValue[source].value = value;
        }

        const ruleContent: string = this.getRuleContent(sourceValue);
        this.props.onChange(ruleContent, 'RuleContent')
        this.reCalcBindValue(this.props.detail.Detail);
        this.flushPage({scope: sourceValue});
    }

    /**
     * 新增一条
     * @param source 
     */
    @action.bound
    public addCalcScope(source: number,) {
        const sourceValue = OridFunction.DeepCopy.deepClone(this.cite.state.scope);
        sourceValue.splice(source, 0, {key: undefined, operator: undefined, value: undefined});
        this.flushPage({scope: sourceValue});
    }

    /**
     * 删除指定的某条
     * @param source 
     */
    @action.bound
    public deleteCalcScope(source: number,) {
        const sourceValue = OridFunction.DeepCopy.deepClone(this.cite.state.scope);
        sourceValue.splice(source, 1);
        const ruleContent: string = this.getRuleContent(sourceValue);
        this.props.onChange(ruleContent, 'RuleContent')
        this.flushPage({scope: sourceValue});
    }

    /**
     * 
     */
    @action.bound
    public reCalcBindValue(detail?: CalcLateFeeRuleDetail) {
        detail && (
            this.templateValue[detail.CalcType === 1? "meterDayF": "meterDayS"] = getTypeState(detail.CalcType)? "": ( detail.Day ) as any,
            this.templateValue[detail.MaxType === 0? "MaxLineF": "MaxLineS"] = getTypeState(detail.MaxType)? "": ( detail.MaxType === 0? (detail.MaxLine? detail.MaxLine.toFixed(2): detail.MaxLine): detail.MaxLine? (detail.MaxLine * 100).toFixed(0): detail.MaxLine ) as any,
            this.templateValue[detail.MinType === 0? "MinLineF": "MinLineS"] = getTypeState(detail.MinType)? "": ( detail.MinType === 0? (detail.MinLine? detail.MinLine.toFixed(2): detail.MinLine): detail.MinLine? (detail.MinLine * 100).toFixed(0): detail.MinLine ) as any,
            this.templateValue[detail.CalcType === 1? "meterDayS": "meterDayF"] = "",
            this.templateValue[detail.MaxType === 0? "MaxLineS": "MaxLineF"] = "",
            this.templateValue[detail.MinType === 0? "MinLineS": "MinLineF"] =  ""
        );

        function getTypeState(type: any) {
            return (type+ "") === "null" || (type + "" === "") || (type + "") === undefined;
        }
    }

    /**
     * 刷新页面
     * @param values 
     * @param call 
     */
    @action.bound
    public flushPage(values: object = {}, call?: (()=> void)) {
        this.cite.setState(values,call)
    }

    /**
     * 获取验证内容
     * @param arr 
     */
    public getRuleContent(arr: Array<{
        key?: string,
        operator?: string,
        value?: string,
        interval?: string
    }>): string {
        let resultContent: string = "";
        arr && arr.length && arr.forEach(( model, index ) => {
            if ( !model || !(model.key) ) { return };
            resultContent += (
                model.key === "all"? "all": 
                (
                    model.key === "CurrentReadDate" && model.interval)? 
                    (model.interval || "")+ getOperator(model.key, model.operator)+ getValue(model.key, model.value): 
                    model.key+ getOperator(model.key, model.operator)+ getValue(model.key, model.value)
            )!+ (index === arr.length - 1? "": " and ");
        });

        return resultContent;

        function getOperator(key?: string, value?: string) {
            switch(key){
                case "YearMonth":
                    return " in ";
                case "ReadingRegionId":
                    return " in ";
                case "CurrentReadDate":
                    return value
                case "MonthDay":
                case "Day":                    
                    return "=";  
                default: return value || "="
            }
        };

        function getValue(key?: string, value?: any) {
            switch(key){
                case "YearMonth":
                    return `(${value?.length? `'`: ""}${(value || []).join("','")}${value?.length? `'`: ""})`;
                case "ReadingRegionId":
                    return `(${value?.length? `'`: ""}${(value || []).join("','")}${value?.length? `'`: ""})`;
                default: return `'${value}'` || ""
            }
        };
    }

}

export { LateFeeParamDetailUiAction, treeNode };

