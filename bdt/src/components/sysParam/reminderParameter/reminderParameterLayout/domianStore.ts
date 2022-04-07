import { message } from 'antd';
import {
    action, observable,
    //  action 
} from "mobx";
import { requestJson } from "orid";
import { AlertMessageType, CardData, CpMenu, MenuAlertMessageSearchDto, MenuAlertMessageUpdateIsEnable } from "./entity";
// import { IResponseJsonResult, requestJson } from "orid";

export class ReminderParameterDomainStore {

    /**
     * 页面渲染数据
     */
    @observable
    public dataList: CardData[];

    /**
     * 更新数据
     */
    @observable
    public updateData: MenuAlertMessageSearchDto[];

    /**
     * 判断单选框是否变化
     */
    @observable
    public isPageContentChange: boolean;
    /**
     * 菜单&菜单名&实体类集合
     */
    @observable
    public list: MenuAlertMessageSearchDto[];

    /**
     * 点击显示水费业务卡片
     */
    @observable
    public isTollBusinessCard: boolean;

    /**
     * 当前编辑的项目
     */
    @observable
    public currentEditItem: MenuAlertMessageSearchDto;

    /**
     * 是否正在加载
     */
    @observable
    public isLoading: boolean = false;
    @observable
    public lists: any[] = [];

    /**
     * 当前业务Id
     */
    @observable
    public NowBusinessTypeId: string;

    /**
     * 菜单集合
     */
    @observable
    public CpMenuList: CpMenu[];

    /**
     * 提醒参数类型集合
     */
    @observable
    public alertMessageTypeList: AlertMessageType[];
    /** 接口默认的多选框选中项 */
    @observable
    public checkDefaultValue: any[] = [];

    /**
     * 更新参数类型集合
     */
    @observable
    public MenuAlertMessageUpdateIsEnableList: MenuAlertMessageUpdateIsEnable[]


    constructor() {
        this.dataList = [];
        this.updateData = []
        this.isPageContentChange = false;
        this.isTollBusinessCard = true;
        this.isLoading = false;
        this.NowBusinessTypeId = "";
        this.list = Array<MenuAlertMessageSearchDto>()
        this.currentEditItem = new MenuAlertMessageSearchDto();
        this.CpMenuList = new Array<CpMenu>();
        this.alertMessageTypeList = new Array<AlertMessageType>();
    }
    /**
     * 加载数据
     */
    public async loadData() {
        try {
            if (!this.isLoading) {
                this.isLoading = true;
            }
            this.list = new Array<MenuAlertMessageSearchDto>();
            const res = await requestJson(
                "/api/bdt/SysParameter/Get/Warn/Relevance/Business/List?businessModuleId=" + this.NowBusinessTypeId
                , { method: "GET" }

            );
            if (res.rtnCode === 0) {
                const datas = res.data as MenuAlertMessageSearchDto[];
                this.dataList = this.processDataList(datas);
                this.isLoading = false;
                this.list.push(...datas)
                return;
            } else {
                this.isLoading = false;
            }
        } catch (error) {
            this.isLoading = false;
        }
    }
    public async loadDatas() {
        const that = this
        this.checkDefaultValue = []
        try {
            if (!this.isLoading) {
                this.isLoading = true;
            }
            this.lists = new Array<MenuAlertMessageSearchDto>();
            const res = await requestJson(
                "/api/bdt/SysParameter/Get/Warn/Relevance/Business/List?businessModuleId=" + this.NowBusinessTypeId
                , { method: "GET" }

            );
            if (res.rtnCode === 0) {
                const datas = res.data as MenuAlertMessageSearchDto[];
                this.dataList = this.processDataList(datas);
                this.isLoading = false;
                this.lists.push(...datas)
                getCheckValue(datas, that)
                return;
            } else {
                this.isLoading = false;
            }
        } catch (error) {
            this.isLoading = false;
        }
        function getCheckValue(list: any, thats: any) {
            list.map((element: any) => {
                if (String(element.IsEnable) === '1') {
                    const array = new MenuAlertMessageUpdateIsEnable();
                    array.MessageTypeId = element.MenuAlertMessageId
                    array.IsEnable = element.IsEnable
                    thats.checkDefaultValue.push(array)
                }
                if (element.MenuAlertMessages) {
                    getCheckValue(element.MenuAlertMessages, thats)
                }
            })
        }

    }


    /**
     * 验证数据
     * @param value 
     */
    public validate(value: MenuAlertMessageSearchDto): string | undefined {
        return undefined;
    }
    /**
     * 更新
     */
    @action
    public async Update() {
        try {
            const res = await requestJson(
                "/api/bdt/SysParameter/Update/Warn/Status", {
                method: "POST",
                body: JSON.stringify(this.updateData),
                headers: { "content-type": "application/json" }
            });
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                return;
            } else {
                this.isLoading = false;
                message.success("更新成功")
                this.updateData = [];
                this.loadData();
            }
        } catch (error) {
            console.log("更新提醒参数失败：" + error)
        }
    }

    /**
     * 添加
     */
    @action
    public async Add(item: MenuAlertMessageSearchDto) {
        const data = new MenuAlertMessageSearchDto()
        data.BusinessID = item.BusinessID;
        data.BusinessModuleID = this.NowBusinessTypeId;
        console.log(data)
        // item.CpCode=OridStores.authStore.currentOperator.CpCode
        try {
            // item.BusinessTypeId=parseInt(this.NowBusinessTypeId,undefined);
            const res: any = await requestJson("/api/bdt/SysParameter/Save/Warn/Relevance",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "content-type": "application/json"
                    }
                });
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg)
                this.isLoading = false;
                return;
            } else {
                this.list.slice(0, this.list.length);
                this.isLoading = false;
                this.loadData();
                message.success("保存成功")
            }
            this.isLoading = false;

        } catch (error) {
            this.isLoading = false;
        }
    }
    /**
     * 选择菜单
     */
    public async loadCpMenu() {
        const res = await requestJson("/api/bdt/SysParameter/Get/Warn/Business/List?", { method: "GET" })
        if (res.rtnCode !== 0) {
            return;
        }

        const data = res.data as CpMenu[];
        this.CpMenuList = data;
    }

    /**
     * 选择提醒参数
     */
    public async loadAlertMessageType() {
        const res = await requestJson("/api/bdt/AlertMessageType/GetList", { method: "GET" })
        if (res.rtnCode !== 0) {
            message.error(res.rtnMsg);
            return;
        }

        const data = res.data as AlertMessageType[];
        this.alertMessageTypeList = data;
    }

    public processDataList = (resData: MenuAlertMessageSearchDto[]): CardData[] => {
        const businessIds: string[] = [];
        const result: CardData[] = [];

        try {

            resData.map((item: MenuAlertMessageSearchDto) => {
                const id = item.BusinessID;
                let canAdd: boolean = true;
                businessIds.map((items: string) => {
                    if (items === id) {
                        canAdd = false;
                    }
                })
                if (canAdd) {
                    businessIds.push(id)
                }
            })

            businessIds.map((item: string) => {
                const resultData: CardData = new CardData();
                resultData.AlertMessage = [];
                resData.map((res: MenuAlertMessageSearchDto) => {
                    if (res.BusinessID === item) {
                        resultData.BusinessID = res.BusinessID;
                        resultData.BusinessName = res.BusinessName;
                        resultData.AlertMessage.push({
                            IsEnable: res.IsEnable,
                            MessageTypeId: res.MessageTypeId,
                            MessageTypeValue: res.MessageTypeValue
                        });
                    }
                })
                result.push(resultData)
            })

        } catch (e) {
            console.log(e)
        }


        return result
    }

}