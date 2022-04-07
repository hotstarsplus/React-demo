import { message } from 'antd';
import { action, observable } from 'mobx';
import {WaterFeeItemDomainStore} from '../domainStore';
import { WaterFeeItem } from '../entity';

/**
 * 水费项目列表视图action
 */
export class WaterFeeItemViewUiAction {

    /**
     * 是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle :string ="";

    /**
     * 当前编辑或新增状态
     */
    public opearatorType: 'none' | 'add' | 'edit';


    /**
     * 领域action
     */
    private domainStore: WaterFeeItemDomainStore;
    
    /**
     * 
     * @param domainStore 领域Store
     */
    constructor(domainStore:WaterFeeItemDomainStore) {
        this.domainStore = domainStore;

        this.addClick = this.addClick.bind(this);
        this.cancelAddOrEdit = this.cancelAddOrEdit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
    }



    /**
     * 点击新增按钮的回调方法
     */
    @action
    public addClick() {
        // 重置当前编辑项目
        this.modaltitle = "新增水费项目"
        this.isVisiableModal = true;    
        this.domainStore.currentEditItem=new WaterFeeItem();
        this.opearatorType = 'add';
    }

    /**
     * 点击编辑按钮的回调方法
     * @param item 
     */
    @action
    public onEditClick(item:WaterFeeItem) {
        this.modaltitle = "编辑水费项目"
        this.isVisiableModal = true;
        this.opearatorType = 'edit';
    }

    /**
     * 取消新增或编辑
     */
    @action
    public cancelAddOrEdit() {
        this.isVisiableModal = false;
    };



    /**
     * 保存
     * @param {WaterRateItemType} item 当前待编辑的项目
     */
    @action
    public async saveClick(item: WaterFeeItem) {
        if (this.opearatorType === 'add') {
           const res = await this.domainStore.add(item);
           if (res.rtnCode===0) {
               message.success("新增成功");
               this.isVisiableModal = false;
           }else{
               message.error(res.rtnMsg);
           }
        }
        else if (this.opearatorType === 'edit') {
            const res = await  this.domainStore.update(item);
            if (res.rtnCode===0) {
                message.success("更新成功");
                this.isVisiableModal = false;
            }else{
                message.error(res.rtnMsg);
            }
        }
       

    }


}