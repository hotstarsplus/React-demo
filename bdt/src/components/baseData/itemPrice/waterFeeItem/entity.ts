import { observable } from 'mobx';

/**
 * 水费项目接口
 */
export interface IWaterFeeItem {
    WaterFeeItemId: string;
    WaterFeeItemName: string;
}

/**
 * 水费项目实体类
 */
export class WaterFeeItem implements IWaterFeeItem {

    /**
     * 水费项目Id
     */
    @observable
    public WaterFeeItemId: string;

    /**
     * 水费项目名称
     */
    @observable
    public WaterFeeItemName: string;


    /**
     * 子集合 
     */
    public children?:WaterFeeItem[];

    /**
     * 
     * @param {string} id 水费项目Id
     * @param {string} name 水费项目名称
     */
    constructor(id: string = '', name: string = '') {
        this.WaterFeeItemId = id;
        this.WaterFeeItemName = name;
    }
}
