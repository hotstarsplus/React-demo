import {action,observable} from 'mobx';
import {requestJson} from 'orid';
import{ CustomerState } from './entity'


export class CustomerStateDomainStore{
    @observable
    public list:CustomerState[];

    @observable
    public currentEditItem:CustomerState;

    @observable
    public isLoading:boolean=true;

constructor(){
    this.list=Array<CustomerState>();
    this.currentEditItem=new CustomerState();
}
    @action
    public async loaddata(fn?:(list:CustomerState[])=>void){
        try {
            if(!this.isLoading){
                this.isLoading=true;
            }
            this.list=new Array<CustomerState>();
            const res=await requestJson('/api/bdt/user/CustomerState',{
                method:"Get"
            });
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                return;
            }

            const datas=res.data as CustomerState[];
            this.list.push(...datas);
            this.isLoading=false;
            if(fn){
                fn(this.list);
            }
        } catch (error) {
            console.log(error);
        }
        this.currentEditItem=new CustomerState();
    }
    public validate(values: CustomerState): string | undefined{
        return undefined;
    }
}