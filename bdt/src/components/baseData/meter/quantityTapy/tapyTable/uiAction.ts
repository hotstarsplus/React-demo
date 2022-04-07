import { message, } from 'antd';
import { action } from 'mobx';
import { QuantityTapy } from '../entity';
import { QuantityTapyUiStore } from '../uiStore';
import { IQuantityTapyTableViewProps } from './interface';

/**
 * 水量类型列表视图action
 */
export class QuantityTapyTableViewUiAction {
    private props: IQuantityTapyTableViewProps;
    /**
     * 领域action
     */
    private domainStore: QuantityTapyUiStore;
    constructor(props: IQuantityTapyTableViewProps) {
        this.props = props;
        this.domainStore = props.GlobalQuantityTapyStore!
    }

    @action.bound
    public getRowKey(record: QuantityTapy, index: number): string {
        return index.toString();
    }

    /**
     * 点击删除按钮的回调方法
     * @param e 点击事件对象
     */
    @action.bound
    public deleteClick(value: string, e: React.SyntheticEvent<HTMLAnchorElement>) {
        const deleteid = value;
        if (!deleteid) {
            message.error("无效的对象id");
            return;
        }
        const ix = deleteid.indexOf('_');
        if (ix < 0) {
            message.error('无效的对象id');
            return;
        }
        const id = deleteid.substring(ix + 1);
        if (!id) { return; }
        // const iid=Number(id);
        this.props.onRemove(id)
    }
    /**
     * 点击编辑按钮的回调方法
     * @param e 
     */
    @action.bound
    public editClick(e: React.SyntheticEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const id = this.getItemId(e);
        if (!id) { return; }
        if (this.props.selectItem(id)) {
            this.props.onEdit(this.domainStore.currentEditItem);
        } else {
            message.error('错误的事件参数');
        }
    }


    /**
     * 获得选择的对应的id
     * @param e 
     */
    @action.bound
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
        try {
            return id.substring(ix + 1);
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }
}