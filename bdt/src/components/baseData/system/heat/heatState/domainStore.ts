import {  action,observable, } from "mobx";
import { OridStores, requestJson } from "orid";
import { HeatState } from "./entity";

  
export class HeatStateDomainStore{
    @observable
    public list : HeatState[];

    @observable
    public currentEditItem:HeatState;

    @observable
    public isLoading:boolean=true;
    /** 切换的企业名称 */
    @observable
    public CompanyName:string=''
    @observable
    public CompanyNameData:any[]=[]
    @observable
    public InfoName:string=''
    @observable
    public Name:string=''

    constructor(){
        this.list=Array<HeatState>();
        this.currentEditItem=new HeatState();
    }
    @action
    public getCompanyName=async ()=>{
        this.CompanyNameData=[]
        this.InfoName=''
        this.CompanyName=''
        this.Name=''
        try {
            const res = await requestJson('/api/sys/Organization/organizationtree');
            if(res.rtnCode===0){
                this.InfoName=res.data.OrganizationName
                this.CompanyNameData.push(res.data)
                this.CompanyName=OridStores.authStore.currentOperator.CpCode
                this.Name=OridStores.authStore.currentOperator.CpCode
                this.loadData()
            }
            
            
        console.log('111',this.CompanyNameData)
        } catch (error) {
            console.log(error)
        }
    }

    @action
    public async loadData(
        fn?:(list:HeatState[])=>void
        ){
        try {
            if(!this.isLoading){
                this.isLoading=true;
            }
            this.list=new Array<HeatState>();
            const res=await requestJson('/api/bdt/HeatingState/GetList?cpCode='+this.CompanyName,{
                method:"Get"
            });
            if(res.rtnCode!==0){
                this.isLoading=false;
                console.log(res.rtnMsg);
                return;
            }

            const datas=res.data as HeatState[];
            this.list=datas;
            this.isLoading=false;
            if(fn){
                fn(this.list)
            }
        } catch (error) {
            this.isLoading=false;
            console.log(error);
        }
        this.currentEditItem=new HeatState();
    }
    public validate(value: HeatState):string | undefined {
        return undefined;
    }
}