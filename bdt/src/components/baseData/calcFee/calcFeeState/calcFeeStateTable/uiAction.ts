import { action } from "mobx";
import { CalcFeeStateDoMainStore } from "../domainStore";
import { ICalcFeeStateTableProps } from "./interface";

export class CalcFeeStateTableUiAction{


    private domainStore:CalcFeeStateDoMainStore;

    constructor(props:ICalcFeeStateTableProps){
        this.domainStore = props.GlobalCalcFeeStateStore!;
        this.loadData = this.loadData.bind(this);
    }

    /**
     * 加载数据
     */
    @action
    public loadData(){
        this.domainStore.loadData();
    }

}