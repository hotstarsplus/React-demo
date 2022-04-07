/**
 * 抄表参数--水量对比
 */
export class QuantityCompareParamEntity{
    /**
     * 是否启用水量对比参数
     */
    public QuantityCompareIsEnable:string;
    /**
     * 报警参考水量方式
     */
    public AlarmQuantity:string;
    /**
     * 参考水量上限
     */
    public ReferQuantityUp:string;
    /**
     * 参考水量下限
     */
    public ReferQuantityDown:string;

    /** 表读数归零时是否需要加1 */
    public IsCopyAddOne:string;

    /** 抄表之后不允许直接修改本次表底数 */
    public IsCanChangeAfterCopid:string;

    constructor(){
        this.QuantityCompareIsEnable="0";
        this.AlarmQuantity="1";
        this.ReferQuantityUp="0";
        this.ReferQuantityDown="0";
        this.IsCanChangeAfterCopid = '0';
        this.IsCopyAddOne = '0';
    }
}