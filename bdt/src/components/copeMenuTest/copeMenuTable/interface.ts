import { UserUiStore } from "../store";
import { CopeMenu } from "../entity";




export interface IUserTableProps {

    /** 数据源 */
    GlobalUserUiStore?: UserUiStore
    /** 删除之后的回调函数 */
    afterDelete?: () => void;
    /** 编辑 */
    onEdit: (model: CopeMenu) => void;
    /** 增加 */
    onAdd: (model: CopeMenu) => void;
    /** 删除 */
    onDelete: (model: CopeMenu) => void;

}