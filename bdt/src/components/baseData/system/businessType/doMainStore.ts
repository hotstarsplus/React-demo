import { action, observable } from 'mobx';
import { IResponseJsonResult, OridStores, requestJson } from 'orid';
import { BusinessType } from "./entity";



/**
 *  业务类别store
 */
export class BusinessTypeDoMainStore {

    /**
     * 业务类型数组 
     */
    @observable
    public BusinessTypeList:BusinessType[];

    @observable
    public BusinessTypeLists:BusinessType[];

    /**
     *  当前编辑的项目
     */
    @observable
    public CurrentEditItem: BusinessType;

    @observable
    public treeData: any[]=[];

    /**
     * 业务类型及其产品性质
     */
    @observable
    public BusinessTypeAndProductKindList:BusinessType[];

    /**
     * 是否正在加载
     */
    @observable
    public Loading: boolean;
    /** 切换的企业名称 */
    @observable
    public CompanyName:string=''
    @observable
    public CompanyNameData:any[]=[]
    @observable
    public InfoName:string=''
    @observable
    public Name:string=''
    @observable
    public defaultKey:any=[]
    @observable
    public defaultKeys:any=[]
    /** 树结构展开节点 */
    @observable
    public expandedKeys:string[]

    /**
     *  构造方法
     */
    constructor() {
        this.expandedKeys = []
        this.BusinessTypeList = Array<BusinessType>()
        this.BusinessTypeLists = Array<BusinessType>()
        this.CurrentEditItem = new BusinessType();
        this.BusinessTypeAndProductKindList=new Array<BusinessType>();
        this.Loading = false;
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
    public getCompanyNames=async ()=>{
        this.CompanyNameData=[]
        this.CompanyName=''
        this.InfoName=''
        try {
            const res = await requestJson('/api/sys/Organization/organizationtree');
            if(res.rtnCode===0){
            this.InfoName=res.data.OrganizationName
            this.CompanyNameData.push(res.data)
            this.CompanyName=OridStores.authStore.currentOperator.CpCode
            this.loadDatass()
            }
            
        console.log('111',this.CompanyNameData)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     *  加载数据
     * @param callBack 回调函数
     */
    @action
    public async loadData() {
        try {

            this.Loading = true;

            if (this.BusinessTypeList.length>0) {
                this.BusinessTypeList.splice(0,this.BusinessTypeList.length);
            }

            const res = await requestJson("/api/bdt/BusinessType/List?cpCode="+this.CompanyName,
                {
                    method:"GET"
                }
            )

            if (res.rtnCode===0) {
                const datas = res.data as BusinessType[];
                this.BusinessTypeList=datas;
            }

            this.Loading = false;
            
        } catch (error) {
            this.Loading = false;
            console.log(error);
        }
    }
    @action
    public async getData() {
        this.treeData=[]
        try {

            this.Loading = true;

            if (this.treeData.length>0) {
                this.treeData.splice(0,this.treeData.length);
            }

            const res = await requestJson("/api/bdt/BusinessType/List",
                {
                    method:"GET"
                }
            )

            if (res.rtnCode===0) {
                const datas = res.data as BusinessType[];
                this.treeData=datas;
            }

            this.Loading = false;
            
        } catch (error) {
            this.Loading = false;
            console.log(error);
        }
    }
    @action
    public async loadDatass() {
        this.BusinessTypeLists=[]
        try {

            this.Loading = true;

            if (this.BusinessTypeLists.length>0) {
                this.BusinessTypeLists.splice(0,this.BusinessTypeList.length);
            }

            const res = await requestJson("/api/bdt/BusinessType/List?cpCode="+this.CompanyName,
                {
                    method:"GET"
                }
            )

            if (res.rtnCode===0) {
                const datas = res.data as BusinessType[];
                this.BusinessTypeLists=datas;
            }

            this.Loading = false;
            
        } catch (error) {
            this.Loading = false;
            console.log(error);
        }
    }
    @action
    public async loadDatas() {
        try {

            this.Loading = true;

            if (this.BusinessTypeList.length>0) {
                this.BusinessTypeList.splice(0,this.BusinessTypeList.length);
            }

            const res = await requestJson("/api/bdt/BusinessType/TreeList?cpCode="+OridStores.authStore.currentOperator.CpCode,
                {
                    method:"GET"
                }
            )

            if (res.rtnCode===0) {
                const datas = res.data as BusinessType[];
                this.BusinessTypeList=datas;
                console.log('BusinessTypeList',this.BusinessTypeList[0])
                this.defaultKey=[String(this.BusinessTypeList[0].BusinessTypeId+'+'+this.BusinessTypeList[0].CpCode+'+'+this.BusinessTypeList[0].IsOrganization)]
            }

            this.Loading = false;
            
        } catch (error) {
            this.Loading = false;
            console.log(error);
        }
    }

    /**
     *  加载数据
     * @param callBack 回调函数
     */
    @action
    public async loadBusinessAndProductKindList() {
        try {

            this.Loading = true;

            if (this.BusinessTypeAndProductKindList.length>0) {
                this.BusinessTypeAndProductKindList.splice(0,this.BusinessTypeAndProductKindList.length);
            }

            const res = await requestJson("/api/bdt/BusinessType/GetBusinessAndProductKindList",
                {
                    method:"GET"
                }
            )

            if (res.rtnCode===0) {
                const datas = res.data as BusinessType[];
                if(OridStores.authStore.currentOperator.IsMultiOrganization ){
                    if(datas.length!==0){
                        const expandedKeys:string[] = [];
                        expandedKeys.push(datas[0].BusinessTypeId.toString()+datas[0].BusinessTypeName)
                        this.expandedKeys = expandedKeys
                    }
                }else{
                    if(datas.length!==0){
                         const expandedKeys:string[] = [];
                         expandedKeys.push(datas[0].BusinessTypeId.toString())
                        this.expandedKeys = expandedKeys
                    }
                }
                
                this.BusinessTypeAndProductKindList=datas;
            }

            this.Loading = false;
            
        } catch (error) {
            this.Loading = false;
            console.log(error);
        }
    }


    /**
     * 更新
     * @param item 更新的数据
     */
    @action
    public async Update(item: BusinessType):Promise<IResponseJsonResult> {
        item.CpCode=this.CompanyName;
        console.log("item",item)
        try {

            this.Loading = true;

            const res = await requestJson("/api/bdt/BusinessType/Update",
                {
                    body:JSON.stringify(item),
                    method:"POST",
                    headers:{"content-type": "application/json"}
                }
            )

            if (res.rtnCode===0) {

                const data = res.data as BusinessType;

                this.BusinessTypeLists.forEach((model)=>{
                    if (model.BusinessTypeId===item.BusinessTypeId) {
                        model.BusinessTypeName = item.BusinessTypeName;
                        model.Description = item.Description;
                        model.IsEnable = item.IsEnable;
                        model.SortNo = item.SortNo;
                    }

                    if (data!==null&&data!==undefined&&data.BusinessTypeId===model.BusinessTypeId) {
                        model.SortNo = data.SortNo;
                    }
                    
                })                
            }


            this.Loading = false;

            return res;

        } catch (error) {
            return {rtnCode:1,rtnMsg:error.toString()}
        }
    }

    /**
     * @param id 选中项目的ID
     */
    @action
    public selectedItem(id: number): boolean {

        try {
            
            const item = this.BusinessTypeLists.find(x=>x.BusinessTypeId===id);

            this.CurrentEditItem = item!;

            return true;

        } catch (error) {
            return false;
        }
       
    }

}