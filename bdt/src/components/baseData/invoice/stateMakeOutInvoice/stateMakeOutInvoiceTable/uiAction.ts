import {action} from 'mobx';
import { StateMakeOutInvoiceDomainStore } from '../domainStore';
import {IStateMakeOutInvoiceTableViewProps} from './interface'

export class StateMakeOutInvoiceTableViewUiAction{
    private domainStore:StateMakeOutInvoiceDomainStore;
    constructor(props:IStateMakeOutInvoiceTableViewProps){
        this.domainStore=props.GlobalStateMakeOutInvoiceStore!
    }

    @action
    public loadData(){
        this.domainStore.loaddata();
    }
}