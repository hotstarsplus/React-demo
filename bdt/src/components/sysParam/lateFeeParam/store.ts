import { CalcLateFeeRule } from "./entity/calcLateFeeRule";






class LateFeeParamStore {

    public LateFeeRules: CalcLateFeeRule[];

    public thenLateFeeRule?: CalcLateFeeRule;

    public pageLoading: boolean;

    public ThenCalcFee: boolean;
    
    public userCategoryTree: any[];

    public constructor() {
        this.LateFeeRules = [];
        this.pageLoading = false;
        this.ThenCalcFee = false;
        this.userCategoryTree = [];
    }

}

export { LateFeeParamStore };