import { CalcLateFeeRule } from "../entity/calcLateFeeRule";
import { CalcLateFeeRuleDetail } from "../entity/calcLateFeeRuleDetail";


interface ILateFeeParamDetailProps {
    
    detail: CalcLateFeeRule;

    usercategory?: any[];
    
    onChange: (value: any, key: keyof CalcLateFeeRule)=> void;

    onDetailChange: (value: any, key: keyof CalcLateFeeRuleDetail)=> void;
    
}

export { ILateFeeParamDetailProps };

