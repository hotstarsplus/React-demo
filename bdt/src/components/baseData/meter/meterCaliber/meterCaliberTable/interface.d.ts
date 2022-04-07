import { MeterCaliberUiStore } from '../uiStore';
import { MeterCaliber } from '../entity';

export interface IMeterCaliberTableViewProps {
    /**
     * 删除之后触发的回调方法
     */
    afterDelete?: () => void
    /**
     * 业务store
     */
    GlobalMeterCaliberStore?: MeterCaliberUiStore,
    /**
     * 点击编辑后的回调方法
     */
    onEdit: (item: MeterCaliber) => void,
    /**
     * 加载数据
     */
    loadData: () => void;
}