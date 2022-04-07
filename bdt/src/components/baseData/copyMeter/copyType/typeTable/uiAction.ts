import { action } from "mobx";
import { CopyTypeDoMainStore } from "../domainStore";

/**
 * 抄表类型表格action
 */
export class CopyTypeTableUiAction{

    public domainStore:CopyTypeDoMainStore;

    constructor(){
        this.domainStore = new CopyTypeDoMainStore();

        this.loadData = this.loadData.bind(this);
    }

    /**
     * 加载页面数据
     */
    @action
    public loadData(){
        this.domainStore.loadData();
    }

}