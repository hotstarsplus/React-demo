import { message } from 'antd';
import { action } from 'mobx';
import { MeterCaliberDomainStore } from '../domainStore';
import { MeterCaliber } from '../entity';
import { IMeterCaliberTableViewProps } from './interface';

/**
 * 水费项目列表视图action
 */
export class MeterCaliberTableViewUiAction {
    public props: IMeterCaliberTableViewProps;
    /**
     * 领域action
     */
    public domainStore: MeterCaliberDomainStore;
    constructor(props: IMeterCaliberTableViewProps) {
        this.props = props;
        this.domainStore = new MeterCaliberDomainStore();
        this.deleteClick = this.deleteClick.bind(this);
        this.editClick = this.editClick.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getItemId = this.getItemId.bind(this);
    }
    /**
     * 点击删除按钮的回调方法
     * @param e 点击事件对象
     */
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
        if (!id) {
            return;
        }
        // const iid=Number(id);
        console.log("走了吗？？？")
        this.remove(id);
    }

    /** 删除水表 */
    @action.bound
    public remove(id: string) {
        const store = this.props.GlobalMeterCaliberStore!;
        try {
            console.log(id);
            const index = store.getIndex(id);
            if (index < 0) {
                message.error("删除水表口径失败");
                return;
            } else {
                if (!store.isLoading) {
                    store.isLoading = true;
                }
                this.domainStore.removeMeterInfo(id, store.CompanyName).then((res) => {
                    if (res.rtnCode !== 0) {
                        store.isLoading = false;
                        message.error(res.rtnMsg);
                    } else {
                        const datas = res.data as MeterCaliber[];
                        store.refreshUi(datas);
                        const arr = datas.sort((a, b) => a.SortNo - b.SortNo);
                        store.maxSortNo = arr[arr.length - 1].SortNo;
                        if (store.maxSortNo !== undefined || store.maxSortNo !== 0) {
                            store.maxSortNo += 1;
                        } else {
                            store.maxSortNo = 1;
                        }
                        store.isLoading = false;
                        message.success("删除水表口径成功");
                    }
                })
            }
        } catch (error) {
            store.isLoading = false;
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
        if (this.selectItem(id)) {
            this.props.onEdit(this.props.GlobalMeterCaliberStore!.currentEditItem);
        } else {
            message.error('错误的事件参数');
        }
    }

    /**
     * 设置指定Id的项目为当前编辑项目
     * @param {string} id 项目的Id
     * @returns {boolean} 成功返回True，否则返回false
     */
    @action
    public selectItem(id: string): boolean {
        const store = this.props.GlobalMeterCaliberStore!;
        const item = this.getItem(id);
        console.log(item);
        if (!item || item === null) {
            return false;
        }
        store.currentEditItem = item;
        return true;
    }

    /**
     * 查找指定的id的项目
     * 
     * @param {string} id 
     * @returns {WaterRateItem | null} 水费项目或空
     */
    public getItem(id: string): MeterCaliber | null {
        const ix = this.props.GlobalMeterCaliberStore!.getIndex(id);
        return ix < 0
            ? null
            : this.props.GlobalMeterCaliberStore!.list[ix];
    }

    /** 
     * 在页面加载时的回调函数
     */
    @action
    public loadData() {
        this.props.loadData();
    }

    /**
     * 获得选择的对应的id
     * @param e 
     */
    private getItemId(e: React.SyntheticEvent<HTMLAnchorElement>): (string | undefined) {
        const id = e.currentTarget.getAttribute('id');
        console.log(id);
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