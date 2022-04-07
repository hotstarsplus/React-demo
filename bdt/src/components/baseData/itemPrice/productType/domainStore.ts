import { action,observable } from "mobx";
import { OridStores, requestJson } from "orid";
import { ProductType, } from "./entity";



export class ProductTypeDomainStore{


    /**
     * 是否正在加载
     */
    @observable
    public IsLoading:boolean;

    /**
     * 当前正在编辑的实体
     */
    @observable
    public CurrentEditEntity:ProductType;

    /**
     * 产品类型数据集合
     */
    @observable
    public ProductTypeList:ProductType[];


    /**
     *  下拉选控件是否禁用
     */
    @observable
    public SelectorDisabled:boolean;
    @observable
    public CompanyNameData:any[]=[]
    @observable
    public CompanyName:string=''
    @observable
    public InfoName:string=''
    @observable
    public Name:string=''



    constructor(){
        this.ProductTypeList = new Array<ProductType>();
        this.CurrentEditEntity = new ProductType();
        this.IsLoading = true;
        this.LoadData = this.LoadData.bind(this);
        this.Add = this.Add.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Update = this.Update.bind(this);
        this.SelectRow = this.SelectRow.bind(this);
        this.recursionAdd = this.recursionAdd.bind(this);
        this.recursionDelete = this.recursionDelete.bind(this);
        this.recursionSelected = this.recursionSelected.bind(this);
        this.recursionUpdate = this.recursionUpdate.bind(this);
        this.SelectorDisabled = true;
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
                this.LoadData()
            }
            
            
        console.log('111',this.CompanyNameData)
        } catch (error) {
            console.log(error)
        }
    }


    /**
     * 加载数据
     */
    public async LoadData(){
        
        this.ProductTypeList=[]
        try {
            
            this.IsLoading = true;

            if(this.ProductTypeList.length>0){
                this.ProductTypeList.splice(0,this.ProductTypeList.length);
            }
            const result = await requestJson("/api/bdt/ProductType/TreeList?cpCode="+this.CompanyName,
                {
                    method:"GET"
                }
            );

            if(result.rtnCode===0){

                const datas = result.data as ProductType[];

                this.ProductTypeList=datas;

            }
            console.log(123);
            this.IsLoading = false;

        } catch (error) {
            this.IsLoading = false;
            console.log(error);
        }

    }


    /**
     * 添加一条数据
     */
    public async Add(item:ProductType):Promise<boolean>{

        this.IsLoading = true;
        item.CpCode=this.CompanyName
        try {

            const result = await requestJson("/api/bdt/ProductType/Add",
                {
                    method:"POST",
                    body:JSON.stringify(item),
                    headers:{"content-type": "application/json"}
                }
            );
            if(result.rtnCode===0){
                const id = result.data ;
                item.ProductTypeId = id!.toString();

                if(item.FatherId==="00"){
                    this.ProductTypeList.push(item);
                }else{
                    this.recursionAdd(this.ProductTypeList,item);
                }
                this.IsLoading = false;
                 return true ;
            }else{
                this.IsLoading = false;
                return false;
            }

        } catch (error) {
            this.IsLoading = false;
            console.log(error);
            return  false ;
        }
        
    }

    /**
     * 删除一条数据
     * @param item 删除的数据
     */
    public async Delete(item:ProductType):Promise<{}>{
       
        this.IsLoading = true;
       
        try {

            const result = await requestJson("/api/bdt/ProductType/Delete/"+item.ProductTypeId+'?cpCode='+this.CompanyName,
                {
                    method:"POST",
                    headers:{"content-type": "application/json"}
                }
            );
            
            if (result.rtnCode===0) {
                if(item!.FatherId==="00"){
                    const ix = this.ProductTypeList.findIndex((model:ProductType)=>{
                        return item.ProductTypeId === model.ProductTypeId
                    })
                    
                    if(ix<0){ return false;};
        
                    this.ProductTypeList.splice(ix,1);
                }else{
                    this.recursionDelete(this.ProductTypeList,item);
                }
               
            }else{
                this.IsLoading = false;
                return  false;
            }
            this.IsLoading = false;
            return true ;

            
         } catch (error) {
            this.IsLoading = false;
            console.log(error) ;
            return false ;
         }
       
    }

    /**
     * 更新一条数据
     * @param item 待更新的数据
     */
    public async Update(item:ProductType):Promise<boolean>{
     
        this.IsLoading = true;
        item.CpCode=this.CompanyName

        try {
            if (item.ProductTypeName===this.CurrentEditEntity.ProductTypeName) {
                this.IsLoading = false;
                return false;
            }

            const data = await requestJson("/api/bdt/ProductType/Update",
                {
                    method:"POST",
                    body:JSON.stringify(item),
                    headers: { "content-type": "application/json" }
                }
            );
        
            if(data.rtnCode===0){
                this.recursionUpdate(this.ProductTypeList,item);
            }else{
                this.IsLoading = false;
                return  false ;
            }
            this.IsLoading = false;
            return  true ;

        } catch (error) {
            this.IsLoading = false;
            console.log(error);
            return  false ;
        }
        
    }

  

    /**
     * 选中行
     * @param id 选中的ID
     */
    public SelectRow(id:string):boolean{
        try {
            
            this.recursionSelected(this.ProductTypeList,id);

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * 返回选中ID对应的实体
     * @param list 
     * @param id 
     */
    @action
    private recursionSelected(list:ProductType[], id:string){
         list.forEach((model:ProductType)=>{
           console.log(model.ProductTypeId,id,model.ProductTypeId===id);
            if (model.ProductTypeId === id) {
                this.CurrentEditEntity = model;
            }else if(model.children!==null&&model.children!==undefined&&model.children!.length>0){
                this.recursionSelected(model.children,id);
            }
        })
    }


    
    /**
     * 更新的实体
     */
    @action
    private recursionUpdate(list:ProductType[],model:ProductType){
        list.forEach((entity:ProductType)=>{
            if(entity.ProductTypeId===model.ProductTypeId){
                entity.ProductTypeName=model.ProductTypeName;
            }else if(entity.children!==null&&entity.children!==undefined&&entity.children.length>0){
                this.recursionUpdate(entity.children,model);
            }
        })        
        
    }




    /**
     * 递归删除
     * @param list 
     * @param id 
     */
    @action
    private recursionDelete(list:ProductType[],currentModel:ProductType){
        list.forEach((model:ProductType)=>{
            if(model.ProductTypeId===currentModel.FatherId){
                
                const ix = model.children!.findIndex((value:ProductType)=>{
                   return value.ProductTypeId===currentModel.ProductTypeId
                });

                if(ix<0){return ;};

                model.children!.splice(ix,1);
                if (model.children!.length===0) {
                    model.children = undefined;
                }              

            }else if(model.children!==null&&model.children!==undefined&&model.children.length>0){
                this.recursionDelete(model.children,currentModel);
            }
        });
    }




    /**
     * 递归增加数据
     */
    @action
    private recursionAdd(list:ProductType[],currentModel:ProductType){

        list.forEach((model:ProductType)=>{
            if(model.ProductTypeId===currentModel.FatherId){
                
                if (model.children!==undefined&&model.children!==null) {
                    model.children!.push(currentModel);
                }else{
                    model.children = new Array<ProductType>();
                    model.children!.push(currentModel);
                }

              

            }else if(model.children!==null&&model.children!==undefined&&model.children.length>0){
                this.recursionAdd(model.children,currentModel);
            }
        });

    }


}