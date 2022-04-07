import { message } from "antd";
import { action } from "mobx";
import { ResidenceUiStore } from "../uiStore";
import { Residence } from "../entity";
import { IResidenceTableProps } from "./interface";
import { ResidenceDomainStore } from "../domainStore";






export class ResidenceTableUiAction {

    private props: IResidenceTableProps;

    private treeSelectValue: string;

    private uiStore: ResidenceUiStore;

    private domainStore: ResidenceDomainStore;

    constructor(props: IResidenceTableProps) {

        this.props = props;

        this.treeSelectValue = "";

        this.uiStore = props.GlobalResidenceStore!;

        this.domainStore = new ResidenceDomainStore();

    }


    /**
     * 新增事件
     * @param e 
     */
    @action.bound
    public addClick(e: React.SyntheticEvent<HTMLAnchorElement>) {

        e.preventDefault();

        const id = this.getResidenceId(e);
        if (!id) { return; };

        this.uiStore.CurrentEditResidence = new Residence();
        this.uiStore.CurrentEditResidence.FatherId = id;
        this.props.onAdd(this.uiStore.CurrentEditResidence);

    }


    /**
     * 编辑事件
     * @param e 
     */
    @action.bound
    public async editClick(e: React.SyntheticEvent<HTMLAnchorElement>) {
        this.uiStore.CurrentEditResidence = new Residence();
        e.preventDefault();
        this.props.GlobalResidenceStore!.isEditModal = true
        const id = this.getResidenceId(e);
        console.log("id====", id)
        if (!id) { return; };
        if (this.SelectedResidence(id)) {
          await   this.domainStore.getGardenList(this.uiStore.CompanyName, "").then((res) => {
                if (res.rtnCode === 0) {
                    this.uiStore.ResidenceList = res.data as Residence[];
                } else {
                    message.error(res.rtnMsg);
                }
                this.getTreeValue(this.uiStore.CurrentEditResidence.FatherId, this.uiStore.ResidenceList);
                if (this.uiStore.CurrentEditResidence.FatherId === this.uiStore.CompanyName) {
                    this.uiStore.CurrentEditResidence.FatherId = ''
                } else {
                    this.uiStore.CurrentEditResidence.FatherId = this.treeSelectValue;
                }

                this.props.onEdit(this.uiStore.CurrentEditResidence);
            })

        } else {
            message.error('错误的事件参数');
        }

    }

    @action.bound
    public getTreeValue = (id: string, data: any) => {
        data.map((item: Residence) => {
            if (item.FatherId === id) {
                this.treeSelectValue = item.FatherId;
            } else {
                if (item.children) {
                    this.getTreeValue(id, item.children)
                }
            }
        })
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
        if (!id) { return; }

        if (this.SelectedResidence(id)) {

            this.DeleteResidence(this.uiStore.CurrentEditResidence);
        } else {
            message.error('错误的事件参数');
        }
    }

    /** 删除小区 */
    @action.bound
    public DeleteResidence(item: Residence) {
        this.uiStore.Loading = true;
        this.domainStore.deleteResidence(item.GardenId, this.uiStore.CompanyName).then((res) => {
            if (res.rtnCode !== 0) {
                this.uiStore.Loading = false;
                message.error(res.rtnMsg);
            } else {
                if (this.uiStore.ResidenceList.length > 0) {
                    this.uiStore.ResidenceList.splice(0, this.uiStore.ResidenceList.length);
                }
                const jsonList = res.data as Residence[];
                this.uiStore.ResidenceList = jsonList;
                this.uiStore.Loading = false;
                message.success("删除小区成功");
            }
        })
    }




    /**
     * 获取小区ID
     * @param e 
     */
    @action.bound
    private getResidenceId(e: React.SyntheticEvent<HTMLAnchorElement>): (string | undefined) {

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
     * 设置指定小区ID的小区为当前编辑的小区
     * @param id 小区ID
     */
    @action.bound
    private SelectedResidence(id: string): boolean {
        try {
            this.uiStore.CurrentEditResidence = new Residence();
            this.recursionSelect(id, this.uiStore.ResidenceList);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * 
     * 递归找到选中的数据
     */
    @action.bound
    private recursionSelect(itemId: string, PayBankList: Residence[]) {
        PayBankList.forEach((entity, index, array) => {
            if (itemId === entity.GardenId) {
                console.log("entity===", entity);
                this.uiStore.CurrentEditResidence = entity;
            } else if (entity.children) {
                this.recursionSelect(itemId, entity.children);
            }
        });
    }


}