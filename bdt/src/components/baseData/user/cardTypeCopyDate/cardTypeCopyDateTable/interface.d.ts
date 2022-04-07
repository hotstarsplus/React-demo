import {CardTypeCopyDateDomainStore} from '../domainStore';
import {CardTypeCopyDateModel} from '../entity';

export interface ICardTypeCopyDateTableViewProps{
    afterDelete?:()=>void

    GlobalCardTypeCopyDateStore?:CardTypeCopyDateDomainStore;

    onEdit:(item:CardTypeCopyDateModel)=>void,
}