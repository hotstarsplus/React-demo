import { proxySetObject } from "../../../common/utilFunctions/utilFunctions";
import { CalcLateFeeRuleDetail } from "./calcLateFeeRuleDetail";


/** 违约金计算规则（算与不算） */
class CalcLateFeeRule
{
    /** 规则id */
    public AutoId: number;

    /** 规则名称 */
    public RuleName: string;

    /** 规则内容 */
    public RuleContent: string;

    /** 排序序号，计算优先级，数字越大优先级越高 */
    public SortNo: number;

    /** 是否计算违约金 */
    public IsCalcFee: boolean;

    /** 组织代码 */
    public CpCode: string;

    /** 创建时间 */
    public CreateTime: string;

    /** 创建人 */
    public OperatorId: string;

    /** 是否启用，0：未启用，1：启用 */
    public IsUsing: string;

    /** 规则详情 */
    public Detail: CalcLateFeeRuleDetail;

    public constructor(props?: { [key in keyof CalcLateFeeRule]?: CalcLateFeeRule[key]}) {
        props && proxySetObject(this, props);
    };

}

export { CalcLateFeeRule };
