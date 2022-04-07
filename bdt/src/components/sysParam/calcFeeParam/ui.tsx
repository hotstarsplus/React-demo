import { Button, Card, Checkbox, Col, message, Radio } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { RadioChangeEvent } from "antd/lib/radio";
import { action, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { FlexAlign } from "orid";
import React from "react";
import { SysParameter } from "../entity/sysParameter";
import { ICalcFeeParamProps } from "./interface";
import './ui.scss'

@inject("sysParamStore")
@observer
export class CalcFeeParam extends React.Component<ICalcFeeParamProps>{

    public render() {
        const value = this.props.sysParamStore!.sysParams.find(x => x.Define === "CalcQuantityType");
        const value1=this.props.sysParamStore!.sysParams.find(x => x.Define === "isCalcSurPerPlan");
        const value2=this.props.sysParamStore!.sysParams.find(x => x.Define === "isCalcLadderForFirst");
        console.log(this.props.sysParamStore!.sysParams.find(x => x.Define === "isCalcLadderForFirst"))
        return (
            <React.Fragment>
                <Button onClick={this.handleSaveData} style={{marginLeft:'16px'}}>保存</Button>
                <div className="calc-fee-param-box">
                    <Col span={6} style={{ marginLeft: "16px", width: '495px'}}>
                        <Card title={"固定水量计算方式"}>
                            <Radio.Group onChange={this.handleChangeRadio} value={ (value? value.Value : "2") || "2"}>
                                <Radio value={"1"}>按固定水量计算</Radio>
                                <Radio value={"2"}>按实际水量计算</Radio>
                            </Radio.Group>
                        </Card>
                    </Col>

                    <Col span={6} style={{ marginLeft: "16px", width: '495px'}}>
                        <Card title={"计费方式设置"}>
                            <FlexAlign>
                                <div style={{display:'flex',flexDirection:'column'}}>
                                        <Checkbox defaultChecked={value1 ? value1.Value === "1" : false}
                                            onChange={this.handleChangeCheckbox}>
                                            第一次抄表用户不计算超计划
                                        </Checkbox>
                                        <Checkbox defaultChecked={value2 ? value2.Value === "1" : false}
                                            onChange={this.CalcLadderCheckbox}>
                                            第一次抄表用户不计算阶梯
                                        </Checkbox>
                                </div>
                            </FlexAlign>
                        </Card>
                    </Col>
                </div>
            </React.Fragment>
        )
    }
    
    @action.bound
    private handleSaveData(){
        const value = this.props.sysParamStore!.sysParams.find(x => x.Define === "CalcQuantityType");
        const value1=this.props.sysParamStore!.sysParams.find(x => x.Define === "isCalcSurPerPlan");
        const value2=this.props.sysParamStore!.sysParams.find(x => x.Define === "isCalcLadderForFirst");
        console.log("value",toJS(value))
        // 校验与源数据对比，判断数据是否修改
        if(this.changeCheck(value,value1,value2)){
            message.info("暂无需要保存的数据！"); 
            return;
        }
        this.props.sysParamStore!.SaveCalcFeeParam(value!.Value,value1!.Value,value2!.Value).then((isSaveSucceed:boolean)=>{ // isSaveSucceed:是否保存成功
            if(isSaveSucceed){    
                this.changeDataSource(value,value1,value2);
            }
        });
    }

    /**
     * 校验是否更改
     * @param CalcQuantityType 计费参数
     * 说明：有更改返回true,没有更改返回false
     */
    @action.bound
    private changeCheck(CalcQuantityType: SysParameter|undefined,isCalcSurPerPlan: SysParameter|undefined,isCalcLadderForFirst: SysParameter|undefined):boolean{
        const dataSource = this.props.sysParamStore!.sysParamsSource.find(x => x.Define === "CalcQuantityType")===undefined?new SysParameter():this.props.sysParamStore!.sysParamsSource.find(x => x.Define === "CalcQuantityType");
        const dataSource1 = this.props.sysParamStore!.sysParamsSource.find(x => x.Define === "isCalcSurPerPlan")===undefined?new SysParameter():this.props.sysParamStore!.sysParamsSource.find(x => x.Define === "isCalcSurPerPlan");
        const dataSource2 = this.props.sysParamStore!.sysParamsSource.find(x => x.Define === "isCalcLadderForFirst")===undefined?new SysParameter():this.props.sysParamStore!.sysParamsSource.find(x => x.Define === "isCalcLadderForFirst");
        if(CalcQuantityType!.Value!==dataSource!.Value||isCalcSurPerPlan!.Value!==dataSource1!.Value||isCalcLadderForFirst!.Value!==dataSource2!.Value){
            return false;
        }else{
            return true;
        }
    }

    /**
     * 保存后更新计费参数数据源
     * @param CalcQuantityType 计费参数
     */
    @action.bound
    private changeDataSource(CalcQuantityType: SysParameter|undefined,isCalcSurPerPlan: SysParameter|undefined,isCalcLadderForFirst:SysParameter|undefined){
        const dataSource = this.props.sysParamStore!.sysParamsSource.find(x => x.Define === "CalcQuantityType");
        dataSource!.Value =  CalcQuantityType!.Value;
        const dataSource1 = this.props.sysParamStore!.sysParamsSource.find(x => x.Define === "isCalcSurPerPlan");
        dataSource1!.Value =  isCalcSurPerPlan!.Value;
        const dataSource2 = this.props.sysParamStore!.sysParamsSource.find(x => x.Define === "isCalcLadderForFirst");
        dataSource2!.Value =  isCalcLadderForFirst!.Value;
    }


    @action.bound
    private handleChangeRadio(event: RadioChangeEvent){
        this.props.sysParamStore!.sysParams.forEach(( model ) => {
            try{
                if ( model && model.Define === "CalcQuantityType" ) {
                    model.Value = event.target.value
                }
            }catch(error) {
                console.error(error)
            }
        });

        if ( this.props.sysParamStore!.sysParams.filter(( model ) => model.Define === "CalcQuantityType").length === 0 ) {
            this.props.sysParamStore!.sysParams.push({
                Define: "CalcQuantityType",
                Value: event.target.value,
                CpCode: "",
                Description: ""
            })
        }
    }   

    @action.bound
    private handleChangeCheckbox(event: CheckboxChangeEvent){
        this.props.sysParamStore!.sysParams.forEach(( model ) => {
            try{
                if ( model && model.Define === "isCalcSurPerPlan" ) {
                    model.Value = event.target.checked ? "1" : "0"
                }
            }catch(error) {
                console.error(error)
            }
        });

        if ( this.props.sysParamStore!.sysParams.filter(( model ) => model.Define === "isCalcSurPerPlan").length === 0 ) {
            this.props.sysParamStore!.sysParams.push({
                Define: "isCalcSurPerPlan",
                Value: event.target.checked ? "1" : "0",
                CpCode: "",
                Description: ""
            })
        }
    }   

    @action.bound
    private CalcLadderCheckbox(event: CheckboxChangeEvent){
        this.props.sysParamStore!.sysParams.forEach(( model ) => {
            try{
                if ( model && model.Define === "isCalcLadderForFirst" ) {
                    model.Value = event.target.checked ? "1" : "0"
                }
            }catch(error) {
                console.error(error)
            }
        });

        if ( this.props.sysParamStore!.sysParams.filter(( model ) => model.Define === "isCalcLadderForFirst").length === 0 ) {
            this.props.sysParamStore!.sysParams.push({
                Define: "isCalcLadderForFirst",
                Value: event.target.checked ? "1" : "0",
                CpCode: "",
                Description: ""
            })
        }
    }   
}