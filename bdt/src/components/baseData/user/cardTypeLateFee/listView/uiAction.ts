import { action,observable } from "mobx";
import { CardTypeLateFeeDoMainStore } from "../domainStore";
import { CardTypeLateFee } from "../entity";

export class CardTypeLateFeeViewUiAction{
    
    /**
     * 是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal:boolean = false;
    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle :string ="";


    /**
     * 当前编辑或新增状态
     */
    public opearatorType:'none' | 'add' | 'edit';

    public domainStore:CardTypeLateFeeDoMainStore;

    constructor(domainStore:CardTypeLateFeeDoMainStore){
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
        this.modaltitle = "新增用户类型违约金";
        this.isVisiableModal = true;
        this.domainStore.currentEditRow = new CardTypeLateFee();
        this.opearatorType = 'add';
    }

    /**
     * 点击编辑按钮的回调函数
     * @param cardTypeLateFee 
     */
    @action
    public editClick(cardTypeLateFee:CardTypeLateFee){
        this.modaltitle = "编辑用户类型违约金";
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
     * @param cardTypeLateFee 当前待编辑的项目
     */
    @action
    public saveClick(cardTypeLateFee:CardTypeLateFee){
        if(this.opearatorType === 'add'){
            this.domainStore.add(cardTypeLateFee);

        }else if(this.opearatorType === "edit"){
            this.domainStore.update(cardTypeLateFee);

        }
        this.isVisiableModal = false;
    }

}