import { QuantityTapyUiStore } from '../uiStore';
import { QuantityTapy } from '../entity';

export interface IQuantityTapyTableViewProps {
    /**
    * 业务store
    */
    GlobalQuantityTapyStore?: QuantityTapyUiStore;
    /**
     * 删除之后触发的回调方法
     */
    afterDelete?: () => void;
    /**
     * 点击编辑后的回调方法
     */
    onEdit: (item: QuantityTapy) => void;
    /** 移除水量类型 */
    onRemove: (id: string) => void;

    selectItem: (id: string) => boolean;
}