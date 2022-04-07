import { action } from "mobx";
import { MainBranchTypeDoMainStore } from "../domainStore";
import { IMainBranchTypeTableProps } from "./interface";

export class MainBranchTypeTableUiAction{
    private domainStore:MainBranchTypeDoMainStore;

    constructor(props:IMainBranchTypeTableProps){
        this.domainStore = props.GlobalMainBranchTypeStore!;
        
        this.loadData = this.loadData.bind(this);
    }

    @action
    public loadData(){
        this.domainStore.loadData();
    }
}