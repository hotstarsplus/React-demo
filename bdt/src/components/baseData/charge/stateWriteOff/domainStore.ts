import { message } from 'antd';
import { action,observable } from 'mobx';
import { requestJson } from 'orid';
import { StateWriteOff } from "./entity";

export class StateWriteOffDoMainStore{
    
    /**
     * 页面表格中的数据集合
     */
    @observable
    public list:StateWriteOff[];

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading:boolean = false;

    constructor(){
        this.list = new Array<StateWriteOff>();

    }

    /**
     * 加载数据
     * @param callBack 
     */
    @action
    public async loadData(callBack?:(list:StateWriteOff[]) => void){
        try{
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await requestJson("/api/bdt/WriteOff/WriteOffState",{method:"GET"});
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            this.list = new Array<StateWriteOff>();
            const datas = res.data as StateWriteOff[];
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
}