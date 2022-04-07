import { message } from "antd";
import { action, observable } from "mobx";
import { OridStores, requestJson } from "orid";
import { ThirdPartyInvoiceParamDomainStore } from "../domainStore";
import { ITaxPreCon, ITaxRate, ThirdPartyInvoiceParam } from "../entity";
import { IThirdPartyInvoiceParamLayoutProps } from "./interface";






export class ThirdPartyInvoiceParamLayoutUiAction {

    /**
     * 显示弹出框
     */
    @observable
    public ShowModal: boolean;

    @observable
    public showTitle: string = '';

    /**
     * 操作类型 (新增或修改)
     */
    @observable
    public OperationType: "add" | "edit";


    private props: IThirdPartyInvoiceParamLayoutProps;

    private domainStore: ThirdPartyInvoiceParamDomainStore;

    constructor(props: IThirdPartyInvoiceParamLayoutProps) {
        this.props = props;
        this.domainStore = new ThirdPartyInvoiceParamDomainStore();
        this.ShowModal = false;
        this.OperationType = "add";
        this.ProductItemOnSelect = this.ProductItemOnSelect.bind(this);
        this.Save = this.Save.bind(this);
        this.CancelModal = this.CancelModal.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.Edit = this.Edit.bind(this);
        this.Init()
    }

    @action.bound
    public Init() {
        message.destroy();
        this.props.GlobalThirdPartyInvoiceParamDomainStore!.CompanyCpCode = OridStores.authStore.currentOperator.CpCode;
        this.GetTaxPreCon();
        this.GetTaxRate();
    }

    /** 获取优惠政策类型 */
    @action.bound
    public GetTaxPreCon() {
        const store = this.props.GlobalThirdPartyInvoiceParamDomainStore!;
        if (store.TaxPreConList.length > 0) {
            store.TaxPreConList.splice(0, store.TaxPreConList.length);
        }
        this.domainStore.getTaxPreCon(store.CompanyCpCode).then((res) => {
            if (res.rtnCode === 0) {
                const datas = res.data as ITaxPreCon[];
                store.TaxPreConList.push(...datas);
            }
        })
    }

    /** 获取税率 */
    @action.bound
    public GetTaxRate() {
        const store = this.props.GlobalThirdPartyInvoiceParamDomainStore!;
        if (store.TaxRateList.length > 0) {
            store.TaxRateList.splice(0, store.TaxRateList.length);
        }
        this.domainStore.getTaxRate(store.CompanyCpCode).then((res) => {
            if (res.rtnCode === 0) {
                const datas = res.data as ITaxRate[];
                store.TaxRateList.push(...datas);
            }
        })
    }


    /**
     * 点击水费项目查询
     * @param selectedKey 
     */
    @action
    public ProductItemOnSelect(selectedKey: string) {
        this.props.GlobalThirdPartyInvoiceParamDomainStore!.LeftTreeData.map((element: any) => {
            if (Number(element.ProductItemId) === Number(selectedKey)) {
                this.props.GlobalThirdPartyInvoiceParamDomainStore!.CompanyCpCode = element.cpCode ? element.cpCode : ''
            }
        })
    }

    public getNewData = () => {
        requestJson("/api/bdt/ThirdPartyInvoiceParam/List/" + this.props.GlobalThirdPartyInvoiceParamDomainStore!.id + "?cpCode=" + this.props.GlobalThirdPartyInvoiceParamDomainStore!.CompanyCpCode).then((res) => {
            if (res.rtnCode === 0) {
                const data: ThirdPartyInvoiceParam[] = res.data || [];
                this.props.GlobalThirdPartyInvoiceParamDomainStore!.maxSortNo = 0;
                data.map((item) => {
                    if (item.SortNo > this.props.GlobalThirdPartyInvoiceParamDomainStore!.maxSortNo) {
                        this.props.GlobalThirdPartyInvoiceParamDomainStore!.maxSortNo = item.SortNo;
                    }
                })
                this.props.GlobalThirdPartyInvoiceParamDomainStore!.List = data;
            }
        });
    }

    /**
     * 显示新增对话框
     */
    @action
    public openAddModal() {
        if (this.props.GlobalThirdPartyInvoiceParamDomainStore!.TableSelectedRowKeys.length === 0 || this.props.GlobalThirdPartyInvoiceParamDomainStore!.List.length === 0) {
            message.error("请先选择要添加的数据");
            return;
        }
        this.OperationType = "add";
        this.showTitle = '添加税收分类编码'
        this.ShowModal = true;
    }

    /**
     * 编辑
     */
    public Edit() {
        this.OperationType = "edit";
        this.showTitle = '编辑税收分类编码'
        this.ShowModal = true;
    }


    /**
     * 取消弹出框
     */
    @action
    public CancelModal() {
        this.ShowModal = false;
    }


    /**
     * 保存数据
     * @param data 
     */
    public async Save(data: ThirdPartyInvoiceParam) {

        if (this.OperationType === "add") {
            this.Add(Object.assign(data, { SortNo: '' }));
        } else {
            this.Update(data);
        }
        this.ShowModal = false;
    }

    /** 更新 */
    @action.bound
    public Update(model: ThirdPartyInvoiceParam) {
        const store = this.props.GlobalThirdPartyInvoiceParamDomainStore!;
        try {
            store.Loading = true;
            model.CpCode = store.CompanyCpCode;
            if (model.TaxRate !== 0) {
                model.ZeroTax = "";
                model.ZeroTaxName = "非零税率"
            } else if (model.TaxRate === 0 && model.TaxPreCon === "出口零税") {
                model.ZeroTax = "0";
                model.ZeroTaxName = "出口退税"
            } else if (model.TaxRate === 0 && model.TaxPreCon === "免税") {
                model.ZeroTax = "1";
                model.ZeroTaxName = "免税"
            } else if (model.TaxRate === 0 && model.TaxPreCon === "不征税") {
                model.ZeroTax = "2";
                model.ZeroTaxName = "不征收"
            } else if (model.TaxRate === 0 && model.TaxPreCon === "") {
                model.ZeroTax = "3";
                model.ZeroTaxName = "普通零税率"
            }
            this.domainStore.updateThirdPartyInvoiceParam(model,store.id).then((res) => {
                if (res.rtnCode === 0) {
                    message.success("更新成功");
                    // const value = store.List.find((x) => x.ProductId === model.ProductId);
                    // if (value) {
                    //     const keys = Object.keys(model)
                    //     keys.forEach((key) => {
                    //         value[key] = model[key];
                    //     })
                    //     value.IsDelete = "0";
                    // }
                    this.getNewData();
                } else {
                    message.error(res.rtnMsg);
                }
                store.Loading = false;
            })
        } catch (error) {
            store.Loading = false;
            console.log(error);
        }
    }

    /** 新增 */
    @action.bound
    public Add(data: ThirdPartyInvoiceParam) {
        const store = this.props.GlobalThirdPartyInvoiceParamDomainStore!;
        try {
            store.Loading = true;
            data.CpCode = store.CompanyCpCode
            const params = new Array<ThirdPartyInvoiceParam>();
            store.TableSelectedRows.forEach((value: ThirdPartyInvoiceParam) => {
                const model = new ThirdPartyInvoiceParam();
                model.ProductId = value.ProductId;
                model.GoodsName = value.ProductName;
                model.TaxRate = data.TaxRate;
                model.GoodsNo = data.GoodsNo;
                model.TaxPre = data.TaxPre;
                if (data.TaxRate !== 0) {
                    model.ZeroTax = "";
                    model.ZeroTaxName = "非零税率"
                } else if (data.TaxRate === 0 && data.TaxPreCon === "出口零税") {
                    model.ZeroTax = "0";
                    model.ZeroTaxName = "出口退税"
                } else if (data.TaxRate === 0 && data.TaxPreCon === "免税") {
                    model.ZeroTax = "1";
                    model.ZeroTaxName = "免税"
                } else if (data.TaxRate === 0 && data.TaxPreCon === "不征税") {
                    model.ZeroTax = "2";
                    model.ZeroTaxName = "不征收"
                } else if (data.TaxRate === 0 && data.TaxPreCon === "") {
                    model.ZeroTax = "3";
                    model.ZeroTaxName = "普通零税率"
                }
                model.Spec = data.Spec;
                model.GoodsNoVer = data.GoodsNoVer;
                model.PriceKind = data.PriceKind;
                model.Uom = data.Uom;
                model.TaxPreCon = data.TaxPreCon;
                model.IsDelete = "0";
                model.SortNo = data.SortNo
                model.CpCode = store.CompanyCpCode
                params.push(model);
            });
            if (params.length === 0) {
                if (data.TaxRate !== 0) {
                    data.ZeroTax = "";
                    data.ZeroTaxName = "非零税率"
                }
                else if (data.TaxRate === 0 && data.TaxPreCon === "出口零税") {
                    data.ZeroTax = "0";
                    data.ZeroTaxName = "出口退税"
                }
                else if (data.TaxRate === 0 && data.TaxPreCon === "免税") {
                    data.ZeroTax = "1";
                    data.ZeroTaxName = "免税"
                }
                else if (data.TaxRate === 0 && data.TaxPreCon === "不征税") {
                    data.ZeroTax = "2";
                    data.ZeroTaxName = "不征收"
                }
                else if (data.TaxRate === 0 && data.TaxPreCon === "") {
                    data.ZeroTax = "3";
                    data.ZeroTaxName = "普通零税率"
                }

                data.IsDelete = "0";
                data.ProductId = store.id
                data.GoodsName = store.name
                data.SortNo = data.SortNo
                params.push(data)
            }

            this.domainStore.addThirdPartyInvoiceParam(params).then((res) => {
                if (res.rtnCode === 0) {
                    message.success("添加成功");
                    // store.List.forEach((value) => {
                    //     const model = params.find((x) => x.ProductId === value.ProductId);
                    //     if (model !== null && model !== undefined) {
                    //         const keys = Object.keys(model);
                    //         keys.forEach((key) => {
                    //             value[key] = model![key];
                    //         })
                    //     }
                    // });
                    this.getNewData();
                    store.TableSelectedRowKeys = [];
                    store.TableSelectedRows = [];
                } else {
                    message.error(res.rtnMsg)
                }
                store.Loading = false;
            })
        } catch (error) {
            console.log(error);
            store.Loading = false;
        }
    }


}