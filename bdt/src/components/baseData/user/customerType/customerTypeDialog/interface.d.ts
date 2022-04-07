import { CustomerTypeDomainStore } from '../domainStore';
import { CustomerTypeModel } from '../entity';

export interface ICustomerTypeDiaLogProps{
    GlobalCustomerTypeStore?:CustomerTypeDomainStore,

    /**
     * 取消时的回调方法
     */
    handCancel:() => void,
    /**
     * 确定时的回调方法
     * @param {CustomerTypeModel} CustomerTypeModel 新增返回的项目
     */
    handleOk:(CustomerTypeModel:CustomerTypeModel) => void,
    /**
     * 编辑视图是否显示
     */
    visible: boolean

    /**
     * 对话框标题
     */
    title:string;
}

