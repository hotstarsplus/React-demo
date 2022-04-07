import {CustomerTypeDomainStore} from '../domainStore';
import {CustomerTypeModel} from '../entity';

export interface ICustomerTypeTableViewProps{
    /**
     * 删除之后的回调方法
     */
    afterDelete?:()=>void

    /**
     * 业务store
     */
    GlobalCustomerTypeStore?:CustomerTypeDomainStore;

    /**
     * 点击编辑之后的回调方法
     */
    onEdit:(item:CustomerTypeModel)=>void,
}