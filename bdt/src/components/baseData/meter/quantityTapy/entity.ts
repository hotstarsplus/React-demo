import { observable } from 'mobx';

/**
 * 水量类型接口
 */
export interface IQuantityTapy {
    AutoId: number;
    QuantityTypeId: string;
    QuantityTypeName: string;
    SortNo: number;
    Description: string;
    CreateDate: string;
    CreateId: string;
}

export class QuantityTapy implements IQuantityTapy {

    /**
     * 自增id
     */
    @observable
    public AutoId: number
    @observable
    public CpCode?: string;

    /**
     * 水量类型代码
     */
    @observable
    public QuantityTypeId: string;

    /**
     * 水量类型名称
     */
    @observable
    public QuantityTypeName: string;

    /**
     * 排序号
     */
    @observable
    public SortNo: number;

    /**
     * 备注
     */
    @observable
    public Description: string;

    /**
     * 创建时间
     */
    public CreateDate: string;

    /**
     * 创建人
     */
    public CreateId: string;

    /**
     * 构造
     */
    constructor() {
        this.AutoId = 0;
        this.QuantityTypeId = "";
        this.QuantityTypeName = "";
        this.SortNo = 1;
        this.Description = "";
        this.CreateDate = "";
        this.CreateId = "";
    }

}