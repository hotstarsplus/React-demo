import { message } from "antd";
import { ColumnProps } from "antd/lib/table";
import { action, observable } from "mobx";
import { exportExcel, requestJson } from "orid";
import { IChargeHallDrawerProps } from "./interface";

/** 所有的page */
export declare type pageList = "抄表记录" | "费用账单" | "交易记录" | "拆换记录" | "特殊处理" | "用户信息变更"

/**
 * @author zyl 2020-12-01
 * @description 用户看板 uiAction
 */
export class IChargeHallDrawerUiAction{
    /** 当前page页 */
    @observable public currentPage: pageList;
    /** props */
    @observable public props: IChargeHallDrawerProps;
    /** 保存所有查询配置 */
    private searchCondition: object;
    /** 代理对象 查询对象 */
    private proxySearchObj: object;
    /** 保存临时数据配置 */
    private tempDataCondition: object;
    /** 代理对象 临时数据存储对象 */
    private proxyTempObj: object;
    constructor(props: IChargeHallDrawerProps) {
        this.props = props;
        this.searchCondition = {"抄表记录":{},"费用账单":{},"交易记录":{},"拆换记录":{},"特殊处理":{},"用户信息变更":{}};
        this.tempDataCondition = {...this.searchCondition };
        this.currentPage = "抄表记录";
    }

    @action.bound
    public selectColumns<T extends object>(columns: T) {
        const proxy = this.getProxy(this.currentPage,"values");
        proxy["columns"] = columns;
        this.searchDetail(proxy);
    } 

    /**
     * 返回查询池代理数据
     * @param condition 页面ID
     * @description 将初始化数据放进获取时进行 优化页面初始化性能
     */
    @action.bound
    public getProxy(condition: pageList,type: "search" | "values"): object {
        const t = this;
        let s = (type === "search" ? this.proxySearchObj : this.proxyTempObj);
        s = new Proxy(
            type === "search" ? this.searchCondition[condition] : this.tempDataCondition[condition],
            {
                get: (target,key,receiver)=>{
                    if((target[key] === undefined)){ 
                        if ( key !== "pagition") {
                            target[key] = undefined;
                        }else {
                            target[key] = { 
                                bottom: t.getCondition().getPagition(condition),
                                onChange: t.paginationChange,
                                onShowSizeChange: t.paginationShowSizeChange,
                                pageCount: 0,pageIndex: 1,pageSize: 20,
                            };
                        }
                    };
                    return target[key];
                },
                set:(target, p, value, receiver)=>{
                    target[p] = value;
                    return true;
                },
            }
        )
        return s;
    }

    /**
     * 受控的Tabs
     * @param activeKey 更新PageID
     */
    @action.bound
    public handleSelectPage(activeKey: string) {
        try{
            this.currentPage = activeKey as pageList;
        }catch( error ) {
            console.log(error);
        }
    }

    /**
     * 导出当前tab table数据
     * @param headers 表格列集合
     * @param data 表格数据源集合
     * @param fileName 文件名
     */
    @action.bound
    public exportExcel(headers: Array<ColumnProps<any>>, data: any[], fileName: string = this.currentPage + ".xlsx") {
        const columns = [ ...headers ].filter(( model ) => model );
        exportExcel(columns, data, fileName);
    }

    /**
     * 查询数据
     */
    @action.bound
    public async handleSearch() {
        const pageName: pageList = this.currentPage;
        const proxy = this.getProxy(this.currentPage,"values");
        const condition = {};
        if ( Object.keys(proxy).includes("pagition") ) {
            condition['pageIndex'] = proxy["pagition"].pageIndex;
            condition['pageSize'] = proxy["pagition"].pageSize;
        }
        Object.keys(proxy).map(( model ) => {
            if ( model !== "pagition" ) {
                condition[model] = proxy[model];
            }
        })
        const res = await requestJson(this.getCondition().getUrl(pageName),{
            body: JSON.stringify(condition),
            method: "POST",
        });
        ( res.rtnCode === 0 ) ? (
            proxy["values"] = [...res.data]
        ) : (
            message.info(res.rtnMsg)
        )
    }

    /** 
     * 查询表格数据明细 
     * @param { object } obj 查询数据的对象实体
     */
    private async searchDetail(obj: object,currentPage: pageList = this.currentPage) {
        const res = await requestJson( this.getCondition().getDetail(currentPage));
        ( res.rtnCode === 0 ) ? (
            obj["details"] = [...res.data]
        ) : (
            message.info(res.rtnMsg)
        )
    }   

    @action.bound
    private paginationChange(page: number, pageSize?: number) {
        this.getProxy(this.currentPage,"search")["pagition"].pageIndex = page;
        this.handleSearch();
    }

    @action.bound
    private paginationShowSizeChange(startIndex: number, size: number) {
        const proxy = this.getProxy(this.currentPage,"search")["pagition"];
        proxy.pageSize = size;
        proxy.pageIndex = 1;
        this.handleSearch();
    }

    /**
     * 单一原则 组件配置存储
     */
    @action.bound
    private getCondition() {
        return {
            /** 明细所对应的接口 */
            getDetail: (pageName: pageList) => {
                switch(pageName){
                    case "费用账单": return "/api"; 
                    case "交易记录": return "/api"; 
                    case "拆换记录": return "/api"; 
                    default: return "";
                }
            },          
            /** 分页是否需要存储在最下层 配置 */  
            getPagition: (pageName: pageList) => {
                switch(pageName){
                    case "抄表记录": return true; 
                    case "费用账单": return false; 
                    case "交易记录": return false; 
                    case "拆换记录": return false; 
                    case "特殊处理": return false; 
                    case "用户信息变更": return true;
                }
            },
            /** 主数据所对应的接口 */
            getUrl: (pageName: pageList) => {
                switch(pageName){
                    case "抄表记录": return "/api"; 
                    case "费用账单": return "/api"; 
                    case "交易记录": return "/api"; 
                    case "拆换记录": return "/api"; 
                    case "特殊处理": return "/api"; 
                    case "用户信息变更": return "/api";
                }
            },
        }
    }
}