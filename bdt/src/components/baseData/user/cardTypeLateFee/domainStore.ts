import { message } from 'antd';
import { action, observable } from 'mobx';
import { requestJson } from 'orid';
import { CardTypeLateFee } from "./entity";

/**
 * 用户类型违约金操作方法
 */
export class CardTypeLateFeeDoMainStore{

    /**
     * 页面表格中数据的集合
     */
    @observable
    public list:CardTypeLateFee[];

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading:boolean=false;

    /**
     * 当前编辑行
     */
    @observable
    public currentEditRow:CardTypeLateFee;

    constructor(){
        this.list = new Array<CardTypeLateFee>();
        this.currentEditRow = new CardTypeLateFee();

        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.selectRow = this.selectRow.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.getCardTypeLateFee = this.getCardTypeLateFee.bind(this);
        this.valiDate=this.valiDate.bind(this);
    }

    /**
     * 加载数据
     * @param callBack 
     */
    @action
    public async loadData(callBack?:(list:CardTypeLateFee[]) => void)
    {
        try{
            if(!this.isLoading){
                this.isLoading = true;
            }
            this.list = new Array<CardTypeLateFee>();
            const res = await requestJson("/api/bdt/user/CardTypeLateFee",{method:"GET"});
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            const datas = res.data as CardTypeLateFee[];
            this.list.push(...datas);
            this.isLoading = false;
            if(callBack){
                callBack(this.list);
            }
        }catch(error){
            console.log(error);
            message.error(error);
            this.isLoading = false;
        }
    }

    /**
     * 新增
     * @param cardTypeLateFee 
     */
    @action
    public async add(cardTypeLateFee:CardTypeLateFee){
        try{
            if(!this.isLoading){
                this.isLoading = true;
            }

            const res = await requestJson("/api/bdt/user/CardTypeLateFeeListAdd",{method:"POST",body:JSON.stringify(cardTypeLateFee)});
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            const data = res.data as CardTypeLateFee;
            cardTypeLateFee.AutoId = data.AutoId;
            this.list.push(cardTypeLateFee);
            message.success("新增成功");
            this.isLoading = false;
        }catch(error){
            console.log(error);
            message.error(error);
            this.isLoading = false;
        }
    }

    /**
     * 删除一条记录
     * @param autoId 要删除的记录的id 
     */
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
            const res = await requestJson("/api/bdt/user/CardTypeLateFeeListDelete",{method:"DELETE",body:JSON.stringify(autoId)});
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
    public async update(cardTypeLateFee:CardTypeLateFee){
        try{
            const index = this.getIndex(cardTypeLateFee.AutoId);
            if(index<0){
                return;
            }
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await requestJson("/api/bdt/user/CardTypeLateFeeListUpdate",{method:"PUT",body:JSON.stringify(cardTypeLateFee)});
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            message.success("保存成功");
            this.list[index] = cardTypeLateFee;
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
        const row = this.getCardTypeLateFee(autoId);
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
    public getCardTypeLateFee(autoId:number): CardTypeLateFee | null
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
        return this.list.findIndex((cardTypeLateFee:CardTypeLateFee,index:number,cardTypeLateFees:CardTypeLateFee[]) => {
            return cardTypeLateFee.AutoId === autoId;
        })
    }
}