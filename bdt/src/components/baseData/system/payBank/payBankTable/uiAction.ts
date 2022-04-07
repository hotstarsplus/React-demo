import { message } from "antd";
import { action } from "mobx";
import { PayBank, PayBankUiEntity } from "../entity";
import { PayBankUiStore } from "../uiStore";
import { IPayBankTableProps } from "./interface";




export class PayBankTableUiAction {

    private props: IPayBankTableProps;

    private uiStore: PayBankUiStore;

    constructor(props: IPayBankTableProps) {

        this.props = props;

        this.uiStore = props.GlobalPayBankStore!;

    }



    /**
     * 新增事件
     * @param e 
     */
    @action.bound
    public addClick(e: React.SyntheticEvent<HTMLAnchorElement>) {

        e.preventDefault();

        const id = this.getPayBankId(e);

        if (!id) { return; };

        this.uiStore.CurrentEditPayBank = new PayBank();
        this.uiStore.CurrentEditPayBank.FatherId = id;
        this.props.onAdd(this.props.GlobalPayBankStore!.CurrentEditPayBank);
    }


    /**
     * 编辑事件
     * @param e 
     */
    @action.bound
    public async editClick(record:PayBankUiEntity,e: React.SyntheticEvent<HTMLAnchorElement>) {
        this.props.GlobalPayBankStore!.isEditModal = true
        e.preventDefault();
        const entity = new PayBank();
            entity.AgentBankAccount=record.AgentBankAccount;
            entity.AgentBankEmail=record.AgentBankEmail;
            entity.Description=record.Description;
            entity.FatherId =record.FatherId;
            entity.AgentBankName=record.title
            entity.AgentBankId=record.key
            entity.SortNo=record.SortNo;
            entity.CreateDate=record.CreateDate;
            entity.CreateId=record.CreaterId;
            this.props.GlobalPayBankStore!.CurrentEditPayBank=entity;
            this.props.onEdit(this.props.GlobalPayBankStore!.CurrentEditPayBank);
    }

    /**
     * 删除事件
     * @param e 
     */
    @action.bound
    public async deleteClick(record: PayBankUiEntity, e: React.SyntheticEvent<HTMLAnchorElement>) {
        if(record&&record.key){
            const entity = new PayBank();
            entity.AgentBankId = record.key;
            entity.AgentBankName = record.AgentBankName;
            entity.FatherId = record.FatherId;
            entity.SortNo = record.SortNo;
            entity.Description = record.Description;
            entity.AgentBankAccount = record.AgentBankAccount;
            entity.AgentBankEmail = record.AgentBankEmail;
            this.props.GlobalPayBankStore!.CurrentEditPayBank=entity;
            this.props.onDelete(this.props.GlobalPayBankStore!.CurrentEditPayBank);
        }else {
            message.error('错误的事件参数');
        }
    }

    /**
     * 设置指定银行ID的银行为当前编辑的银行
     * @param id 银行ID
     */
    @action.bound
    public SelectedPayBank(id: string): boolean {
        try {
            console.log("this.uiStore.list====",this.uiStore.list);
            this.recursionSelect(id, this.uiStore.list);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * 递归找到选中的数据
     * @param id 选中的ID
     * @param list 集合
     */
    @action.bound
    private recursionSelect(itemId: string, list: PayBank[]) {
        
        if (!list) {
            return;
        }
        list.forEach((entity, index, array) => {
            if (itemId === entity.AgentBankId) {
                this.uiStore.CurrentEditPayBank = entity;
            } else if (entity.children !== undefined) {
                this.recursionSelect(itemId, entity.children);
            }
        });
    }

    /**
     * 获取银行ID
     * @param e 
     */
    @action.bound
    private getPayBankId(e: React.SyntheticEvent<HTMLAnchorElement>): (string | undefined) {

        const id = e.currentTarget.getAttribute("id");
        console.log(id);
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