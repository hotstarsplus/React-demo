import { action } from "mobx";

import { message } from "antd";
import { IDeviceCategoryTableViewProps } from "./interface";


export class DeviceCategoryUiAction{

    private props:IDeviceCategoryTableViewProps;

    // private domainStore:DeviceCategoryDoMainStore; 

    constructor(props:IDeviceCategoryTableViewProps){
        this.props = props;
        // this.domainStore = props.GlobalDeviceCategoryStore!;
        this.loadData = this.loadData.bind(this);
        this.CheckParas = this.CheckParas.bind(this);
        this.getIndex = this.getIndex.bind(this);
        
    }

    /**
     * 加载数据时回调
     */
    @action
    public loadData(){
        this.props.GlobalDeviceCategoryStore!.loadData();
    }

    /**
     * 查看
     * @param e 
     */
    @action
    public async CheckParas(e:React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        const id = this.getIndex(e);
        console.log("id is "+id);
        this.props.GlobalDeviceCategoryStore!.currentItem = this.props.GlobalDeviceCategoryStore!.list[Number(id)].CommonFields;
        this.props.GlobalDeviceCategoryStore!.showName = this.props.GlobalDeviceCategoryStore!.list[Number(id)].CategoryName;
        console.log("this.props.GlobalDeviceCategoryStore!.currentItem is "+JSON.stringify(this.props.GlobalDeviceCategoryStore!.currentItem));
        
        this.props.onCheck();
    }

    /**
     * 获取银行ID
     * @param e 
     */
    private getIndex(e:React.SyntheticEvent<HTMLAnchorElement>):(string|undefined){

        const id = e.currentTarget.getAttribute("id");
        console.log(id);
        if(!id){
            message.error("无效的对象id")
            return undefined;
        }
        return id;

    }

}