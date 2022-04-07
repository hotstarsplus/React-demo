import { message } from "antd";
import { action, observable, runInAction } from "mobx";
import { OridStores, requestJson } from "orid";
import { WebSocketUtil } from "../../../common/webSocket/webSocketUtil";
import { BillPrintTempLate } from "../entity/billPrintTempLateDto";
import { BillTemplateRootStore } from "../rootStore";


export class BillTemplateCardStore {

    /**
     * 加载
     */
    @observable
    public Loading: boolean;
    /**
     * 模板编辑显示的id
     */
    @observable
    public ShowTempId: string;

    /**
     * rootStore
     */
    public RootStore: BillTemplateRootStore;

    /**
     * 点击更多选中的模板id
     */
    private templateId: number;

    constructor(rootStore: BillTemplateRootStore) {
        this.RootStore = rootStore
        this.ShowTempId = "";
        this.Loading = false;
        this.templateId = 0;
    }

    /**
     * 点击模板编辑按钮的回调方法
     * @param e 
     */
    @action.bound
    public async HandleTemplateEditClick(e: React.SyntheticEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const id = e.currentTarget.getAttribute('id');
        if (id !== null) {
            this.RootStore.BillTemplateModalStore.BtnDisible = false;
            let template: BillPrintTempLate | undefined;
            this.RootStore.BillTemplateLayoutStore.BillTemplateList.forEach((model) => {
                if (model.PrintTempLateId === Number(id)) {
                    model.OldBillTypeId = model.BillTypeId;
                    model.OldAgentBankId = model.AgentBankId;
                    template = model;
                }
            });
            if (template === undefined) {
                return;
            }
            if (template.IsDefault === "1") {
                this.RootStore.BillTemplateModalStore.DefaultRowVisible = false;
            } else {
                this.RootStore.BillTemplateModalStore.DefaultRowVisible = true;
            }

            const checked = await this.handleCheckedIsUse(Number(id));

            runInAction(async () => {
                if (checked === "检测失败") {
                    message.error("该票据模板不确定是否正在使用,请重新检测");
                    return;
                }
                if (this.RootStore.BillTemplateLayoutStore.BillTemplateIsUse) {
                    this.RootStore.BillTemplateModalStore.KindDisabled = true;
                }else{
                    this.RootStore.BillTemplateModalStore.KindDisabled = false;
                }
                this.RootStore.BillTemplateModalStore.TypeDisabled = true;
                this.RootStore.BillTemplateModalStore.CurrentEditItem = template!;
                this.RootStore.BillTemplateModalStore.OpertionModalVisible = true;
                this.RootStore.BillTemplateModalStore.OpertionModalType = "edit";
                this.RootStore.BillTemplateModalStore.OpertionModalTitle = "编辑票据模板";
            })
        }
    }

    /**
     * 点击打开设计器/打开json文件按钮
     * @param value 
     * @param selectedOptions 
     */
    @action.bound
    public HandleMoreBtn(e: React.SyntheticEvent<HTMLAnchorElement>, NID: string) {
        if (NID !== null) {
            this.templateId = Number(NID);
        };
        e.preventDefault();
        const id = e.currentTarget.getAttribute('id');
        if (id !== null) {
            const entity = this.RootStore.BillTemplateLayoutStore.BillTemplateList.find(x => x.PrintTempLateId === this.templateId)
            if (entity !== undefined) {
                if (id === "1") {
                    const data = {
                        SaveUrl: `/api/bdt/BillPrintTemplate/UpdateTemplateJson?Id=${this.templateId}&identity=${OridStores.authStore.identity}`,
                        HtmlSource: entity.HtmlSource,
                    }
                    const res = WebSocketUtil.Instance.Send("1001", data);
                    if (res !== "成功") {
                        message.info(res);
                    }
                } else {
                    this.RootStore.BillTemplateModalStore.CurrentEditItem = new BillPrintTempLate();
                    entity.OldBillTypeId = entity.BillTypeId;
                    entity.OldAgentBankId = entity.AgentBankId;
                    this.RootStore.BillTemplateModalStore.CurrentEditItem = entity;
                    this.RootStore.BillTemplateModalStore.JsonModalVisible = true;
                }
            }
        }


    }
    /**
     * 点击更多的回调方法
     * @param e 
     */
    @action.bound
    public HandleOpenDesigner(e: React.SyntheticEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const id = e.currentTarget.getAttribute('id');
        if (id !== null) {
            this.templateId = Number(id);
        }
    }
    /**
     * 点击复制按钮的回调方法
     * @param e 
     */
    @action.bound
    public HandleCopyClick(e: React.SyntheticEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const id = e.currentTarget.getAttribute('id');
        if (id !== null) {
            this.RootStore.BillTemplateModalStore.BtnDisible = false;
            const entity = this.RootStore.BillTemplateLayoutStore.BillTemplateList.find(x => x.PrintTempLateId === Number(id))
            if (entity !== undefined) {
                entity.OldBillTypeId = entity.BillTypeId;
                entity.OldAgentBankId = entity.AgentBankId;
                this.RootStore.BillTemplateModalStore.CurrentEditItem = new BillPrintTempLate();
                this.RootStore.BillTemplateModalStore.CurrentEditItem.Name = entity.Name + "(副本)";
                this.RootStore.BillTemplateModalStore.CurrentEditItem.BillTypeId = entity.BillTypeId;
                this.RootStore.BillTemplateModalStore.CurrentEditItem.CpCode = entity.CpCode;
                this.RootStore.BillTemplateModalStore.CurrentEditItem.Description = entity.Description;
                this.RootStore.BillTemplateModalStore.CurrentEditItem.HtmlSource = entity.HtmlSource;
                this.RootStore.BillTemplateModalStore.CurrentEditItem.IsDefault = "0";
                this.RootStore.BillTemplateModalStore.CurrentEditItem.IsDefaultChange = entity.IsDefaultChange;
                this.RootStore.BillTemplateModalStore.CurrentEditItem.IsTurnOn = entity.IsTurnOn;
                this.RootStore.BillTemplateModalStore.CurrentEditItem.OldBillTypeId = entity.OldBillTypeId;
                this.RootStore.BillTemplateModalStore.CurrentEditItem.PrintTempLateId = entity.PrintTempLateId;
                this.RootStore.BillTemplateModalStore.CurrentEditItem.Type = entity.Type;
                this.RootStore.BillTemplateModalStore.CurrentEditItem.AgentBankId = entity.AgentBankId;
                this.RootStore.BillTemplateModalStore.CurrentEditItem.OldAgentBankId = entity.OldAgentBankId;
            }
        }
        this.RootStore.BillTemplateModalStore.OpertionModalVisible = true;
        this.RootStore.BillTemplateModalStore.OpertionModalType = "copy";
        this.RootStore.BillTemplateModalStore.OpertionModalTitle = "复制模板设置";
        this.RootStore.BillTemplateModalStore.DefaultRowVisible = false;
        this.RootStore.BillTemplateModalStore.KindDisabled = false;
        this.RootStore.BillTemplateModalStore.TypeDisabled = false;
    }
    /**
     * 删除票据模板
     */
    @action.bound
    public async HandleDeleteClick(billTypeId: string, printTempLateId: number) {

        try {
            const ix = this.RootStore.BillTemplateLayoutStore.BillTemplateList.findIndex(x => x.PrintTempLateId === printTempLateId);
            if (ix < 0) {
                message.error("集合中不存在该数据");
                return;
            }
            const checked = await this.handleCheckedIsUse(printTempLateId);

            if (checked === "检测失败") {
                message.error("该票据模板不确定是否正在使用,请重新检测");
                return;
            }
            if (this.RootStore.BillTemplateLayoutStore.BillTemplateIsUse) {
                message.info("该模板正在使用中，暂不可删除");
                return;
            }
            this.Loading = true;
            const res = await requestJson(`/api/bdt/BillPrintTemplate/DeleteTemplate?billTypeId=${billTypeId}&templateId=${printTempLateId}`, { method: "GET" });
            if (res.rtnCode === 0) {
                this.RootStore.BillTemplateLayoutStore.BillTemplateList.splice(ix, 1);
                message.success("删除成功");
            } else {
                message.error(res.rtnMsg)
            }
            this.Loading = false;

        } catch (error) {
            message.error(error)
        }
    }
    /**
     * 鼠标移入
     */
    @action.bound
    public HandleMouseEnter(event: React.MouseEvent<HTMLDivElement>) {
        this.ShowTempId = event.currentTarget.id
    }
    /**
     * 鼠标移出
     */
    @action.bound
    public HandleMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
        this.ShowTempId = ""

    }
    /**
     * 是否启用改变事件
     */
    @action.bound
    public async HandleSwitchOnChange(billTypeId: string, printTempLateId: number, checked: boolean) {
        try {
            this.Loading = true;
            const isTurnOn = checked ? "1" : "0";
            const res = await requestJson(`/api/bdt/BillPrintTemplate/ChangeStatus?billTypeId=${billTypeId}&templateId=${printTempLateId}&isTurnOn=${isTurnOn}`)
            runInAction(() => {
                if (res.rtnCode === 0) {
                    const entity = this.RootStore.BillTemplateLayoutStore.BillTemplateList.find(x => x.PrintTempLateId === printTempLateId);
                    if (entity !== undefined) {
                        entity.IsTurnOn = isTurnOn;
                    }
                } else {
                    message.error(res.rtnMsg);
                }
                this.Loading = false;
            })


        } catch (error) {
            message.error(error)
        }
    }



    /**
     * 检测票据模板是否正在使用
     */
    @action.bound
    private async handleCheckedIsUse(billTemplateId: number): Promise<string> {
        try {
            const res = await requestJson("/api/bdt/BillPrintTemplate/CheckTemplateIsUse?templateId=" + billTemplateId, { method: "GET" });
            if (res.rtnCode === 0) {
                this.RootStore.BillTemplateLayoutStore.BillTemplateIsUse = (res.data as { isUsing: boolean }).isUsing;
                return "检测成功";
            } else {
                message.error(res.rtnMsg);
                return "检测失败";
            }
        } catch (error) {
            message.error(error)
            return "检测失败";
        }

    }

}


