import { WaterRateItemTypeDomainStore } from '../doMainStore';
import { WaterRateItemType } from '../entity';

export interface IWaterRateItemTypeTableViewProps {
   
    /**
     * 删除之后触发的回调方法
     */
    afterDelete?: () => void

    /**
     * 业务store
     */
    GlobalWaterRateItemTypeStore?: WaterRateItemTypeDomainStore,

    /**
     * 点击编辑后的回调方法
     */
    onEdit: (item:WaterRateItemType) => void,
}