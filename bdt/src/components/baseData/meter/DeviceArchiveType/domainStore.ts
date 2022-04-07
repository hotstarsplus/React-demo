import { action, observable } from "mobx";
import { OridStores, requestJson } from "orid";
import { DeviceArchiveType } from "./entity";


export class DeviceArchiveTypeDoMainStore{
    /** 切换的企业名称 */
    @observable
    public CompanyName:string=''

    /**
     * 项目集合
     */
    @observable
    public list:DeviceArchiveType[];

    /**
     * 是否正在加载
     */
    @observable
    public isLoading:boolean=true;
    @observable
    public CompanyNameData:any[]=[]
    @observable
    public InfoName:string=''
    @observable
    public Name:string=''

    /**
     * 构造方法
     */
    constructor(){
        this.list=Array<DeviceArchiveType>();
    }
    @action
    public getCompanyName=async ()=>{
        this.CompanyNameData=[]
        this.CompanyName=''
        this.InfoName=''
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
    public async loadData(callBack?:(list:DeviceArchiveType[])=>void){
        try {
            if (!this.isLoading) {
                this.isLoading = true;
            }
            this.list = new Array<DeviceArchiveType>();
            const res:any = await requestJson('/api/bdt/DeviceArchiveType/List?cpCode='+this.CompanyName,{
                method:"GET"
            });
            if (res.rtnCode!==0) {
                console.log(res.rtnMsg);
                this.isLoading = false;
                return;
            }else{
                const datas = res.data as DeviceArchiveType[];
                this.list=datas;
                this.isLoading = false;
            }
            if (callBack) {
                callBack(this.list);
                this.isLoading = false;
            }
        } catch (error) {
            console.log(error);
        }
    }
}