import { observable } from "mobx";

/**
 * 违约金参数
 */
export class LateFeeParamEntity {
    /**
     * 是否启用违约金
     */
    @observable
    public LateFeeIsEnable: string;
    /**
     * 是否启用违约金不超过本金的比例
     */
    @observable
    public IsLateFeeNoExceedFee: string;
    /**
     * 违约金不超过本金的比例
     */
    @observable
    public LateFeeNoExceedFeeProportion: string;
    /**
     * 是否启用违约金最小金额
     */
    @observable
    public IsLateFeeMinAmount: string;
    /**
     * 违约金最小金额
     */
    @observable
    public LateFeeMinAmount: string;
    @observable
    public CpCode: string;
    /**
     * 违约金计算基数
     * 1：根据水费金额计算违约金
     * 2：根据水费与余额之差计算违约金
     */
    @observable
    public LateFeeComputeBase: string;
    /**
     * 违约金计算比例
     */
    @observable
    public LateFeeComputeProportion: string;
    /**
     * 违约金起算日期方式
     * 1：抄表后第n天
     * 2：抄表月的下第n月第m天
     * 3：自定义违约金起算日期
     */
    @observable
    public LateFeeBeginDateType: string;
    /**
     * 违约金起算日期方式1-抄表后第n天
     */
    @observable
    public LateFeeBeginDateCopeMeterDay: string;
    /**
     * 违约金起算日期方式2-抄表月的下第n月
     */
    @observable
    public LateFeeBeginDateAfterCopyMeterMonth: string;
    /**
     * 违约金起算日期方式2-抄表月的下第m天
     */
    @observable
    public LateFeeBeginDateAfterCopyMeterDay: string;





}