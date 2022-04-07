import { action,observable  } from "mobx";
import { OridStores, requestJson } from "orid";
import { DeviceCategoryCommonField } from "../DeviceCategoryCommonField/entity";
import { DeviceCategory } from "./entity";


export class DeviceCategoryDoMainStore{
    /**
     * 项目集合
     */
    @observable
    public list:DeviceCategory[];

    /**
     * 是否正在加载
     */
    @observable
    public isLoading:boolean=true;

    @observable
    public currentItem:DeviceCategoryCommonField[];

    @observable
    public showName:string;
    /** 切换的企业名称 */
    @observable
    public CompanyName:string=''
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
        this.list = Array<DeviceCategory>();
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
    public async loadData(callBack?: (list:DeviceCategory[])=>void){
        try {
            if (!this.isLoading) {
                this.isLoading = true;
            }
            this.list = new Array<DeviceCategory>();
            const res:any = await requestJson('/api/bdt/DeviceCategory/GetCategoryList?cpCode='+this.CompanyName,{
                method:"GET"
            });
            if (res.rtnCode!==0) {
                console.log(res.rtnMsg);
                return;
            }else{
                const datas = res.data as DeviceCategory[];
                this.list=datas;
                this.isLoading = false;
            }
            if (callBack) {
                callBack(this.list);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 设置指定类型ID的银行为当前编辑的类型
     * @param id 类型ID
     */
    @action
    public SelectedCategory(id: string): boolean {
        try {
            this.recursionSelect(id, this.list);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * 
     * 递归找到选中的数据
     */
    @action
    private recursionSelect(itemId: string, list: DeviceCategory[]) {
        list.forEach((entity, index, array) => {
            if (itemId === entity.CategoryId) {
                this.currentItem = entity.CommonFields;
                this.showName = entity.CategoryName;
                console.log("showName is "+this.showName);
            } 
        });
    }

}



