/**
 * 预存款冲减
 */
export class PreSaveWriteOffParamEntity {
    /**
     * 冲减方式
     */
    public WriteOffType: '1' | '2' = '1';

    /**
     * 自动扣减
     */
    public AutoWriteOff: boolean = false;

    /** 扣减时间 */
    public WriteOffDate: WriteOffDate = new WriteOffDate();

}

export class WriteOffDate {

    /** 类型 */
    public DateType: '每周' | '每月' | '每天' = '每月';

    /** 时间 */
    public WriteOffTime: string = '';

    /** 开始时间 */
    public StartTime: number = 1;

    /** 结束时间 */
    public EndTime: number = 1;

    /** 单一时间 */
    public Time: number = 1;

    /** 时间类型 */
    public SelectType: '1' | '2' = '1';
}