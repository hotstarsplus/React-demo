// import {observable} from 'mobx';
/**
 * 自定义的水费项目接口()
 */
export interface IWaterRateItemType {
    ItemTypeId: string;
    ItemTypeName: string;
}

/**
 * 自定义的水费项目类型实体类
 */
export class WaterRateItemType implements IWaterRateItemType {

    /**
     * 水费项目类型Id。该Id为系统自动生成
     */
    // @observable
    public ItemTypeId: string;

    /**
     * 水费项目类型名称
     */
    // @observable
    public ItemTypeName: string;

    constructor(id: string = '', name: string = '') {
        this.ItemTypeId = id;
        this.ItemTypeName = name;
    }
}
