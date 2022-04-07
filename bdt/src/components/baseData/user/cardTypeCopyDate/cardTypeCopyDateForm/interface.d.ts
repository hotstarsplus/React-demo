import { FormComponentProps } from 'antd/lib/form';
import { CardTypeCopyDateDomainStore } from '../domainStore';
import {CardTypeCopyDateFormUiAction} from './uiAction';
import {CardTypeCopyDateModel} from '../entity';

export interface ICardTypeCopyDateFormProps extends FormComponentProps{
    store:CardTypeCopyDateDomainStore

    getAction:(Action:CardTypeCopyDateFormUiAction)=>void,
}