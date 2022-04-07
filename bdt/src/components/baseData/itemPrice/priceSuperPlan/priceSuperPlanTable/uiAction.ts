import { message } from "antd";
import { action } from "mobx";
import { PriceSuperPlanDoMainStore } from "../domainStore";
import { IPriceSuperPlanTableProps } from "./interface";

/**
 * 超计划水价action
 */
export class PriceSuperPlanTableUiAction{
    
    private props:IPriceSuperPlanTableProps;

    /**
     * 领域action
     */
    private domainStore:PriceSuperPlanDoMainStore;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props:IPriceSuperPlanTableProps){
        this.props = props;
        this.domainStore = props.GlobalPriceSuperPlanStore!;
        this.loadData = this.loadData.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.editClick = this.editClick.bind(this);
        this.getFpId = this.getFpId.bind(this);
    }

    /**
     * 加载页面时的回调函数
     */
    @action
    public loadData(){
        this.domainStore.loadData();
    }

    /**
     * 点击删除的回调函数
     * @param e 
     */
    @action
    public deleteClick(e:React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        const fpId = this.getFpId(e);
        if(!fpId){
            return;
        }
        console.log("要删除的id:"+fpId[0]+","+fpId[1]);
        this.domainStore.remove(fpId[0],fpId[1]);
    }

    /**
     * 点击编辑的回调函数
     * @param e 
     */
    @action
    public editClick(e:React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        const fpId = this.getFpId(e);
        if(!fpId){
            return;
        }

        console.log("要编辑的id："+fpId);
        if(this.domainStore.selectRow(fpId[0],fpId[1])){
            this.props.onEdit(this.domainStore.currentEditRow);
        }else{
            message.error("错误的事件参数");
        }
    }



    /**
     * 获取当前行的autoId
     * @param e 
     */
    private getFpId(e:React.SyntheticEvent<HTMLAnchorElement>):(string[]|undefined){
        const id = e.currentTarget.getAttribute("id");
        if(!id){
            message.error("无效的对象id");
            console.log("无效的对象id");
            return undefined;
        }
        const ix = id.indexOf("_");
        if(ix<0){
            message.error("无效的对象id");
            console.log("无效的对象id");
            return undefined;
        }
        try{
            const pfId = id.substring(ix+1)
            const index = pfId.indexOf("+");
            if(index<0){
                message.error("无效的对象id");
                console.log("无效的对象id");
                return undefined;
            }
            return [pfId.substring(0,index),pfId.substring(index+1)];
        }catch(error){
            message.error(error);
            console.log(error);
            return undefined;
        }

    }


}