import { action } from "mobx";
import { HeatStateDomainStore } from "../domainStore";
import { IHeatStateTableViewProps } from "./interface";

export class HeatStateTableViewUiAction{
    private domianStore:HeatStateDomainStore
    constructor(props:IHeatStateTableViewProps){
        this.domianStore=props.GlobalHeatStateStore!;
        this.selectedContent=this.selectedContent.bind(this)
    }
    /** 企业名称切换 */
    @action
    public selectedContent(value:any){
        this.domianStore.Name=value
        const that=this
        getName(this.domianStore!.CompanyNameData,that)
        function getName(list:any,thats:any){
            list.map((element:any)=>{
                if(String(value)===String(element.OrganitionCode)){
                    thats.domianStore!.InfoName=element.OrganizationName
                }
                if(element.Children){
                    getName(element.Children,thats)
                }
            })
        }
        console.log('企业名称切换:',this.domianStore.CompanyName)
    }

    @action
    public loadData(){
        this.domianStore.loadData();
    }
}