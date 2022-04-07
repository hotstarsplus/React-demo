import { message } from 'antd';
import { action } from 'mobx';
import { PriceRepireDoMainStore } from "../domainStore";
import { IPriceRepireMeterTableProps } from "./interface";

/**
 * 校表维修费action
 */
export class PriceRepireMeterTableUiAction{

    private props:IPriceRepireMeterTableProps;

    /**
     * 领域store
     */
    private domainStore:PriceRepireDoMainStore;


    /**
     * 构造方法
     * @param props 
     */
    constructor(props:IPriceRepireMeterTableProps){
        this.props = props;
        this.domainStore = props.GlobalPriceRepireMeterStore!;

        this.deleteClick = this.deleteClick.bind(this);
        this.editClick = this.editClick.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getIndex = this.getIndex.bind(this);
    }

    /**
     * 点击删除按钮的回调函数
     * @param e 
     */
    public deleteClick(e: React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        const id = this.getIndex(e);
        if(!id){
            return;
        }
        console.log("要删除的记录的id：" + id);
        this.domainStore.remove(id);
    }

    /**
     * 点击编辑按钮的回调函数
     * @param e 
     */
    @action
    public editClick(e:React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        
        const id = this.getIndex(e);
        console.log(id)
        if(!id){
            return;
        }

        if(this.domainStore.selectRow(id)){
            this.props.onEdit(this.domainStore.currentEditRow);
        }
        else{
            console.log("错误的事件参数");
            message.error("错误的事件参数");
        }
    }

    /**
     * 页面加载数据
     */
    @action
    public loadData(){
        this.domainStore.loadData();
    }



    /**
     * 获取选择的对应的id
     * @param e 
     */
    public getIndex(e: React.SyntheticEvent<HTMLAnchorElement>): (string | undefined){
        const id = e.currentTarget.getAttribute("id");
        if(!id){
            message.error("无效的对象id");
            console.log("无效的对象id");
            return undefined;
        }
        const ix = id.indexOf("_");
        if(!ix){
            message.error("无效的对象id");
            console.log("无效的对象id");
            return undefined;
        }
        let meterCaliberId:string;
        try{
            
            meterCaliberId = id.substring(ix + 1);
        }catch(error){
            console.log(error);
            message.error(error);
            return undefined;
        }
        return meterCaliberId;
    }


}