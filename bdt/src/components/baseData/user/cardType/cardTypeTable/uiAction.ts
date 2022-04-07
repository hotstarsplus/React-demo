import { message, } from "antd";
import { action } from "mobx";
import { CardTypeDomainStore } from "../domainStore";
import { CardType } from "../entity";
import { ICardTypeTableProps } from "./interface";


export class CardTypeTableUiAction {

    private props: ICardTypeTableProps;

    private domainStore: CardTypeDomainStore;

    constructor(props: ICardTypeTableProps) {

        this.props = props;

        this.domainStore = new CardTypeDomainStore();

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

    @action.bound
    public getRowKey(record: CardType, index: number): string {
        return record.CardTypeId;
    }

    /**
     * 新增事件
     * @param e 
     */
    @action.bound
    public addClick(e: React.SyntheticEvent<HTMLAnchorElement>) {

        e.preventDefault();

        const id = this.getCardTypeId(e);

        if (!id) { return; };

        if (this.SelectedCardType(id)) {

            this.props.onAdd(this.props.GlobalCardTypeStore!.currentEditCardType);
        } else {
            message.error("错误的事件参数");
        }

    }


    /**
     * 编辑事件
     * @param e 
     */
    @action.bound
    public async editClick(e: React.SyntheticEvent<HTMLAnchorElement>) {

        e.preventDefault();

        const id = this.getCardTypeId(e);

        if (!id) { return; };

        if (this.SelectedCardType(id)) {
            this.props.onEdit(this.props.GlobalCardTypeStore!.currentEditCardType);
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
        if (!id) { return; }
        this.DeleteCardType(id);

    }

    /** 删除水卡类型 */
    @action.bound
    public DeleteCardType(id: string) {
        const store = this.props.GlobalCardTypeStore!;
        try {
            if (!store.isLoading) {
                store.isLoading = true;
            }
            this.domainStore.deleteCardType(id, store.CompanyName).then((res) => {
                if (res.rtnCode !== 0) {
                    store.isLoading = false;
                    message.error(res.rtnMsg);
                } else {
                    const jsonList = res.data as CardType[];
                    if (store.CardTypeList.length > 0) {
                        store.CardTypeList.splice(0, store.CardTypeList.length);
                        store.CardTypeUiList.splice(0, store.CardTypeUiList.length);
                    }
                    store.CardTypeList = jsonList;
                    store.CardTypeUiList = jsonList;
                    store.isLoading = false;
                    message.success("删除成功");
                }
            })
        } catch (error) {
            store.isLoading = false;
        }
    }

    /**
     * 设置指定水卡类型ID的用水性质为当前编辑的水卡类型
     * @param id 
     */
    @action.bound
    public SelectedCardType(id: string): boolean {
        try {
            this.recursionSelect(id, this.props.GlobalCardTypeStore!.CardTypeList);
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
    public recursionSelect(itemId: string, CardTypeList: CardType[]) {
        CardTypeList.forEach((entity, index, array) => {
            if (itemId === entity.CardTypeId) {
                this.props.GlobalCardTypeStore!.currentEditCardType = entity;
            } else if (entity.children) {
                this.recursionSelect(itemId, entity.children);
            }
        });
    }



    /**
     * 获取用水性质ID
     * @param e 
     */
    @action.bound
    private getCardTypeId(e: React.SyntheticEvent<HTMLAnchorElement>): (string | undefined) {

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