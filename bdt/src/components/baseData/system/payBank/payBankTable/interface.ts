import { PayBankUiStore } from "../uiStore";
import { PayBank } from "../entity";




export interface IPayBankTableProps {

    /** 数据源 */
    GlobalPayBankStore?: PayBankUiStore
    /** 删除之后的回调函数 */
    afterDelete?: () => void;
    /** 编辑 */
    onEdit: (model: PayBank) => void;
    /** 增加 */
    onAdd: (model: PayBank) => void;
    /** 删除 */
    onDelete: (model: PayBank) => void;

}