import { action,observable } from "mobx";
import { PriceRepireDoMainStore } from "../domainStore";
import { PriceRepireMeter } from "../entity";

export class PriceRepireMeterViewUiAction{
    
    /**
     * 是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal:boolean = false;

    /**
     * 当前编辑或新增状态
     */
    public opearatorType:'none' | 'add' | 'edit';

    public domainStore:PriceRepireDoMainStore;

    constructor(domainStore:PriceRepireDoMainStore){
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
        this.domainStore.currentEditRow = new PriceRepireMeter();
        this.opearatorType = 'add';
    }

    /**
     * 点击编辑按钮的回调函数
     * @param priceRepireMeter 
     */
    @action
    public editClick(priceRepireMeter:PriceRepireMeter){
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
     * @param priceRepireMeter 当前待编辑的项目
     */
    @action
    public saveClick(priceRepireMeter:PriceRepireMeter){
        if(this.opearatorType === 'add'){
            this.domainStore.add(priceRepireMeter);

        }else if(this.opearatorType === "edit"){
            this.domainStore.update(priceRepireMeter);

        }
        this.isVisiableModal = false;
    }

}