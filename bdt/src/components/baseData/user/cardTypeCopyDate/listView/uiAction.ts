import { message } from 'antd';
import { action,observable } from "mobx";
import {CardTypeCopyDateDomainStore} from '../domainStore';
import {CardTypeCopyDateModel} from '../entity';


export class CardTypeCopyDateViewAction{
    @observable
    public isVisiableModal:boolean=false;
    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle:string = "";

    public opearatorType:'none' | 'add' | 'edit';

    public domainStore:CardTypeCopyDateDomainStore;

    constructor(domainStore:CardTypeCopyDateDomainStore){
        this.domainStore=domainStore;
        this.addClick=this.addClick.bind(this);
        this.onEditClick=this.onEditClick.bind(this);
        this.cancelAddorEdit=this.cancelAddorEdit.bind(this);
        this.saveClick=this.saveClick.bind(this);
    }

    @action
    public addClick(){
        this.isVisiableModal=true;
        this.modaltitle = "新增水卡类型与抄表时间关系";
        this.domainStore.currentEditItem=new CardTypeCopyDateModel();
        this.opearatorType='add';
    }

    @action
    public onEditClick(item:CardTypeCopyDateModel){
        this.isVisiableModal=true;
        this.modaltitle = "编辑水卡类型与抄表时间关系";
        this.opearatorType='edit';
    }

    @action
    public cancelAddorEdit(){
        this.isVisiableModal=false;
    }


    @action
    public saveClick(item:CardTypeCopyDateModel){
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