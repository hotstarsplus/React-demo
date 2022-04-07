import { action } from 'mobx';
import { CopyStateDoMainStore } from '../domainStore';

/**
 * 抄见状态回调方法类
 */
export class CopyStateTableUiAction{


    /**
     * 领域action
     */
    public domainStore:CopyStateDoMainStore;

    constructor(){

        this.domainStore = new CopyStateDoMainStore();

        this.loadData = this.loadData.bind(this);
    }

    /**
     * 加载数据的回调函数
     */
    @action
    public loadData() {
        this.domainStore.loadData();
    }
}