import { message } from 'antd';
// import { AntTreeNodeSelectedEvent } from 'antd/lib/tree';
import { action, observable } from 'mobx';
import { ProductItemDomainStore } from '../domainStore';
import { ProductItem } from '../entity';
import { ProductItemUiStore } from '../uiStore';
import { IProductItemViewProps } from './interface';

/**
 * 水费项目列表视图action
 */
export class ProductItemViewUiAction {

    /**
     * 是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle: string = "";

    /**
     * 当前编辑或新增状态
     */
    public opearatorType: 'none' | 'add' | 'edit';

    @observable
    public selectId: number;

    @observable
    public selectKeys: string[];

    public domainStore = new ProductItemDomainStore();

    public uiStore: ProductItemUiStore;



    constructor(props: IProductItemViewProps) {
        this.uiStore = props.GlobalProductItemStore!;
        this.selectKeys = new Array<string>();
        this.addClick = this.addClick.bind(this);
        this.cancelAddOrEdit = this.cancelAddOrEdit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.TreeOnSelect = this.TreeOnSelect.bind(this);
        this.selectId = 0;
    }



    /**
     * 点击新增按钮的回调方法
     */
    @action
    public addClick() {
        // const model = this.props.GlobalBusinesstypeStore!.BusinessTypeList.find(x=>x.BusinessTypeId===this.selectId);

        if (this.selectId === 0) {
            message.error("请先选中业务类型");
            return;
        }
        this.modaltitle = "新增产品项目";
        // 重置当前编辑项目
        this.isVisiableModal = true;
        this.uiStore.currentEditItem = new ProductItem();
        this.opearatorType = 'add';
        this.uiStore.currentEditItem.BusinessTypeId = this.selectId;
    }

    /**
     * 点击编辑按钮的回调方法
     * @param item 
     */
    @action
    public onEditClick(id: string) {
        this.modaltitle = "编辑产品项目"
        this.selectItem(id)
        this.isVisiableModal = true;
        this.opearatorType = 'edit';
        this.uiStore.currentEditItem.BusinessTypeId = this.selectId;
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
    public async saveClick(item: ProductItem) {
        item.BusinessTypeId = this.selectId;
        if (this.opearatorType === 'add') {
            item.CpCode = this.uiStore.CompanyCpCode


            if (!this.uiStore.isLoading) {
                this.uiStore.isLoading = true;
            }

            const res = await this.domainStore.add(item);
            if (res.rtnCode !== 0) {
                message.info(res.rtnMsg);
                this.uiStore.isLoading = false;
                return
            }
            message.success("新增成功");
            item.ProductItemId = res.data!.toString();
            this.uiStore.list.push(item);
            this.uiStore.isLoading = false;
            this.isVisiableModal = false;
        }
        else if (this.opearatorType === 'edit') {
            item.CpCode = this.uiStore.CompanyCpCode
            const index = this.getIndex(item.ProductItemId);
            if (index < 0) {
                message.info('水费项目不在表格内')
                return;
            }
            if (!this.uiStore.isLoading) {
                this.uiStore.isLoading = true;
            }
            if (item.ProductItemName === this.uiStore.currentEditItem.ProductItemName) {
                this.uiStore.isLoading = false;
                return;
            }
            const res = await this.update(item);
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                this.uiStore.isLoading = false;
                return
            }
            message.success("更新成功");
            this.isVisiableModal = false;
            this.uiStore.list[index] = item;
            this.uiStore.isLoading = false;
        }


    }

    /**
     * 树节点选中事件
     * @param selectedKeys 
     * @param e 
     */
    @action
    public TreeOnSelect(selectedKeys: string[], e: any) {

        // getCaption(JSON.stringify(selectedKeys[0]),0)
        console.log('selected', selectedKeys)
        this.selectKeys = selectedKeys;
        if (e.selected) {

            // this.props.GlobalBusinesstypeStore!.BusinessTypeList.map((element:any)=>{
            //     if(Number(element.BusinessTypeId)===Number(selectedKeys[0])){
            //        this.uiStore.CompanyCpCode=element.cpCode?element.cpCode:''
            //     }
            // })

            const selectKeyArr = selectedKeys[0].split("+")
            this.uiStore.CompanyCpCode = selectKeyArr[1]
            console.log("selectedKeys", this.uiStore.CompanyCpCode);
            const flag = selectKeyArr[2] === "false" ? false : true
            this.GetListByBusinessType(Number(selectKeyArr[0]), selectKeyArr[1], flag);
            this.selectId = Number(selectKeyArr[0]);

        }
        // function getCaption(obj:any,state:any) {
        //     const index=obj.lastIndexOf("\+");
        //     if(state===0){
        //         obj=obj.substring(0,index);
        //     }else {
        //         obj=obj.substring(index+1,obj.length);
        //     }
        //     return obj;
        // }

    }

    /**
     * 查找指定id的项目在集合中的索引
     * @param Id 项目的id
     */
    public getIndex(Id: string) {
        return this.uiStore.list.findIndex((waterRateItem: ProductItem, index: number, WaterRateItems: ProductItem[]) => {
            return waterRateItem.ProductItemId === Id;
        })
    }

    /**
     * 设置指定Id的项目为当前编辑项目
     * @param {string} id 项目的Id
     * @returns {boolean} 成功返回True，否则返回false
     */
    @action
    public selectItem(id: string): boolean {
        const item = this.getWaterRateItem(id);
        if (!item || item === null) {
            return false;
        }
        this.uiStore.currentEditItem = item;
        return true;
    }

    /**
     * 当前选择行
     * @param autoId 
     */
    @action
    public selectRow(Id: string): boolean {
        const row = this.getWaterRateItem(Id);
        if (!row || row === null) {
            return false;
        }
        this.uiStore.currentEditItem = row;
        return true;

    }


    /**
     * 加载数据
     * @param {(list:ProductItem[]) => void} fn 
     */
    @action
    public async GetListByBusinessType(typeId: number, cpCode: string, IsOrganization: boolean) {
        try {
            if (!this.uiStore.isLoading) {
                this.uiStore.isLoading = true;
            }
            this.uiStore.list = new Array<ProductItem>();
            const res = await this.domainStore.GetListByBusinessType(typeId, cpCode, IsOrganization)

            if (res.rtnCode !== 0) {
                console.log(res.rtnMsg);
                return;
            }
            const datas = res.data as ProductItem[];
            this.uiStore.list.push(...datas);
            this.uiStore.isLoading = false;

        }
        catch (error) {
            console.log(error);
            this.uiStore.isLoading = false;
        }
    }


    /**
     * 删除一个项目
     * @param {string} id 项目id
     */
    @action
    public remove = async (id: string) => {
        try {
            const index = this.getIndex(id);
            if (index < 0) {
                return { rtnCode: 1, rtnMsg: "未找到数据" };
            }
            if (!this.uiStore.isLoading) {
                this.uiStore.isLoading = true;
            }
            const res = await this.domainStore.remove(id, this.uiStore.CompanyCpCode)
            if (res.rtnCode !== 0) {
                this.uiStore.isLoading = false;
                message.info(res.rtnMsg)
                return res;
            }
            message.success('删除成功')
            this.uiStore.list.splice(index, 1);
            this.uiStore.isLoading = false;
            return res;
        } catch (error) {
            console.log(error);
            this.uiStore.isLoading = false;
            return { rtnCode: 1, rtnMsg: error };
        }
    }

    /**
     * 更新一个项目
     * @param {ProductItem} item 项目
     * @returns {boolean} 成功返回True，否则返回false
     */
    @action
    public update = async (item: ProductItem) => {
        try {
            item.CpCode = this.uiStore.CompanyCpCode
            const index = this.getIndex(item.ProductItemId);
            if (index < 0) {
                return { rtnCode: 1, rtnMsg: "水费项目不在表格内" };
            }
            if (!this.uiStore.isLoading) {
                this.uiStore.isLoading = true;
            }

            if (item.ProductItemName === this.uiStore.currentEditItem.ProductItemName) {
                this.uiStore.isLoading = false;
                return { rtnCode: 0, rtnMsg: "更新成功" };
            }

            const res = await this.domainStore.update(item)
            if (res.rtnCode !== 0) {
                console.log("保存水费项目时出错：" + res.rtnMsg);
                this.uiStore.isLoading = false;
                return res;
            }
            this.uiStore.list[index] = item;
            this.uiStore.isLoading = false;
            return res;
        } catch (error) {
            console.log(error);
            this.uiStore.isLoading = false;
            return { rtnCode: 1, rtnMsg: error.toString() };
        }
    }


    /**
     * 根据Id找到对应的实体
     * @param Id 
     */
    public getWaterRateItem(Id: string): ProductItem | null {
        try {
            const index = this.getIndex(Id);
            return index < 0 ? null : this.uiStore.list[index];

        } catch (error) {
            console.log("获取当前编辑实体异常:" + error);
            return null;
        }
    }
}