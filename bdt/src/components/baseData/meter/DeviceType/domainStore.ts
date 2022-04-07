import { message } from "antd";
import { action, observable } from "mobx";
import { OridStores, requestJson } from "orid";
import { DeviceCategory } from "../DeviceCategory/entity";
import { DeviceDetailField } from "../DeviceDetailField/entity";
import { DeviceType, DeviceTypeUiEntity } from "./entity";


export class DeviceTypeDoMainStore{
    /**
     * 项目集合
     */
    @observable
    public list:DeviceType[];
    
    /**
     * 是否正在加载
     */
    @observable
    public isLoading:boolean=true;

    /**
     *  下拉选控件是否禁用
     */
    @observable
    public SelectorDisabled: boolean;

    /**
     * 是否显示上级类型
     */
    @observable
    public IsFatherVisiable:boolean;

    /**
     * 设备种类是否可以操作
     */
    public IsCategoryAble:boolean;

    /**
     *  当前编辑的项目
     */
    @observable
    public currentEditItem:DeviceType;

    /**
     *  当前编辑的项目替补项
     */
    @observable
    public currentEditItemTmp:DeviceType;

    @observable
    public categoryList:DeviceCategory[];

    @observable
    public tmpAttr:DeviceDetailField[];

    @observable
    public selectCategoryName:string;

    @observable
    public selectCategoryId:string;
    /** 输入的类型编码 */
    @observable
    public InputCode:string=''
    /** 输入的类型名称 */
    @observable
    public InputTypeName:string=''
    /** 切换的公司名称 */
    @observable
    public CompanyName:string=''
    @observable
    public CompanyNameData:any[]=[]
    @observable
    public InfoName:string=''
    @observable
    public Name:string=''

    /**
     * 新建、编辑对话框是否隐藏
     */
    @observable
    public isShowEditDialog:boolean = false;

    constructor(){
        this.list = Array<DeviceType>();
        this.categoryList = Array<DeviceCategory>();
        this.currentEditItem = new DeviceType();
        this.currentEditItemTmp = new DeviceType();
        this.tmpAttr = new Array<DeviceDetailField>();
        this.isLoading = true;
        this.selectCategoryName="";
        this.selectCategoryId = "";
        this.recursion=this.recursion.bind(this);
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
    public async loadData(callBack?:(list:DeviceType[])=>void){
        try {
            if (!this.isLoading) { 
                this.isLoading=true;
            }

            let searchCase:string = '';
            if(this.InputCode !== ''){
                searchCase = searchCase+"DeviceType.DeviceTypeId_"+this.InputCode+",";
            }
            if(this.InputTypeName !== ''){
                searchCase = searchCase+"DeviceType.DeviceTypeName_"+this.InputTypeName+",";
            }
            if(searchCase !== ''){
                searchCase= searchCase.substring(0,searchCase.length-1);
            }
            searchCase=searchCase.split('%').join('%25');
            searchCase=searchCase.split('#').join('%23');
            searchCase=searchCase.split('&').join('%26');
            searchCase=searchCase.split('=').join('%3D');
            searchCase=searchCase.split('?').join('%3F');

            // let searchCase:string=''
            // if(this.InputCode===''&&this.InputTypeName===''){
            //     searchCase=''
            // }else if(this.InputTypeName!==''){
            //     searchCase=`DeviceTypeName like '${this.InputTypeName}'`
            //     if(this.InputCode!==''){
            //         searchCase=`DeviceTypeName like '${this.InputTypeName}' and DeviceTypeId like '${this.InputCode}'`
            //     }
            // }else if(this.InputCode!==''){
            //     searchCase=`DeviceTypeId like '${this.InputCode}'`
            //     if(this.InputTypeName!==''){
            //         searchCase=`DeviceTypeName like '${this.InputTypeName}' and DeviceTypeId like '${this.InputCode}'`
            //     }
            // }
            this.list = new Array<DeviceType>();
            const returnJson = await requestJson('/api/bdt/DeviceType/List/GetTree?cpCode='+this.CompanyName+'&searchCase='+searchCase,{
                method:"GET"
            });
            if(returnJson.rtnCode===0){   
                if(searchCase===''){
                    const datas = returnJson.data as DeviceType[];
                    const tmp = this.recursion(datas);
                    this.isLoading = false;
                    this.list=tmp;
                }else{
                const datas = returnJson.data as DeviceType[];
                const tmp = this.recursion(datas);
                this.isLoading = false;
                this.list=tmp;
                }
                
            }else{
                this.isLoading = false;
                console.error("加载失败:"+"返回码:"+returnJson.rtnCode+" 返回信息:"+returnJson.rtnMsg);
            }         
            if(callBack){
                callBack(this.list);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 加载设备种类数据
     */
    @action
    public async loadCategoryData(callBack?:(list:DeviceCategory[])=>void){
        try {
            if (!this.isLoading) {
                this.isLoading=true;
            }
            this.categoryList = new Array<DeviceCategory>();
            const returnJson = await requestJson('/api/bdt/DeviceCategory/GetCategoryList?cpCode='+this.CompanyName,{
                method:"GET"
            });
            if(returnJson.rtnCode===0){   
                const datas = returnJson.data as DeviceCategory[];    
                this.isLoading = false;
                this.categoryList.push(...datas);
            }else{
                this.isLoading = false;
                console.error("加载失败:"+"返回码:"+returnJson.rtnCode+" 返回信息:"+returnJson.rtnMsg);
            }         
            if(callBack){
                callBack(this.categoryList);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 
     * @param model 加载设备种类通用属性
     */

    /**
     * 增加类型
     * @param model 类型实体类
     */
    @action
    public async AddDeviceType(model: DeviceType) {
        try {
            if (!this.isLoading) {
                this.isLoading = true;
            }
            model.CpCode=this.CompanyName
            // model.Attributes = this.currentEditItem.Attributes;
            model.Attributes = this.tmpAttr;
            const res: any = await requestJson("/api/bdt/DeviceType/AddRecord",
                {
                    method: "POST",
                    body: JSON.stringify(model),
                    headers: { "content-type": "application/json" }
                });
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                this.isLoading = false;
                this.isShowEditDialog = true;

            } else {

                if (this.list.length>0) {
                    this.list.splice(0,this.list.length);
                }

                const jsonList = res.data as DeviceType[];
                const tmp = this.recursion(jsonList);
                this.list=tmp;
                this.isLoading = false;
                this.isShowEditDialog = false;

                message.success("新增类型成功");
            }

        } catch (error) {
            this.isLoading = false;
        }
    }

    /**
     * 删除类型
     * @param id 类型ID
     */
    @action
    public async DeleteDeviceType(item: DeviceType) {
        try {
            if (!this.isLoading) {
                this.isLoading = true;
            }

            const res = await requestJson("/api/bdt/DeviceType/DeleteRecord/" + item.DeviceTypeId+'?cpCode='+this.CompanyName,
                {
                    method: "GET",
                });
            if (res.rtnCode !== 0) {
                this.isLoading = false;
                message.error(res.rtnMsg);
            } else {
                if (this.list.length>0) {
                    this.list.splice(0,this.list.length);
                }
                const jsonList = res.data as DeviceType[];
                const tmp = this.recursion(jsonList);
                this.list=tmp;
                this.isLoading = false;
                message.success("删除成功");
            }
        } catch (error) {
            this.isLoading = false;
        }
    }

    /**
     * 更新类型
     * @param model 类型实体类
     */
    @action
    public async UpdateDeviceType(model: DeviceType) {
        try {
            if (!this.isLoading) {
                this.isLoading = true;
            }
            model.CpCode=this.CompanyName
            // model.CreateDate = this.currentEditItem.CreateDate;
            // model.CreateId = this.currentEditItem.CreateId;
            // model.Attributes = this.tmpAttr;
            model.Attributes = this.tmpAttr;
            const res: any = await requestJson("/api/bdt/DeviceType/UpdateRecord",
                {
                    method: "POST",
                    body: JSON.stringify(model),
                    headers: { "content-type": "application/json" }
                });
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                this.isLoading = false;
                // this.isShowEditDialog = true;

            } else {

                if (this.list.length>0) {
                    this.list.splice(0,this.list.length);
                }

                const jsonList = res.data as DeviceType[];
                const tmp = this.recursion(jsonList);
                this.list=tmp;
                this.isLoading = false;
                this.isShowEditDialog = false;

                message.success("更新成功");
            }
        } catch (error) {
            this.isLoading = false;
            this.isShowEditDialog = true;

        }
    }

    /**
     * 验证
     * @param model 类型实体类
     */
    @action
    public Validate(model: DeviceCategory): string | undefined {
        return undefined;
    }

    /**
     * 设置指定类型ID的银行为当前编辑的类型
     * @param id 类型ID
     */
    @action
    public SelectedDeviceType(id: string): boolean {
        try {
            this.recursionSelect(id, this.list);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * 查询方法
     */
    @action
    public async Search(searchType:any,searchData:string){
        if (searchType==="") {
            return;
        }
        const param = {
            "Item1":searchType,
            "Item2":searchData

        }

        this.isLoading = true;
        if (searchData.trim().length===0) {
            if (searchType==="DeviceTypeId") {
                message.error("请输入类型编号");

            }else if (searchType==="DeviceTypeName") {
                message.error("请输入类型名称");
            }
            this.isLoading = false;
            return;
        }

        if (this.list.length>0) {
            this.list.splice(0,this.list.length);
        }
        const res: any = await requestJson("/api/bdt/DeviceType/List/LikeValue?cpCode="+this.CompanyName,
                {
                    method: "POST",
                    body: JSON.stringify(param),
                    headers: { "content-type": "application/json" }
                });
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
            } else {
                const datas = res.data as DeviceType[];
                const tmp = this.recursion(datas);
                this.list=tmp;
                this.isLoading = false;
            }
            this.isLoading = false;
            return;

            

    }

    /**
     * 
     * 递归找到选中的数据
     */
    @action
    private recursionSelect(itemId: string, DeviceTypeList: DeviceType[]) {
        DeviceTypeList.forEach((entity, index, array) => {
            if (itemId === entity.DeviceTypeId) {
                // console.log("entity >>>>>>> "+JSON.stringify(entity));
                this.currentEditItem = entity;
                this.selectCategoryName = entity.CategoryName;
                this.selectCategoryId = entity.CategoryId;
                this.tmpAttr = new Array<DeviceDetailField>();
                for (let m = 0; m < entity.Attributes!.length; m++) {
                    const element = entity.Attributes![m];
                    this.tmpAttr[m] = element;
                }
            } else if (entity.children !== undefined) {
                this.recursionSelect(itemId, entity.children);
            }
        });
    }

    /**
     * 递归转换数据
     * @param list 接口json数据集合
     */
    @action
    private recursion(list:DeviceType[]):DeviceTypeUiEntity[]{
        const wsList = new Array<DeviceTypeUiEntity>();
        list.forEach((jsonmodel:DeviceType, index:number, array:DeviceType[]) => {
                    
            const model = new DeviceTypeUiEntity();

            model.AutoId = jsonmodel.AutoId;

            model.DeviceTypeId = jsonmodel.DeviceTypeId;

            model.FatherId = jsonmodel.FatherId;

            model.DeviceTypeName = jsonmodel.DeviceTypeName;

            model.CategoryId = jsonmodel.CategoryId;

            model.CategoryName = jsonmodel.CategoryName;

            model.DetailTableName = jsonmodel.DetailTableName;

            model.Description = jsonmodel.Description;

            model.IsDelete = jsonmodel.IsDelete;


            model.Attributes = jsonmodel.Attributes;

            if(jsonmodel.children&&jsonmodel.children.length>0){
                model.children = this.recursion(jsonmodel.children);
            }else{
                model.children = undefined;
            }
            wsList.push(model);
        });
        return wsList;
    }
    

}