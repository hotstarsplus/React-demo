import { message } from "antd";
import { action } from "mobx";
import { IBusinessOfficeTableProps } from "../businessOfficeTable/interface";
import { BusinessOfficeDomainStore } from "../domainStore";
import { BusinessOffice, BusinessOfficeUiEntity } from "../entity";
import { BusinessOfficeUiStore } from "../uiStore";




export class BusinessOfficeTableUiAction {

    private props: IBusinessOfficeTableProps;
    /**
     * 数据源 
     */
    private uiStore: BusinessOfficeUiStore;
    private domainStore: BusinessOfficeDomainStore;
    private treeSelectValue: string = ''
    /**
     * 构造方法
     */
    constructor(props: IBusinessOfficeTableProps) {

        this.props = props;

        this.uiStore = props.GlobalBusinessOfficeStore!;

        this.domainStore = new BusinessOfficeDomainStore();

    }

    /**
     * 设置行样式
     * @param record 
     * @param index 
     */
    @action.bound
    public setRowClassName(record: any, index: number) {

        return "tr-class";
    }
    /**
     * 根据自增id设置表格每一行的key
     */
    @action.bound
    public getRowKey(record: BusinessOfficeUiEntity, index: number): string {
        return record.key;
    }




    /**
     * 新增事件
     * @param e 
     */
    @action.bound
    public addClick(e: React.SyntheticEvent<HTMLAnchorElement>) {

        e.preventDefault();

        const id = this.getBusinessOfficeId(e);

        if (!id) { return; };
        this.uiStore.CurrentEditBusinessOffice = new BusinessOffice();
        this.uiStore.CurrentEditBusinessOffice.FatherId = id;
        this.props.onAdd(this.props.GlobalBusinessOfficeStore!.CurrentEditBusinessOffice);


    }


    /**
     * 编辑事件
     * @param e 
     */
    @action.bound
    public async editClick(record: any, e: React.SyntheticEvent<HTMLAnchorElement>) {
        this.props.GlobalBusinessOfficeStore!.isEditModal = true
        e.preventDefault();

        const id = this.getBusinessOfficeId(e);
        if (!id) { return; };
        if (this.selectBusinessOffice(id)) {
        await     this.domainStore.getBusinessOfficeList(this.uiStore.CompanyName, "").then((res) => {
                if (res.rtnCode === 0) {
                    this.uiStore.listDatas = res.data;
                } else {
                    message.error(res.rtnMsg);
                }
                this.getTreeValue(this.uiStore.CurrentEditBusinessOffice.FatherId, this.uiStore.listDatas)
                if (this.uiStore.CurrentEditBusinessOffice.FatherId === this.uiStore.CompanyName) {
                    this.uiStore.CurrentEditBusinessOffice.FatherId = ''
                } else {
                    this.uiStore.CurrentEditBusinessOffice.FatherId = this.treeSelectValue;
                }
                console.log("FatherId2===",this.uiStore.CurrentEditBusinessOffice.FatherId);

                this.props.onEdit(this.props.GlobalBusinessOfficeStore!.CurrentEditBusinessOffice);
            })
        } else {
            message.error('错误的事件参数');
        }

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
        console.log("id:" + id)
        if (!id) { return; };

        if (this.selectBusinessOffice(id)) {
            this.DeleteBusinessOffice(this.uiStore.CurrentEditBusinessOffice);
        } else {
            message.error('错误的事件参数');
        }
    }

    /** 删除营业网点 */
    @action.bound
    public DeleteBusinessOffice(item: BusinessOffice) {
        try {
            if (!this.uiStore.IsLoading) {
                this.uiStore.IsLoading = true;
            }
            this.domainStore.DeleteBusinessOffice(item.BusinessOfficeId, this.uiStore.CompanyName).then((res) => {
                if (res.rtnCode !== 0) {
                    this.uiStore.IsLoading = false;
                    message.error('删除失败：' + res.rtnMsg);
                } else {
                    const jsonList = res.data as BusinessOffice[];
                    this.props.refreshUi(jsonList);
                    this.uiStore.IsLoading = false;
                    message.success("删除成功");
                }
            })
        } catch (error) {
            this.uiStore.IsLoading = false;
        }
    }


    /**
     * 选中需要修改的营业网点
     * @param id 营业网点ID
     */
    @action.bound
    private selectBusinessOffice(id: string): boolean {

        try {
            console.log(" this.recursionSelect(id,this.list)", this.uiStore.list)
            this.recursionSelect(id, this.uiStore.list);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    /**
     * 递归找到选中的可编辑营业网点
     * @param id 选中的ID
     * @param list 集合
     */
    @action.bound
    private recursionSelect(id: string, list: BusinessOffice[]) {
        if (!list) {
            return;
        }
        list.forEach((wsModel, index, array) => {
            if (id === wsModel.BusinessOfficeId) {
                this.uiStore.CurrentEditBusinessOffice = wsModel;
            } else if (wsModel.children !== undefined) {
                this.recursionSelect(id, wsModel.children);
            }
        });
    }

    /**
     * 获取点击元素的ID
     * @param e 
     */
    @action.bound
    private getBusinessOfficeId(e: React.SyntheticEvent<HTMLAnchorElement>): (string | undefined) {

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

    @action.bound
    private getTreeValue = (id: string, data: any) => {
        data.map((item: any) => {
            if (item.BusinessOfficeId === id.split("_")[0]) {
                console.log('id', id)
                this.treeSelectValue = item.BusinessOfficeId + "_" + item.BusinessOfficeName;
            } else {
                if (item.children) {
                    this.getTreeValue(id, item.children)
                }
            }
        })
    }



}