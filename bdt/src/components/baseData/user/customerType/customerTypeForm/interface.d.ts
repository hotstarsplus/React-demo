import { FormComponentProps } from 'antd/lib/form';
import { CustomerTypeDomainStore } from '../domainStore';
import {CustomerTypeFormUiAction } from './uiAction';
import { CustomerTypeModel } from '../entity';

export interface ICustomerTypeFormProps extends FormComponentProps{
    store:CustomerTypeDomainStore
    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法,将内部的Action传递给父组件
     */
    getAction:(Action:CustomerTypeFormUiAction)=>void,
}