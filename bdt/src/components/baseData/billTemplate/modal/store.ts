import { message } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { RadioChangeEvent } from "antd/lib/radio";
import { SelectValue } from "antd/lib/select";
import { action, observable, runInAction } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { BillPrintTempLate } from "../entity/billPrintTempLateDto";
import { BillTemplateRootStore } from "../rootStore";

export class BillTemplateModalStore {

    /**
     * 编辑json文件弹窗是否显示
     */
    @observable
    public JsonModalVisible: boolean;

    /**
     * 操作弹窗是否显示
     */
    @observable
    public OpertionModalVisible: boolean

    /**
     * 设为默认行是否显示
     */
    @observable
    public DefaultRowVisible: boolean;
    /**
     * 票据种类是否切换
     */
    @observable
    public IsKindChange: boolean

    @observable
    public IsBankChange: boolean

    /**
     * 票据种类是否禁用
     */
    @observable
    public KindDisabled: boolean

    @observable
    public TypeDisabled: boolean

    /**
     * 操作弹窗类别
     */
    @observable
    public OpertionModalType: "add" | "edit" | "copy";
    /**
     * 操作弹窗标题
     */
    @observable
    public OpertionModalTitle: string

    /**
     * 当前编辑项目
     */
    @observable
    public CurrentEditItem: BillPrintTempLate
    /**
     * 表单工具
     */
    @observable
    public FormUtils: WrappedFormUtils

    /**
     * 根store
     */
    public RootStore: BillTemplateRootStore
    /**
     * 确定按钮是否禁用
     */
    @observable
    public BtnDisible: boolean;

    // /**
    //  * 选中的票据种类id
    //  */
    // private selectedKindId: string;


    constructor(rootStore: BillTemplateRootStore) {
        this.RootStore = rootStore;
        this.OpertionModalVisible = false;
        this.KindDisabled = false;
        this.DefaultRowVisible = true;
        this.IsKindChange = false;
        this.IsBankChange = false;
        this.OpertionModalType = "add";
        this.OpertionModalTitle = "";
        this.BtnDisible = false;
        this.CurrentEditItem = new BillPrintTempLate();
        this.JsonModalVisible = false;
    }

    /**
     * json文件改变事件
     * @param event 
     */
    @action.bound
    public HandleJsonChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        console.log(event.currentTarget.value, "value");
        this.CurrentEditItem.HtmlSource = event.currentTarget.value;
    }

    /**
     * 编辑json文件弹窗取消
     */
    @action.bound
    public HandleJsonCancel() {
        this.JsonModalVisible = false;
    }
    /**
     * 编辑json文件弹窗确定
     */
    @action.bound
    public async HandleJsonOk() {
        console.log(this.CurrentEditItem.HtmlSource, "html");
        const ix = this.RootStore.BillTemplateLayoutStore.BillTemplateList.findIndex(x => x.PrintTempLateId === this.CurrentEditItem.PrintTempLateId);
        if (ix < 0) {
            message.error("集合中不存在该数据");
            this.RootStore.BillTemplateCardUiStore.Loading = false;
            return;
        }
        const res = await this.updateTemplate(this.CurrentEditItem);
        runInAction(() => {
            if (res.rtnCode === 0) {

                this.RootStore.BillTemplateLayoutStore.BillTemplateList[ix] = this.CurrentEditItem;
                message.success("保存成功！")
            } else {
                message.error(res.rtnMsg);
            }
            this.JsonModalVisible = false;

        })
    }


    /**
     * 操作弹窗取消事件
     */
    @action.bound
    public HandleCancel() {
        this.OpertionModalVisible = false;
        this.IsKindChange = false;
        this.IsBankChange = false;
    }
    /**
     * 根据票据种类是否切换做判断
     */
    @action.bound
    public HandleInvoiceKindOnChange(value: SelectValue) {
        console.log('根据票据种类是否切换做判断')
        if (value === undefined) {
            return;
        }
        if (value.toString() !== this.CurrentEditItem.BillTypeId) {
            this.IsKindChange = true;
        }
    }

    @action.bound
    public HandleAgentBankOnChange(value: SelectValue) {
        console.log('根据托收行是否切换做判断')
        if (value === undefined) {
            return;
        }
        if (value.toString() !== this.CurrentEditItem.AgentBankId) {
            this.IsBankChange = true;
        }
    }

    /**
     * 票据模板名称验证
     * @param rule 
     * @param value 
     * @param callback 
     * @param source 
     * @param options 
     */
    @action.bound
    public HandleNameValidator(rule: any, value: any, callback: any, source?: any, options?: any) {

        const kindId = this.FormUtils.getFieldValue('BillTypeId');
        const templateNameList = new Array<string>();
        this.RootStore.BillTemplateLayoutStore.BillTemplateList.forEach((model) => {
            if (model.BillTypeId === kindId) {
                const index = templateNameList.indexOf(model.Name)
                if (index === -1) {
                    templateNameList.push(model.Name);
                }
            }
        });
        //  2021/03/22 lkp注释 说明：Bug--18582要求删除此判断
        // const kindName = templateNameList.indexOf(value);
        // if (kindName !== -1 && !(!this.IsKindChange && value === this.CurrentEditItem.Name && this.OpertionModalType === "edit")) {
        //     callback("该票据模板名称已存在，请重新输入！");
        //     return;
        // }
        callback();
    }
    /**
     * 是否默认模板改变
     */
    @action.bound
    public HandleIsDefaultChange(e: RadioChangeEvent) {
        console.log("change");
        const isDefault = e.target.value;
        const kindId = this.FormUtils.getFieldValue('BillTypeId');
        let count = 0;
        this.RootStore.BillTemplateLayoutStore.BillTemplateList.forEach((model) => {
            if (model.BillTypeId === kindId) {
                count++;
            }
        });
        if (count > 0 && isDefault === "1") {
            this.CurrentEditItem.IsDefaultChange = true;
            // this.RootStore.BillTemplateLayoutStore.BillTemplateList.forEach((model) => {
            //     model.IsDefault = "0"
            // })
        }
    }

    /**
     * 点击确定按钮的回调方法获取表单数据
     */
    @action.bound
    public async HandleOk() {
        this.FormUtils.validateFields(async (errors: any, values: any) => {
            if (errors) {
                message.error("表单填写错误");
                return;
            }
            this.BtnDisible = true;
            const formData = values as BillPrintTempLate;
            console.log(formData)
            console.log(this.CurrentEditItem)
            if (this.OpertionModalType === "copy") {
                formData.HtmlSource = this.CurrentEditItem.HtmlSource;
                formData.Description = this.CurrentEditItem.Description;
            }
            if (!this.DefaultRowVisible) {
                formData.IsDefault = this.CurrentEditItem.IsDefault;
            }
            formData.IsDefaultChange = this.CurrentEditItem.IsDefaultChange;
            formData.CpCode = this.CurrentEditItem.CpCode;
            formData.IsTurnOn = this.CurrentEditItem.IsTurnOn;
            formData.OldBillTypeId = this.CurrentEditItem.OldBillTypeId;
            formData.PrintTempLateId = this.CurrentEditItem.PrintTempLateId;
            formData.OldAgentBankId = this.CurrentEditItem.OldAgentBankId;
            if (formData.HtmlSource === null || formData.HtmlSource === "") {
                formData.HtmlSource = this.CurrentEditItem.HtmlSource;
            }

            this.RootStore.BillTemplateCardUiStore.Loading = true;
            let res: IResponseJsonResult = { rtnCode: 0, rtnMsg: "" };
            if (this.OpertionModalType === "edit") {
                const ix = this.RootStore.BillTemplateLayoutStore.BillTemplateList.findIndex(x => x.PrintTempLateId === formData.PrintTempLateId);
                if (ix < 0) {
                    message.error("集合中不存在该数据");
                    this.RootStore.BillTemplateCardUiStore.Loading = false;
                    return;
                }
                res = await this.updateBillTemplate(formData, ix);
            } else {
                res = await this.addBillTemplate(formData);
            }
            runInAction(() => {
                if (res.rtnCode === 0) {
                    message.success("保存成功")
                } else {
                    message.error(res.rtnMsg);
                }
                this.OpertionModalVisible = false;
                this.IsKindChange = false;
                this.IsBankChange = false;
                this.RootStore.BillTemplateCardUiStore.Loading = false;
            })

        });
    }

    /**
     * 添加票据模板
     * @param model 当前实体
     */
    @action.bound
    private async addBillTemplate(model: BillPrintTempLate): Promise<IResponseJsonResult> {
        // let count = 0;
        if (!model.BillTypeId) {
            model.BillTypeId = '';
        }
        // this.RootStore.BillTemplateLayoutStore.BillTemplateList.forEach((entity) => {
        //     if (entity.BillTypeId === model.BillTypeId) {
        //         count++;
        //     }
        // });
        const res = await this.addTemplate(model);
        if (res.rtnCode !== 0) {
            return res;
        }
        // this.LoadBillTemplateList();
        runInAction(() => {
            const printTemplateId = (res.data as { id: number }).id;
            model.PrintTempLateId = printTemplateId;
            if (res.rtnCode === 0) {
                // if (model.IsDefaultChange && count > 0) {
                //     this.infoModal();
                // }
                this.LoadBillTemplateList();
            }
        })
        return res;
    }

    /**
     * 重载票据模板数据
     */
    @action.bound
    private LoadBillTemplateList() {
        this.RootStore.BillTemplateLayoutStore.LoadDataBillTemplate();
        this.RootStore.BillTemplateLayoutStore.LoadKindData()
        this.RootStore.BillTemplateLayoutStore.loadReferencesData();
        this.RootStore.BillTemplateLayoutStore.GetListAll();
        this.RootStore.BillTemplateLayoutStore.GetBankListAll();
    }


    /**
     * 修改票据模板
     * @param model 
     */
    @action.bound
    private async updateBillTemplate(formData: BillPrintTempLate, ix: number): Promise<IResponseJsonResult> {
        console.log('formData', formData)
        let retRes: IResponseJsonResult = { rtnCode: 0, rtnMsg: "" };
        if (this.IsKindChange || this.IsBankChange) {
            // let resChange: IResponseJsonResult[] = []
            const resChangeDel: IResponseJsonResult[] = await Promise.all<IResponseJsonResult>(
                [
                    this.deleteTemplate(formData.OldBillTypeId, formData.OldAgentBankId, formData.PrintTempLateId)
                ]
            )
            console.log('resChangeDel', resChangeDel)
            runInAction(async () => {
                resChangeDel.forEach(async (res: IResponseJsonResult, index: number) => {
                    retRes = res;
                    if (res.rtnCode !== 0) {
                        return;
                    }
                    if (!formData.BillTypeId) {
                        formData.BillTypeId = ''
                    }
                    const addres = await this.addTemplate(formData)
                    if (addres.rtnCode === 0) {
                        this.LoadBillTemplateList();
                    } else {
                        message.error(addres.rtnMsg)
                    }
                })
            })

        } else {
            const res = await this.updateTemplate(formData);
            retRes = res;
            // runInAction(() => {
            //     if (res.rtnCode === 0) {
            //         if (formData.IsDefaultChange) {
            //             this.infoModal();
            //         }
            //         // this.RootStore.BillTemplateLayoutStore.BillTemplateList[ix] = formData;
            //     }
            // })
            this.LoadBillTemplateList();
        }
        return retRes;
    }

    /**
     * 提示信息弹窗
     */
    // @action.bound
    // public infoModal() {
    //     Modal.info({
    //         title: '提示',
    //         content: "该票据类型下对应的票据打印模板已改变，在用户的打印模板中如果需要修改，请到批量修改打印模板窗口修改。",
    //         okText: "确定"
    //     });
    // }


    /**
     * 新建票据类型模板
     */
    @action.bound
    private addTemplate(model: BillPrintTempLate): Promise<IResponseJsonResult> {
        return requestJson("/api/bdt/BillPrintTemplate/AddTemplate",
            {
                method: "POST",
                body: JSON.stringify(model),
                headers: { "content-type": "application/json" }
            });
    }

    /**
     * 更新票据模板数据
     */
    @action.bound
    private updateTemplate(model: BillPrintTempLate): Promise<IResponseJsonResult> {
        return requestJson("/api/bdt/BillPrintTemplate/UpdateTemplate",
            {
                method: "POST",
                body: JSON.stringify(model),
                headers: { "content-type": "application/json" }
            });
    }

    /**
     * 删除数据
     */
    @action.bound
    private deleteTemplate(billTypeId: string, agentBankId: string, templateId: number): Promise<IResponseJsonResult> {
        return requestJson(`/api/bdt/BillPrintTemplate/DeleteTemplate?billTypeId=${billTypeId}&agentBankId=${agentBankId}&templateId=${templateId}`, { method: "GET" })
    }


}