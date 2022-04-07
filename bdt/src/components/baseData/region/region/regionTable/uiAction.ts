import { message } from "antd";
import { action } from "mobx";
import { RegionUiStore } from "../uiStore";
import { Region } from "../entity";
import { IRegionTableProps } from "./interface";
import { RegionDomainStore } from "../doMainStore";




export class RegionTableUiAction {
    /**
     * 数据接口
     */
    private props: IRegionTableProps;
    /**
     * 数据源
     */
    private uiStore: RegionUiStore;

    private domainStore: RegionDomainStore;
    /**
     * 上级片区下拉选数据
     */
    private treeSelectValue: string = "";
    /**
     * 构造方法
     */
    constructor(props: IRegionTableProps) {

        this.props = props;

        this.uiStore = props.GlobalRegionStore!;

        this.domainStore = new RegionDomainStore();
    }


    /**
     * 新增事件
     * @param e 
     */
    @action.bound
    public AddClick(e: React.SyntheticEvent<HTMLAnchorElement>) {

        e.preventDefault();

        const id = this.getRegionId(e);

        if (!id) { return; };

        this.uiStore.CurrentEditRegion = new Region();
        this.uiStore.CurrentEditRegion.FatherId = id;

        // this.props.onAdd(this.props.GlobalRegionStore!.CurrentEditRegion);


    }


    /**
     * 编辑事件
     * @param e 
     */
    @action.bound
    public async EditClick(e: React.SyntheticEvent<HTMLAnchorElement>) {

        e.preventDefault();
        const id = this.getRegionId(e);

        if (!id) { return; };

        if (this.SelectRegion(id)) {

            console.log("this.domainStore.CurrentEditResidence", this.uiStore.CurrentEditRegion)
            this.getTreeValue(this.uiStore.CurrentEditRegion.FatherId, this.props.GlobalRegionStore!.RegionList)
            if (this.uiStore.CurrentEditRegion.FatherId === '') {
                this.uiStore.CurrentEditRegion.FatherId = ''
            } else {
                this.uiStore.CurrentEditRegion.FatherId = this.treeSelectValue;
            }

            this.props.onEdit(this.uiStore.CurrentEditRegion);
            console.log("当前编辑", this.uiStore.CurrentEditRegion);
        } else {
            message.error('错误的事件参数');
        }

    }

    /**
     * 删除事件
     * @param e 
     */
    @action.bound
    public DeleteClick(value: string, e: React.SyntheticEvent<HTMLAnchorElement>) {
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

        if (this.SelectRegion(id)) {
            console.error(this.uiStore.CurrentEditRegion);
            this.DeleteRegion(this.uiStore.CurrentEditRegion);
        } else {
            message.error('错误的事件参数');
        }
    }

    /**
     * 选中需要修改的片区
     * @param id 片区ID
     */
    @action.bound
    public SelectRegion(id: string): boolean {
        try {
            this.recursionSelect(id, this.uiStore.RegionList);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * 递归找到选中的可编辑片区
     * @param id 选中的ID
     * @param list 集合
     */
    @action.bound
    public recursionSelect(id: string, list: Region[]) {
        if (!list) {
            return;
        }
        list.forEach((wsModel, index, array) => {
            if (id === wsModel.RegionId) {
                this.uiStore.CurrentEditRegion = wsModel;
            } else if (wsModel.children !== undefined) {
                this.recursionSelect(id, wsModel.children);
            }
        });
    }


    /** 删除片区 */
    @action.bound
    public DeleteRegion(item: Region) {
        try {
            this.uiStore.IsLoading = true;
            this.domainStore.DeleteRegion(item.RegionId, item.CpCode).then((res) => {
                if (res.rtnCode !== 0) {
                    this.uiStore.IsLoading = false;
                    message.error(res.rtnMsg);
                } else {
                    const jsonlist = res.data as Region[];
                    this.uiStore.RegionList.splice(0, this.uiStore.RegionList.length);
                    this.uiStore.UiRegionList.splice(0, this.uiStore.UiRegionList.length);
                    this.uiStore.RegionList.push(...jsonlist);
                    this.uiStore.UiRegionList.push(...jsonlist);
                    message.success("删除成功");
                }
                this.uiStore.IsLoading = false;
            })
        } catch (error) {
            this.uiStore.IsLoading = false;
        }
    }


    /**
     * 获取片区的ID
     * @param e 
     */
    @action.bound
    private getRegionId(e: React.SyntheticEvent<HTMLAnchorElement>): (string | undefined) {

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
    /**
     * 获取树下拉选的值
     * @param id 
     * @param data 
     */
    private getTreeValue = (id: string, data: Region[]) => {
        data.map((item: Region) => {
            if (item.FatherId === id) {
                this.treeSelectValue = item.FatherId;
            } else {
                if (item.children) {
                    this.getTreeValue(id, item.children)
                }
            }
        })
    }



}