import { message } from 'antd';
import { action } from "mobx";
import { MeterModelDomainStore } from '../domainStore';
import { MeterModel } from '../entity';
import { IMeterModelTableViewProps } from "./interface";

export class MeterModelTableUiAction {
    private props: IMeterModelTableViewProps;
    private domainStore: MeterModelDomainStore;
    constructor(props: IMeterModelTableViewProps) {
        this.props = props;
        this.domainStore = new MeterModelDomainStore()
        this.deleteClick = this.deleteClick.bind(this);
        this.editClick = this.editClick.bind(this);
        // this.loadData = this.loadData.bind(this);
        this.getMeterModelId = this.getMeterModelId.bind(this);

    }
    // /**
    //  * 在页面加载时的回调函数
    //  */
    // @action
    // public loadData() {
    //     this.domainStore.loadData();
    // }
    /**
     * 点击删除的回调函数
     * @param e 
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
        if (!id) { return; }
        // const iid=Number(id);
        this.remove(id);
    }

    /** 删除 */
    @action.bound
    public remove(id: string) {
        const store = this.props.GlobalMeterModelStore!;
        try {
            const index = this.getIndex(id);
            if (index < 0) {
                message.error("删除水表型号失败");
                return;
            } else {
                if (!store.isLoading) {
                    store.isLoading = true;
                }

                this.domainStore.removeMeterModel(id, store.CompanyName).then((res) => {
                    if (res.rtnCode !== 0) {
                        message.error("删除水表型号失败：" + res.rtnMsg);
                        store.isLoading = false;
                        return;
                    } else {
                        const datas = res.data as MeterModel[];
                        store.refreshUi(datas);
                        const arr = datas.sort((a, b) => a.SortNo - b.SortNo);
                        store.maxSortNo = arr[arr.length - 1].SortNo;
                        if (store.maxSortNo !== undefined || store.maxSortNo !== 0) {
                            store.maxSortNo += 1;
                        } else {
                            store.maxSortNo = 1;
                        }
                        store.isLoading = false;
                        message.success("删除水表型号成功");
                    }
                })
            }
        } catch (error) {
            store.isLoading = false;
            console.log(error);
        }
    }

    /**
     * 点击编辑按钮的回调方法
     * @param e 
     */
    @action
    public editClick(e: React.SyntheticEvent<HTMLAnchorElement>) {
        const store = this.props.GlobalMeterModelStore!;
        e.preventDefault();

        const id = this.getMeterModelId(e);
        if (!id) { return; }
        console.log('要编辑的记录的id：${id}');
        // const iid=Number(id);
        if (selectRow(id,this)) {
            this.props.onEdit(store.currentEditRow);
        } else {
            message.error('错误的事件参数');
        }

        function selectRow(id1: string,that:MeterModelTableUiAction) {
            const row = getMeterModel(id1,that);
            if (!row || row === null) {
                return false;
            }
            store.currentEditRow = row;
            return true;
        }

        function getMeterModel(id2:string,that:MeterModelTableUiAction): null | MeterModel {
            const index = that.getIndex(id2);
            return index < 0 ? null : store.list[index];
        }
    }

    
    /**
     * 获得选择的对应的id
     * @param e 
     */
    public getMeterModelId(e: React.SyntheticEvent<HTMLAnchorElement>): (string | undefined) {
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
        let meterModelId: string
        try {
            meterModelId = id.substring(ix + 1);
        } catch (error) {
            console.log(error)
            return undefined;
        }
        return meterModelId;
    }

    /**
     * 查找指定id的项目的在集合中的索引
     * 
     * @param {string} id 项目的id
     * @returns {number} 项目的索引
     */
    @action.bound
     public getIndex(id: string): number {
        return this.props.GlobalMeterModelStore!.list.findIndex((meterModel: MeterModel, index: number, meterModels: MeterModel[]) => {
            return meterModel.MeterModelId === id;
        });
    }
}