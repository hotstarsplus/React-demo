import {message} from 'antd';
import {action} from 'mobx';
import {CardTypeCopyDateDomainStore} from '../domainStore';
import { ICardTypeCopyDateTableViewProps } from './interface';


export class CardTypeCopyDateTableAction{
    private props:ICardTypeCopyDateTableViewProps;
    private domainStore:CardTypeCopyDateDomainStore;
    constructor(props:ICardTypeCopyDateTableViewProps){
        this.props=props;
        this.domainStore = props.GlobalCardTypeCopyDateStore!;

        this.loadData = this.loadData.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.editClick = this.editClick.bind(this);
        this.getCardTypeCopyDateModelAutoId = this.getCardTypeCopyDateModelAutoId.bind(this);
    }

    @action
    public loadData(){
        this.domainStore.loadData();
    }


    public deleteClick(e:React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        const autoId=this.getCardTypeCopyDateModelAutoId(e);
        if(!autoId){
            return;
        }
        console.log("要删除的记录id"+autoId);
        if(this.domainStore.remove(autoId)){
            message.success('已删除');
        }
    }
    public editClick(e:React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        const autoId=this.getCardTypeCopyDateModelAutoId(e);
        if(!autoId) {return;}
        console.log("要编辑的id："+autoId);

        if(this.domainStore.selectRow(autoId)){
            this.props.onEdit(this.domainStore.currentEditItem);
        }else{
            message.error('错误的事件参数');
        }
    }





    private getCardTypeCopyDateModelAutoId(e:React.SyntheticEvent<HTMLAnchorElement>):(number | undefined){
        const id=e.currentTarget.getAttribute('id');
        if(!id){
            message.error('无效的对象id');
            console.log('无效的对象id');
            return undefined;
        }
        const ix=id.indexOf('_');
        if(ix<0){
            message.error('无效的对象id');
            return undefined;
        }
        let autoId:number

        try {
            autoId = parseInt(id.substring(ix+1),10);
        } catch (error) {
            console.log(error)
            return undefined;
        }
        return autoId;
    }

}