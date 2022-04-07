import { message } from "antd";
import { action, observable } from "mobx";
import { OridStores } from "orid";
import { PreSaveWriteOffParamEntity } from "../../entity/PreSaveWriteOffParamEntity";
import { SysParameter } from "../../entity/sysParameter";
import { ChargeWriteOffDoMainStore } from "../domainStore";
import { ChargeWriteOffParamUiStore } from "./uiStore";

export class ChargeWriteOffLayoutUiAction {


    public store: ChargeWriteOffParamUiStore;

    @observable
    public WriteOffParamEntity: PreSaveWriteOffParamEntity = new PreSaveWriteOffParamEntity();

    constructor(store: ChargeWriteOffParamUiStore) {
        this.store = store;
    }

    /**
     * 加载数据
     */
    @action.bound
    public async loadData() {

        const chargeWriteOffParamRes = await ChargeWriteOffDoMainStore!.GetChargeWriteOffParam();
        if (chargeWriteOffParamRes.rtnCode !== 0) {
            message.error(chargeWriteOffParamRes.rtnMsg);
            return;
        }
        try {
            const data = chargeWriteOffParamRes.data.PreSaveWriteOffDto as PreSaveWriteOffParamEntity;
            // data.WriteOffDate.Time = data.WriteOffDate.StartTime;
            // if (data.WriteOffDate.StartTime === data.WriteOffDate.EndTime) {
            //     data.WriteOffDate.SelectType = '1';
            // } else {
            //     data.WriteOffDate.SelectType = '2';
            // }
            this.WriteOffParamEntity = data;
            this.store.autoWriteOff = data.AutoWriteOff;
            this.store.dateType = data.WriteOffDate.DateType;
        } catch (error) {
            console.log(error)
        }

    }

    /**
     * 保存抄表参数数据
     */
    @action.bound
    public async save(param: PreSaveWriteOffParamEntity) {
        console.log(param, this.WriteOffParamEntity)
        const unchanged = (String(param.AutoWriteOff) === String(this.WriteOffParamEntity.AutoWriteOff)) &&
            (String(param.WriteOffType) === String(this.WriteOffParamEntity.WriteOffType)) &&
            (param.WriteOffDate.DateType === this.WriteOffParamEntity.WriteOffDate.DateType) &&
            (param.WriteOffDate.WriteOffTime === this.WriteOffParamEntity.WriteOffDate.WriteOffTime) &&
            (param.WriteOffDate.StartTime === this.WriteOffParamEntity.WriteOffDate.StartTime) &&
            (param.WriteOffDate.SelectType === this.WriteOffParamEntity.WriteOffDate.SelectType) &&
            (param.WriteOffDate.Time === this.WriteOffParamEntity.WriteOffDate.Time) &&
            (param.WriteOffDate.EndTime === this.WriteOffParamEntity.WriteOffDate.EndTime)

        if (unchanged) {
            message.info('暂无需要保存的数据')
            return
        }
        const SysParameterList = []

        const entity = [
            new SysParameter({
                Define: "preSaveWriteOffType",
                Value: param.WriteOffType,
                CpCode: OridStores.authStore.currentOperator.CpCode,
                Description: "预存款冲减方式"
            }),
            new SysParameter({
                Define: "preSaveAutoWriteOff",
                Value: param.AutoWriteOff === true ? '1' : '0',
                Description: "自动扣减。0禁用、1启用",
                CpCode: OridStores.authStore.currentOperator.CpCode,
            }),
            new SysParameter({
                Define: "preSaveDateType",
                Value: param.WriteOffDate.DateType,
                Description: "扣减日期类型。可输入值：每周、每月、每天",
                CpCode: OridStores.authStore.currentOperator.CpCode,
            }),
            new SysParameter({
                Define: "preSaveStartTime",
                Value: param.WriteOffDate.StartTime ? param.WriteOffDate.StartTime.toString() : '',
                Description: "扣减日期起始时间",
                CpCode: OridStores.authStore.currentOperator.CpCode,
            }),
            new SysParameter({
                Define: "preSaveEndTime",
                Value: param.WriteOffDate.EndTime ? param.WriteOffDate.EndTime.toString() : '',
                Description: "扣减日期结束时间",
                CpCode: OridStores.authStore.currentOperator.CpCode,
            }),
            new SysParameter({
                Define: "preSaveSelectType",
                Value: param.WriteOffDate.SelectType ? param.WriteOffDate.SelectType.toString() : '',
                Description: "扣减日期时间类型",
                CpCode: OridStores.authStore.currentOperator.CpCode,
            }),
            new SysParameter({
                Define: "preSaveTime",
                Value: param.WriteOffDate.Time ? param.WriteOffDate.Time.toString() : '',
                Description: "扣减日期单一时间",
                CpCode: OridStores.authStore.currentOperator.CpCode,
            }),
            new SysParameter({
                Define: "preSaveWriteOffTime",
                Value: param.WriteOffDate.WriteOffTime,
                Description: "扣减时间点",
                CpCode: OridStores.authStore.currentOperator.CpCode,
            })
        ]


        if (entity[0].Value === "") {
            message.error("请选择冲减方式!");
            return;
        }

        SysParameterList.push(...entity)

        const res = await ChargeWriteOffDoMainStore!.saveSysParam(SysParameterList);
        if (res.rtnCode !== 0) {
            message.error(res.rtnMsg);
            return;
        }
        message.success("保存成功");
        this.WriteOffParamEntity = param
    }

}