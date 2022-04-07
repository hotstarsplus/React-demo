import { action,observable,  } from "mobx";
import { IResponseJsonResult,requestJson,  } from "orid";
import { WaterProduction } from "./entity";




export class WaterProductionDoMainStore{

    /**
     * 产品表数组
     */
    @observable
    public WaterProductionList:WaterProduction[]

    /**
     * 正在加载
     */
    @observable
    public Loading:boolean;

    /**
     * 当前正在编辑的产品表
     */
    @observable
    public CurrentEditItem:WaterProduction;

    /**
     * 构造
     */
    constructor(){

        this.WaterProductionList = Array<WaterProduction>();

        this.CurrentEditItem = new WaterProduction();

        this.OnWaterKindTreeNodeSearch = this.OnWaterKindTreeNodeSearch.bind(this);  

        this.SelectedRow = this.SelectedRow.bind(this);

        this.TruncateTable = this.TruncateTable.bind(this);

        this.Delete = this.Delete.bind(this);

        this.Add = this.Add.bind(this);

        this.Update = this.Update.bind(this);

    }


    @action
    public TruncateTable(){
        if (this.WaterProductionList.length>0) {
            this.WaterProductionList.splice(0,this.WaterProductionList.length);
        }
    }


    /**
     * 用水性质树节点点击事件
     */
    public async OnWaterKindTreeNodeSearch(waterKindId:string,waterKindName:string){

        try {

            this.Loading = true;

            this.TruncateTable();

            const res = await requestJson("/api/bdt/Production/WaterProductionList/"+waterKindId+"/"+waterKindName,
                {
                    method:"GET"
                }
            )
            
            if (res.rtnCode===0) {
                const data = res.data as WaterProduction[];
                this.WaterProductionList.push(...data);
            }

            
            this.Loading = false;

        } catch (error) {
            console.log("加载异常:"+error);
        }

    }


    @action
    public SelectedRow(waterFeeItemId:string):boolean{

        try {
            const ix = this.WaterProductionList.findIndex((model:WaterProduction)=>{
                return waterFeeItemId===model.WaterFeeItemId
             })
     
             if (ix<0) {
                 return false;
             }
     
             this.CurrentEditItem = this.WaterProductionList[ix];
            
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
    public async Add(model:WaterProduction):Promise<IResponseJsonResult>{

        const ix = this.WaterProductionList.findIndex((value:WaterProduction)=>{
            return model.WaterFeeItemId ===value.WaterFeeItemId
         });
         
         if (ix<0) {
             return {rtnCode:1,rtnMsg:"集合中不存在此数据"}
         }


        try {
            this.Loading = true;
            const res = await requestJson("/api/bdt/Production/AddWaterProduction",
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

                 this.WaterProductionList[ix] = model;

            }

            this.Loading = false;
            
            return res;

        } catch (error) {
            console.log(error);
            this.Loading = false;
            return {rtnCode:1,rtnMsg:error}
        }
    }

    /**
     * 更新
     * @param model 
     */
    public async Update(model:WaterProduction):Promise<IResponseJsonResult>{

        const ix = this.WaterProductionList.findIndex((value:WaterProduction)=>{
            return model.ProductId ===value.ProductId
         });

         if (ix<0) {
            return {rtnCode:1,rtnMsg:"集合中不存在此数据"}
        }

        if (model.CalcFeeTypeId==="superPlanOuter") {
            model.ActualPrice = 0;
        }

        try {
            this.Loading = true;
            const res = await requestJson("/api/bdt/Production/UpdateWaterProduction",
                {
                    body:JSON.stringify(model),
                    method:"POST",
                    headers:{"content-type": "application/json"}
                }
            );
            
            if (res.rtnCode===0) {

                this.WaterProductionList[ix] = model;

            }
            this.Loading = false;
            return res;

        } catch (error) {
            console.log(error);
            this.Loading = false;
            return {rtnCode:1,rtnMsg:error}
        }
    }

    /**
     * 删除
     * @param model 
     */
    public async Delete(model:WaterProduction):Promise<IResponseJsonResult>{

        const ix = this.WaterProductionList.findIndex((value:WaterProduction)=>{
            return model.ProductId ===value.ProductId
         });
         if (ix<0) {
            return {rtnCode:1,rtnMsg:"集合中不存在此数据"}
        }

        try {
            this.Loading = true;
            const res = await requestJson("/api/bdt/Production/DeleteWaterProduction/"+model.ProductId,
                {
                    method:"POST",
                    headers:{"content-type": "application/json"}
                }
            );

                if (res.rtnCode===0) {

                    this.WaterProductionList[ix].IsDelete='1';
                    this.WaterProductionList[ix].IsRandClacFee='';
                    this.WaterProductionList[ix].IsSystemClacFee='';
                    this.WaterProductionList[ix].ProductId='';
                    this.WaterProductionList[ix].ProductTypeName='';
                    this.WaterProductionList[ix].ProductTypeId='';
                    this.WaterProductionList[ix].CalcFeeTypeId='';
                    this.WaterProductionList[ix].CalcFeeTypeName='';
                    this.WaterProductionList[ix].ActualPrice=0;
                    this.WaterProductionList[ix].AccountCode='';
                }

            this.Loading = false;
            
            return res;

        } catch (error) {
            console.log(error);
            this.Loading = false;
            return {rtnCode:1,rtnMsg:error}
        }
    }



}