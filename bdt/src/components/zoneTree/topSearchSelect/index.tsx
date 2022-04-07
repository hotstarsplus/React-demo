import { Select } from "antd";
import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import React from "react";
import './index.scss';
export interface ITopSelectProps {
    placehoder: string
    value: string[]
    /** 导出页面选中数据的方法 */
    onHandleChange: (action: any) => void
    /** 导出顶部的查询条件 */
    onChangeValue: (value: string) => void
    /** 重新渲染value */
    frouceValue: (value: string) => void
    /** 重新渲染value */
    pageCode: string
    type: string
    Organization: string;
    selectType?: string
    isShow?: string;
    title: string;
    DataListSource: any[]
}
interface ITopSelectState {
    data: any[],
    value: any,
    all: boolean
}

export class TopSearchSelect extends React.Component<ITopSelectProps, ITopSelectState>{


    constructor(props: ITopSelectProps) {
        super(props)
        this.state = {
            data: [],
            value: [],
            all: false
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        if (this.props.onHandleChange) {
            this.props.onHandleChange!(this.handleChange(true))
        }
    }

    public render() {
        return (
            <Select
                className='search-tree-Select'
                style={{
                    top: String(this.props.selectType) === '3' ? '0' : '',
                    left: String(this.props.selectType) === '3' ? '0' : '',
                    position: String(this.props.selectType) === '3' ? 'absolute' : undefined,
                    marginRight: String(this.props.selectType) === '3' ? '22px' : '',
                    marginBottom: String(this.props.selectType) === '3' ? '10px' : '16px',
                    width: String(this.props.selectType) === '1' ? '100%' : String(this.props.selectType) === '2' ? String(this.props.isShow) === 'true' ? '100%' : '200px' : '220px',
                }}
                showSearch={true}
                placeholder={this.props.placehoder}
                value={
                    (() => {
                        if (this.state.all) { return this.props.title };
                        const [IDSTR, NMSTR] = this.getName();
                        let value: string[] = [];
                        let find = false;
                        if( this.state.data && this.state.data.length ) {
                            this.state.data.map((model) => {
                                if (this.props.value === model[IDSTR]) {
                                    value = this.props.value;
                                    find = true;
                                };
                            }) 
                        };
                        if (!find) {
                            (function loop(list: any[], val: string[]) {
                                list && list.length ?
                                    list.map((model) => {
                                        if (model["children"]) { loop(model["children"], val) };
                                        if ((val ? typeof (val) === "object" ? val[0] : val : "") === model[IDSTR]) {
                                            value = model[NMSTR];
                                            find = true;
                                        };
                                    }) : (() => { "" })();
                            })(this.props.DataListSource, this.props.value)
                        };
                        if (!find) { value = this.props.value };
                        return value;
                    })() || []
                }
                allowClear={true}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange(false)}
                dropdownStyle={{ zIndex: String(this.props.selectType) === '2' && String(this.props.isShow) === 'false' ? 1 : 0 }}
                dropdownClassName={this.state.data.length === 0 || this.state.data === undefined ? 'dropdown-unShow' : 'dropdown-SelectedDownData'}>
                {
                    ((data) => data.map(model =>
                        <Select.Option key={model[getRegionKey(this.props.type, "Id")]} >
                            {model[getRegionKey(this.props.type, "Name")]}
                        </Select.Option>)
                    )(this.state.data)
                }
            </Select>
        )
    }
    /** 输入框值改变的方法 */
    @action.bound
    public handleChange(extend: boolean) {
        // const that = this;
        const propChangs = extend ? () => { "" } : this.props.onChangeValue;
        return async (value: any) => {
            if (value === undefined || value === '') {
                this.setState({ value: [] });
                this.setState({
                    data: [],
                    all: false
                })
                propChangs(value)
            } else if (value === " ") {
                this.setState({ all: true })
            } else {
                let find: boolean = false;
                if (extend) {
                    this.state.data && this.state.data.length ?
                        this.state.data.map((model) => {
                            if ((model[getRegionKey(this.props.type, "Name")]) === value) {
                                this.setState({
                                    value: ((model[getRegionKey(this.props.type, "Id")]))
                                }, () => propChangs(this.state.value))
                                find = true;
                            }
                        }) : (() => { "" })();
                } else {
                    this.state.data && this.state.data.length ?
                        this.state.data.map((model) => {
                            if ((model[getRegionKey(this.props.type, "Id")]) === value) {
                                this.setState({ value }, () => propChangs(this.state.value));
                                find = true;
                            }
                        }) : (() => { "" })();
                }
                if (find) { return };
                const val = value;
                let res: Promise<IResponseJsonResult>;
                switch (this.props.type) {
                    case "区段":
                        res = requestJson(`/api/bdt/Region/List/SearchRegionBycpCode?cpCode=${this.props.Organization}&searchCase=${window['encodeURIComponent'](val)}`); break;
                    case "小区":
                        res = requestJson(`/api/bdt/Garden/List/SearchGardenBycpCode?cpCode=${this.props.Organization}&searchCase=${window['encodeURIComponent'](val)}`); break;
                    case "用水性质":
                        res = requestJson(`/api/bdt/ProductKind/List/searchProductKindBycpCode?cpCode=${this.props.Organization}&searchCase=${window['encodeURIComponent'](val)}`); break;
                    case "用户类型":
                        res = requestJson(`/api/bdt/UserCategory/List/SearchUserCategoryBycpCode?cpCode=${this.props.Organization}&searchCase=${window['encodeURIComponent'](val)}`); break;
                    case "供水所":
                        res = requestJson(`/api/bdt/WaterStation/List/SearchWaterStationBycpCode?cpCode=${this.props.Organization}&searchCase=${window['encodeURIComponent'](val)}`); break;
                    default:
                        res = requestJson(`/api/bdt/BusinessOffice/List/searchBusinessOfficeBycpCode?cpCode=${this.props.Organization}&searchCase=${window['encodeURIComponent'](val)}`);
                }

                res.then(model => {
                    if (model.rtnCode === 0) {
                        this.setState({
                            data: model.data["model"],
                            all: false
                        })
                        if (!Math.abs(model.data["model"].length)) {
                            this.props.frouceValue(val);
                        }
                    }
                })
            }
        }
    };
    /** 搜索后下拉框的内容 */
    @action.bound
    public async handleSearch(value: any) {
        if (value) {
            if (this.props.type === '区段') {
                const res: any = await requestJson(`/api/bdt/Region/List/SearchRegionBycpCode?cpCode=${this.props.Organization}&searchCase=${window['encodeURIComponent'](value)}`);
                this.setState({
                    data: res.data.model
                })
            } else if (this.props.type === '小区') {
                const res: any = await requestJson(`/api/bdt/Garden/List/SearchGardenBycpCode?cpCode=${this.props.Organization}&searchCase=${window['encodeURIComponent'](value)}`);
                this.setState({
                    data: res.data.model
                })
            } else if (this.props.type === '用水性质') {
                const res: any = await requestJson(`/api/bdt/ProductKind/List/searchProductKindBycpCode?cpCode=${this.props.Organization}&searchCase=${window['encodeURIComponent'](value)}`);
                this.setState({
                    data: res.data.model
                })
            } else if (this.props.type === '用户类型') {
                const res: any = await requestJson(`/api/bdt/UserCategory/List/SearchUserCategoryBycpCode?cpCode=${this.props.Organization}&searchCase=${window['encodeURIComponent'](value)}`);
                this.setState({
                    data: res.data.model
                })
            } else if (this.props.type === '供水所') {
                const res: any = await requestJson(`/api/bdt/WaterStation/List/SearchWaterStationBycpCode?cpCode=${this.props.Organization}&searchCase=${window['encodeURIComponent'](value)}`);
                this.setState({
                    data: res.data.model
                })
            } else {
                const res: any = await requestJson(`/api/bdt/BusinessOffice/List/searchBusinessOfficeBycpCode?cpCode=${this.props.Organization}&searchCase=${window['encodeURIComponent'](value)}`);
                this.setState({
                    data: res.data.model
                })
            }
        } else {
            this.setState({ data: [] });
        }
    };

    private getName(): [string, string] {
        const result: string[] = [];
        result.push(getRegionKey(this.props.type, "Id"));
        result.push(getRegionKey(this.props.type, "Name"));

        return result as [string, string];
    };

}


function getRegionKey( type: string ,key: string, up?: boolean ) {
    switch(type) {
        case "区段": return `${up? 'r': 'R'}egion`+ key;
        case "小区": return `${up? 'g': 'G'}arden`+ key;
        case "用水性质": return "ProductKind"+ key;
        case "用户类型": return "UserCategory"+ key;
        case "供水所": return "WaterStation"+ key;
        case "营业网点": return "BusinessOffice"+ key;
        default: return "";
    }
}

export { getRegionKey };
// const getTreeAuth = (code: string) :boolean=> {
//     const resultList = [];
//     // 欠费明细表
//     resultList.push("90002617");
//     return  resultList.includes(code);
// }