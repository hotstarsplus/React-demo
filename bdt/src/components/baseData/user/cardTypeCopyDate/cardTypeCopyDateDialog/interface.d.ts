import { CardTypeCopyDateDomainStore } from '../domainStore';
import { CardTypeCopyDateModel } from '../entity';

export interface ICardTypeCopyDateDiaLogProps{
    GlobalCardTypeCopyDateStore?:CardTypeCopyDateDomainStore,

    /**
     * 取消时的回调方法
     */
    handCancel:()=>void,

    /**
     * 确定时的回调方法
     */
    handleOk:(CardTypeCopyDateModel:CardTypeCopyDateModel)=>void,

    /**
     * 编辑视图是否显示
     */
    visible:boolean,
    /**
     * 对话框标题
     */
    title:string,
}