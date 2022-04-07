import { message } from 'antd';
import { action, observable, } from "mobx";
import { OridStores, requestJson } from "orid";
import { ControlType } from "./entity";

export class ControlTypeDomainStore {
    /**
     * 控制方式的集合
     */
    @observable
    public list: ControlType[];

    /**
     *  当前编辑的项目
     */
    @observable
    public currentEditItem: ControlType;
    /** 切换的企业名称 */
    @observable
    public CompanyName:string=''

    /**
     * 是否正在加载
     */
    @observable
    public isLoading: boolean = false;
    @observable
    public InfoName:string=''
    @observable
    public Name:string=''

    /**
     * 最大排序号
     */
    @observable
    public maxSortNo: number;
    @observable
    public CompanyNameData:any[]=[]
    @observable
    public isVisibleModal:boolean=false

    /**
     * 构造方法
     */
    constructor() {
        this.list = Array<ControlType>();
        this.currentEditItem = new ControlType();
        this.isLoading = false;
        this.maxSortNo=0;
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
    
    /**
     * 加载数据
     * @param callBack 回调函数
     */
    @action
    public async loadData(
        callBack?: (list: ControlType[]) => void
    ) {
        try {
            if (!this.isLoading) {
                this.isLoading = true;
            }
            this.list = new Array<ControlType>();
            const res = await requestJson('/api/bdt/ControlType/GetList?cpCode='+this.CompanyName, {
                method: "Get"
            });
            if (res.rtnCode === 0) {
                const  datas= res.data as ControlType[];
                this.isLoading = false;
                this.list=datas;
                this.getMaxsortNo(datas);
                return;
            }else{
                this.isLoading = false;
                console.log("加载失败："+"返回码："+res.rtnCode+"返回信息："+res.rtnMsg);
                this.maxSortNo=1;
            }
            if (callBack) {
                callBack(this.list)
            }
        } catch (error) {

            this.isLoading = false;
            console.log(error);
        }
        this.currentEditItem = new ControlType();
    }

    
    public validata(value: ControlType): string | undefined {
        return undefined;
    }

    /**
     * 新增
     * @param item 添加的项目
     */
    @action
    public async Add(item: ControlType) {
        item.CpCode=this.CompanyName
        try {
            const res: any = await requestJson("/api/bdt/ControlType/AddRecord", {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "content-type": "application/json"
                }
            });
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                this.isLoading = false;
                return;
            } else {
                const datas = res.data.data as ControlType[];
                console.log("datas:", datas);
                this.list.splice(0, this.list.length);
                this.list=datas;
                this.isLoading = false;
                this.getMaxsortNo(datas);
                message.success("保存成功")
                this.isVisibleModal=false
            }
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }

    /**
     * 删除
     * @param id 需要删除的ID
     */
    @action
    public async Delete(id: string) {
        try {
            const index = this.getIndex(id);
            if (index < 0) {
                message.error("删除控制方式失败");
                return;
            } else {
                if (!this.isLoading) {
                    this.isLoading = true;
                }
                const res: any = await requestJson("/api/bdt/ControlType/DeleteRecord/" + id+'?cpCode='+this.CompanyName, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    }
                });
                if (res.rtnCode !== 0) {
                    const str: string = "返回的json中 rtnMsg 字段不是字符串"
                    if (res.rtnMsg === str) {
                        message.success("删除成功");
                        this.loadData();
                        return;
                    }
                    message.error(res.rtnMsg);
                    this.isLoading = false;
                } else {
                    message.success("删除成功");
                    this.loadData();
                }
            }
        } catch (error) {
            this.isLoading = false;

        }
    }
    /**
     * 更新
     * @param item 更新的数据
     */
    @action
    public async Update(item: ControlType) {
        item.CpCode=this.CompanyName
        try {
            const index = this.getIndex(this.currentEditItem.ControlTypeId);

            if (index < 0) {
                message.error("更新控制方式失败");
                return;
            } else {
                item.ControlTypeId = this.currentEditItem.ControlTypeId;
                /**
                 * 添加创建时间、创建人id、
                 * 自增id参数
                 */
                const CreateDate = 'CreateDate';
                const CreaterId = 'CreaterId';
                // const AutoId ='AutoId';
                item[CreateDate] = this.currentEditItem.CreateDate;
                item[CreaterId] = this.currentEditItem.CreaterId;
                // item[AutoId] = this.currentEditItem.AutoId;
                console.info(item);
                const res =await requestJson("/api/bdt/ControlType/UpdateRecord",{
                    method:"POST",
                    body:JSON.stringify(item),
                    headers:{ "content-type": "application/json" }
                });
                if(res.rtnCode!==0){
                    message.error(res.rtnMsg);
                    return;
                }else{
                    const datas = res.data as ControlType[];
                    console.log("datas:",datas);
                    this.list.splice(0,this.list.length);
                    this.list=datas;
                    this.isLoading = false;
                    this.getMaxsortNo(datas);
                    message.success("更新成功");
                    this.isVisibleModal=false
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    /**
     * 获取最大排序号
     */
    public getMaxsortNo(datas:any){
        const arr= datas.sort((a:any,b:any)=>a.SortNo-b.SortNo);
       if(datas.length>0){
        this.maxSortNo=arr[arr.length-1].SortNo;
        if(this.maxSortNo!==undefined||this.maxSortNo!==0){
            this.maxSortNo+=1;
        }else{
            this.maxSortNo=1;
        }
       }else{
        this.maxSortNo=1;
       }
                
                console.log(this.maxSortNo + "最大排序号");
    }
    /**
     * 选中的项目
     * @param id 选中项目的ID
     */
    @action
    public selectedItem(id:string):boolean{
    const item = this.getItem(id);   
        if (!item || item===null) {          
            return false;
        }else{
            this.currentEditItem = item;
            return true;
        }
    }
    
    /**
     * 验证数据
     * @param values 
     */
    public validate(values: ControlType): string | undefined {
        return undefined;
    }

    /**
     * 根据控制方式ID获取集合中的下标
     * @param id 控制方式Id
     */
    private getIndex(id:string):number{
        return this.list.findIndex((value:ControlType,index:number,list:ControlType[])=>{
            return  value.ControlTypeId === id
        })
    }
    /**
     * 根据ID对应的控制方式
     * @param id 项目ID
     */
    private getItem(id:string):ControlType|null{
        const index = this.getIndex(id);
        return index<0?null:this.list[index];
    }
}