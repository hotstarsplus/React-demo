import {message} from 'antd';
import {action,observable} from 'mobx';
import {requestJson} from 'orid';
import {CustomerTypeModel} from './entity';

export class CustomerTypeDomainStore{

    /**
     * 用户自定义类型集合
     */
    @observable
    public list :CustomerTypeModel[];

    /**
     * 是否处于加载状态
     */
    @observable
    public isLoading:boolean;

    /**
     * 当前选择的用于预览或者编辑的项目。当改变这个值时，ui界面中应该显示此项目的内容
     */
    @observable
    public currentEditRow:CustomerTypeModel;

    constructor(){
        this.list=new Array<CustomerTypeModel>();
        this.currentEditRow=new CustomerTypeModel();
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.selectRow = this.selectRow.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.getCustomerType = this.getCustomerType.bind(this);
        this.valiDate=this.valiDate.bind(this);
    }
    @action
    public async add (customerTypeModel:CustomerTypeModel){
        try{
            const jsonStr={"CustomerTypeName":customerTypeModel.CustomerTypeName,"Description":customerTypeModel.Description}
            const res=await requestJson('/api/bdt/user/CustomerTypeAdd',{method:"POST",body:JSON.stringify(jsonStr)},);
            if(res.rtnCode!==0){
                message.error(res.rtnMsg);
                return;
            }
            const data=res.data as CustomerTypeModel;

            customerTypeModel.AutoId=data.AutoId;
            customerTypeModel.CustomerTypeId=data.CustomerTypeId;

            this.list.push(customerTypeModel);
        }catch(error){
            message.error(error);
        }
    }

    /**
     * @param callBack 加载数据
     */
    @action
    public async loadData(callBack?:(List:CustomerTypeModel[])=>void){
        try{
            if(!this.isLoading){
                this.isLoading=true;
            }
            this.list=new Array<CustomerTypeModel>();
            const res=await requestJson('/api/bdt/user/CustomerType',{method:"GET"});
            if(res.rtnCode!==0){
                this.isLoading=false;
                message.error(res.rtnMsg);
                return;
            }
            const datas=res.data as CustomerTypeModel[];
            this.list.push(...datas);
            this.isLoading=false;
            if(callBack){
                callBack(this.list);
            }
        }catch(error){
            message.error(error);
        }
        this.currentEditRow=new CustomerTypeModel();
    }

    @action
    public async remove(autoId:number){
        try{
            const index = this.getIndex(autoId);
            if(index<0){
                return;
            }
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await requestJson("/api/bdt/user/CustomerTypeDelete",{method:"DELETE",body:JSON.stringify(autoId)});
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            message.success("删除成功");
            this.list.splice(index,1);
            this.isLoading = false;

        }catch(error){
            console.log(error);
            message.error(error);
            this.isLoading = false;
        }
    }

    /**
     * 编辑保存
     * @param cardTypeLateFee 要保存的用户类型违约金实体
     */
    @action
    public async update(customerType:CustomerTypeModel){
        try{
            const index = this.getIndex(customerType.AutoId);
            if(index<0){
                return;
            }
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await requestJson("/api/bdt/user/CustomerTypeUpdate",{method:"PUT",body:JSON.stringify(customerType)});
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            message.success("保存成功");
            this.list[index] = customerType;
            this.isLoading = false;
        }catch(error){
            console.log(error);
            message.error(error);
            this.isLoading = false;
        }
    }

    /**
     * 当前选择行
     * @param autoId 
     */
    @action
    public selectRow(autoId:number):boolean{
        const row = this.getCustomerType(autoId);
        if(!row || row === null){
            return false;
        }
        this.currentEditRow = row;
        return true;

    }

    /**
     * from表单验证
     * @param value 
     */
    public valiDate(value:any):string|undefined{
        return undefined;
    }


    /**
     * 根据autoId找到对应的实体
     * @param autoId 
     */
    public getCustomerType(autoId:number): CustomerTypeModel | null
    {
        try {
            const index = this.getIndex(autoId);
            return index < 0 ? null :this.list[index];
            
        } catch (error) {
            console.log("获取当前编辑实体异常:"+error);
            return null;
        }
    }

    /**
     * 查找指定id的项目在集合中的索引
     * @param autoId 项目的id
     */
    public getIndex(autoId:number){
        return this.list.findIndex((customerType:CustomerTypeModel,index:number,customerTypes:CustomerTypeModel[]) => {
            return customerType.AutoId === autoId;
        })
    }
}
