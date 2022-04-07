import { ProductItemUiStore } from '../uiStore';

export interface IProductItemTableViewProps {

    /**
     * 删除之后触发的回调方法
     */
    afterDelete?: () => void

    /**
     * 业务store
     */
    GlobalProductItemStore?: ProductItemUiStore

    /**
     * 点击编辑后的回调方法
     */
    onEdit: (id: string) => void

    onDelete: (id: string) => void
}