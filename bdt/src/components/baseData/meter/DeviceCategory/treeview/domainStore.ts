import { message } from "antd";
import { action, observable } from "mobx";
import { requestJson } from "orid";
import { DropdownViewList, TreeTypeList, TreeTypeUiEntity } from "./entity";


/**
 * 树Store
 */
export class TypeDoMainStore {

    /**
     * 是否显示编辑视图
     */
    @observable
    public isVisiableModal: boolean;

    /**
     * 数据数组
     */
    @observable
    public TreeTypeUiList: TreeTypeUiEntity[];

    @observable
    public DropdownViewlist: DropdownViewList[]

    /**
     * 控制父级是否可以点击
     */
    @observable
    public disabled: boolean;

    @observable
    public pushInputid: string;

    /**
     * 某一种类型树的数据集合
     */
    @observable
    public List:TreeTypeList[];

    private searchList: TreeTypeList[];


    /**
     * 构造方法
     */
    constructor() {
        this.disabled = false;
        this.pushInputid = "";
        this.isVisiableModal = false;
        this.List = new Array<TreeTypeList>();
        this.searchList = new Array<TreeTypeList>();
        this.TreeTypeUiList = new Array<TreeTypeUiEntity>();
        this.DropdownViewlist = new Array<DropdownViewList>();
        this.LoadingData = this.LoadingData.bind(this);
    }

    /**
     * 通过id查询数据
     */
    @action
    public async SearchId() {
        try {
            const res = await requestJson("/api/bdt/DeviceType/List/CategoryTypeTree?categoryId=" + this.pushInputid,
                {
                    method: "GET"
                });
            if (res.rtnCode === 0) {
                if (!res.data) {
                    res.data = new Array<TreeTypeList>();
                }
                const jsonList = res.data as TreeTypeList[];
                console.log("jsonList:",jsonList);
                this.List = jsonList;
                console.log("List:",this.List,this.pushInputid);
            } else {
                message.error(res.rtnMsg);
            }
        } catch (error) {
            console.log("加载失败:" + error);
        }
    }

    /**
     * 设备种类/类型树加载数据
     */
    @action
    public async LoadingData(callBack?: (list: TreeTypeList[]) => void) {
        try {
            const returnJson = await requestJson("/api/bdt/DeviceType/List/CategoryTypeTree", { method: "GET" });
            if (returnJson.rtnCode === 0) {
                if (!returnJson.data) {
                    returnJson.data = new Array<TreeTypeList>();
                }
                const jsonList = returnJson.data as TreeTypeList[];
                this.searchRefreshUi(jsonList);
            } else {
                message.error(returnJson.rtnMsg);
            }
        } catch (error) {
            console.log("加载失败:" + error);
        }
    }

    /**
     * 某一种类的设备类型树-加载数据
     */
    @action
    public async LoadData(callBack?: (list: DropdownViewList[]) => void) {
        try {
            this.DropdownViewlist = new Array<DropdownViewList>();
            const returnJson = await requestJson("/api/bdt/DeviceCategory/GetCategoryList", { method: "GET" });
            if (returnJson.rtnCode === 0) {
                if (!returnJson.data) {
                    returnJson.data = new Array<DropdownViewList>();
                }
                const jsonList = returnJson.data as DropdownViewList[];
                this.DropdownViewlist.push(...jsonList)
            } else {
                message.error(returnJson.rtnMsg);
            }
            if (callBack) {
                callBack(this.DropdownViewlist);
            }
        } catch (error) {
            console.log("加载失败:" + error);
        }
    }

    /**
     * 查询后刷新UI
     */
    private searchRefreshUi(jsonData: TreeTypeList[]) {
        const jsonList = jsonData as TreeTypeList[];
        this.searchList.splice(0, this.TreeTypeUiList.length);
        this.TreeTypeUiList.splice(0, this.TreeTypeUiList.length);
        const data = this.recursion(jsonList);
        this.searchList.push(...jsonList);
        this.TreeTypeUiList.push(...data);
    }

    /**
     * 递归转换数据
     * @param list 接口json数据集合
     */
    @action
    private recursion(list: TreeTypeList[]): TreeTypeUiEntity[] {
        const wsList = new Array<TreeTypeUiEntity>();
        list.forEach((jsonmodel: TreeTypeList, index: number, array: TreeTypeList[]) => {
            const model = new TreeTypeUiEntity();
            model.key = jsonmodel.NodeId;
            model.value = jsonmodel.NodeId;
            model.title = jsonmodel.NodeName;
            model.FatherId = jsonmodel.FatherId;
            model.IsCategory = jsonmodel.IsCategory;
            if (jsonmodel.children !== null && jsonmodel.children.length > 0) {
                if (model.IsCategory === "1") {
                    this.disabled = true;
                    model.children = this.recursion(jsonmodel.children);
                } else {
                    this.disabled = false;
                    model.children = this.recursion(jsonmodel.children);
                }
            } else {
                model.children = undefined;
            }
            wsList.push(model);
        })
        return wsList;
    }
}
