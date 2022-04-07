import { message } from 'antd';
import { action,observable,  } from "mobx";
import { IResponseJsonResult,requestJson,  } from "orid";
import {  BillTypeMenu ,WaterProduct,} from "./entity";




export class WaterProductDoMainStore{

    /**
     * 票据类型菜单
     */
    @observable
    public BillTypeMenuList:BillTypeMenu[]
    
    // /**
    //  * 票据类型菜单源数据
    //  */
    // public BillTypeAllMenuListSource:BillTypeMenu[]
    /** 
     * 产品表数组
     */
    @observable
    public WaterProductList:WaterProduct[]
    @observable
    public CompanyCode:string=''

    /**
     * 是否显示票据类型（是增值税时，不可选择票据，票据类型默认传003）
     */
    @observable
    public IsShowBillType:boolean;

    /**
     * 正在加载
     */
    @observable
    public isLoading:boolean;

    /**
     * 当前正在编辑的产品表
     */
    @observable
    public CurrentEditItem:WaterProduct;

    /**
     * 构造
     */
    constructor(){

        this.IsShowBillType = false;

        this.WaterProductList = Array<WaterProduct>();

        this.CurrentEditItem = new WaterProduct();

        this.BillTypeMenuList = new Array<BillTypeMenu>();

        // this.BillTypeAllMenuListSource = new Array<BillTypeMenu>();

        this.OnWaterKindTreeNodeSearch = this.OnWaterKindTreeNodeSearch.bind(this);  

        // this.GetBillPrintTempLateByCpCode = this.GetBillPrintTempLateByCpCode.bind(this);

        this.SelectedRow = this.SelectedRow.bind(this);

        this.TruncateTable = this.TruncateTable.bind(this);

        this.Delete = this.Delete.bind(this);

        this.Add = this.Add.bind(this);

        this.isLoading = false;

        this.Update = this.Update.bind(this);

    }

    /**
     * 选择票据类型菜单
     */
    public async loadBillTypeMenu(){
        this.isLoading = true;
        const res = await requestJson(`/api/ims/InvoiceKind/GetList?cpCode=${this.CompanyCode}`,{
            method:"GET"
        })
        if(res.rtnCode!==0){
            message.error(res.rtnMsg);
            this.isLoading = false;
            return;
        }
        console.log(res.data);
        const data = res.data as BillTypeMenu[]
        const BillTypeMenuList:BillTypeMenu[] = []
        data.forEach((element:any)=>{
            // 排除种类及增值税专用票据及增值税电子专用票据
            if(element.FatherId!==""&&!(element.InvoiceKindId==="003003"||element.InvoiceKindId==="003001")) {
                element.BillTypeId = element.InvoiceKindId;
                element.BillTypeName = element.InvoiceKindName;
                BillTypeMenuList.push(element);
            } 
        });
        this.BillTypeMenuList = BillTypeMenuList;
        this.isLoading = false;
    }

    /**
     * 获取票据类型打印模板（已弃用）
     * 说明：lkp 2021/02/22 弃用
     */
    // public async GetBillPrintTempLateByCpCode(){
    //     this.isLoading = true;
    //     const res = await requestJson(`/api/bdt/BillPrintTemplate/GetBillPrintTempLateByCpCode?cpCode=${this.CompanyCode}`,{
    //         method:"GET"
    //     })
    //     if(res.rtnCode!==0){
    //         message.error(res.rtnMsg);
    //         this.isLoading = false;
    //         return;
    //     }
    //     console.log(res.data);
    //     res.data = res.data as any[];
    //     const billTypeModleList:any[] = [];
    //     res.data .forEach((element:any) => {
    //         if(element.IsTurnOn==="1"){
    //             billTypeModleList.push(element)
    //         }
    //     });
    //     console.log("datasss:",billTypeModleList)
    //     const BillTypeMenuList:BillTypeMenu[] = [];
    //     this.BillTypeMenuList = [];
    //     this.BillTypeAllMenuListSource.forEach((BillType:any)=>{
    //         if(BillType.BillTypeId.substring(0,3)!=="003"){
    //             if(isHasBillTypePrintfModel(BillType.BillTypeId)){
    //                 BillTypeMenuList.push(BillType)
    //             }
    //         }
           
    //     })

    //     this.BillTypeMenuList = BillTypeMenuList;
    //     this.isLoading = false;


    //     function isHasBillTypePrintfModel(BillTypeId:string){
    //         let flag:boolean = false;
    //         billTypeModleList.forEach((BillTypeModel:any)=>{
    //             if(BillTypeId=== BillTypeModel.BillTypeId){
    //                 flag = true;
    //             }
    //         })
    //         return flag
    //     }
    // }
    
    /**
     * 
     */
    @action
    public TruncateTable(){
        if (this.WaterProductList.length>0) {
            this.WaterProductList.splice(0,this.WaterProductList.length);
        }
    }


    /**
     * 用水性质树节点点击事件
     */
    public async OnWaterKindTreeNodeSearch(waterKindId:string,waterKindName:string,businessTypeId:number, cpCode:string){
        try {

            this.isLoading = true;

            this.TruncateTable();

            const res = await requestJson("/api/bdt/Product/WaterProductList/"+encodeURIComponent(waterKindId)+"/"+encodeURIComponent(waterKindName)+"/"+businessTypeId+'?cpCode='+cpCode,
                {
                    method:"GET"
                }
            )
            
            if (res.rtnCode===0) {
                const data = res.data as WaterProduct[];
                this.WaterProductList.push(...data);
                this.isLoading = false;
            }
            
            this.isLoading = false;

        } catch (error) {
            console.log("加载异常:"+error);
            this.isLoading = false;
        }

    }


    @action
    public SelectedRow(waterFeeItemId:string):boolean{

        try {
            const ix = this.WaterProductList.findIndex((model:WaterProduct)=>{
                return waterFeeItemId===model.ProductItemId
             })
     
             if (ix<0) {
                 return false;
             }
             if(this.WaterProductList[ix].ActualPrice===0){
                this.WaterProductList[ix].ActualPrice="";
             }
             this.CurrentEditItem = JSON.parse(JSON.stringify(this.WaterProductList[ix]));
            
             return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * 新增
     * @param model 
     */
    public async Add(model:WaterProduct):Promise<IResponseJsonResult>{

        const ix = this.WaterProductList.findIndex((value:WaterProduct)=>{
            return model.ProductItemId ===value.ProductItemId
         });
         
         if (ix<0) {
             return {rtnCode:1,rtnMsg:"集合中不存在此数据"}
         }
         console.log("22")
          model.CpCode=this.CompanyCode
        try {
            this.isLoading = true;
            const res = await requestJson("/api/bdt/Product/AddProduct",
                {
                    body:JSON.stringify(model),
                    method:"POST",
                    headers:{"content-type": "application/json"}
                }
            );

            if (res.rtnCode===0) {
               
                 const data = res.data as {productId:string}

                 model.ProductId = data.productId;
                
                 console.log(ix);

                 this.WaterProductList[ix] = model;

            }

            this.isLoading = false;
            
            return res;

        } catch (error) {
            console.log(error);
            this.isLoading = false;
            return {rtnCode:1,rtnMsg:error}
        }
    }

    /**
     * 更新
     * @param model 
     */
    public async Update(model:WaterProduct):Promise<IResponseJsonResult>{

        const ix = this.WaterProductList.findIndex((value:WaterProduct)=>{
            return model.ProductId ===value.ProductId
         });

         if (ix<0) {
            return {rtnCode:1,rtnMsg:"集合中不存在此数据"}
        }

        if (model.CalcFeeTypeId==="superPlanOuter") {
            model.ActualPrice = 0;
        }
        model.CpCode=this.CompanyCode
        try {
            this.isLoading = true;
            const res = await requestJson("/api/bdt/Product/UpdateProduct",
                {
                    body:JSON.stringify(model),
                    method:"POST",
                    headers:{"content-type": "application/json"}
                }
            );
            
            if (res.rtnCode===0) {

                this.WaterProductList[ix] = model;

            }
            this.isLoading = false;
            return res;

        } catch (error) {
            console.log(error);
            this.isLoading = false;
            return {rtnCode:1,rtnMsg:error}
        }
    }

    /**
     * 删除
     * @param model 
     */
    public async Delete(model:WaterProduct):Promise<IResponseJsonResult>{

        const ix = this.WaterProductList.findIndex((value:WaterProduct)=>{
            return model.ProductId ===value.ProductId
         });
         if (ix<0) {
            return {rtnCode:1,rtnMsg:"集合中不存在此数据"}
        }

        try {
            this.isLoading = true;
            const res = await requestJson("/api/bdt/Product/DeleteWaterProduct/"+model.ProductId+'?cpCode='+this.CompanyCode,
                {
                    method:"POST",
                    headers:{"content-type": "application/json"}
                }
            );

                if (res.rtnCode===0) {

                    this.WaterProductList[ix].IsDelete='1';
                    this.WaterProductList[ix].IsRandClacFee='';
                    this.WaterProductList[ix].IsSystemClacFee='';
                    this.WaterProductList[ix].ProductId='';
                    this.WaterProductList[ix].CalcFeeTypeId='';
                    this.WaterProductList[ix].CalcFeeTypeName='';
                    this.WaterProductList[ix].ActualPrice=0;
                    this.WaterProductList[ix].AccountCode='';
                    this.WaterProductList[ix].IsAddedTax='';
                    this.WaterProductList[ix].BillTypeId='';
                    
                }

            this.isLoading = false;
            
            return res;

        } catch (error) {
            console.log(error);
            this.isLoading = false;
            return {rtnCode:1,rtnMsg:error}
        }
    }
}