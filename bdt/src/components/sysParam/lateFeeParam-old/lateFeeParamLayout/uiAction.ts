import { message } from 'antd';
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { RadioChangeEvent } from 'antd/lib/radio';
import { action, observable, toJS } from 'mobx';
import { OridStores } from 'orid';
import { LateFeeParamEntity } from '../../entity/lateFeeParam';
import { SysParameter } from '../../entity/sysParameter';
import { ILateFeeParamLayoutProps } from "./interface";

export class LateFeeParamLayoutUiAction {
    /**
     * 是否禁用
     */
    @observable
    public isDisable: boolean;
    /**
     * 违约金参数实体
     */
    @observable
    public currentLateFeeParam: LateFeeParamEntity;
    /**
     * props
     */
    private props: ILateFeeParamLayoutProps;
    /**
     * 当前违约金参数
     */
    private currentSysParams: SysParameter[];
    /**
     * 未用到此属性
     */
    // private sysParames:SysParameter[];
    private penaltyCalculating:boolean=false;

    constructor(props: ILateFeeParamLayoutProps) {
        this.props = props;
        this.isDisable = false;
        this.currentSysParams = new Array<SysParameter>()
        // this.sysParames=new Array<SysParameter>();
        this.currentLateFeeParam = new LateFeeParamEntity();
        this.getLateFeeSysParam = this.getLateFeeSysParam.bind(this);
        this.latefeeData = this.latefeeData.bind(this);
        this.lateFeeIsEnableCheckedChange = this.lateFeeIsEnableCheckedChange.bind(this);
        this.IsLateFeeNoExceedFeeCheckedChange = this.IsLateFeeNoExceedFeeCheckedChange.bind(this);
        this.IsLateFeeNoExceedFeeInputOnChange = this.IsLateFeeNoExceedFeeInputOnChange.bind(this);
        this.IsLateFeeMinAmountCheckedChange = this.IsLateFeeMinAmountCheckedChange.bind(this);
        this.lateFeeMinAmountInputOnChange = this.lateFeeMinAmountInputOnChange.bind(this);
        this.lateFeeComputeBaseRadioOnChange = this.lateFeeComputeBaseRadioOnChange.bind(this);
        this.lateFeeComputeProportionOnChange = this.lateFeeComputeProportionOnChange.bind(this);
        this.lateFeeBeginDateTypeOnChange = this.lateFeeBeginDateTypeOnChange.bind(this);
        this.lateFeeBeginDateCopeMeterDayOnChange = this.lateFeeBeginDateCopeMeterDayOnChange.bind(this);
        this.lateFeeBeginDateAfterCopyMeterMonthOnChange = this.lateFeeBeginDateAfterCopyMeterMonthOnChange.bind(this);
        this.LateFeeBeginDateAfterCopyMeterDayOnChange = this.LateFeeBeginDateAfterCopyMeterDayOnChange.bind(this);
        this.save = this.save.bind(this);
        this.dataCompare = this.dataCompare.bind(this);
        this.saveBeforeJudge = this.saveBeforeJudge.bind(this);
        this.clear = this.clear.bind(this);
        this.CanelPenalty=this.CanelPenalty.bind(this);
    }

    /**
     * 获取违约金系统参数
     */
    @action
    public getLateFeeSysParam() {
        this.props.sysParamStore!.isLoading = true;
        const defines = ['LateFeeIsEnable', 'IsLateFeeNoExceedFee', 'LateFeeNoExceedFeeProportion',
            'IsLateFeeMinAmount', 'LateFeeMinAmount', 'LateFeeComputeBase', 'LateFeeComputeProportion',
            'LateFeeBeginDateType', 'LateFeeBeginDateCopeMeterDay', 'LateFeeBeginDateAfterCopyMeterMonth',
            'LateFeeBeginDateAfterCopyMeterDay'];
        defines.forEach((define: string) => {
            this.latefeeData(define);
        })
        if (this.currentLateFeeParam.LateFeeIsEnable === "0") {
            this.isDisable = true;
        }

        this.props.sysParamStore!.isLoading = false;

    }




    /**
     * 是否启用违约金数据变化时发生
     * @param e 
     */
    @action
    public lateFeeIsEnableCheckedChange(e: CheckboxChangeEvent) {
        console.log("e.target.checked", e.target.checked)
        this.currentLateFeeParam.LateFeeIsEnable = e.target.checked ? "1" : "0";
        this.isDisable = e.target.checked ? false : true;
        console.log("this.currentLateFeeParam.LateFeeIsEnable", this.currentLateFeeParam.LateFeeIsEnable);


        // this.dataCheck("LateFeeIsEnable", e.target.checked ? "1" : "0");
    }

    /**
     * 是否启用违约金不超过本金的比例 数据变化时发生
     * @param e 
     */

    public IsLateFeeNoExceedFeeCheckedChange(e: CheckboxChangeEvent) {
        console.log("e.target.checked", e.target.checked)
        this.currentLateFeeParam.IsLateFeeNoExceedFee = e.target.checked ? "1" : "0";
        console.log("this.currentLateFeeParam.IsLateFeeNoExceedFee", this.currentLateFeeParam.IsLateFeeNoExceedFee);
        // this.dataCheck("IsLateFeeNoExceedFee", e.target.checked ? "1" : "0");

    }

    /**
     * 违约金不超过本金的比例 数据变化时发生
     * @param event 
     */
    public IsLateFeeNoExceedFeeInputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("event.currentTarget.value", event.currentTarget.value)
        let value = 0;
        try {
            value = Number(event.currentTarget.value);
        } catch (error) {
            message.error("输入的比例格式不正确");
        }

        this.currentLateFeeParam.LateFeeNoExceedFeeProportion = value.toString();
        console.log("this.currentLateFeeParam.LateFeeNoExceedFeeProportion", this.currentLateFeeParam.LateFeeNoExceedFeeProportion);
        // this.dataCheck("LateFeeNoExceedFeeProportion", value.toString());
    }

    /**
     * 是否启用违约金最小金额 数据变化时发生
     */
    public IsLateFeeMinAmountCheckedChange(e: CheckboxChangeEvent) {
        console.log("e.target.checked", e.target.checked)
        this.currentLateFeeParam.IsLateFeeMinAmount = e.target.checked ? "1" : "0";
        console.log("this.currentLateFeeParam.IsLateFeeMinAmount", this.currentLateFeeParam.IsLateFeeMinAmount);
        // this.dataCheck("IsLateFeeMinAmount", e.target.checked ? "1" : "0");
    }

    /**
     * 违约金最小金额 数据变化时发生
     */
    public lateFeeMinAmountInputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("event.currentTarget.value", event.currentTarget.value)
        let value = 0;
        try {
            value = Number(event.currentTarget.value);
        } catch (error) {
            message.error("输入的比例格式不正确");
        }
        this.currentLateFeeParam.LateFeeMinAmount = value.toString();
        console.log("this.currentLateFeeParam.LateFeeMinAmount", this.currentLateFeeParam.LateFeeMinAmount);
        // this.dataCheck("LateFeeMinAmount", value.toString());
    }

    /**
     * 违约金计算基数 1：根据水费金额计算违约金 2：根据水费与余额之差计算违约金 
     * ---  数据变化时发生
     * @param event 
     */
    @action
    public lateFeeComputeBaseRadioOnChange(event: RadioChangeEvent) {
        console.log("event.target.value", event.target.value)
        this.currentLateFeeParam.LateFeeComputeBase = event.target.value;
        console.log("this.currentLateFeeParam.LateFeeComputeBase", this.currentLateFeeParam.LateFeeComputeBase);
        // this.dataCheck("LateFeeComputeBase", event.target.value);
    }

    /**
     * 违约金计算比例 数据变化时发生
     * @param event 
     */
    public lateFeeComputeProportionOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("event.currentTarget.value", event.currentTarget.value)
        this.currentLateFeeParam.LateFeeComputeProportion = event.currentTarget.value;
        console.log("this.currentLateFeeParam.LateFeeComputeProportion", this.currentLateFeeParam.LateFeeComputeProportion)
        // this.dataCheck("LateFeeComputeProportion", event.currentTarget.value);
    }

    /**
     * 违约金起算日期方式 1：抄表后第n天 2：抄表月的下第n月第m天 3：自定义违约金起算日期 数据变化时发生
     */
    public lateFeeBeginDateTypeOnChange(event: RadioChangeEvent) {
        console.log("event.target.value", event.target.value)
        this.currentLateFeeParam.LateFeeBeginDateType = event.target.value;
        console.log("this.currentLateFeeParam.LateFeeBeginDateType", this.currentLateFeeParam.LateFeeBeginDateType)
        // this.dataCheck("LateFeeBeginDateType", event.target.value);

    }

    /**
     * 违约金起算日期方式1-抄表后第n天 数据变化时发生
     * @param event 
     */
    public lateFeeBeginDateCopeMeterDayOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("event.currentTarget.value", event.currentTarget.value)
        this.currentLateFeeParam.LateFeeBeginDateCopeMeterDay = event.currentTarget.value;
        console.log("this.currentLateFeeParam.LateFeeBeginDateCopeMeterDay", this.currentLateFeeParam.LateFeeBeginDateCopeMeterDay);
        // this.dataCheck("LateFeeBeginDateCopeMeterDay", event.currentTarget.value);
    }

    /**
     * 违约金起算日期方式2-抄表月的下第n月 数据变化时发生
     * @param event 
     */
    public lateFeeBeginDateAfterCopyMeterMonthOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("event.currentTarget.value", event.currentTarget.value)
        this.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterMonth = event.currentTarget.value;
        console.log("this.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterMonth", this.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterMonth)
        // this.dataCheck("LateFeeBeginDateAfterCopyMeterMonth", event.currentTarget.value);
    }

    /**
     * 违约金起算日期方式2-抄表月的下第m天 数据变化时发生
     * @param event 
     */
    public LateFeeBeginDateAfterCopyMeterDayOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("event.currentTarget.value", event.currentTarget.value)
        this.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterDay = event.currentTarget.value;
        console.log("this.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterDay", this.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterDay)
        // this.dataCheck("LateFeeBeginDateAfterCopyMeterDay", event.currentTarget.value);
    }

    /**
     * 保存
     */
    public async save() {

        this.dataCompare();
        if (!this.saveBeforeJudge()) {
            this.currentSysParams = [];
            return;
        }

        this.props.sysParamStore!.isLoading = true;
        console.log("this.currentSysParams", this.currentSysParams)
        console.log("this.currentLateFeeParam-----", toJS(this.currentLateFeeParam));
        const res = await this.props.lateFeeParamStore!.saveSysParam(this.currentSysParams, this.currentLateFeeParam);
        if (res.rtnCode !== 0) {
            message.error(res.rtnMsg);
            this.props.sysParamStore!.isLoading = false;
            return;
        }
        if (res.rtnCode === 0) {
            message.success("保存成功");
        }
        this.currentSysParams = [];
        this.props.sysParamStore!.isLoading = false;
        this.props.lateFeeParamStore!.GetLaterFeeSysParams();
        console.log("保存完之后。", this.currentSysParams)
        // this.sysParams=new Array<SysParameter>();
    }

    public async CanelPenalty() {
        if(this.isDisable){
            message.info('不需要进行计算')
            return;
        }
        if(this.penaltyCalculating){
            message.info('正在计算中，请稍后再试')
            return;
        }
        this.penaltyCalculating=true;
        const calcLateFeeRes = await this.props.lateFeeParamStore!.CanelPenalty()
        if (calcLateFeeRes.data && calcLateFeeRes.rtnCode === 0) {
            message.success('重新计算违约金成功')
            this.penaltyCalculating=false;
        } else {
            message.info(calcLateFeeRes.rtnMsg)
            this.penaltyCalculating=false;
        }
    }

    public clear() {
        this.currentSysParams = [];
        this.props.lateFeeParamStore!.sysParams = [];
    }
    /**
     * 判断修改的字段是否发生了改变，若改变保存起来
     * @param define 定义
     * @param value 值
     */
    private dataCompare() {
        const { sysParams } = this.props.lateFeeParamStore!
        if (this.isDisable) {
            const index = sysParams.findIndex((entity: SysParameter) => entity.Define === "LateFeeIsEnable")
            console.log("LateFeeIsEnable__index", index);
            if (index !== -1) {
                if (this.currentLateFeeParam.LateFeeIsEnable !== sysParams[index].Value) {
                    this.currentSysParams.push({
                        CpCode: sysParams[index].CpCode,
                        Define: sysParams[index].Define,
                        Value: this.currentLateFeeParam.LateFeeIsEnable,
                        Description: sysParams[index].Description
                    });
                }

            } else {
                this.currentSysParams.push({
                    CpCode: OridStores.authStore.currentOperator.CpCode,
                    Define: "LateFeeIsEnable",
                    Value: this.currentLateFeeParam.LateFeeIsEnable,
                    Description: "是否启用违约金"
                });
            }

        } else {

            sysParams.forEach((item: SysParameter) => {
                if (this.currentLateFeeParam[item.Define] !== item.Value) {
                    this.currentSysParams.push({
                        CpCode: item.CpCode,
                        Define: item.Define,
                        Value: this.currentLateFeeParam[item.Define],
                        Description: item.Description
                    });
                }
            })

        }

        console.log("compare_currentSysParams", this.currentSysParams);

    }
    /**
     * 正则判断
     */
    private saveBeforeJudge(): boolean {

        if (this.currentSysParams.length === 0) {
            message.info("暂无需要保存的数据");
            return false;
        }
        if (this.currentLateFeeParam.LateFeeIsEnable === "1") {

            if (this.currentLateFeeParam.IsLateFeeNoExceedFee === "1") {


                if (isNaN(Number(this.currentLateFeeParam.LateFeeNoExceedFeeProportion))) {
                    message.error('违约金不超过本金的比例必须是有效数字!')
                    return false;
                }
                if (!(/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/).test(
                    this.currentLateFeeParam.LateFeeNoExceedFeeProportion)) {
                    message.error('违约金不超过本金的比例必须是有效数字!')
                    return false;
                }
            }

            if (this.currentLateFeeParam.IsLateFeeMinAmount === "1") {


                if (isNaN(Number(this.currentLateFeeParam.LateFeeMinAmount))) {
                    message.error('最小金额必须是有效数字!')
                    return false;
                }
                if (!(/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/).test(this.currentLateFeeParam.LateFeeMinAmount)) {
                    message.error('最小金额必须是有效数字!')
                    return false;
                }

            }

            if (isNaN(Number(this.currentLateFeeParam.LateFeeComputeProportion))) {
                message.error('计算比例必须是有效数字!')
                return false;
            }
            if (!(/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/).test(this.currentLateFeeParam.LateFeeComputeProportion)) {
                message.error('计算比例必须是有效数字!')
                return false;
            }


            if (this.currentLateFeeParam.LateFeeBeginDateType === "1") {

                if (isNaN(Number(this.currentLateFeeParam.LateFeeBeginDateCopeMeterDay))) {
                    message.error('抄表后第某天必须是有效数字!')
                    return false;
                }
                if (!(/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/).test(this.currentLateFeeParam.LateFeeBeginDateCopeMeterDay)) {
                    message.error('抄表后第某天必须是有效数字!')
                    return false;
                }
            }


            if (this.currentLateFeeParam.LateFeeBeginDateType === "2") {

                if (isNaN(Number(this.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterMonth))) {
                    message.error('抄表月下第某月的值应在1-12之间!')
                    return false;
                }
                if (!(/^[1-9]\d*$/).test(this.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterMonth)) {
                    message.error('抄表月下第某月的值应在1-12之间!')
                    return false;
                }
                if (Number(this.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterMonth) > 12) {
                    message.error('抄表月下第某月的值应在1-12之间!')
                    return false;
                }


                if (isNaN(Number(this.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterDay))) {
                    message.error('抄表月下第某月 第某天的值应在1-31之间!')
                    return false;
                }
                if (!(/^[1-9]\d*$/).test(this.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterDay)) {
                    message.error('抄表月下第某月 第某天的值应在1-31之间!')
                    return false;
                }
                if (Number(this.currentLateFeeParam.LateFeeBeginDateAfterCopyMeterDay) > 31) {
                    message.error('抄表月下第某月 第某天的值应在1-31之间!')
                    return false;
                }
            }

        }

        return true;
    }

    /**
     * 判断数据在不在要保存的数据集合内(存入修改变化的值)
     * 舍弃
     */
    // private dataCheck (define:string,value:string){
    //    // this.sysParams=new Array<SysParameter>()
    //     const index=this.props.lateFeeParamStore!.sysParams.findIndex((entity:SysParameter)=>{
    //         return entity.Define===define;
    //     });
    //     console.log("this.sysParams1",this.currentSysParams,this.props.lateFeeParamStore!.sysParams)
    //     const index1 = this.currentSysParams.findIndex((entity:SysParameter)=>{
    //         return entity.Define===define;
    //     });
    //     // 在store.sysParams中不存在并且在uiAction.sysParams中不存在  或者  在store.sysParams中存在并且在uiAction.sysParams中不存在
    //     if((index===-1&&index1===-1)||(index!==-1&&index1===-1)){
    //         const sysParam = new SysParameter();
    //         sysParam.Define=define;
    //         sysParam.Value=value;
    //         sysParam.Description="";
    //         this.currentSysParams.push(sysParam);
    //     }
    //     // 在store.sysParams中不存在并且在uiAction.sysParams中存在  或者  在store.sysParams中存在并且在uiAction.sysParams中存在并且store中的值和页面的数据不相同
    //     else if((index===-1 && index1!==-1)
    //      || (index!==-1&&index1!==-1 && this.props.lateFeeParamStore!.sysParams[index].Value!==value)){
    //         const sysParam = new SysParameter();
    //         sysParam.Define=define;
    //         sysParam.Value=value;
    //         sysParam.Description="";
    //         this.currentSysParams.push(sysParam);
    //     }
    //     // 在store.sysParams中不存在并且在uiAction.sysParams中存在  或者  在store.sysParams中存在并且在uiAction.sysParams中存在并且store中的值和页面的数据相同
    //     else if((index===-1 && index1!==-1) 
    //     || (index!==-1&&index1!==-1 && this.props.lateFeeParamStore!.sysParams[index].Value===value)){
    //         const sysParam = new SysParameter();
    //         sysParam.Define=define;
    //         sysParam.Value=value;
    //         sysParam.Description="";
    //         this.currentSysParams.push(sysParam);
    //     }

    //     console.log("this.sysParams2",this.currentSysParams,this.props.lateFeeParamStore!.sysParams)
    // }









    /**
     * 构造违约金系统参数
     * @param define 定义
     */
    private latefeeData(define: string) {
        const index = this.props.sysParamStore!.sysParams.findIndex((entity: SysParameter) => {
            return entity.Define === define;
        })
        if (index !== -1) {
            // console.log("define:", define);
            // console.log("index:", index);
            this.props.lateFeeParamStore!.sysParams.push(this.props.sysParamStore!.sysParams[index]);
            // this.props.lateFeeParamStore!.LateFeeParam[define] = this.props.sysParamStore!.sysParams[index].Value;
            this.currentLateFeeParam[define] = this.props.sysParamStore!.sysParams[index].Value;
        }
    }
}