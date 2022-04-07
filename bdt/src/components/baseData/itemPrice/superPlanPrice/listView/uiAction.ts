import { message } from "antd";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { action } from "mobx";
import { requestJson } from "orid";
import { SuperPlanPrice } from "../entity";
import { SuperPlanPriceUiStore } from "../uiStore";
import { ISuperPlanPriceSuperPlanPriceListViewProps } from "./interface";



export class SuperPlanPriceListViewUiAction {


    private uiStore: SuperPlanPriceUiStore;

    private liTitle: string;

    private liValue: string;
    private CpCode: string

    constructor(props: ISuperPlanPriceSuperPlanPriceListViewProps) {
        this.uiStore = props.GlobalSuperPlanPriceUiStore!;
        this.CpCode = ''
        this.liTitle = "";
        this.liValue = "";
        this.AddRow = this.AddRow.bind(this);
        this.ListOnSelect = this.ListOnSelect.bind(this);
        this.Save = this.Save.bind(this);
        this.GetListByProductId = this.GetListByProductId.bind(this);
        this.SaveData = this.SaveData.bind(this);
    }

    /**
     * 新增
     */
    @action
    public AddRow() {

        if (this.liTitle === "" || this.liTitle.length === 0) {
            message.error("请选择用水性质");
            return;
        }

        const newModel = new SuperPlanPrice();

        const numList = new Array<number>();


        if (this.uiStore.List.length > 0) {
            this.uiStore.List.forEach((model) => {
                numList.push(model.AutoId);
            })
        } else {
            numList.push(100);
        }



        const value = Math.max(...numList);

        console.log(value, numList);

        newModel.AutoId = value + 1;
        newModel.WaterKindName = this.liTitle;
        newModel.ProductId = this.liValue;
        newModel.CpCode = this.CpCode;
        if (this.uiStore.List.length > 0) {
            if (Number(this.uiStore.List[this.uiStore.List.length - 1].IsDelete !== '1')) {
                newModel.MinQuantityPercent = Number(this.uiStore.List[this.uiStore.List.length - 1].MaxQuantityPercent);
            } else {
                newModel.MinQuantityPercent = 0;
            }
        } else {
            newModel.MinQuantityPercent = 0;
        }

        this.uiStore.List.push(newModel);

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
            const flag = selectKeyArr[2] === "false" ? false : selectKeyArr[2] === "true" ? true : selectKeyArr[2]
            if (flag === false) {
                this.liTitle = ''
                this.liValue = ''
                this.CpCode = ''
                this.uiStore.List = []
            } else if (flag === true) {
                this.liTitle = ''
                this.liValue = ''
                this.CpCode = ''
                this.uiStore.List = []
            } else {
                this.liTitle = selectKeyArr[3]
                this.liValue = selectKeyArr[2]
                this.CpCode = selectKeyArr[1]
                this.GetListByProductId(flag, selectKeyArr[1]);
            }
        }

    }
    // @action
    // public ListOnSelect(value:string,title:string){
    //     this.liTitle = title;
    //     this.liValue = value;
    //     this.uiStore.GetListByProductId(value);
    // }

    /**
     * 保存数据
     */
    public Save() {
        let flag = true;
        this.uiStore.List.map((model, i) => {
            if (i > 0) {
                if (model.IsDelete !== '1' && model.MinQuantityPercent !== Number(this.uiStore.List[i - 1].MaxQuantityPercent) && this.uiStore.List[i - 1].IsDelete === '0') {
                    flag = false;
                }
            } else {
                if (model.MinQuantityPercent !== 0 && model.IsDelete === '0') {
                    flag = false;
                }
            }
            if (i < this.uiStore.List.length - 1) {
                if (this.uiStore.List[i + 1].IsDelete !== '1') {
                    if (i !== this.uiStore.List.length - 1) {
                        if (model.MinQuantityPercent > Number(model.MaxQuantityPercent)) {
                            flag = false;
                        }
                    }
                }
            }
        });
        if (this.uiStore.List[this.uiStore.List.length - 1].MaxQuantityPercent !== "" && this.uiStore.List[this.uiStore.List.length - 1].IsDelete !== '1') {
            if (Number(this.uiStore.List[this.uiStore.List.length - 1].MaxQuantityPercent) < this.uiStore.List[this.uiStore.List.length - 1].MinQuantityPercent) {
                flag = false;
            }
        }
        const newlist = this.uiStore.List.filter(({ IsDelete }) => IsDelete === "0");
        console.log(newlist);
        if (newlist.length > 0) {
            if (newlist[newlist.length - 1].MaxQuantityPercent === "") {
                newlist[newlist.length - 1].MaxQuantityPercent = "99999.99999";
                this.uiStore.List.find(x => x.AutoId === newlist[newlist.length - 1].AutoId)!.MaxQuantityPercent = "99999.99999";
            }
            if (newlist[0].MinQuantityPercent !== 0) {
                message.error("第一行水量下限比例值必须为0");
                return;
            } else {
                if (this.uiStore.List.find(x => x.AutoId === newlist[0].AutoId)!.RowState !== 'Add') {
                    this.uiStore.List.find(x => x.AutoId === newlist[0].AutoId)!.RowState = "Modify";
                }
                this.uiStore.List.find(x => x.AutoId === newlist[0].AutoId)!.MinQuantityPercent = 0;
            }
            console.log(newlist);
            console.log(this.uiStore.List);
            if (Number(newlist[newlist.length - 1].MaxQuantityPercent) !== 99999.99999) {
                message.error("最后一行上限水量比例上限值必须为99999.99999");
                return;
            }
        }
        if (!flag) {
            message.error("水量比例设置错误");
            return;
        }
        this.SaveData(this.uiStore.List);



    }


    /**
     * 根据用水性质ID获取数据
     * @param waterKindId 用水性质ID
     */
    public async GetListByProductId(ProductId: string | boolean, cpCode: string) {

        try {

            if (this.uiStore.List.length > 0) {
                this.uiStore.List.splice(0, this.uiStore.List.length);
            }

            this.uiStore.Loading = false;

            const res = await requestJson("/api/bdt/SuperPlanPrice/List/" + ProductId + '?cpCode=' + cpCode,
                {
                    method: "GET"
                }
            )

            if (res.rtnCode === 0) {

                const data = res.data as SuperPlanPrice[];

                this.uiStore.List.push(...data);
            }

            this.uiStore.Loading = false;

        } catch (error) {
            console.error(error);
            this.uiStore.Loading = false;
        }


    }



    /**
     * 保存
     */
    public async SaveData(list: SuperPlanPrice[]) {

        try {
            console.log("集合" + JSON.stringify(list));
            this.uiStore.Loading = true;
            const res = await requestJson("/api/bdt/SuperPlanPrice/Save",
                {
                    body: JSON.stringify(list),
                    method: "POST",
                    headers: { "content-type": "application/json" }
                }
            )

            if (res.rtnCode === 0) {

                if (this.uiStore.List.length > 0) {
                    this.uiStore.List.splice(0, this.uiStore.List.length);
                }
                const datas = res.data as SuperPlanPrice[];
                console.log("保存之后data", datas)
                this.uiStore.List.push(...datas);

            }

            this.uiStore.Loading = false;
            if (res.rtnCode === 0) {
                message.success("保存成功");
            } else if (res.rtnCode === -1) {
                message.error(res.rtnMsg);
            } else {
                message.error(res.rtnMsg);
            }
            // return res;

        } catch (error) {
            console.log(error);
            message.error(error.toString());
        }

    }
}