import { message } from "antd"
import { observable } from "mobx";
import { requestJson } from "orid";
import { MainBranchType } from "./entity";

export class MainBranchTypeDoMainStore{

    /**
     * 页面表格中的数据集合
     */
    @observable
    public list:MainBranchType[];

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading:boolean = false;

    constructor(){
        this.list = new Array<MainBranchType>();
    }

    /**
     * 加载数据
     * @param callBack 
     */
    public async loadData(callBack?:(list:MainBranchType[]) => void){
        try{
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await requestJson("api/bdt/meter/MeterBranchType",{method:"GET"});
            console.log(res.rtnCode);
            console.log(res.data);
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
                return;
            }
            this.list = new Array<MainBranchType>();
            const datas = res.data as MainBranchType[];
            this.list.push(...datas);
            this.isLoading = false;
            if(callBack){
                callBack(this.list);
            }
        }catch(error){
            console.log(error);
            this.isLoading = false;
        }
    }
}