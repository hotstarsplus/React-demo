import { message } from 'antd';
import { observable } from 'mobx';
import { requestJson } from 'orid';
import { CalcFeeState } from "./entity";

export class CalcFeeStateDoMainStore{
    
    /**
     * 页面表格的数据集合
     */
    @observable
    public list:CalcFeeState[];

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading:boolean=false;

    constructor(){
        this.list = new Array<CalcFeeState>();
    }
    /**
     * 加载页面数据
     * @param callBack 
     */
    public async loadData(callBack?:(list:CalcFeeState[]) => void){
        try{
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await requestJson("/api/bdt/calcFee/CalcFeeState",{method:"GET"});
            if(res.rtnCode!==0){
                console.log("获取计费状态编码失败："+res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
                return;
            }
            this.list = new Array<CalcFeeState>();
            const datas = res.data as CalcFeeState[];
            this.list.push(...datas);
            this.isLoading = false;

        }catch(error){
            console.log(error);
            this.isLoading = false;
        }
    }
}