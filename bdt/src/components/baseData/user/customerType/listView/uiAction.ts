import  { message } from 'antd';
import { action,observable } from "mobx";
import {CustomerTypeDomainStore} from "../domainStore";
import {CustomerTypeModel } from "../entity";

export class CustomerTypeViewAction{

    @observable
    public isVisiableModal:boolean=false;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle :string ="";
    public opearatorType:'none' | 'add' | 'edit';

    public domainStore:CustomerTypeDomainStore;

    constructor(domainStore:CustomerTypeDomainStore){
        this.domainStore=domainStore;
        this.addClick=this.addClick.bind(this);
        this.onEditClick=this.onEditClick.bind(this);
        this.cancelAddorEdit=this.cancelAddorEdit.bind(this);
        this.saveClick=this.saveClick.bind(this);
    }



    @action 
    public addClick(){
        this.modaltitle = "新增用户类型";
        this.isVisiableModal=true;
        this.domainStore.currentEditRow=new CustomerTypeModel();
        this.opearatorType='add';
    }

    @action
    public onEditClick(item:CustomerTypeModel){
        this.modaltitle = "编辑用户类型";
        this.isVisiableModal=true;
        this.opearatorType='edit';
    }

    @action 
    public cancelAddorEdit(){
        this.isVisiableModal=false;
    }


    @action
    public saveClick(item:CustomerTypeModel){
        if(this.opearatorType==='add'){
            this.domainStore.add(item);
            console.log("新增成功")
        }
        else if(this.opearatorType==='edit'){
            this.domainStore.update(item);
            console.log("更新成功")
        }
        this.isVisiableModal=false;
        console.log("保存成功")
        message.success("保存成功");
    }

}