import { message } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { ChangeEvent } from 'react';
import { IdRuleEntity } from '../../entity/IdRuleEntity';
import { OpenAccountParamSaveDto } from '../../entity/openAccountParamSaveDto';
import { SysParameter } from '../../entity/sysParameter';
import { IOpenAccountParamLayoutProps } from "./interface";

export class OpenAccountParamLayoutUiAction {
    public customerNoRule: string = "";
    public waterUserNoRule: string = "";
    private props: IOpenAccountParamLayoutProps;

    constructor(props: IOpenAccountParamLayoutProps) {
        this.props = props;
        this.loadData = this.loadData.bind(this);
        this.getCurrentCustomerNoRule = this.getCurrentCustomerNoRule.bind(this);
        this.getCurrentWaterUserNoRule = this.getCurrentWaterUserNoRule.bind(this);
        this.customerNoRuleSelectOnChange = this.customerNoRuleSelectOnChange.bind(this);
        this.customerNoPreFixOnChange = this.customerNoPreFixOnChange.bind(this);
        this.customerNoStartNumberOnChange = this.customerNoStartNumberOnChange.bind(this);
        this.customerNoNumberLengthOnChange = this.customerNoNumberLengthOnChange.bind(this);
        this.waterUserNoRuleSelectOnChange = this.waterUserNoRuleSelectOnChange.bind(this);
        this.waterUserNoPreFixOnChange = this.waterUserNoPreFixOnChange.bind(this);
        this.waterUserNoStartNumberOnChange = this.waterUserNoStartNumberOnChange.bind(this);
        this.waterUserNoNumberLengthOnChange = this.waterUserNoNumberLengthOnChange.bind(this);
        this.save = this.save.bind(this);
    }

    public customerNoRuleSelectOnChange(value: SelectValue) {
        this.customerNoRule = value.toString();
        this.props.openAccountParamStore!.isSelected = true
        this.getCurrentCustomerNoRule(value.toString());

    }

    public customerNoPreFixOnChange(value: ChangeEvent<HTMLInputElement>) {
        this.props.openAccountParamStore!.isSelected = true
        this.props.openAccountParamStore!.CurrentCustomerNoRule.PreFix = value.currentTarget.value;
    }

    public customerNoStartNumberOnChange(value: ChangeEvent<HTMLInputElement>) {
        this.props.openAccountParamStore!.isSelected = true
        const startNumber = parseInt(value.currentTarget.value, 10);
        if (isNaN(startNumber)) {
            message.error("请输入数字");
        }
        if (startNumber < 0) {
            message.error("请输入正整数");
        }
        this.props.openAccountParamStore!.CurrentCustomerNoRule.StartNumber = startNumber;
    }
    public customerNoNumberLengthOnChange(value: ChangeEvent<HTMLInputElement>) {
        this.props.openAccountParamStore!.isSelected = true
        const length = parseInt(value.currentTarget.value, 10);
        if (isNaN(length)) {
            message.error("请输入数字");
        }
        if (length < 0) {
            message.error("请输入正整数");
        }
        this.props.openAccountParamStore!.CurrentCustomerNoRule.NumberLength = length;
    }

    public waterUserNoRuleSelectOnChange(value: SelectValue) {
        this.props.openAccountParamStore!.isSelected = true
        this.waterUserNoRule = value.toString();
        this.getCurrentWaterUserNoRule(value.toString());

    }

    public waterUserNoPreFixOnChange(value: ChangeEvent<HTMLInputElement>) {
        this.props.openAccountParamStore!.isSelected = true
        this.props.openAccountParamStore!.CurrentWaterUserNoRule.PreFix = value.currentTarget.value;
    }

    public waterUserNoStartNumberOnChange(value: ChangeEvent<HTMLInputElement>) {
        this.props.openAccountParamStore!.isSelected = true
        const startNumber = parseInt(value.currentTarget.value, 10);
        if (isNaN(startNumber)) {
            message.error("请输入数字");
        }
        if (startNumber < 0) {
            message.error("请输入正整数");
        }
        this.props.openAccountParamStore!.CurrentWaterUserNoRule.StartNumber = startNumber;
    }
    public waterUserNoNumberLengthOnChange(value: ChangeEvent<HTMLInputElement>) {
        this.props.openAccountParamStore!.isSelected = true
        const length = parseInt(value.currentTarget.value, 10);
        if (isNaN(length)) {
            message.error("请输入数字");
        }
        if (length < 0) {
            message.error("请输入正整数");
        }
        this.props.openAccountParamStore!.CurrentWaterUserNoRule.NumberLength = length;
    }



    public async loadData() {
        const customerNoRes = await this.props.openAccountParamStore!.GetNumberRule("CustomerNo");
        if (customerNoRes.rtnCode !== 0) {
            message.error(customerNoRes.rtnMsg);
            return;
        }
        const customerNumberData = customerNoRes.data as IdRuleEntity[];
        this.props.openAccountParamStore!.CustomerNoRules = customerNumberData;

        const userNoRes = await this.props.openAccountParamStore!.GetNumberRule("WaterUserNo");
        if (userNoRes.rtnCode !== 0) {
            message.error(userNoRes.rtnMsg);
            return;
        }
        const userNoData = userNoRes.data as IdRuleEntity[];
        this.props.openAccountParamStore!.WaterUserNoRules = userNoData;

        const waterUserEntity = this.props.sysParamStore!.sysParams.find((value: SysParameter) => {
            return value.Define === "WaterUserNoRule";
        })
        if (waterUserEntity) {
            this.waterUserNoRule = waterUserEntity.Value;
            this.getCurrentWaterUserNoRule(waterUserEntity.Value);
        }

        const customerNoEntity = this.props.sysParamStore!.sysParams.find((entity: SysParameter) => {
            return entity.Define === "CustomerNoRule";
        })
        if (customerNoEntity) {
            this.customerNoRule = customerNoEntity.Value;
            this.getCurrentCustomerNoRule(customerNoEntity.Value);
        }
    }
    public async getCurrentWaterUserNoRule(value: string) {
        this.props.openAccountParamStore!.CustomerNoRuleNameLoad = this.props.openAccountParamStore!.CustomerNoRuleName
        const currentWaterUserNoRuleRes = await this.props.openAccountParamStore!.GetNumberRuleById(value);
        if (currentWaterUserNoRuleRes.rtnCode !== 0) {
            message.error(currentWaterUserNoRuleRes.rtnMsg);
            return;
        }
        const data = currentWaterUserNoRuleRes.data as IdRuleEntity;
        this.props.openAccountParamStore!.CustomerNoRuleName = data.RuleName
        this.props.openAccountParamStore!.CurrentWaterUserNoRule = data;
    }
    public async getCurrentCustomerNoRule(value: string) {
        this.props.openAccountParamStore!.WaterUserNoRuleNamesLoad = this.props.openAccountParamStore!.WaterUserNoRuleName
        const currentCustomerNoRuleRes = await this.props.openAccountParamStore!.GetNumberRuleById(value);
        if (currentCustomerNoRuleRes.rtnCode !== 0) {
            message.error(currentCustomerNoRuleRes.rtnMsg);
            return;
        }
        const data = currentCustomerNoRuleRes.data as IdRuleEntity;
        this.props.openAccountParamStore!.WaterUserNoRuleName = data.RuleName
        this.props.openAccountParamStore!.CurrentCustomerNoRule = data;
    }

    public async save() {
        const entity = new OpenAccountParamSaveDto();
        const cStartNumber = this.props.openAccountParamStore!.CurrentCustomerNoRule.StartNumber;
        const clength = this.props.openAccountParamStore!.CurrentCustomerNoRule.NumberLength;
        const wStartNumber = this.props.openAccountParamStore!.CurrentWaterUserNoRule.StartNumber;
        const wlength = this.props.openAccountParamStore!.CurrentWaterUserNoRule.NumberLength;
        if (String(cStartNumber) === 'NaN' || String(wStartNumber) === 'NaN' || String(clength) === 'NaN' || String(wlength) === 'NaN') {
            message.error("请输入数字");
            return;
        }
        entity.CustomerNoRule = this.props.openAccountParamStore!.CurrentCustomerNoRule;
        entity.WaterUserNoRule = this.props.openAccountParamStore!.CurrentWaterUserNoRule;
        // if(String(this.props.openAccountParamStore!.WaterUserNoRuleName)===String(entity.WaterUserNoRule.RuleName) && String(this.props.openAccountParamStore!.CustomerNoRuleName)===String(entity.CustomerNoRule.RuleName)){
        //     message.info('暂无需要保存的数据')
        //     return
        // }
        if (this.props.openAccountParamStore!.isSelected === false) {
            message.info('暂无需要保存的数据')
            return
        }

        this.props.openAccountParamStore!.WaterUserNoRuleName = entity.WaterUserNoRule.RuleName
        this.props.openAccountParamStore!.CustomerNoRuleName = entity.CustomerNoRule.RuleName
        const checkRes = await this.props.openAccountParamStore!.Check(entity);
        if(checkRes.rtnCode===0){
            const res = await this.props.openAccountParamStore!.Update(entity);
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                return;
            }
            message.success("保存成功");
        }else{
            message.error(checkRes.rtnMsg);
        }
        
        this.props.openAccountParamStore!.isSelected = false
    }

}