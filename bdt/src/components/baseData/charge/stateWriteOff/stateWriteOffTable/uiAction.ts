import { action } from "mobx";
import { StateWriteOffDoMainStore } from "../domainStore";
import { IStateWriteOffTableProps } from "./interface";

export class StateWriteOffTableUiAction{

    private domainStore:StateWriteOffDoMainStore;

    constructor(props:IStateWriteOffTableProps){
        this.domainStore = props.GlobalStateWriteOffStore!;
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