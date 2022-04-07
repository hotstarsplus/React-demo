import { message } from 'antd';
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { action, observable } from "mobx";
import { ProductKindDomainStore } from '../domainStore';
import { ProductKind, ProductKindTreeData } from "../entity";
import { ProductKindUiStore } from '../uiStore';
import { IProductKindListViewProps } from "./interface";




export class ProductKindListViewUiAction {

    /**
     * 是否显示弹框
     */
    @observable
    public IsShowModal: boolean;

    @observable
    public selectKeys: string[];

    public operationType: "add" | "edit";

    @observable
    public isEditModalShow: boolean = false;


    private props: IProductKindListViewProps;

    private uiStore: ProductKindUiStore;

    private selectId: number;

    constructor(props: IProductKindListViewProps) {
        this.props = props;
        this.uiStore = props.ProductKindUiStore!
        this.selectKeys = new Array<string>();
        this.TreeOnSelect = this.TreeOnSelect.bind(this);
        this.TableOnEdit = this.TableOnEdit.bind(this);
        this.ModalOnCancel = this.ModalOnCancel.bind(this);
        this.Add = this.Add.bind(this);
        this.Save = this.Save.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.selectId = 0;
    }

    /**
     * 树节点选中事件
     * @param selectedKeys 
     * @param e 
     */
    @action
    public TreeOnSelect(selectedKeys: string[], e: AntTreeNodeSelectedEvent) {
        this.uiStore.flag = true
        this.selectKeys = selectedKeys;
        if (e.selected) {
            const selectKeyArr = selectedKeys[0].split("+")
            this.uiStore.CompanyCode = selectKeyArr[1]
            const flag = selectKeyArr[2] === "false" ? false : true
            this.uiStore.flag = flag
            this.uiStore.BussinedId = selectKeyArr[0]
            this.GetListByBusinessType(selectKeyArr[0], selectKeyArr[1], flag)
            this.selectId = Number(selectKeyArr[0]);
        }

    }

    /**
     * 表格编辑
     */
    @action
    public TableOnEdit(productKindId: string) {
        if (this.SelectItem(productKindId)) {
            this.IsShowModal = true;
            this.operationType = "edit";
            this.isEditModalShow = true
            this.uiStore.CurrentEditItem.BusinessTypeId = this.selectId;
        } else {

            message.error('错误的事件参数');

        }
    }

    /**
     * 删除事件
     * @param e 
     */
    public async onDelete(productKindId: string) {

        if (this.SelectItem(productKindId)) {

            const model = this.uiStore.CurrentEditItem;


            if (model.children !== null && model.children !== undefined && model.children.length > 0) {
                message.info("有子级数据，无法删除")
                return
            }
            this.uiStore.Loading = true;

            const res = await ProductKindDomainStore.Delete(model, this.uiStore.CompanyCode)

            if (res.rtnCode === 0) {
                message.info('删除成功')
                if (model.FatherId === "00") {
                    const ix = this.uiStore.ProductKindList.findIndex(x => x.ProductKindId === model.ProductKindId);
                    this.uiStore.ProductKindList.splice(ix, 1);


                    const ix1 = this.uiStore.ProductKindTreeList.findIndex(x => x.ProductKindId === model.ProductKindId);
                    this.uiStore.ProductKindTreeList.splice(ix1, 1);
                    this.uiStore.TreeData = this.productKindRecursion(this.uiStore.ProductKindTreeList);

                } else {
                    this.recursionDelete(this.uiStore.ProductKindList, model);
                    this.recursionDelete(this.uiStore.ProductKindTreeList, model);
                    this.uiStore.TreeData = this.productKindRecursion(this.uiStore.ProductKindTreeList);
                }
                this.GetListByBusinessType(this.uiStore.BussinedId, this.uiStore.CompanyCode, this.uiStore.flag);

            } else {
                message.info(res.rtnMsg)
            }

            this.uiStore.Loading = false;

        } else {

            message.error('错误的事件参数');

        }

    }



    /**
     * 新增
     */
    @action
    public Add() {
        this.isEditModalShow = false

        // const model = this.props.GlobalBusinesstypeStore!.BusinessTypeList.find(x=>x.BusinessTypeId===this.selectId);
        let name: string = ''
        const $that = this

        if (this.selectId === 0) {
            message.error("请先选中业务类型");
            return;
        }
        getName(this.props.GlobalBusinesstypeStore!.BusinessTypeList, $that)
        this.IsShowModal = true;

        this.uiStore.CurrentEditItem = new ProductKind()

        this.uiStore.CurrentEditItem.BusinessTypeId = this.selectId;

        this.uiStore.CurrentEditItem.BusinessTypeName = name;

        this.operationType = "add";
        function getName(list: any, that: any) {
            list.map((element: any) => {
                if (String(element.BusinessTypeId) === String(that.selectId)) {
                    name = element.BusinessTypeName
                }
                if (element.Children) {
                    getName(element.Children, that)
                }
            })
        }

    }

    /**
     * 取消弹框
     */
    @action
    public ModalOnCancel() {
        this.IsShowModal = false;
    }

    /**
     * 保存数据
     * @param data 
     */
    public async Save(data: any) {
        if (data.ColligationPrice) {
            console.log("ColligationPrice:", data.ColligationPrice)
            if (isNaN(data.ColligationPrice)) {
                return;
            }
        }
        else {
            data.ColligationPrice = 0;
        }
        if (this.operationType === "add") {
            if (!data.FatherId) {
                data.FatherId = "00";
            }
            data.BusinessTypeId = this.selectId;
            data.CpCode = this.uiStore.CompanyCode;
            const res = await ProductKindDomainStore.AddProductKind(data);
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                return;
            }
            message.success("新增成功");
            const id = res.data!.toString();
            data.ProductKindId = id
            if (data.FatherId === "00") {
                this.uiStore.ProductKindList.push(data);
                this.uiStore.ProductKindTreeList.push(data);
                this.uiStore.TreeData = this.productKindRecursion(this.uiStore.ProductKindTreeList);
            } else {
                this.recursionAdd(this.uiStore.ProductKindList, data);
                this.recursionAdd(this.uiStore.ProductKindTreeList, data);
                this.uiStore.TreeData = this.productKindRecursion(this.uiStore.ProductKindTreeList);
            }
        } else {
            console.log(data);
            data.CpCode = this.uiStore.CompanyCode;
            const res = await ProductKindDomainStore.UpdateProductKind(data);
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                return;
            }
            message.success("更新成功");
            this.recursionUpdate(this.uiStore.ProductKindList, data);
            this.recursionUpdate(this.uiStore.ProductKindTreeList, data);
            this.uiStore.TreeData = this.productKindRecursion(this.uiStore.ProductKindTreeList);
        }
        this.GetListByBusinessType(this.selectId, this.uiStore.CompanyCode, this.uiStore.flag)

        this.IsShowModal = false;

    }

    public GetListByBusinessType = (typeId: string | number, cpcode: string, flag: boolean) => {
        this.uiStore.Loading = true;
        this.uiStore.ProductKindList = [];
        ProductKindDomainStore.GetListByBusinessType(Number(typeId), cpcode, flag).then((res) => {
            if (res.rtnCode === 0) {
                const datas = res.data as ProductKind[];
                this.uiStore.ProductKindList = datas;
                this.uiStore.ProductKindTreeList = res.data as ProductKind[];
                if (this.uiStore.ProductKindTreeList === null) {
                    this.uiStore.TreeData = []
                } else {
                    this.uiStore.TreeData = this.productKindRecursion(this.uiStore.ProductKindTreeList);
                }
                this.uiStore.Loading = false;
            } else {
                this.uiStore.Loading = false;
            }
        })
    }

    /**
     * 递归转换数据
     * @param list 接口json数据集合
     */
    private productKindRecursion(list: ProductKind[]): ProductKindTreeData[] {
        const wklist = new Array<ProductKindTreeData>();
        list.forEach((jsonmodel, index, array) => {

            const model = new ProductKindTreeData();

            model.key = jsonmodel.ProductKindId

            model.value = jsonmodel.ProductKindId;

            model.title = jsonmodel.ProductKindName;

            if (jsonmodel.children !== null && jsonmodel.children !== undefined) {
                model.children = this.productKindRecursion(jsonmodel.children);
            } else {
                model.children = undefined;
            }
            wklist.push(model);
        });

        return wklist
    }


    private recursionDelete(list: ProductKind[], currentModel: ProductKind) {

        list.forEach((model: ProductKind) => {
            if (model.ProductKindId === currentModel.FatherId) {

                if (model.children) {
                    const ix = model.children!.findIndex((value: ProductKind) => {
                        return value.ProductKindId === currentModel.ProductKindId
                    });

                    if (ix < 0) { return; };
                    model.children!.splice(ix, 1);
                    if (model.children!.length === 0) {
                        model.children = undefined;
                    }
                }


            } else if (model.children !== null && model.children !== undefined && model.children.length > 0) {
                this.recursionDelete(model.children, currentModel);
            }
        });

    }


    /**
     * 递归增加数据
     */
    private recursionAdd(list: ProductKind[], currentModel: ProductKind) {

        list.forEach((model: ProductKind) => {
            if (model.ProductKindId === currentModel.FatherId) {


                if (model.children !== undefined && model.children !== null) {
                    model.children!.push(currentModel);
                } else {
                    model.children = new Array<ProductKind>();
                    model.children!.push(currentModel);
                }

            } else if (model.children !== null && model.children !== undefined && model.children.length > 0) {
                this.recursionAdd(model.children, currentModel);
            }
        });

    }

    /** 
     * 更新实体
     */
    private recursionUpdate(list: ProductKind[], model: ProductKind) {
        list.forEach((entity: ProductKind) => {
            if (entity.ProductKindId === model.ProductKindId) {
                entity.ProductKindName = model.ProductKindName;
                entity.ColligationPrice = model.ColligationPrice;
                entity.BusinessTypeId = model.BusinessTypeId;
                entity.BusinessTypeName = model.BusinessTypeName;
            } else if (entity.children !== null && entity.children !== undefined && entity.children.length > 0) {
                this.recursionUpdate(entity.children, model);
            }
        })

    }


    private SelectItem(id: string): boolean {

        try {

            this.recursionSelect(this.uiStore.ProductKindList, id);
            this.recursionSelect(this.uiStore.ProductKindTreeList, id);
            this.uiStore.TreeData = this.productKindRecursion(this.uiStore.ProductKindTreeList);

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }

    }

    private recursionSelect(list: ProductKind[], id: string) {
        list.forEach((model) => {
            if (model.ProductKindId === id) {
                this.uiStore.CurrentEditItem = model;
            } else if (model.children !== null && model.children !== undefined && model.children!.length > 0) {
                this.recursionSelect(model.children, id);
            }
        })

    }
}