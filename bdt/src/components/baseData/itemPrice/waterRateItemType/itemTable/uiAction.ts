import { message } from 'antd';
import { action } from 'mobx';
import { WaterRateItemTypeDomainStore } from '../doMainStore';
import {IWaterRateItemTypeTableViewProps} from './interface';
/**
 * 水费项目列表视图action
 */
export class WaterRateItemTypeTableViewUiAction {

    private props:IWaterRateItemTypeTableViewProps;

    /**
     * 领域action
     */
    private domainStore: WaterRateItemTypeDomainStore;


    constructor(props:IWaterRateItemTypeTableViewProps) {
        this.props=props;
        this.domainStore = props.GlobalWaterRateItemTypeStore!
        this.deleteClick = this.deleteClick.bind(this);
        this.editClick = this.editClick.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getItemId = this.getItemId.bind(this);
    }


    /**
     * 点击删除按钮的回调方法
     * @param e 点击事件对象
     */
    public deleteClick(e: React.SyntheticEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const id = this.getItemId(e);
        if (!id) { return; }

        console.log(`要删除的记录的id：${id}`)
        if (this.domainStore.remove(id)) {
            message.success('已刪除');
        }
    }

    /**
     * 点击编辑按钮的回调方法
     * @param e 
     */
    @action
    public editClick(e: React.SyntheticEvent<HTMLAnchorElement>) {

        e.preventDefault();

        const id = this.getItemId(e);
        if (!id) { return; }
        console.log(`要编辑的记录的id：${id}`);

        if (this.domainStore.selectItem(id)) {
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

        let itemTypeId: string

        try {
            /*itemTypeId = parseInt(id.substring(ix + 1), 10);*/
            itemTypeId = id.substring(ix + 1);
        } catch (error) {
            console.log(error)
            return undefined;
        }

        return itemTypeId;
    }
}