import {observable} from 'mobx';
import {requestJson} from 'orid';
import { StateMakeOutInvoice } from './entity';


export class StateMakeOutInvoiceDomainStore{
    @observable
    public list:StateMakeOutInvoice[];

    @observable
    public CurrentEditItem:StateMakeOutInvoice;

    @observable
    public isLoading:boolean=true;

constructor(){
    this.list=Array<StateMakeOutInvoice>();
    this.CurrentEditItem=new StateMakeOutInvoice();
}    

public async loaddata(fn?:(list:StateMakeOutInvoice[])=>void){
    try{
        if(!this.isLoading){
            this.isLoading=true;
        }
        this.list=new Array<StateMakeOutInvoice>();
        const res=await requestJson('/api/bdt/invoice/InvoiceState',{
            method:"GET"
        });

        if(res.rtnCode!==0){
            console.log(res.rtnMsg);
            return;
        }
        const datas=res.data as StateMakeOutInvoice[];
        this.list.push(...datas);
        this.isLoading=false;
        if(fn){
            fn(this.list);
        }
    }catch(error){
        console.log(error);
    }
    this.CurrentEditItem=new StateMakeOutInvoice();
}
public validate(values: StateMakeOutInvoice): string | undefined{
    return undefined;
}
}


