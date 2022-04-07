import { message } from "antd";
import { action } from "mobx";
import { WaterStationUiStore } from "../uiStore"
import { WaterStation } from "../entity";
import { IWaterStationTableProps } from "./interface";
import { WaterStationDomainStore } from "../domainStore";
import { OridStores } from "orid";




export class WaterStationTableUiAction {

    private props: IWaterStationTableProps;

    private uiStore: WaterStationUiStore;

    private domainStore: WaterStationDomainStore;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IWaterStationTableProps) {

        this.props = props;

        this.domainStore = new WaterStationDomainStore();

        this.uiStore = props.GlobalWaterStationStore!;

    }


    /**
     * 新增事件
     * @param e 
     */
    @action.bound
    public addClick(e: React.SyntheticEvent<HTMLAnchorElement>) {

        e.preventDefault();

        // const id = this.getWaterStationId(e);

        // if (!id) { return; };
        this.uiStore.CurrentEditWaterStation = new WaterStation();
        // this.domainStore.CurrentEditWaterStation.FatherId = id;
        this.props.onAdd(this.props.GlobalWaterStationStore!.CurrentEditWaterStation);
    }


    /**
     * 编辑事件
     * @param e 
     */
    @action.bound
    public async editClick(e: React.SyntheticEvent<HTMLAnchorElement>) {
        this.props.GlobalWaterStationStore!.isEditModal = true
        e.preventDefault();
        this.props.GlobalWaterStationStore!.operatorType = "update";
        const id = this.getWaterStationId(e);
        if (!id) { return; };
        if (this.SelectWaterStation(id)) {
            if (this.uiStore!.CurrentEditWaterStation.FatherId!==OridStores.authStore.currentOperator.CpCode) {
                this.GetNameByKey(this.uiStore.CurrentEditWaterStation.FatherId).then((name) => {
                    this.uiStore!.highName = name;
                    this.props.onEdit(this.props.GlobalWaterStationStore!.CurrentEditWaterStation);
                })
            } else {
                this.uiStore!.highName = ''
                this.props.onEdit(this.props.GlobalWaterStationStore!.CurrentEditWaterStation);
            }
        } else {
            message.error('错误的事件参数');
        }

    }

    /** 获取父级名称 */
    public async GetNameByKey(fatherId: string) {
        await this.domainStore.getNameByKey(fatherId, this.uiStore.CompanyName).then((res) => {
            if (res.rtnCode !== 0) {
                this.uiStore.IsLoading = false;
                console.log("获取名称失败" + res.rtnMsg);
            } else {
                this.uiStore.pKeyName = res.data.name;
                this.uiStore.IsLoading = false;
            }
        })
        return this.uiStore.pKeyName;
    }


    /**
     * 删除事件
     * @param e 
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

        if (!id) { return; };

        if (this.SelectWaterStation(id)) {
            console.error(this.uiStore.CurrentEditWaterStation);
            this.DeleteWaterStation(this.uiStore.CurrentEditWaterStation);
        } else {
            message.error('错误的事件参数');
        }
    }

    /**
     * 选中需要修改的供水所
     * @param id 供水所ID
     */
    @action.bound
    public SelectWaterStation(id: string) {
        try {
            this.recursionSelect(id, this.uiStore.list);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * 递归找到选中的可编辑供水所
     * @param id 选中的ID
     * @param list 集合
     */
    @action.bound
    public recursionSelect(id: string, list: WaterStation[]) {
        list.forEach((wsModel, index, array) => {
            if (id === wsModel.WaterStationId) {
                this.uiStore.CurrentEditWaterStation = wsModel;
            } else if (wsModel.children !== undefined) {
                this.recursionSelect(id, wsModel.children);
            }
        });
    }

    /** 删除供水所 */
    @action.bound
    public DeleteWaterStation(item: WaterStation) {
        try {
            if (!this.uiStore.IsLoading) {
                this.uiStore.IsLoading = true;
            }
            this.domainStore.DeleteWaterStation(item.WaterStationId, this.uiStore.CompanyName).then((res) => {
                if (res.rtnCode !== 0) {
                    this.uiStore.IsLoading = false;
                    message.error(res.rtnMsg);
                    return;
                }
                const jsonList = res.data as WaterStation[];
                this.props.refreshUi(jsonList);
                this.uiStore.IsLoading = false;
                message.success("删除成功");
            })
        } catch (error) {
            this.uiStore.IsLoading = false;
        }
    }

    /**
     * 获取点击元素的ID
     * @param e 
     */
    private getWaterStationId(e: React.SyntheticEvent<HTMLAnchorElement>): (string | undefined) {

        const id = e.currentTarget.getAttribute("id");

        if (!id) {
            message.error("无效的对象id")
            return undefined;
        }
        const index = id.indexOf("_");
        if (index < 0) {
            message.error("无效的对象id")
            return undefined;
        }
        try {
            return id.substring(index + 1);
        } catch (error) {
            return undefined;
        }

    }

}