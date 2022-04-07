import { message } from 'antd';
import { action,observable } from "mobx";
import { requestJson } from "orid";
import { CopyType } from "./entity";

/**
 * 抄表类型操作方法类
 */
export class CopyTypeDoMainStore{
    
    /**
     * 表格数据集合
     */
    @observable
    public list:CopyType[];

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading:boolean;

    constructor(){
        this.list = new Array<CopyType>();
    }

    /**
     * 加载页面数据
     * @param callBack 
     */
    @action
    public async loadData(callBack?:(list:CopyType[])=>void){
        try{

            if(!this.isLoading){

                this.isLoading = true;
            }
            this.list = new Array<CopyType>();

            const res = await requestJson('/api/bdt/copymeter/copyType',{method:"GET"});
            if(res.rtnCode !== 0){
                this.isLoading = false;
                message.error(res.rtnMsg);
                return;
            }
            const data = res.data as CopyType[];
            this.list.push(...data);
            this.isLoading = false;
            if(callBack){
                callBack(this.list);
            }

        }catch(error){
            message.error(error);

        }

    }

}