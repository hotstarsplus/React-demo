import { Select } from "antd";
import { action } from "mobx";
import { requestJson } from "orid";
import React from "react";
import { conversionSpecialCharacter } from "../../common/utilFunctions/utilFunctions";
import './index.scss'
export interface ITopSelectProps {
    placehoder: string
    value: string[]
    /** 导出页面选中数据的方法 */
    onHandleChange: (action: any) => void
    /** 导出顶部的查询条件 */
    onChangeValue: (value: string) => void
    type: string
    Organization:string
    selectType?:string
    isShow?:string;
}
interface ITopSelectState {
    data: any[],
    value: any,
}

export class TopSearchSelectTwo extends React.Component<ITopSelectProps, ITopSelectState>{
    constructor(props: ITopSelectProps) {
        super(props)
        this.state = {
            data: [],
            value: [],
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }
    public componentDidMount() {
        if (this.props.onHandleChange) {
            this.props.onHandleChange!(this.handleChange)
        }
    }
    public render() {
        const options = this.state.data.map(d => <Select.Option key={this.props.type==='区段'?d.RegionId:this.props.type==='小区'?d.GardenId:d.BusinessOfficeId}>{this.props.type==='区段'?d.RegionName:this.props.type==='小区'?d.GardenName:d.BusinessOfficeName}</Select.Option>)
        return (
            <Select
                style={{
                    paddingBottom:'16px',
                    width: String(this.props.selectType)==='1'?'100%':String(this.props.selectType)==='2'?String(this.props.isShow)==='true'?'100%':'200px':'250px'
                }}
                showSearch={true}
                placeholder={this.props.placehoder}
                value={this.state.value && this.state.value.length === 0 ? undefined : this.state.value}
                defaultValue={this.props.value}
                allowClear={true}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                dropdownStyle={{ zIndex: String(this.props.selectType)==='2'&&String(this.props.isShow)==='false'?1:0 }}
                dropdownClassName={options.length===0||options===undefined?'dropdown-unShow':'dropdown-SelectedDownData'}>
                {options}
            </Select>
        )
    }
    @action
    public async handleChange(value: any) {
      
        if (value === undefined || value === '') {
            this.setState({ value: undefined });
            this.setState({
                data: []
            })
            this.props.onChangeValue(value)
        } else {
            if (!isNaN(Number(value))) {
                this.setState({ value });
                this.props.onChangeValue(value)
            } else {
                this.setState({ value });
                if (this.props.type === '区段') {
                    const res: any = await requestJson(`/api/bdt/Region/List/All?cpCode=${this.props.Organization}&searchCase=RegionName_${ conversionSpecialCharacter(value.toString())}`)
                    this.setState({
                        data: res.data.model
                    })
                    const values = res.data.model.filter((item: { RegionId: any; RegionName: any; }) => (item.RegionId === value || item.RegionName === value))
                    if (values.length !== 0) {
                        this.props.onChangeValue(values[0].RegionId)
                    }
                } else if(this.props.type === '小区'){
                    const res: any = await requestJson(`/api/bdt/Garden/List/All?cpCode=${this.props.Organization}&searchCase=GardenName_${value}`)
                    this.setState({
                        data: res.data.model
                    })
                    const values = res.data.model.filter((item: { GardenId: any; GardenName: any; }) => (item.GardenId === value || item.GardenName === value))
                    if (values.length !== 0) {
                        this.props.onChangeValue(values[0].GardenId)
                    }
                }else{
                    const res: any = await requestJson(`/api/bdt/Garden/List/SearchGardenBycpCode?cpCode=${this.props.Organization}&searchCase=${value}`)
                    this.setState({
                        data: res.data.model
                    })
                    const values = res.data.model.filter((item: { BusinessOfficeId: any; BusinessOfficeName: any; }) => (item.BusinessOfficeId === value || item.BusinessOfficeName === value))
                    if (values.length !== 0) {
                        this.props.onChangeValue(values[0].BusinessOfficeId)
                    }
                }

            }
        }
    };
    @action
    public async handleSearch(value: any) {
        if (value) {
            if(this.props.type === '区段'){
               
                const res: any = await requestJson(`/api/bdt/Region/List/All?cpCode=${this.props.Organization}&searchCase=RegionName_${ conversionSpecialCharacter(value.toString())}`);
                this.setState({
                    data: res.data.model
                })
            }else if(this.props.type === '小区'){
                const res: any = await requestJson(`/api/bdt/Garden/List/All?cpCode=${this.props.Organization}&searchCase=GardenName_${value}`);
                this.setState({
                    data: res.data.model
                })
            }else{
                const res: any = await requestJson(`/api/bdt/Garden/List/SearchGardenBycpCode?cpCode=${this.props.Organization}&searchCase=${value}`);
                this.setState({
                    data: res.data.model
                })
            }
            
            
        } else {
            this.setState({ data: [] });
        }
    };
}