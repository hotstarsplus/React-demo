import { message } from "antd";
import { observable } from "mobx";
import { OridStores, requestJson } from "orid";
import { BaseParamEntiy } from "./BaseParam/entity";
import { SysParameter } from "./entity/sysParameter";

export class SysParamDoMainStore {
    @observable
    public isButton: string;

    @observable
    public sysParams: SysParameter[];

    /**
     * 系统参数源数据
     * 说明：用于部分保存操作前，判断ui数据是否有改动
     */
    @observable
    public sysParamsSource: SysParameter[];

    @observable
    public waterMeterFlowParams: SysParameter;
    /**
     * 水表流程参数
     */
    @observable
    public flowNo: string = "";

    @observable
    public WriteOffType: string = "";
    /** 接口返回的默认值 */
    @observable
    public FlowNo: string = "";
    /** 提醒参数页面的默认应收金额 */
    @observable
    public showMoney: string = '';
    /** 提醒参数页面的默认实收金额 */
    @observable
    public accountMoney: string = ''

    @observable
    public BaseParam: BaseParamEntiy;
    /**
     * 是否启用区段权限(用于判断页面参数是否改变)
     */
    @observable
    public IsUseReginSecurrty: string;

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading: boolean;

    /** 存储菜单按钮权限id */
    @observable
    public menuBtnList:string;

    constructor() {
        this.sysParams = new Array<SysParameter>();
        this.sysParamsSource = new Array<SysParameter>();

        this.isLoading = false;
        this.isButton = "";
        this.BaseParam = new BaseParamEntiy();
        this.menuBtnList = '';
    }
    /**
     * 查询全部的系统参数值
     */
    public async GetAllSysParam() {
        this.isLoading = true;
        const res = await requestJson("/api/bdt/SysParameter/getAllSysParameters?cpCode=" + OridStores.authStore.currentOperator.CpCode);
        if (res.rtnCode !== 0) {
            this.isLoading = false;
            return;
        }
        const data = res.data as SysParameter[];
        this.sysParams = data;
        this.sysParamsSource = JSON.parse(JSON.stringify(data));
        this.sysParams.forEach((item: SysParameter) => {
            if (item.Define === "isSetAddedInvoiceNoteField") {
                this.isButton = item.Value
            }
            if (item.Define === "preSaveWriteOffType") {
                this.WriteOffType = item.Value
            }
            if (item.Define === 'showMessageReferenceType') {
                if (String(item.Value) === '1') {
                    this.sysParams.forEach((element: any) => {
                        if (element.Define === 'maxInvoiceAmount') {
                            this.showMoney = element.Value
                        }
                    })
                }
                if (String(item.Value) === '2') {
                    this.sysParams.forEach((element: any) => {
                        if (element.Define === 'maxInvoiceAmount') {
                            this.accountMoney = element.Value
                        }
                    })
                }
            }
        })
        this.isLoading = false;
    }
    public async GetWaterMeterFlowParam() {
        const res = await requestJson("/api/bdt/SysParameter/Water/Flow/Model?cpCode=" + OridStores.authStore.currentOperator.CpCode);
        if (res.rtnCode !== 0) {
            message.error(res.rtnMsg)
            return;
        }
        this.waterMeterFlowParams = res.data as SysParameter;
        this.flowNo = this.waterMeterFlowParams === null ? '' : String(this.waterMeterFlowParams.Value);
        this.FlowNo = this.waterMeterFlowParams === null ? '' : String(this.waterMeterFlowParams.Value);
    }
    public async SaveWaterMeterFlowParam(flow: string) {
        const res = await requestJson("/api/bdt/SysParameter/Water/Flow/Config?flowNo=" + flow + '&cpCode=' + OridStores.authStore.currentOperator.CpCode);
        message.success(res.rtnMsg)
        if (res.rtnCode !== 0) {
            return;
        }
    }
    /**
     * 获取基本参数
     */
    public async GetBaseParam() {
        const res = await requestJson("/api/bdt/SysParameter/BaseParam/GetBaseParam");
        if (res.rtnCode !== 0) {
            message.error(res.rtnMsg)
            return;
        }
        this.BaseParam = res.data as BaseParamEntiy;
        this.IsUseReginSecurrty = this.BaseParam.IsUseReginSecurrty;
    }

    /**
     * 保存系统参数
     */
    public async SaveBaseParam(BaseParam: BaseParamEntiy) {
        const res = await requestJson("/api/bdt/SysParameter/BaseParam/SavBaseParam",
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify(BaseParam)
            }
        );
        if (res.rtnCode !== 0) {
            message.error(res.rtnMsg);
            return;
        } else {
            this.IsUseReginSecurrty = BaseParam.IsUseReginSecurrty;
            message.success("保存成功");
        }
    }

    /**
     * 保存审核计费参数
     */
    public async SaveCalcFeeParam(value: string,value1:string,value2:string): Promise<boolean> {
        const res = await requestJson("/api/bdt/SysParameter/SaveCalcFeeParam",
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify({ CalcQuantityType: value,isCalcSurPerPlan:value1,isCalcLadderForFirst:value2 })
            }
        );
        if (res.rtnCode !== 0) {
            message.error(res.rtnMsg);
            return false;
        } else {
            message.success("保存成功");
            // this.sysParamsSource.forEach((x) =>{
            //     x.Define === "CalcQuantityType";
            // });
            return true;
        }
    }
    /** 获取菜单按钮权限列表 */
    public getMenuBtnPower = async() => {
        try {
            const res = await requestJson('api/SYS/CpMenu/GetCpUserBtnPower?fatherId='+'10001600');
            if(res.rtnCode !== 0){
                message.error(res.rtnMsg)
                return
            }
            this.menuBtnList = res.data;
            console.log('this.menuBtnList',this.menuBtnList);


        } catch (error) {
            console.log(error)
        }
    }
}