


/**
 * 票据类型实体类
 */
export class BillTypeMenu{
    public BillTypeId:string;
    public BillTypeName:string;
}

export class WaterProduct{

    /**
     * 产品ID
     */
    public ProductId:string;

    /**
     * 水费项目ID
     */
    public ProductItemId:string;


    /**
     * 用水性质ID
     */
    public ProductKindId:string;

    /**
     * 用水性质名称
     */
    public ProductKindName:string;
    public CpCode:string;

    /**
     * 水费项目名称
     */
    public ProductItemName:string;

    /**
     * 业务类型Id
     */
    public BusinessTypeId:number;

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
    public ActualPrice:number|string;

    /**
     * 票据类型
     */
    public BillTypeId:string;

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
        this.ProductItemId='';
        this.ProductKindId='';
        this.ProductKindName='';
        this.ProductItemName='';
        this.BusinessTypeId=0;
        this.CalcFeeTypeId = '';
        this.CalcFeeTypeName = '';
        this.ActualPrice = 0;
        this.AccountCode = '';
        this.IsRandClacFee = '';
        this.IsSystemClacFee = '';
        this.IsDelete='';
        this.IsAddedTax='';
        this.IsCalcLateFee = '';
        this.BillTypeId='';
    }

}