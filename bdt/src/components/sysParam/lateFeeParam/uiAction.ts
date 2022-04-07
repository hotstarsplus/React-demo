import { message, Modal } from 'antd';
import { action } from 'mobx';
import { OridFunction, oridController } from "orid";
import { LateFeeParamDoMainStore } from "./domainStore";
import { CalcLateFeeRule } from "./entity/calcLateFeeRule";
import { CalcLateFeeRuleDetail } from './entity/calcLateFeeRuleDetail';
import { ILateFeeParamLayoutProps } from "./lateFeeParamLayout/interface";
import { LateFeeParamLayout } from "./layout";
import { LateFeeParamStore } from "./store";




class LateFeeParamUiAction{

    public props: ILateFeeParamLayoutProps;

    public domaminStore: LateFeeParamDoMainStore;

    public store: LateFeeParamStore;

    private cite: LateFeeParamLayout;

    public constructor(props: ILateFeeParamLayoutProps, cite: LateFeeParamLayout) {
        this.props = props;
        this.domaminStore = new LateFeeParamDoMainStore();
        this.store = new LateFeeParamStore();
        this.cite = cite;
    }

    /** 初始化 */
    @action.bound
    public init() {
        this.store.pageLoading = true
        this.flushPage();
        Promise.all([
            this.domaminStore.GetLateFeeRules().then(( res ) => {
                if ( res.rtnCode !== 0 ) {
                    message.error(res.rtnMsg);
                    return;
                };
                this.store.LateFeeRules = res.data;
                this.store.thenLateFeeRule = undefined;
            }),
        ]).then(()=> {
            this.store.pageLoading = false;
        }).finally(()=> {
            this.store.pageLoading = false;
            this.flushPage();
        });

        if ( !this.store.userCategoryTree.length ) {
            this.domaminStore.getUserCategoryTree().then(( res ) => {
                if ( res.rtnCode === 0 ) {
                    this.store.userCategoryTree = res.data;
                    this.flushPage();
                    return;
                }
                message.error("获取用户类型树失败!");
            }) 
        };
    }

    /** 设置当前显示 非编辑模式 */
    @action.bound
    public handleSetThenRule(rule: CalcLateFeeRule) {
        const isCut = !!this.store.thenLateFeeRule && rule?.AutoId !== this.store.thenLateFeeRule.AutoId;
        const isChange = !!this.store.thenLateFeeRule? JSON.stringify(this.store.LateFeeRules.filter(( model ) => model.AutoId === this.store.thenLateFeeRule?.AutoId)[0]) !== JSON.stringify(this.store.thenLateFeeRule): false;

        if ( rule.AutoId === this.store.thenLateFeeRule?.AutoId ) {
            if ( isChange ) {
                Modal.confirm({
                    title: "当前规则参数更改后尚未保存，是否继续保存？",
                    onCancel: ()=> {
                        this.store.thenLateFeeRule = undefined;
                        this.flushPage();
                    },
                    onOk: ()=> {
                        this.updateFeeParam(true);
                    }
                });
            }else {
                this.store.thenLateFeeRule = undefined;
            };
        }else { 
            if ( isCut && isChange ) {
                Modal.confirm({
                    title: "当前规则参数更改后尚未保存，是否继续保存？",
                    onCancel: ()=> {
                        this.store.thenLateFeeRule = OridFunction.DeepCopy.deepClone(rule);
                        this.flushPage();
                    },
                    onOk: ()=> {
                        this.updateFeeParam(true);
                    }
                })
            }else {
                this.store.thenLateFeeRule = OridFunction.DeepCopy.deepClone(rule);
            }
            /** 事需求 要求只要没保存 就不需要点击编辑就能直接保存 多了一步浪费操作 */
            // this.store.isChanged = rule.AutoId === -1? true: false;
        }
        this.flushPage();
    }

    /** 
     * 设置当前显示 编辑模式 
     * @description 已废弃
     */
    @action.bound
    public handleSetThenRuleChange(rule: CalcLateFeeRule) {
        this.store.thenLateFeeRule = OridFunction.DeepCopy.deepClone(rule);
        this.flushPage();
    }

    /**
     * 
     * @param rule 删除某条数据
     */
    @action.bound
    public deleteLateFeeParam(rule: CalcLateFeeRule) {
        this.store.pageLoading = true;
        if ( rule.AutoId === -1 ) {
            message["success"]("删除成功");
            this.init();
        }else {
            this.domaminStore.DelLateFeeRule(rule.AutoId, rule.Detail.RuleId).then(( res ) => {
                message[res.rtnCode === 0 ? "success": 'error'](res.rtnCode === 0 ? "删除成功": res.rtnMsg);
                this.init();
            });
        }
    }
    

    /**
     * 新增或保存修改
     */
    @action.bound
    public updateFeeParam(cutsave?: any) {

        if ( !this.store.thenLateFeeRule ) {
            message.error("请选择需要进行保存的数据!");
            return;
        }
        
        if ( this.store.thenLateFeeRule.RuleContent?.includes("all") && this.store.thenLateFeeRule.RuleContent.trim().length !== "all".length ) {
            message.error("计算范围全部不能与其他参数同时存在!");
            return;
        }
        
        const updateLateFeeRule = this.store.thenLateFeeRule;

        // 验证 测试说是一步一步验证 
        // 杀疯了
        // if ( this.ruleData( !(updateLateFeeRule.RuleContent), "计算范围不能为空!" ) ) { return; };
        if ( this.ruleData( updateLateFeeRule.Detail.CalcType !== 0 && !updateLateFeeRule.Detail.CalcType, "抄表下第某日不能为空!" ) ) { return; };
        if ( this.ruleData( updateLateFeeRule.Detail.Day !== 0 && !updateLateFeeRule.Detail.Day, "抄表下第某日不能为空!") ) { return; }
        if ( this.ruleData( updateLateFeeRule.Detail.CalcType+ "" === "1" && (updateLateFeeRule.Detail.Day < 1), "抄表下第某日 日期不能小于0!" ) ) { return; };
        if ( this.ruleData( updateLateFeeRule.Detail.CalcType+ "" === "2" && updateLateFeeRule.Detail.Month !== 0 && !updateLateFeeRule.Detail.Month, "抄表下第某月不能为空!" ) ) { return; };
        if ( this.ruleData( updateLateFeeRule.Detail.CalcType+ "" === "2" && !(updateLateFeeRule.Detail.Month >= 1 && updateLateFeeRule.Detail.Month <= 12), "抄表下第某月的值要在1-12之间!" ) ) { return; };
        if ( this.ruleData( updateLateFeeRule.Detail.CalcType+ "" === "2" && !(updateLateFeeRule.Detail.Day >= 1 && updateLateFeeRule.Detail.Day <= 31), "抄表下第某月 第某天的值要在1-31之间!" ) ) { return; };
        if ( this.ruleData( (updateLateFeeRule.Detail?.BaseType === undefined), "计算基数不能为空!" ) ) { return; };
        if ( this.ruleData( !(updateLateFeeRule.Detail?.CalcPercent), "计算比例不能为空!" ) ) { return; };
        if ( this.ruleData( (isNaN(Number(updateLateFeeRule.Detail?.CalcPercent))), "计算比例必须是数字!" ) ) { return; };
        if ( this.ruleData( updateLateFeeRule.Detail?.MaxType !== undefined && (updateLateFeeRule.Detail?.MaxLine+ "" === ""), "最大金额不能为空!" ) ) { return; };
        if ( this.ruleData( updateLateFeeRule.Detail?.MinType !== undefined && (updateLateFeeRule.Detail?.MinLine+ "" === ""), "最小金额不能为空!" ) ) { return; };
        if ( this.ruleData( !!updateLateFeeRule.Detail?.MaxLine && (isNaN(Number(updateLateFeeRule.Detail?.MaxLine))), "最大金额必须是数字!" ) ) { return; };
        if ( this.ruleData( !!updateLateFeeRule.Detail?.MinLine && (isNaN(Number(updateLateFeeRule.Detail?.MinLine))), "最小金额必须是数字!" ) ) { return; };

        this.domaminStore[this.store.thenLateFeeRule?.AutoId === -1? "AddLateFeeRule": "UpdateLateFeeRule"](
            this.store.thenLateFeeRule.AutoId === -1
                ? updateLateFeeRule
                : ({
                    ...(this.store.thenLateFeeRule || {}),
                    RuleContent: this.store.thenLateFeeRule['RuleContent'] === 'all'? "": this.store.thenLateFeeRule['RuleContent']
                })!
        ).then(( res ) => {
            message[res.rtnCode === 0 ? "success": 'error']((res.rtnCode === 0 ? res.rtnMsg: "保存"+"失败!"));
            // 保存失败不清空数据
            if ( res.rtnCode === 0 ) {
                this.init();
            }
        });

    }

    /**
     * 立即计算违约金
     */
    @action.bound
    public ImmediatelyCalcFee() {
        
        if ( this.store.ThenCalcFee ) {
            message.info("正在计算中，请稍后再试!")
        }

        if ( !(this.store.LateFeeRules.length ) ) {
            message.error('暂未获取数据，请先新增违约金参数!');
            return;
        }

        if ( this.store.LateFeeRules.some((v)=> v.AutoId === -1) ) {
            message.info('请先保存新增参数 在进行重新计算违约金!');
            return;
        }

        this.store.ThenCalcFee = true;
        this.domaminStore.CalculateLateFeeWait().then(( res ) => {
            message[res.rtnCode === 0 ? 'success': 'error'](res.rtnMsg);
            this.store.ThenCalcFee = false;
        })
    }
    
    /**
     * 新增一个临时的对象
     */
    @action.bound
    public addTemplateData() {
        if ( this.store.LateFeeRules.some((v)=> v.AutoId === -1 ) ) {
            message.info('请先保存新增参数 再进行新增')
            return;
        };
        
        const sortLength = (this.store.LateFeeRules.map(( model ) => model.SortNo));

        const feeParamtemplatevalue = new CalcLateFeeRule({
            AutoId: -1,
            SortNo: ((Math.max(...(sortLength.length !== 0 ? sortLength: [0]))) || 0) + 1,
            IsCalcFee: true,
            RuleName: "新增规则",
            IsUsing: "1",
            Detail: new CalcLateFeeRuleDetail({
                "RuleId": 0,
                "CalcType": 1,
                "Month": undefined,
                "Day": undefined,
                "StartDate": "",
                "EndDate": "",
                "StartMonth": "",
                "EndMonth": "",
                "BaseType": 0,
                "CalcPercent": 0,
                "MaxType": undefined,
                "MinType": undefined,
                "MaxLine": undefined,
                "MinLine": undefined,
                "CpCode": oridController.authController.getOperatorInfo().CpCode,
            }),
            RuleContent: undefined,
            CpCode: oridController.authController.getOperatorInfo().CpCode,
        });
        this.store.LateFeeRules.push({...feeParamtemplatevalue});
        this.store.thenLateFeeRule = OridFunction.DeepCopy.deepClone(this.store.LateFeeRules[this.store.LateFeeRules.length - 1]);
        this.flushPage();
    }

    /**
     * 数据排序
     */
    @action.bound
    public sortLateFeeRules(values: object) {
        const sourceValue = OridFunction.DeepCopy.deepClone(this.store.LateFeeRules);
        let [top, bottom, st, sb] = [-1,-1,{},{}];
        (sourceValue || []).forEach(( model, index ) => {
            if ( index === values['oldIndex'] ) { top = index; st = {...model} };
            if ( index === values['newIndex'] ) { bottom = index; sb = {...model} };
        });
        sourceValue[top] = {...sb as any};
        sourceValue[bottom] = {...st as any};
        const sortsource = (sourceValue || []).map(( model, index ) => ({AutoId: model.AutoId, SortNo: index}));
        this.domaminStore.UpdateRuleSort(sortsource).then(( res ) => {
            message[res.rtnCode === 0 ? 'success': 'error'](res.rtnCode===0? "排序号更新成功!": "排序号更新失败!");
            (res.rtnCode === 0) && this.init();
        });
    }

    /**
     * 更新当前选中数据的master
     * @param value 数据
     * @param key 要更新的key
     */
    @action.bound
    public changeParamValues(value: any, key: keyof CalcLateFeeRule) {
        this.store.thenLateFeeRule && ((this.store.thenLateFeeRule as any)![key] = value);
        this.flushPage();
    }

    /**
     * 更新当前选中数据的Detail
     * @param value 数据
     * @param key 要更新的key
     */
    @action.bound
    public changeDetailParamValues(value: any, key: keyof CalcLateFeeRuleDetail) {
        this.store.thenLateFeeRule && ((this.store.thenLateFeeRule.Detail as any)![key] = value);
        this.flushPage();
    }

    /**
     * 刷新页面
     */
    @action.bound
    private flushPage(values: object = {}, call?: (()=> void)) {
        this.cite.setState(values,call)
    }

    @action.bound
    private ruleData(IF: boolean, msg: string): boolean {
        if ( IF ) { message.error(msg)};
        return IF;
    }

}

export { LateFeeParamUiAction };

