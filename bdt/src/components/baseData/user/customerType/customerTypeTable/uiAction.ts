import { message} from 'antd';
import {action } from 'mobx';
import { CustomerTypeDomainStore} from '../domainStore';
import {ICustomerTypeTableViewProps} from './interface';


export class CustomerTypeTableAction{

    private props:ICustomerTypeTableViewProps;
    private domainStore:CustomerTypeDomainStore;
    constructor(props:ICustomerTypeTableViewProps){
        this.props=props;
        this.domainStore = props.GlobalCustomerTypeStore!;

        this.loadData = this.loadData.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.editClick = this.editClick.bind(this);
        this.getAutoId = this.getAutoId.bind(this);
    }

    /**
     * 在页面加载时的回调函数
     */
    @action
    public loadData(){
        this.domainStore.loadData();
    }
    /**
     * 点击删除按钮的回调方法
     * @param e 
     */
    public deleteClick(e:React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        const autoId = this.getAutoId(e);
        if(!autoId){
            return;
        }
        console.log("要删除的id："+autoId);
        this.domainStore.remove(autoId);
    }

    public editClick(e:React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        const autoId = this.getAutoId(e);
        if(!autoId){
            return;
        }
        console.log("要编辑的id："+autoId);
        if(this.domainStore.selectRow(autoId)){
            this.props.onEdit(this.domainStore.currentEditRow);
            console.log(this.domainStore.currentEditRow);
        }else{
            message.error("错误的事件参数");
        }
    }

    public getAutoId(e:React.SyntheticEvent<HTMLAnchorElement>):(number|undefined){
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
        let autoId:number;

        try{
            autoId = parseInt(id.substring(ix+1),10);
        }catch(error){
            console.log(error);
            message.error(error);
            return undefined;
        }
        return autoId;
    }
}
