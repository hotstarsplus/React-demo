import {message} from 'antd';
import {action,observable} from "mobx";
import {requestJson} from 'orid'
import {CardTypeCopyDateModel} from './entity';

export class CardTypeCopyDateDomainStore{

    @observable
    public list:CardTypeCopyDateModel[];

    @observable
    public currentEditItem:CardTypeCopyDateModel;

    @observable
    public isLoading:boolean;


    constructor(){
        this.list=new Array<CardTypeCopyDateModel>();

        this.isLoading=true;

        this.currentEditItem=new CardTypeCopyDateModel();
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.selectRow = this.selectRow.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.getCardTypeCopyDate = this.getCardTypeCopyDate.bind(this);
    }

    public async loadData(callBack?:(list:CardTypeCopyDateModel[])=>void){
        try{
            if(!this.isLoading){
                this.isLoading=true;
            }
            const returnJson=await requestJson('/api/bdt/user/CardTypeCopyDate',{method:'GET'});
            

            if(returnJson.rtnCode===0){

                const datas = returnJson.data as CardTypeCopyDateModel[];
                
                this.isLoading = false;

                this.list.push(...datas);

                if (callBack) {

                    callBack(this.list);
                
                }

            }else{

                console.log(returnJson.rtnMsg);

            }
        } catch (error) {
            console.log(error);
        }
        
    }

    @action
    public async add(cardTypeCopyDateModel:CardTypeCopyDateModel){
        try{
        const jsonStr={"copyDayBegin":cardTypeCopyDateModel.CopyDayBegin,"copyDayEnd":cardTypeCopyDateModel.CopyDayEnd}
        const res=await requestJson('/api/bdt/user/CardTypeCopyDateAdd',{method:"POST",body:JSON.stringify(jsonStr)},);
        if(res.rtnCode!==0){
            message.error(res.rtnMsg);
            return;
        }
        const data=res.data as CardTypeCopyDateModel;
        cardTypeCopyDateModel.AutoId=data.AutoId;
        cardTypeCopyDateModel.CardTypeId=data.CardTypeId;

        this.list.push(cardTypeCopyDateModel);
    }catch(error){
        message.error(error);
    }

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
            const res = await requestJson("/api/bdt/user/CardTypeCopyDateDelete",{method:"DELETE",body:JSON.stringify(autoId)});
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


    @action
    public async update(cardTypeCopyDate:CardTypeCopyDateModel){
        try{
            const index = this.getIndex(cardTypeCopyDate.AutoId);
            if(index<0){
                return;
            }
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await requestJson("/api/bdt/user/CardTypeCopyDateUpdate",{method:"PUT",body:JSON.stringify(cardTypeCopyDate)});
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            message.success("保存成功");
            this.list[index] = cardTypeCopyDate;
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
        const row = this.getCardTypeCopyDate(autoId);
        if(!row || row === null){
            return false;
        }
        this.currentEditItem = row;
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
    public getCardTypeCopyDate(autoId:number): CardTypeCopyDateModel | null
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
        return this.list.findIndex((cardTypeCopyDate:CardTypeCopyDateModel,index:number,CardTypeCopyDate:CardTypeCopyDateModel[]) => {
            return cardTypeCopyDate.AutoId === autoId;
        })
    }
}
