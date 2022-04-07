import { action, observable } from "mobx";
import { IResponseJsonResult, OridStores, requestJson } from "orid";
import { CompanyDrawer, CompanyInvoice, ICpDept } from "./entity";




export class CompanyDrawerDomainStore{

    @observable
    public value:string;
    /** 切换的企业名称 */
    @observable
    public CompanyName:string=''
    @observable
    public CheckAll:boolean=false
    /**
     * table表中的企业ID
     */
    @observable
    public CompanyId:string;
    @observable
    public CompanyCpCode:string='';

    /**
     * 企业信息集合
     */
    @observable
    public CompanyInvoiceList:CompanyInvoice[];

    /**
     * 正在加载
     */
    @observable
    public Loading:boolean;

    /**
     * 当前正在编辑的项目
     */
    @observable
    public CurrentEditItem:CompanyInvoice;

    /**
     * 部门列表
     */
    @observable
    public CpDeptList:ICpDept[];

    /**
     * 企业开票人集合
     */
    @observable
    public CompanyDrawerList:CompanyDrawer[];
    @observable
    public CompanyNameData:any[]=[]
    @observable
    public InfoName:string=''
    @observable
    public Name:string='';
    /** 新增按钮显示隐藏 */
    @observable
    public isShowAddBtn:boolean;


    constructor(){
        this.value="";
        this.CompanyId="";
        this.CompanyInvoiceList = new Array<CompanyInvoice>();
        this.CompanyDrawerList = new Array<CompanyDrawer>();
        this.Loading = false;
        this.CurrentEditItem = new CompanyInvoice();
        this.CpDeptList = new Array<ICpDept>();
        this.LoadData = this.LoadData.bind(this);
        this.DeleteCompany = this.DeleteCompany.bind(this);
        this.AddCompanyInfo = this.AddCompanyInfo.bind(this);
        this.LoadCpDept = this.LoadCpDept.bind(this);
        this.isShowAddBtn = true;
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
                const data = [];
                data.push(res.data);
                this.CompanyNameData = data;
                console.log("获取到数据",this.CompanyNameData)
                this.CompanyName=OridStores.authStore.currentOperator.CpCode
                this.Name=OridStores.authStore.currentOperator.CpCode
                this.LoadData()
            }
            
            
        console.log('111',this.CompanyNameData)
        } catch (error) {
            console.log(error)
        }
    }



    public async LoadData(){
        this.CompanyInvoiceList=[]

        try {
            
            this.Loading = true;

            if (this.CompanyInvoiceList.length>0) {
                this.CompanyInvoiceList.splice(0,this.CompanyInvoiceList.length);
            }

            const res = await requestJson("/api/bdt/CompanyInvoice/List?cpCode="+this.CompanyName,
                {
                    method:"GET"
                }
            )

            if (res.rtnCode===0) {

                const datas = res.data as CompanyInvoice[];

                this.CompanyInvoiceList=datas;
                
                if(this.CompanyInvoiceList.length>0){
                    this.isShowAddBtn = false;
                }else{
                    this.isShowAddBtn = true;
                }
                
                this.LoadCpDept()
            }

            this.Loading = false;


        } catch (error) {
            console.log(error);
            this.Loading = false;
        }

    }
    

    public async DeleteCompany(id:string):Promise<IResponseJsonResult>{

        try {
            
            this.Loading = true;

            const ix = this.CompanyInvoiceList.findIndex(x=>x.CompanyId===id);

            if (ix<0) {
                return {rtnCode:1,rtnMsg:"删除的数据不存在"}
            }

            const res = await requestJson("/api/bdt/CompanyInvoice/Delete/"+id+'?cpCode='+this.CompanyName,
                {
                    method:"POST",
                    headers:{"content-type": "application/json"}
                }
            )

            if (res.rtnCode===0) {
                
                this.CompanyInvoiceList.splice(ix,1);

                if(this.CompanyInvoiceList.length>0){
                    this.isShowAddBtn = false;
                }else{
                    this.isShowAddBtn = true;
                }

            }

            this.Loading = false;

            return res

        } catch (error) {
            this.Loading = false;
            return {rtnCode:1,rtnMsg:error.toString()}
        }


    }


    public async AddCompanyInfo(data:CompanyInvoice):Promise<IResponseJsonResult>{
        data.CpCode=this.CompanyName

        try {

            this.Loading = true;

            const res = await requestJson("/api/bdt/CompanyInvoice/Add",
                {
                    body:JSON.stringify(data),
                    method:"POST",
                    headers:{"content-type": "application/json"}
                }
            )

            if (res.rtnCode===0) {
                const id = res.data as any;
                data.CompanyId = id;
                this.CompanyInvoiceList.push(data);
                this.isShowAddBtn = false;
            }

            this.Loading = false;
            return res;


        } catch (error) {
            console.log(error);
            this.Loading = false;
            return {rtnCode:1,rtnMsg:error.toString()}
        }

    }


    public async UpdateCompanyInfo(data:CompanyInvoice):Promise<IResponseJsonResult>{
        data.CpCode=this.CompanyName

        try {

            this.Loading = true;

            const ix = this.CompanyInvoiceList.findIndex(x=>x.CompanyId===data.CompanyId);

            if (ix<0) {
                return {rtnCode:1,rtnMsg:"修改的数据不存在"}
            }

            const res = await requestJson("/api/bdt/CompanyInvoice/Update",
                {
                    body:JSON.stringify(data),
                    method:"POST",
                    headers:{"content-type": "application/json"}
                }
            )

            if (res.rtnCode===0) {
                
                this.CompanyInvoiceList[ix] = data;

            }

            this.Loading = false;
            return res;
            
        } catch (error) {
            console.log(error);
            this.Loading = false;
            return {rtnCode:1,rtnMsg:error.toString()}
        }


    }



    public async LoadCpDept(){
        
        try {
            
            if (this.CpDeptList.length>0) {
                this.CpDeptList.splice(0,this.CpDeptList.length);
            }

            const res = await requestJson("/api/sys/CpDept/GetList?cpCode="+this.CompanyName,
                {
                    method:"GET"
                }
            )

            if (res.rtnCode===0) {
                
                const datas = res.data as ICpDept[];

                this.CpDeptList=datas;

            }



        } catch (error) {
            console.log(error);
        }

    }



    public async GetCompanyDrawer(deptId:string){
        let unchecked:boolean=false
        this.CheckAll=false

        try {
            
            if (this.CompanyDrawerList.length>0) {
                this.CompanyDrawerList.splice(0,this.CompanyDrawerList.length);
            }

            const res = await requestJson("/api/bdt/CompanyDrawer/List/"+deptId+'?cpCode='+this.CompanyCpCode,
                {
                    method:"GET"
                }
            )


            if (res.rtnCode===0) {
                const datas = res.data as CompanyDrawer[];
                this.CompanyDrawerList=datas;
                this.CompanyDrawerList.map((element:any)=>{
                    if(element.IsDelete!=='0'){
                        unchecked=true
                    }
                })
                if(!unchecked){
                    this.CheckAll=true
                }
            }
           


        } catch (error) {
            console.log(error);
        }

    }


    public async SaveCompanyDrawer(id:string):Promise<IResponseJsonResult>{

        try {

            const res = await requestJson("/api/bdt/CompanyDrawer/Save?cpCode="+this.CompanyCpCode,
                {
                    body:JSON.stringify({Item1:id,Item2:this.CompanyDrawerList}),
                    method:"POST",
                    headers:{"content-type": "application/json"}
                }
            )

            return res;

        } catch (error) {
            console.log(error);
            return {rtnCode:1,rtnMsg:error.toString()}
        }

    }


}