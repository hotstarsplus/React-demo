import { message } from "antd";
import { action, observable } from "mobx";
import { OridStores } from "orid";
import { Manufacturer } from "./entity";
import { IManufacturerListViewProps } from "./interface";




/**
 *  水表厂商action
 */
export class ManufacturerListViewUiAction {

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle: string = "";

    /**
     * 操作类型(无操作,新增,编辑)
     */
    private opearatorType: 'none' | 'add' | 'edit';

    private props: IManufacturerListViewProps;
    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IManufacturerListViewProps) {

        this.props = props;

        this.add = this.add.bind(this);

        this.cancel = this.cancel.bind(this);

        this.edit = this.edit.bind(this);

        this.save = this.save.bind(this);

        this.selectedContent = this.selectedContent.bind(this);


    }

    /**
     * 页面加载调用
     */
    @action.bound
    public getCompanyName() {
        const store = this.props.GlobalManufacturerStore!
        store.CompanyNameData = [];
        store.InfoName = '';
        store.CompanyName = '';
        store.Name = '';
        this.props.GlobalManufacturerDomainStore!.getCompanyName().then((res) => {
            if (res.rtnCode === 0) {
                store.InfoName = res.data.OrganizationName;
                store.CompanyNameData.push(res.data);
                store.CompanyName = OridStores.authStore.currentOperator.CpCode;
                store.Name = OridStores.authStore.currentOperator.CpCode;
                this.loadData();
            }
        })
    }


    /**
     * 加载数据
     * @param callBack 回调函数
     */
    @action.bound
    public loadData(callBack?: (list: Manufacturer[]) => void) {
        const store = this.props.GlobalManufacturerStore!
        store.list = [];
        try {
            if (!store.isLoading) {
                store.isLoading = true;
            }
            store.list = new Array<Manufacturer>();
            this.props.GlobalManufacturerDomainStore!.getList(store.CompanyName).then((res) => {
                if (res.rtnCode === 0) {
                    const datas = res.data as Manufacturer[];
                    store.isLoading = false;
                    store.list = datas;
                    store.getMaxsortNO(datas);
                } else {
                    store.isLoading = false;
                    console.error("加载失败:" + "返回码:" + res.rtnCode + " 返回信息:" + res.rtnMsg);
                    store.maxSortNo = 1;
                }
                if (callBack) {
                    callBack(store.list);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 新增
     * @param item 添加的项目
     */
    @action.bound
    public Add(item:Manufacturer){
        const store = this.props.GlobalManufacturerStore!;
        item.CpCode=store.CompanyName;
        this.props.GlobalManufacturerDomainStore!.addData(item).then((res)=>{
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                store.isLoading = false;
                return;
            }else {
                const datas = res.data.data as Manufacturer[];
                console.info("datas:",datas);   
                store.list.splice(0,store.list.length);
                store.list=datas;
                store.isLoading = false;
                store.getMaxsortNO(datas);
                message.success("保存成功");
                store.isVisiableModal = false;
            }
            store.isLoading = false;
        })
    }

    /**
     * 更新
     * @param item 更新的数据
     */
    @action.bound
    public Update(item:Manufacturer){
        const store = this.props.GlobalManufacturerStore!;
        try{
            const index = store.getIndex(store.currentEditItem.ManufacturerId);
            
            if(index<0){
                message.error("更新水表厂商失败");
                return;
            }else{
                item.ManufacturerId = store.currentEditItem.ManufacturerId;
                item.CpCode=store.CompanyName
                item["CreateDate"] = store.currentEditItem.CreateDate;
                item["CreaterId"] = store.currentEditItem.CreaterId;
                item["AutoId"] = store.currentEditItem.AutoId;
                console.info(item);
                this.props.GlobalManufacturerDomainStore!.updateData(item).then((res)=>{
                    if(res.rtnCode!== 0){
                        message.error(res.rtnMsg);
                        return;
                    }else {
                        const datas = res.data as Manufacturer[];
                        console.info("datas:",datas);   
                        store.list.splice(0,store.list.length);
                        store.list=datas;
                        store.isLoading = false;
                        store.getMaxsortNO(datas);
                        message.success("更新成功");
                        store.isVisiableModal = false;
                    }
                })
            }
        }catch(error){
            console.log("更新水表厂商失败：" + error);
        }
    }


    /**
     * 下拉选择查询内容
     */
    @action.bound
    public selectedContent(value: any) {

        this.props.GlobalManufacturerStore!.Name = value
        const that = this
        getName(this.props.GlobalManufacturerStore!.CompanyNameData, that)
        function getName(list: any, thats: any) {
            list.map((element: any) => {
                if (String(value) === String(element.OrganitionCode)) {
                    thats.props.GlobalManufacturerStore!.InfoName = element.OrganizationName;
                }
                if (element.Children) {
                    getName(element.Children, thats)
                }
            })
        }
        console.log(`selected ${this.props.GlobalManufacturerStore!.InfoName}`);
    }
    /**
     *  新增
     */
    @action
    public add() {
        this.modaltitle = "新增水表厂商"
        this.opearatorType = "add";
        this.props.GlobalManufacturerStore!.currentEditItem = new Manufacturer();
        this.props.GlobalManufacturerStore!.currentEditItem.SortNo = this.props.GlobalManufacturerStore!.maxSortNo;
        this.props.GlobalManufacturerStore!.isVisiableModal = true;
    }

    /**
     * 编辑
     */
    @action
    public edit() {
        this.modaltitle = "编辑水表厂商"
        this.opearatorType = "edit";
        this.props.GlobalManufacturerStore!.isVisiableModal = true;
    }

    /**
     * 取消
     */
    @action
    public cancel() {
        this.props.GlobalManufacturerStore!.isVisiableModal = false;
    }


    /**
     * 保存
     * @param item 水表厂商实体类
     */
    @action
    public save(item: Manufacturer) {

        if (this.opearatorType === "add") {
            this.Add(item);
        } else if (this.opearatorType === "edit") {
            this.Update(item);
        }
    }

    /**
     * 回到顶部组件侦听的目标元素
     */
    public backTopTarget = (): any => {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
    }


}
/**
 * 修改提醒信息位置、时间
 */

message.config({
    top: 90,
    duration: 3
});