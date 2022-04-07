import { WaterFeeItemDomainStore } from '../domainStore';
import { WaterFeeItem } from '../entity';

export interface IWaterFeeItemTableViewProps {
   
    /**
     * 删除之后触发的回调方法
     */
    afterDelete?: () => void

    /**
     * 业务store
     */
    GlobalWaterFeeItemStore?: WaterFeeItemDomainStore,

    /**
     * 点击编辑后的回调方法
     */
    onEdit: (item:WaterFeeItem) => void,
}