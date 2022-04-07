import { action, observable } from "mobx"
import { IResponseJsonResult } from "orid"
import { ZoneTree } from "."
import { ZoneTreeDomainStore } from "./domainStore"
import { IZoneTreeProps } from "./interface"
import { getRegionKey } from "./topSearchSelect"
import { ZoneTreeUiStore } from "./uiStore"

export class IZoneTreeUiAction {

    /** domainstore */
    @observable public domainStore: ZoneTreeDomainStore;

    /** domainstore */
    @observable public store: ZoneTreeUiStore;

    /** 区段树上下文 */
    private _cite: ZoneTree;

    private _props: IZoneTreeProps;

    constructor(props: IZoneTreeProps, _cite: ZoneTree) {
        this._cite = _cite;
        this._props = props;
        this.store = new ZoneTreeUiStore();
        this.domainStore = new ZoneTreeDomainStore();
    }

    /** 获取树节点的选中事件 */
    @action.bound
    public OnSelected(actions: any) {
        this.store.OnSelectedChange = actions
        this.store.OnSelectedChanges = actions
    }

    /** 获取树节点选中的值 */
    @action.bound
    public getTreeSelect(selectedKeys: string[]) {
        const that = this;
        this._cite.setState({
            selectedKeys,
        })
        let name: string = '';

        (function getValue(data: any) {
            data.map((element: any) => {
                if ( selectedKeys[0] === element[getRegionKey(that.store.selectType, "Id")] ) {
                    name =element[getRegionKey(that.store.selectType, "Name")];
                };
                if (element.children && element.children.length !== 0) {
                    getValue(element.children);
                };
            });
        })(this._cite.state.DataListSource.slice());
        
        if (this.store.handlePanelChange) {
            this.store.handlePanelChange(selectedKeys && selectedKeys[0] === " " ? " " : String(name))
        };
        if (this.store.rightPanelChange) {
            this.store.rightPanelChange(selectedKeys && selectedKeys[0] === " " ? " " : String(name))
        };
        this._cite.props.PutOutSelectId!(selectedKeys && selectedKeys[0] === " " ? this.store.Organization : String(selectedKeys))
    }

    @action.bound
    public getHandleChange(rightComponent: boolean) {
        return (actions: any) => {
            if (rightComponent) {
                this.store.rightPanelChange = actions;
                this.store.handlePanelChange = () => { return }; // 清空方法，防止不必要调用
                return;
            }
            this.store.handlePanelChange = actions;
            this.store.rightPanelChange = () => { return }; // 清空方法，防止不必要调用
        }
    }

    /** 获取搜索框的选中值 */
    @action.bound
    public ChangeSelectValue(value: any) {
        this.store.OnSelectedChange(value);
        if (this.store.handlePanelChange) {
            this.store.handlePanelChange(value);
        }
        this._cite.props.PutOutSelectId!(String(value));
        this._cite.setState({
            selectedKeys: value
        })
    }

    /** 获取搜索框的选中值 */
    @action.bound
    public ChangeSelectValues(value: any) {
        this.store.OnSelectedChange(value)
        if (this.store.OnSelectedChanges) {
            this.store.OnSelectedChanges(value)
        }
        this._cite.props.PutOutSelectId!(String(value));
        this._cite.setState({
            selectedKeys: value
        })
    }

    /** 重新加载值 */
    @action.bound
    public setSelectValues(value: any) {
        this._cite.setState({
            selectedKeys: value,
        })
    }

    @action.bound
    public getTitle(title: string) {
        if (title && title !== "") {
            this.store.thenShowTitle = title;
        }
    }

    /** 获取导出组织的cpcode值 */
    @action.bound
    public getonOrganization(value: string) {
        this._cite.setState({
            selectedKeys: []
        })
        if (this.store.handlePanelChange) {
            this.store.handlePanelChange('')
        }
        if (this.store.rightPanelChange) {
            this.store.rightPanelChange('')
        }
        this.store.Organization = value
        let search: ((Organization: string) => Promise<IResponseJsonResult>) | null = null;
        switch (this.store.selectType) {
            case "小区":
                search = this.domainStore.GetGardenTree; break;
            case "区段":
                search = this.domainStore.GetRegionTree(this.store.selectType); break;
            case "用户类型":
                search = this.domainStore.GetUserKind; break
            case "营业网点":
                search = this.domainStore.GetBusinessOff; break;
            case "供水所":
                search = this.domainStore.GetWaterStation; break;
            case "用水性质":
                search = this.domainStore.GetWaterKind; break;
            default: this._cite.setState({
                DataListSource: []
            })
        }

        search ? search!(this.store.Organization).then((vals) => {
            if (vals.rtnCode === 0) {
                this._cite.setState({
                    DataListSource: vals.data
                })
            } else {
                console.error("区段树查询: " + this.store.selectType + "时,出现了问题! " + vals.rtnMsg)
            }
        }) : (() => { "" })();

        this._cite.props.PutOutSelectCpCode!(value)
        this._cite.setState({
            Organization: value
        })
    }

    /** 获取导出组织类型的值,更改上方查询条件文本框的显示内容 */
    @action.bound
    public getOrganizationType(value: string) {
        this._cite.setState({
            selectedKeys: []
        })
        if (this.store.handlePanelChange) {
            this.store.handlePanelChange('')
        }
        if (this.store.rightPanelChange) {
            this.store.rightPanelChange('')
        }
        this.store.selectType = value
        if (this._cite.state.IsShow) {
            this._cite.setState({
                placehoder: `请输入${this.store.selectType}`
            })
        } else {
            this._cite.setState({
                placehoder: `未选${this.store.selectType}`
            })
        }
        let search: ((Organization: string) => Promise<IResponseJsonResult>) | null = null;
        if (value === '小区') {
            search = this.domainStore.GetGardenTree;
        } else if (value === '区段') {
            search = this.domainStore.GetRegionTree(this.store.selectType);
        } else if (value === '营业网点') {
            search = this.domainStore.GetBusinessOff;
        } else if (value === '供水所') {
            search = this.domainStore.GetWaterStation;
        } else if (value === '用户类型') {
            search = this.domainStore.GetUserKind;
        } else if (this.store.selectType === '用水性质') {
            search = this.domainStore.GetWaterKind;
        } else {
            this._cite.setState({
                DataListSource: []
            })
        }

        search ? search!(this.store.Organization).then((vals) => {
            if (vals.rtnCode === 0) {
                this._cite.setState({
                    DataListSource: vals.data
                })
            } else {
                console.error("区段树查询: " + this.store.selectType + "时,出现了问题! " + vals.rtnMsg)
            }
        }) : (() => { "" })();

        this._cite.props.PutOutSelectType(getRegionKey(value, "Id", true))
    }

    /** 根据左侧区段树的显示/隐藏来判断上方查询条件文本框的显示内容 */
    @action.bound
    public getValue(Show: boolean) {
        ((call: ()=> void)=> {
            Show && (this.store.frontageHeight = 0);
            this.regetHeight();
            call();
        })(()=> {
            this._cite.setState({
                IsShow: Show,
                placehoder: Show? `请输入${this.store.selectType}`: `未选${this.store.selectType}`
            });
        });
    }

    /** 获取页面样式 */
    @action.bound
    public getUIType() {
        this.domainStore.getUIType(this._cite.props.pageCode).then((res) => {
            this.store.zoneTreeConfig = res.data[0];
            const list = res.data[0].TreeSearchType.split(",");
            const type = res.data[0].UiLayerStyleType;
            this.store.selectType = list[0];
            this._cite.setState({
                uiType: type,
                typeDataList: list,
                placehoder: '请输入' + list[0],
            })
            this._cite.props.PutOutSelectType(getRegionKey(list[0], "Id", true));
            this.domainStore.GetRegionTree(this.store.selectType)(this.store.Organization).then(vals => {
                if (vals.rtnCode === 0) {
                    this._cite.setState({
                        DataListSource: vals.data
                    })
                } else {
                    console.error("区段树查询: " + this.store.selectType + "时,出现了问题! " + vals.rtnMsg)
                }
            });

        }).catch(err => {
            console.info("查询区段树页面样式时出现了问题！");
        })
    }

    @action.bound
    public getOrganizationVlas() {
        this.domainStore.getOrganization().then(model => {
            if (model.rtnCode === 0) {
                this.store.OrganizationData = [];
                this.store.OrganizationData.push(model.data);
                if (model.data && model.data.Children) {
                    this.store.OrganizationChild = [];
                    (model.data.Children as any[]).map((iterator) => {
                        this.store.OrganizationChild.push(iterator);
                    })
                };
            } else {
                console.error("获取区段树树信息时出现了问题! " + model.rtnMsg);
            }
        })
    }

    @action.bound
    public InitZoneTree() {
        if (this._props.Organization) {
            this.store.Organization = this._props.Organization;
        };
        this._props.PutOutSelectCpCode!(this.store.Organization);
        this._props.PutOutSelectType!('regionId');
        this.getOrganizationVlas();
        this.getUIType();
        if (!window["selfOffice"]) {
            if (!window["pipeLine"]) { window["pipeLine"] = {} };
            window["pipeLine"][this._props.pageCode] = () => {
                this._cite.setState({});
            };
            return;
        }
        window["selfOffice"].listen(this._props.pageCode, () => {
            this._cite.setState({});
        });
    }

    @action.bound
    public regetHeight(type: "uiType_1" | "uiType_2" | "uiType_3" = this.store.zoneTreeHeightCalcCache.type!, props: { dom: HTMLDivElement | null, className: string } = this.store.zoneTreeHeightCalcCache.props!) {
        if ( !type || !props ) { return };

        if ( !this.store.zoneTreeHeightCalcCache['props'] ) {
            this.store.zoneTreeHeightCalcCache = { type, props };
        }

        this.bindTreeDom(props);
        if (this.store.frontageHeight === 0) {
            this.reloadTreeHeight();
            let _: number = 0;
            const interval = setInterval(() => {
                if (_ === 2) { clearInterval(interval) };
                const lastHeight = this.store.zoneTreeHeight;
                const newHeight = this.reloadTreeHeight();
                window['atule'] = (num: number)=> {
                    this.store.zoneTreeHeight = num;
                }
                if (lastHeight !== newHeight) {
                    this._cite.setState({});
                };
                _++;
            }, 1000)
        }
        return this.store.zoneTreeHeight - getBindSub(type);

        function getBindSub(zoneTreeType: "uiType_1" | "uiType_2" | "uiType_3"): number {
            if (zoneTreeType === "uiType_1" || zoneTreeType === "uiType_2") {
                return 48 + 34 + 14 + 16
            } else {
                return 34 + 14 + 16
            }
        }
    }

    @action.bound
    public reloadTreeHeight() {
        const { treeDom, treeClass } = this.store;
        let calcHeight = 450
        if (treeDom) {
            calcHeight = treeDom.clientHeight;
            this.store.frontageHeight = window.innerHeight - calcHeight;
        } else {
            calcHeight = +(document.getElementsByClassName(treeClass)[0]
                ? document.getElementsByClassName(treeClass)[0].clientHeight
                : 600);
            if (calcHeight !== 502) {
                this.store.frontageHeight = window.innerHeight - calcHeight;
            }
        }
        return this.store.zoneTreeHeight = calcHeight;
    }

    @action.bound
    public frontageHeightCalc() {
        return this.store.zoneTreeHeight = window.innerHeight - this.store.frontageHeight;
    }

    @action.bound
    private bindTreeDom(props: { dom: HTMLDivElement | null, className: string }) {
        this.store.treeDom = props.dom
        this.store.treeClass = props.className
    }
}