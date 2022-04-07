import { proxySetObject } from "../../../common/utilFunctions/utilFunctions";

/** 违约金计算规则详情 */
class CalcLateFeeRuleDetail {
    /** 规则详情id */ 
    public AutoId: number;
        
    /** 违约金计算规则id */ 
    public RuleId: number;

    /** 违约金计算类型，抄表后第几天，抄表后第几月第几天 */ 
    public CalcType: number;

    /** 抄表后第几个月，在固定日期时，表示几月 */ 
    public Month: number;

    /** 抄表后第几个月，在固定日期时，表示日期 */ 
    public Day: number;

    /** 起始时间 */ 
    public StartDate: string;

    /** 结束时间 */ 
    public EndDate: string;

    /** 开始账期 */ 
    public StartMonth: string;

    /** 结束账期 */ 
    public EndMonth: string;

    /** 计算基数（0：水费，1：水费余额差） */ 
    public BaseType: number;

    /** 计算比例 */ 
    public CalcPercent: number;

    /** 最大金额类型，0：固定金额，1：不超本金最大比例 */ 
    public MaxType: number;

    /** 最大值， */ 
    public MaxLine: number;

    /** 最小金额类型，0：固定金额，1：不低于水费金额比例 */ 
    public Mnumberype: number;

    /** 最小金额类型，0：固定金额，1：不低于水费金额比例 */ 
    public MinType: number;

    /** 最小值 */ 
    public MinLine: number;

    /** 组织代码 */ 
    public CpCode: string;

    public constructor(props?: { [key in keyof CalcLateFeeRuleDetail]?: CalcLateFeeRuleDetail[key]}) {
        props && proxySetObject(this, props);
    };

}

export { CalcLateFeeRuleDetail };
