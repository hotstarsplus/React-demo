import { observable } from "mobx";
import { SuperPlanPrice, SuperPlanPriceBase } from "./entity";





export class SuperPlanPriceUiStore{

    /**
     * 超计划水价集合
     */
    @observable
    public List:SuperPlanPrice[];

    /**
     * 是否正在加载
     */
    @observable
    public Loading:boolean;

    /**
     * 用水性质列表
     */
    @observable
    public WaterKindList:SuperPlanPriceBase[];
    @observable
    public defaultKey:any[]=[]
    /** 区分树节点的拼接key */
    @observable
    public TreeKey:number=0


    constructor(){
        this.Loading = false;
        this.List = new Array<SuperPlanPrice>();
        this.WaterKindList = new Array<SuperPlanPriceBase>();
    }
    





}