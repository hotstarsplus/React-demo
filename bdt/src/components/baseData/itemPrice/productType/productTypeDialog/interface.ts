import { ProductTypeDomainStore } from "../domainStore";
import { ProductType } from "../entity";



export interface IProductTypeDialogProps{

    GlobalProductTypeStore?:ProductTypeDomainStore;

    /**
     * 取消时的回调方法
     */
    handleCancel:() => void,

    /**
     * 点击ok时的回调函数
     */
    handleOk:(item:ProductType) => void,

    /**
     * 编辑视图是否显示
     */
    visible: boolean
    /**
     * 对话框标题
     */
    title:string;

}