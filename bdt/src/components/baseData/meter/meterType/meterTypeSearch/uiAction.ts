import { message } from "antd";
import { action } from "mobx";
import React from "react";
import { MeterTypeDomainStore } from "../domainStore";
import { MeterType } from "../entity";
import { IMeterTypeSearchViewProps } from "./interface";

export class MeterTypeSearchUiAction {
    public props: IMeterTypeSearchViewProps;
    /**
     * 创建id\名称属性，查询组件使用
     */
    public meterTypeId: string;
    public meterTypeName: string;
    public domainStore: MeterTypeDomainStore;
    /**
     * 构造
     * @param props 
     */
    constructor(props: IMeterTypeSearchViewProps) {
        this.meterTypeId = "";
        this.meterTypeName = "";
        this.backName = this.backName.bind(name);
        this.domainStore = new MeterTypeDomainStore();
        this.props = props;
    }



    /** 搜索框输入值改变事件 */
    @action
    public meterTypeInputOnChange = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
        if (type === "水表类型名称") {
            // this.props.GlobalMeterTypeStore!.InputValue = event.target.value;
            // console.log("水表类型名称的输入框的值：" + this.props.GlobalMeterTypeStore!.InputValue);
            // if (this.props.GlobalMeterTypeStore!.InputValue.length <= 0) {
            //     this.props.GlobalMeterTypeStore!.LoadingData();
            // }
            this.meterTypeName = event.target.value;
            console.log(this.meterTypeName)
            if (this.meterTypeName.trim().length <= 0) {
                this.props.loadingData();
                console.log("水表类型名称")
            }
        } else if (type === "编码") {
            // this.props.GlobalMeterTypeStore!.InputValue = event.target.value;
            // console.log("编码的输入框的值："+this.props.GlobalMeterTypeStore!.InputValue);
            this.meterTypeId = event.target.value;
            if (this.meterTypeId.trim().length <= 0) {
                this.props.loadingData();
            }
            console.log('编码')
            // if (this.props.GlobalMeterTypeStore!.InputValue.length <= 0) {
            //     this.props.GlobalMeterTypeStore!.LoadingData();
            // }
        }

    }
    /** 返回名称 */
    @action
    public backName = (type: any): any => {
        if (type === "水表类型") {
            return this.meterTypeName
        } else if (type === "编码") {
            return this.meterTypeId
        }
    }
    /** 搜索 */
    @action
    public meterTypeSearch = (value: any, type: any) => {
        console.log(value, type)
        if (type === "水表类型名称") {
            this.Search("MeterTypeName", value);
        } else if (type === "编码") {
            this.Search("MeterTypeId", value);
        }
    }

    /** 查询 */
    @action.bound
    public Search(dataType: string, datas: string) {
        const store = this.props.GlobalMeterTypeStore!;
        if (dataType === "") {
            return;
        }
        const param = {
            "Item1": dataType,
            "Item2": datas
        }
        if (dataType === "MeterTypeId" && datas.trim().length === 0) {
            message.error("请输入编码");
            store.IsLoading = false;
            return;
        } else if (dataType === "MeterTypeName" && datas.trim().length === 0) {
            message.error("请输入水表类型名称");
            store.IsLoading = false;
            return;
        }
        this.domainStore.search(param, store.CompanyName).then((res) => {
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                store.IsLoading = false;
                return;
            }
            const jsonData = res.data.model as MeterType[];
            this.searchRefreshUi(jsonData);
            store.IsLoading = false;
        })
    }

     /**
      * 查询后刷新UI
      */
      @action.bound
      public searchRefreshUi(jsonData: MeterType[]) {
          const store = this.props.GlobalMeterTypeStore!;
          const jsonList = jsonData as MeterType[];
          store.searchList.splice(0, store.MeterTypeUiList.length);
          store.MeterTypeUiList.splice(0, store.MeterTypeUiList.length);
          const data = store.recursion(jsonList);
          store.searchList.push(...jsonList);
          store.MeterTypeUiList.push(...data);
      }

}