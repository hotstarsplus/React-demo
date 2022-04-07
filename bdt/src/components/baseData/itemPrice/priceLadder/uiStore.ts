import { observable } from "mobx";
import { requestJson } from "orid";
import { LadderInfo } from "../../../common/entity/bdt/ladderInfo";
import { LadderCycleEntity, PriceLadderEntity, PriceLadderWaterKind } from "./entity";

export class PriceLadderUiStore {
    @observable
    public ladderInfoArray: LadderInfo[];
    @observable
    public WaterKindList: PriceLadderWaterKind[];

    public productList: any[] = [];

    /**
     * 超计划水价集合
     */
    @observable
    public List: PriceLadderEntity[];

    /**
     * 阶梯周期集合
     */
    @observable
    public CycleList: LadderCycleEntity[];

    @observable
    public currentLadderTypeEntity: LadderCycleEntity;

    @observable
    public ladderTypeModalVisible: boolean;


    @observable
    public CpCode: string = ''

    @observable
    public modelType: string = '新增'


    public currentSelectWateKindId: string = ''


    /**
     * 是否正在加载
     */
    @observable
    public Loading: boolean;
    @observable
    public defaultKey: any[] = []




    constructor() {
        this.WaterKindList = new Array<PriceLadderWaterKind>();
        this.List = new Array<PriceLadderEntity>();
        this.CycleList = new Array<LadderCycleEntity>();
        this.Loading = false;
        this.ladderTypeModalVisible = false;
        this.ladderInfoArray = new Array<LadderInfo>();
        this.currentLadderTypeEntity = new LadderCycleEntity();

    }



    /**
     * 根据用水性质ID获取阶梯周期数据
     * @param waterKindId 用水性质ID
     */
    public async GetCycleListByWaterKindId(waterKindId: string, cpCode: string) {

        try {



            this.Loading = false;

            const res = await requestJson("/api/bdt/LadderPrice/GetLadderTypeByWaterKindId?waterKindId=" + waterKindId + '&CpCode=' + cpCode,
                {
                    method: "GET"
                }
            )

            if (res.rtnCode === 0) {

                const data = res.data as LadderCycleEntity;

                if (this.CycleList.length > 0) {
                    this.CycleList.splice(0, this.CycleList.length);
                }

                if (!data) {
                    return;
                }
                this.productList.map((item)=>{
                    if(item.ProductKindId===data.WaterKindId){
                        data.WaterKindName=item.ProductKindName
                    }
                })
                this.CycleList.push(data);
            }

            this.Loading = false;

        } catch (error) {
            console.error(error);
            this.Loading = false;
        }


    }





}