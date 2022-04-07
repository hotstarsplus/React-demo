import { message } from 'antd';
import { action,observable } from "mobx";
import { requestJson } from "orid";
import { CopyState } from "./entity";



/**
 * 抄见状态操作方法类
 */
export class CopyStateDoMainStore{

    /**
     * 列表数据集合
     */
    @observable
    public list :CopyState[];

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading: boolean = true;

    constructor(){
        this.list = new Array<CopyState>();
    }

    /**
     * 获取页面数据
     * @param callBack 
     */
    @action
    public async loadData(callBack?: (list: CopyState[]) => void){

        try{
            if(!this.isLoading){
                this.isLoading = true;
            }
            this.list = new Array<CopyState>();
            const res = await requestJson('/api/bdt/copymeter/copyState',{method:"GET"});
            console.log(res.data);
            if(res.rtnCode!==0){
                this.isLoading = false;
                message.error(res.rtnMsg);
                return;
            }
            const datas = res.data as CopyState[];
            this.list.push(...datas);
            console.log(this.list);
            this.isLoading = false;
            if(callBack){
                callBack(this.list);
            }
        }catch(error){

            message.error(error);

        }
    }

}