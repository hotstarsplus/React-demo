import { action,observable } from "mobx";
import { PriceFixDoMainStore } from "../domainStore";
import { PriceFix } from "../entity";

export class PriceFixViewUiAction{
    
    /**
     * 是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal:boolean = false;

    /**
     * 当前编辑或新增状态
     */
    public opearatorType:'none' | 'add' | 'edit';

    public domainStore:PriceFixDoMainStore;

    constructor(domainStore:PriceFixDoMainStore){
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
        this.domainStore.currentEditRow = new PriceFix();
        this.opearatorType = 'add';
    }

    /**
     * 点击编辑按钮的回调函数
     * @param priceFix 
     */
    @action
    public editClick(priceFix:PriceFix){
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
     * @param priceFix 当前待编辑的项目
     */
    @action
    public saveClick(priceFix:PriceFix){
        if(this.opearatorType === 'add'){
            this.domainStore.add(priceFix);

        }else if(this.opearatorType === "edit"){
            this.domainStore.update(priceFix);

        }
        this.isVisiableModal = false;
    }

}