import { message } from 'antd';
import { action } from 'mobx';
import { WaterFeeItemDomainStore } from '../domainStore';
import {IWaterFeeItemTableViewProps} from './interface';
/**
 * 水费项目列表视图action
 */
export class WaterFeeItemTableViewUiAction {

    private props:IWaterFeeItemTableViewProps;

    /**
     * 领域action
     */
    private domainStore: WaterFeeItemDomainStore;


    constructor(props:IWaterFeeItemTableViewProps) {
        this.props=props;
        
        this.domainStore = props.GlobalWaterFeeItemStore!
        this.deleteClick = this.deleteClick.bind(this);
        this.editClick = this.editClick.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getItemId = this.getItemId.bind(this);
    }


    /**
     * 点击删除按钮的回调方法
     * @param e 点击事件对象
     */
    public async deleteClick(id:string) {
       const res = await this.domainStore.remove(id);
        if (res.rtnCode===0) {
            message.success("删除成功");
        }else{
            message.error(res.rtnMsg);
        }

    }

    /**
     * 点击编辑按钮的回调方法
     * @param e 
     */
    @action
    public editClick(e: React.SyntheticEvent<HTMLAnchorElement>) {

        e.preventDefault();
        const id = e.currentTarget.getAttribute('id');

        if (this.domainStore.selectItem(id!)) {
            this.props.onEdit(this.domainStore.currentEditItem);
        } else {
            message.error('错误的事件参数');
        }
    }

   

    /** 
     * 在页面加载时的回调函数
     */
    @action 
    public loadData() {
        this.domainStore.loadData();
    }

  

    /**
     * 获得选择的对应的id
     * @param e 
     */
    private getItemId(e: React.SyntheticEvent<HTMLAnchorElement>): (string | undefined) {
        const id = e.currentTarget.getAttribute('id');
        if (!id) {
            message.error('无效的对象id');
            return undefined;
        }
        const ix = id.indexOf('_');
        if (ix < 0) {
            message.error('无效的对象id');
            return undefined;
        }

        let itemId: string

        try {
            itemId = id.substring(ix + 1);
        } catch (error) {
            console.log(error)
            return undefined;
        }

        return itemId;
    }
}