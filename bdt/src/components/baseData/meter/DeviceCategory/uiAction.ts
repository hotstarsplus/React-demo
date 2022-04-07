import { action, observable } from "mobx";
import { DeviceCategoryDoMainStore } from "./domainStore";
import { IDeviceCategoryProps } from "./interface";

export class DeviceCategoryListUiAction{

    /**
     * 是否显示编辑视图
     */
    @observable
    public isVisiableModal:boolean;
    @observable
    public dialogShowName:string;

    public props:IDeviceCategoryProps;

    private domainStore:DeviceCategoryDoMainStore;


    constructor(props:IDeviceCategoryProps){
        this.domainStore = props.GlobalDeviceCategoryStore!;
        this.props=props;
        this.isVisiableModal = false;
        this.cancel=this.cancel.bind(this);
        this.Check=this.Check.bind(this);
        this.selectedContent=this.selectedContent.bind(this)
    }

    /**
     * 取消
     */
    @action
    public cancel(){

        this.isVisiableModal = false;

    }
    /**
     * 选择企业名称查询
     */
    @action
    public selectedContent(value:any){
        this.domainStore!.Name=value
        const that=this
        getName(this.domainStore!.CompanyNameData,that)
        function getName(list:any,thats:any){
            list.map((element:any)=>{
                if(String(value)===String(element.OrganitionCode)){
                    thats.domainStore!.InfoName=element.OrganizationName
                }
                if(element.Children){
                    getName(element.Children,thats)
                }
            })
        }
        console.log('企业名称:',this.domainStore!.CompanyName)
    }

    @action
    public Check(){
        console.log("enter check");
        this.isVisiableModal = true;
        this.dialogShowName = this.domainStore!.showName;
        console.log("dialogShowName >>> "+this.dialogShowName);

    }

}