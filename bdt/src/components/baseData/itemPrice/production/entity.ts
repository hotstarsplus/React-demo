




export class WaterProduction{

    /**
     * 产品ID
     */
    public ProductId:string;

    /**
     * 产品类型ID
     */
    public ProductTypeId:string;

    /**
     * 产品类型名称
     */
    public ProductTypeName:string;

    /**
     * 水费项目ID
     */
    public WaterFeeItemId:string;


    /**
     * 用水性质ID
     */
    public WaterKindId:string;

    /**
     * 用水性质名称
     */
    public WaterKindName:string;

    /**
     * 水费项目名称
     */
    public WaterFeeItemName:string;

    /**
     * 计费类型ID
     */
    public CalcFeeTypeId:string;

    /**
     * 计费类型名称
     */
    public CalcFeeTypeName:string;

    /**
     * 单价
     */
    public ActualPrice:number;

    /**
     * 会计科目
     */
    public AccountCode:string;

    /**
     * 是否随机收费项目
     */
    public IsRandClacFee:string;

    /**
     * 是否由系统计费
     */
    public IsSystemClacFee:string;

    /**
     * 是否删除
     */
    public IsDelete:string;

    /**
     * 是否增值税
     */
    public IsAddedTax:string;

    /**
     * 是否计算违约金
     */
    public IsCalcLateFee:string;

    constructor(){
        this.ProductId='';
        this.ProductTypeId='';
        this.ProductTypeName='';
        this.WaterFeeItemId='';
        this.WaterKindId='';
        this.WaterKindName='';
        this.WaterFeeItemName='';
        this.CalcFeeTypeId = '';
        this.CalcFeeTypeName = '';
        this.ActualPrice = 0;
        this.AccountCode = '';
        this.IsRandClacFee = '';
        this.IsSystemClacFee = '';
        this.IsDelete='';
        this.IsAddedTax='';
        this.IsCalcLateFee = '';
    }

}