import { PayTypeUiStore } from "../uiStore";
import { PayType } from "../entity";


/**
 * 支付方式表格组件接口
 */
export interface IPayTypeTableProps {


    GlobalPayTypeStore?: PayTypeUiStore;

    /**
     * 删除之后的回调
     */
    afterDelete?: () => void;


    /**
     * 编辑之后的回调
     * @param 实体类
     */
    onEdit: (item: PayType) => void;

    SelectedItem: (id:string) =>boolean


}