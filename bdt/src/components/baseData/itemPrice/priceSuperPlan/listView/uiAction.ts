import { action,observable } from "mobx";
import { PriceSuperPlanDoMainStore } from "../domainStore";
import { PriceSuperPlan } from "../entity";

export class PriceSuperPlanViewUiAction{
    
    /**
     * 是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal:boolean = false;

    
    /**
     * 当前编辑或新增状态
     */
    public opearatorType:'none' | 'add' | 'edit';

    public domainStore:PriceSuperPlanDoMainStore;

    constructor(domainStore:PriceSuperPlanDoMainStore){
        this.domainStore = domainStore;

        this.addClick = this.addClick.bind(this);
        this.editClick = this.editClick.bind(this);
        this.cancleAddOrEdit = this.cancleAddOrEdit.bind(this);
        this.saveClick = this.saveClick.bind(this);
    }

    /**
     * 点击新建按钮的回调函数
     */
    @action
    public addClick(){
        this.isVisiableModal = true;
        this.domainStore.currentEditRow = new PriceSuperPlan();
        this.domainStore.currentEditRow.WaterRateItem = "超计划";
        this.domainStore.currentEditRow.waterKind="生活用水1";
        this.opearatorType = 'add';
    }

    /**
     * 点击编辑按钮的回调函数
     * @param priceSuperPlan 
     */
    @action
    public editClick(priceSuperPlan:PriceSuperPlan){
        this.isVisiableModal = true;
        this.opearatorType = 'edit';
    }

    /**
     * 点击取消按钮
     */
    @action
    public cancleAddOrEdit(){
        this.isVisiableModal = false;
    }

    /**
     * 保存
     * @param priceSuperPlan 当前待编辑的项目
     */
    @action
    public saveClick(priceSuperPlan:PriceSuperPlan){
        if(this.opearatorType === 'add'){
            this.domainStore.add(priceSuperPlan);

        }else if(this.opearatorType === "edit"){
            this.domainStore.update(priceSuperPlan);

        }
        this.isVisiableModal = false;
    }

}