import { message } from "antd";
import { action,observable  } from "mobx";
import { requestJson } from "orid";
import { Neighborhood,NeighborhoodUiEntity } from "./entity";


export class NeighborhoodDoMainStore{

    /**
     * 缴费网点UI数据集合
     */
    @observable
    public NeighborhoodUiList:NeighborhoodUiEntity[];

    /**
     * ui层数据数组
     */
    @observable
    public NeighborhoodList:Neighborhood[];


    /**
     * 当前正在编辑的缴费网点
     */
    @observable
     public CurrentEditNeighborhood:Neighborhood;

    /**
     * 是否正在加载
     */
    @observable
    public IsLoading:boolean;

    
    /**
     *  下拉选控件是否禁用
     */
    @observable
    public SelectorDisabled:boolean;

    /**
     * 最大排序号
     */
    @observable
    public maxSortNo:number;

    /**
     * 名称
     */
    @observable
    public pKeyName:string;

    /**
     * 用于查询后使用，将变化之后的数组提供给NeighborhoodList使用
     */
    private searchList:Neighborhood[];


    /**
     * 用于增加、修改、删除是使用，将变化之后的数组提供给NeighborhoodList使用
     */
    private list:Neighborhood[];

    /**
     * 构造
     */
    constructor(){

        this.NeighborhoodList = Array<Neighborhood>();

        this.CurrentEditNeighborhood = new Neighborhood();

        this.NeighborhoodUiList = new Array<NeighborhoodUiEntity>();

        this.IsLoading = true;

        this.SelectorDisabled = false;

        this.list = Array<Neighborhood>();

        this.searchList = Array<Neighborhood>();

        this.AddNeighborhood = this.AddNeighborhood.bind(this);

        this.DeleteNeighborhood = this.DeleteNeighborhood.bind(this);

        this.getIndex = this.getIndex.bind(this);

        this.LoadData = this.LoadData.bind(this);

        this.recursion=this.recursion.bind(this);

        this.recursionSelect = this.recursionSelect.bind(this);

        this.refreshUi = this.refreshUi.bind(this);

        this.SelectNeighborhood = this.SelectNeighborhood.bind(this);

        this.UpdateNeighborhood = this.UpdateNeighborhood.bind(this);

        this.Validate = this.Validate.bind(this);

        this.GetNameByKey=this.GetNameByKey.bind(this);

        this.pKeyName="";

        this.Search=this.Search.bind(this);

    }

    /**
     * 异步加载数据
     * @param callBack 回调函数
     */
    @action
    public async LoadData(callBack?:(list:Neighborhood[])=>void){

        try {
            if(!this.IsLoading){
                this.IsLoading =  true;
            }
            this.NeighborhoodList = new Array<Neighborhood>();
            this.list = new Array<Neighborhood>();
            const returnJson = await requestJson("/api/bdt/Neighborhood/List/All",{method:"GET"});
            if (returnJson.rtnCode===0) {
                const jsonlist = returnJson.data as Neighborhood[];
                this.refreshUi(jsonlist);
                this.IsLoading=false;
            }else{
                this.IsLoading = false;
                message.error(returnJson.rtnMsg);
            }
            if (callBack) {
                callBack(this.NeighborhoodList);
            }

        } catch (error) {
            console.log("加载失败:"+error);
        }

    }

    /**
     * 增加一个缴费网点
     * @param model
     */
    @action
    public async AddNeighborhood(model:Neighborhood){
        try{

            if(!this.IsLoading){
                this.IsLoading = true;
            }
            const res:any = await requestJson("/api/bdt/Neighborhood/AddRecord",
                {
                    method: "POST",
                    body: JSON.stringify(model),
                    headers: { "content-type": "application/json" }
                });
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                this.IsLoading = false;
            } else {
                const jsonlist = res.data.data as Neighborhood[];
                this.refreshUi(jsonlist);
                this.IsLoading = false;
                message.success("新增缴费网点成功");
            }
        }catch(error){
            this.IsLoading = false;
        }
    }

    /**
     * 删除一个缴费网点
     * @param id 缴费网点ID
     */
    @action
    public async DeleteNeighborhood(item:Neighborhood){

        try {
            if (!this.IsLoading) {
                this.IsLoading = true;
            }
            
            if (item!.children!.length > 0) {
                message.error("删除失败："+"存在子级不允许删除");
                this.IsLoading = false;
                return;
            }
            const res = await requestJson("/api/bdt/Neighborhood/DeleteRecord/"+item.NeighborhoodId,
                {
                    method: "POST",
                    headers: { "content-type": "application/json" }
                });
            if (res.rtnCode !== 0) {
                this.IsLoading = false;
                message.error(res.rtnMsg);
            }else{
                const jsonList = res.data as Neighborhood[];
                this.refreshUi(jsonList);
                this.IsLoading = false;
                message.success("删除成功" );
            }
        } catch (error) {
            this.IsLoading = false;
        }
    }

    /**
     * 修改一个缴费网点
     * @param model 缴费网点实体
     */
    @action
    public async UpdateNeighborhood(model:Neighborhood){

        try {
                if (!this.IsLoading) {
                    this.IsLoading = true;
                }
                /**
                 * 新增创建时间、创建人id、、自增id参数
                 */
                const CreateDate = 'CreateDate';
                const CreaterId ='CreaterId';
                const AutoId ='AutoId';
                model[CreateDate] = this.CurrentEditNeighborhood.CreateDate;
                model[CreaterId] = this.CurrentEditNeighborhood.CreaterId;
                model[AutoId] = this.CurrentEditNeighborhood.AutoId;
                const res = await requestJson("/api/bdt/Neighborhood/UpdateRecord",
                    {
                        method: "POST",
                        body: JSON.stringify(model),
                        headers: { "content-type": "application/json" }
                    });
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    this.IsLoading = false;
                }else{
                    const jsonList = res.data as Neighborhood[];
                    this.refreshUi(jsonList);
                    this.IsLoading = false;
                    message.success("更新成功");
                }
            // }
        } catch (error) {
            this.IsLoading = false;
        }

    }

    /**
     * 获取最大排序号
     * @param FatherId 
     */

    @action
    public async getMaxSortNo(FatherId:string):Promise<number>{
        try{
            if (FatherId.length > 0) {
                const res: any = await requestJson("/api/bdt/Neighborhood/GetMaxSortNo?fatherId=" + FatherId,
                    {
                        method: "GET",
                        headers: { "content-type": "application/json" }
                    });
                if (res.rtnCode !== 0) {
                    this.IsLoading = false;
                    console.log("获取最大排序号失败" + res.rtnMsg);
                } else {
                    this.maxSortNo = res.data.SortNo + 1;
                    this.IsLoading = false;
                }
            } else {
                const res: any = await requestJson("/api/bdt/Neighborhood/GetMaxSortNo",
                    {
                        method: "GET",
                        headers: { "content-type": "application/json" }
                    });
                if (res.rtnCode !== 0) {
                    this.IsLoading = false;
                    console.log("获取最大排序号失败" + res.rtnMsg);
                } else {
                    this.maxSortNo = res.data.SortNo + 1;
                    this.IsLoading = false;
                }
            }
        }catch(error){
            this.IsLoading = false;
        }
        return this.maxSortNo;
    }

    /**
     * 根据fatherId获取父级名称
     * @param fatherId 父级id
     */
    @action
    public async GetNameByKey(fatherId:string):Promise<string>{
        try {
            const res: any = await requestJson("/api/bdt/Neighborhood/GetNameByKey/" + fatherId,
                {
                    method: "GET",
                    headers: { "content-type": "application/json" }
                });
            if (res.rtnCode !== 0) {
                this.IsLoading = false;
                console.log("获取名称失败" + res.rtnMsg);
            } else {
                this.pKeyName = res.data.name;
                this.IsLoading = false;
            }
        } catch (error) {
            this.IsLoading = false;
            console.log("获取名称失败" + error);
        }
        return this.pKeyName;
    }

    /**
     * 根据条件查询信息
     * @param Account 
     */
    @action
    public async Search(dataType:string,datas:string){
        if(dataType===""){
            return;
        }
        const param={
            "Item1":dataType,
            "Item2":datas
        }
        if(dataType==="NeighborhoodName"){
            if(datas.trim().length===0){
                message.error("请输入缴费网点名称")
                return;
            }
            const res:any=await requestJson("/api/bdt/Neighborhood/List/LikeValue",
            {
                method:"POST",
                body:JSON.stringify(param),
                headers:{"content-type": "application/json"}
            });
            if(res.rtnCode!==0){
                message.error(res.rtnMsg);
                return;
            }else{
                const jsonData=res.data.model;
                this.searchRefreshUi(jsonData);
            }
        }else if(dataType==="NeighborhoodId"){
            if(datas.trim().length===0){
                message.error("请输入编码")
                return;
            }
            const res:any=await requestJson("/api/bdt/Neighborhood/List/LikeValue",
            {
                method:"POST",
                body:JSON.stringify(param),
                headers:{"content-type": "application/json"}
            });
            if(res.rtnCode!==0){
                message.error(res.rtnMsg);
                return;
            }else{
                const jsonData=res.data.model;
                console.info("json",jsonData)
                this.searchRefreshUi(jsonData);
            }
        }else if(dataType==="NeighborhoodAddress"){
            if(datas.trim().length===0){
                message.error("请输入地址")
                return;
            }
            const res:any=await requestJson("/api/bdt/Neighborhood/List/LikeValue",
            {
                method:"POST",
                body:JSON.stringify(param),
                headers:{"content-type": "application/json"}
            });
            if(res.rtnCode!==0){
                message.error(res.rtnMsg);
                return;
            }else{
                const jsonData=res.data.model;
                this.searchRefreshUi(jsonData);
            }
        }else if(dataType==="NeighborhoodLinkMan"){
            if(datas.trim().length===0){
                message.error("请输入联系人")
                return;
            }
            const res:any=await requestJson("/api/bdt/Neighborhood/List/LikeValue",
            {
                method:"POST",
                body:JSON.stringify(param),
                headers:{"content-type": "application/json"}
            });
            if(res.rtnCode!==0){
                message.error(res.rtnMsg);
                return;
            }else{
                const jsonData=res.data.model;
                this.searchRefreshUi(jsonData);
            }
        }
    }

    /**
     * 选中需要修改的缴费网点
     * @param id 缴费网点ID
     */
    @action
    public SelectNeighborhood(id:string):boolean{

        try {
            this.recursionSelect(id,this.list);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    /**
     * 验证
     * @param model 缴费网点实体类
     */
    @action
    public Validate(model:Neighborhood):string|undefined{
        return undefined;
    }


    
    /**
     * 递归找到选中的可编辑缴费网点
     * @param id 选中的ID
     * @param list 集合
     */
    @action
    private recursionSelect(id:string,list:Neighborhood[]){
        list.forEach((wsModel,index,array)=>{
            if(id===wsModel.NeighborhoodId){
                this.CurrentEditNeighborhood = wsModel;
            }else if (wsModel.children!==undefined) {
                this.recursionSelect(id,wsModel.children);
            }
        });
    }

    /**
     * 根据用水性质ID获取用水性质数组中的下标
     * @param id 用水性质ID
     */
    private getIndex(id:string):number{
        return  this.list.findIndex((value:Neighborhood,index:number,values:Neighborhood[])=>{
             return value.NeighborhoodId === id;
         })     
     }
     

    /**
     * 递归转换数据
     * @param list 接口json数据集合
     */
    @action
    private recursion(list:Neighborhood[]):NeighborhoodUiEntity[]{
        const wsList = new Array<NeighborhoodUiEntity>();
        list.forEach((jsonmodel:Neighborhood, index:number, array:Neighborhood[]) => {
                    
            const model = new NeighborhoodUiEntity();

            model.key = jsonmodel.NeighborhoodId;

            model.value = jsonmodel.NeighborhoodName;

            model.title = jsonmodel.NeighborhoodName;

            model.FatherId = jsonmodel.FatherId;

            model.NeighborhoodAddress = jsonmodel.NeighborhoodAddress;

            model.NeighborhoodTel = jsonmodel.NeighborhoodTel;

            model.NeighborhoodLinkMan = jsonmodel.NeighborhoodLinkMan;

            model.SortNo = jsonmodel.SortNo;

            model.UpdateDate = jsonmodel.UpdateDate;

            model.UpdaterId = jsonmodel.UpdaterId;

            model.CreateDate = jsonmodel.CreateDate;

            model.CreaterId = jsonmodel.CreaterId;

            model.Description = jsonmodel.Description;

            if(jsonmodel.children&&jsonmodel.children.length>0){
                model.children = this.recursion(jsonmodel.children);
            }else{
                model.children = undefined;
            }
            wsList.push(model);
        });
        return wsList;
    }

    /**
     * 刷新UI
     */
    private refreshUi(jsonData:Neighborhood[]){

        const jsonList= jsonData as Neighborhood[];
        this.list.splice(0,this.NeighborhoodUiList.length)
        this.NeighborhoodUiList.splice(0,this.NeighborhoodUiList.length);
        const data = this.recursion(jsonList);
        this.list.push(...jsonList);
        this.NeighborhoodUiList.push(...data);
        console.info(this.NeighborhoodUiList)
    }

    /**
     * 查询后刷新UI
     */
    private searchRefreshUi(jsonData:Neighborhood[]){

        const jsonList= jsonData as Neighborhood[];
        this.searchList.splice(0,this.NeighborhoodUiList.length)
        this.NeighborhoodUiList.splice(0,this.NeighborhoodUiList.length);
        const data = this.recursion(jsonList);
        this.searchList.push(...jsonList);
        this.NeighborhoodUiList.push(...data);
        console.info(this.NeighborhoodUiList)
    }
    

}