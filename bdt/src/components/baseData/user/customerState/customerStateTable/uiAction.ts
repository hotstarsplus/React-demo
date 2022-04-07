import {action} from 'mobx';
import {CustomerStateDomainStore} from '../domainStore'
import {ICustomerStateTableViewProps} from './interface'

export class CustomerStateTableViewUiAction{
    private domainStore:CustomerStateDomainStore;

    constructor(props:ICustomerStateTableViewProps){
        this.domainStore=props.GlobalCustomerStateStore!
    }

    @action
    public loadData(){
        this.domainStore.loaddata();
    }
}