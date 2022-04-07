import { message } from 'antd';
import { AntTreeNodeSelectedEvent } from 'antd/lib/tree';
import { action, observable, toJS } from "mobx";
import { IResponseJsonResult, OridStores, requestJson } from 'orid';
import { LadderInfo } from '../../../../common/entity/bdt/ladderInfo';
import { PriceLadderEntity } from '../entity';
import { PriceLadderUiStore } from '../uiStore';
// import { PriceLadderEntity } from '../entity';
import { IPriceLadderLayoutProps } from "./interface";

export class PriceLadderLayoutUiAction {

    @observable
    public TabsKey: string;

    private uiStore: PriceLadderUiStore;

    constructor(props: IPriceLadderLayoutProps) {
        this.uiStore = props.GlobalLadderPriceUiStore!;
        this.TabsKey = "1"
        this.ListOnSelect = this.ListOnSelect.bind(this);
        this.Save = this.Save.bind(this);
        this.tabsOnChange = this.tabsOnChange.bind(this);
        this.AddClick = this.AddClick.bind(this);
        this.SaveData = this.SaveData.bind(this);
        this.loadData();
    }
    /** 加载数据 */
    @action.bound
    public loadData() {
        this.getLadderInfo(OridStores.authStore.currentOperator.CpCode).then((res: IResponseJsonResult) => {
            if (res.rtnCode !== 0) {
                return;
            }
            this.uiStore.ladderInfoArray = res.data as LadderInfo[];

        })
    }

    /**
     *  列表选中事件
     * @param value 
     * @param title 
     */
    @action
    public ListOnSelect(selectedKeys: string[], e: AntTreeNodeSelectedEvent) {
        console.log('111', selectedKeys)
        if (e.selected) {
            const selectKeyArr = selectedKeys[0].split("+")
            const flag = selectKeyArr[2] === "false" ? false : selectKeyArr[2] === "true" ? true : selectKeyArr[2];
            console.log("flag", flag);
            this.uiStore.currentSelectWateKindId = selectKeyArr[2] ? selectKeyArr[2] : '';
            this.uiStore.CpCode = selectKeyArr[1]
            if (flag === true) {
                this.uiStore.CycleList = []
                this.uiStore.List = []
            } else if (flag === false) {
                this.uiStore.CycleList = []
                this.uiStore.List = []
            } else {
                this.GetListByWaterKindId(selectKeyArr[2], selectKeyArr[1]);
                this.uiStore.GetCycleListByWaterKindId(selectKeyArr[2], selectKeyArr[1]);
            }
        }

    }


    /**
     * 保存数据
     */
    public async Save() {

        const res = await this.SaveData();

        if (res.rtnCode === 0) {
            message.success("保存成功");
        } else if (res.rtnCode === -1) {
            message.error(res.rtnMsg);
        } else {
            message.error(res.rtnMsg);
        }


    }

    public tabsOnChange(activeKey: string) {
        this.TabsKey = activeKey
    }

    @action
    public AddClick() {
        this.uiStore.modelType = '新增'
        this.uiStore.ladderTypeModalVisible = true;
    }


    /**
     * 保存
     */
    public async SaveData(): Promise<IResponseJsonResult> {
        try {
            const removeMonitor = (toJS(this.uiStore.List)).map((entity: PriceLadderEntity) => {
                switch (entity.LadderLevel) {
                    case "1":
                        entity.MinQuantity = "first";
                        entity.MaxQuantity = "second";
                        break;
                    case "2":
                        entity.MinQuantity = "second";
                        entity.MaxQuantity = "second";
                        break;
                    case "3":
                        entity.MinQuantity = "second";
                        entity.MaxQuantity = "third";
                    default:
                        break;
                }
                return entity;
            });
            this.uiStore.Loading = true;

            const res = await requestJson("/api/bdt/LadderPrice/SaveLadderProductExe",
                {
                    body: JSON.stringify(removeMonitor),
                    method: "POST",
                    headers: { "content-type": "application/json" }
                }
            )

            if (res.rtnCode === 0) {

                if (this.uiStore.List.length > 0) {
                    this.uiStore.List.splice(0, this.uiStore.List.length);
                }

                const datas = (res.data as PriceLadderEntity[]).map((entity: PriceLadderEntity) => {
                    switch (entity.LadderLevel) {
                        case "1":
                            entity.MinQuantity = "0";
                            entity.MaxQuantity = "first";
                            break;
                        case "2":
                            entity.MinQuantity = "first";
                            entity.MaxQuantity = "second";
                            break;
                        case "3":
                            entity.MinQuantity = "second";
                            entity.MaxQuantity = "third";
                        default:
                            break;
                    }
                    return entity;
                });
                this.uiStore.List.push(...datas);

            }

            this.uiStore.Loading = false;

            return res;

        } catch (error) {
            console.log(error);
            return { rtnCode: 1, rtnMsg: error.toString() }
        }

    }

    /**
     * 根据用水性质ID获取数据
     * @param waterKindId 用水性质ID
     */
    public async GetListByWaterKindId(waterKindId: string, cpCode: string) {

        try {

            if (this.uiStore.List.length > 0) {
                this.uiStore.List.splice(0, this.uiStore.List.length);
            }

            this.uiStore.Loading = false;

            const res = await requestJson("/api/bdt/LadderPrice/GetListByWaterKindId?waterKindId=" + waterKindId + '&CpCode=' + cpCode,
                {
                    method: "GET"
                }
            )

            if (res.rtnCode === 0) {

                const data = (res.data as PriceLadderEntity[]).map((entity: PriceLadderEntity) => {
                    switch (entity.LadderLevel) {
                        case "1":
                            entity.MinQuantity = "0";
                            entity.MaxQuantity = "first";
                            break;
                        case "2":
                            entity.MinQuantity = "first";
                            entity.MaxQuantity = "second";
                            break;
                        case "3":
                            entity.MinQuantity = "second";
                            entity.MaxQuantity = "third";
                        default:
                            break;
                    }
                    return entity;
                });
                this.uiStore.List.push(...data);
            }

            this.uiStore.Loading = false;

        } catch (error) {
            console.error(error);
            this.uiStore.Loading = false;
        }


    }

    /** 获取ladderInfo */
    public async getLadderInfo(cpCode: string): Promise<IResponseJsonResult> {
        try {


            return await requestJson("/api/bdt/LadderInfo/List?cpCode=" + cpCode,
                {
                    method: "GET"
                }
            )



        } catch (error) {
            return { rtnCode: -1100, rtnMsg: error.toString() }
        }

    }

}