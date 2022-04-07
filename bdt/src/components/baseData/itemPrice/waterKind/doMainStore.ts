import { action,observable,   } from "mobx";
import { IResponseJsonResult,requestJson,  } from "orid";
import { WaterKind } from "./entity";


export class WaterKindDoMainStore{


    /**
     * 当前正在编辑的用水性质
     */
    @observable
    public CurrentEditWaterKind:WaterKind;
    
    /**
     * 正在加载
     */
    @observable
    public Loading:boolean;
    
    /**
     *  下拉选控件是否禁用
     */
    @observable
    public SelectorDisabled:boolean;

    /**
     * 用水性质数组 
     */
    @observable
    public WaterKindList:WaterKind[];

    /**
     * 构造方法
     */
    constructor(){

        this.WaterKindList =  Array<WaterKind>();

        this.CurrentEditWaterKind = new WaterKind();

        this.Loading = true;

        this.recursionSelected = this.recursionSelected.bind(this);
        this.recursionUpdate = this.recursionUpdate.bind(this);
        this.recursionDelete = this.recursionDelete.bind(this);
        this.recursionAdd = this.recursionAdd.bind(this);

    }

    /**
     * 正在加载数据
     * @param 
     */
    @action
    public async LoadingData(){
        try {

            this.Loading = true;

            this.WaterKindList = new Array<WaterKind>();
            const  returnJson = await requestJson("/api/bdt/WaterKind/TreeList",{method:"GET"});

            if (returnJson.rtnCode===0) {
                const data = returnJson.data as WaterKind[];
                this.WaterKindList.push(...data);
            } 
            this.Loading = false;
          
        } catch (error) {
            this.Loading = false;
            console.log(error);
        
        }
    }

    /**
     * 增加用水性质
     * @param model 用水性质实体类
     */
    @action
    public async AddWaterKind(model:WaterKind):Promise<IResponseJsonResult>{

        try {
            
            this.Loading = true;

            model.ColligationPrice = Number(model.ColligationPrice);
            
            const res = await requestJson("api/bdt/WaterKind/Add",
                {
                    body:JSON.stringify(model),
                    method:"POST",
                    headers:{"content-type": "application/json"}
                }
            )
            
            if (res.rtnCode===0) {
                const waterKindId = res.data!.toString();
                model.WaterKindId = waterKindId
                if (model.FatherId==="00") {
                    this.WaterKindList.push(model);
                }else{
                    this.recursionAdd(this.WaterKindList,model);
                }
              
                this.Loading = false;


            }

            this.Loading = false;

           return res;

        } catch (error) {
            console.log(error);
            this.Loading = false;
            return { rtnCode:1,rtnMsg:error}
        }

       
    }   

    /**
     * 删除用水性质
     * @param id 用水性质ID
     */
    @action
    public async DeleteWaterKind(model:WaterKind):Promise<IResponseJsonResult>{
        try {

            this.Loading = true;

            if (model.children!==null&&model.children!==undefined&&model.children.length>0) {
                this.Loading = false;
                return {
                    rtnCode:1,
                    rtnMsg:"有子级数据，无法删除",
                }
            }

            const res = await requestJson("/api/bdt/WaterKind/Delete/"+model.WaterKindId,{
                method:"POST",
                headers:{"content-type": "application/json"}
            });

            if (res.rtnCode===0) {
                
                if (model.FatherId==="00") {
                    const ix = this.WaterKindList.findIndex((wk:WaterKind)=>{
                        return wk.WaterKindId === model.WaterKindId
                    })
                    this.WaterKindList.splice(ix,1);

                }else{
                    this.recursionDelete(this.WaterKindList,model);
                }

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
     * 更新用水性质
     * @param model 用水性质实体类
     */
    @action
    public async UpdateWaterKind(model:WaterKind):Promise<IResponseJsonResult>{

        try {

            this.Loading = true;

            if (model.WaterKindName===this.CurrentEditWaterKind.WaterKindName&&model.ColligationPrice===this.CurrentEditWaterKind.ColligationPrice) {
                
                this.Loading = false;
                return {rtnCode:0,rtnMsg:"更新成功"};
                
            }


            const res = await requestJson("/api/bdt/WaterKind/Update",{
                body:JSON.stringify(model),
                method:"POST",
                headers:{"content-type": "application/json"}
            });
            
            if(res.rtnCode===0){
                this.recursionUpdate(this.WaterKindList,model);
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
     * 设置指定用水性质ID的用水性质为当前编辑的用水性质
     * @param id 用水性质ID
     */
    @action
    public SelectedWaterKind(id:string):boolean{

       this.recursionSelected(this.WaterKindList, id);

        return true;
    }

   


    /**
     * 验证
     * @param model 用水性质实体类
     */
    @action
    public Validate(model:WaterKind):string|undefined{
        return undefined;
    }

    /**
     * 返回选中ID对应的实体
     * @param list 
     * @param id 
     */
    @action
    private recursionSelected(list:WaterKind[], id:string){
         list.forEach((model:WaterKind)=>{
            if (model.WaterKindId === id) {
                this.CurrentEditWaterKind = model;
            }else if(model.children!==null&&model.children!==undefined&&model.children!.length>0){
                this.recursionSelected(model.children,id);
            }
        })
    }

    /**
     * 更新的实体
     */
    @action
    private recursionUpdate(list:WaterKind[],model:WaterKind){
        list.forEach((entity:WaterKind)=>{
            if(entity.WaterKindId===model.WaterKindId){
                entity.WaterKindName=model.WaterKindName;
                entity.ColligationPrice = model.ColligationPrice;
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
    private recursionDelete(list:WaterKind[],currentModel:WaterKind){
        list.forEach((model:WaterKind)=>{
            if(model.WaterKindId===currentModel.FatherId){

                console.log(model.WaterKindId);

                const ix = model.children!.findIndex((value:WaterKind)=>{
                   return value.WaterKindId===currentModel.WaterKindId
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
    private recursionAdd(list:WaterKind[],currentModel:WaterKind){

        list.forEach((model:WaterKind)=>{
            if(model.WaterKindId===currentModel.FatherId){
                
             
                if (model.children!==undefined&&model.children!==null) {
                    model.children!.push(currentModel);
                }else{
                    model.children = new Array<WaterKind>();
                    model.children!.push(currentModel);
                }

            }else if(model.children!==null&&model.children!==undefined&&model.children.length>0){
                this.recursionAdd(model.children,currentModel);
            }
        });

    }


}



