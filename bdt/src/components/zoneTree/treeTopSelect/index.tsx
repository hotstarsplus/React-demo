import { Tree, TreeSelect } from "antd";
import { AntTreeNodeExpandedEvent } from "antd/lib/tree";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import './index.scss';
import { LeftTreeUiAction } from "./uiAction";
export interface ITopSelectProps {
    /** 
     * 外部传入的类型数据源 
     */
    DataListSource: any[]
    /**
     * 组织树单击选中回调
     * 返回选择的组织树信息
     */
    onOrganizationTreeClickHandler?: (value: any) => void;
    /**
     * 类型单击选中回调
     * 返回选择的类型信息
     */
    onOrganizationTypeTreeClickHandler?: (value: any) => void;
    /** 
     * 外部传入的组织显示内容 
     */
    Organization: string;
    /** 
     * 获取树信息
     */
    OrganizationList: any[];
    /**
     * 树节点选中值
     */
    onTreeSelect?: (selectedKeys: string[]) => void;
    /**  */
    selectedKeys: string[];
    /**  */
    handleChange: (value: string) => void;
    /** 导出树节点的选中事件 */
    OnSelectedChange?: (action: any) => void,
    /**  */
    typeDataList: any[],
    /**  */
    selectType?: string,
    /** 固定树的高度 */
    maxHeight?: React.ReactText;
    /** 区段树配置 */
    zoneTreeConfig: {};
    /** 传出title */
    returnTitle: (title: string) => void;
}
interface IOrganizationTreeState {
    /** 当前选中组织cpCode(用于组织树的value) */
    selectCpCode: string;
    /** 当前选中组织下，选中的类型 */
    selectType: string;
    /** 是否自动展开父节点 */
    autoExpandParent: boolean;
    /** 展开指定的树节点 */
    expandedKeys: string[];
    selectedKeys: string[];

}
@observer
export class TopSelect extends React.Component<ITopSelectProps, IOrganizationTreeState>{
    /** 组织树数据源 */
    @observable
    public uiAction: LeftTreeUiAction

    constructor(props: ITopSelectProps) {
        super(props)
        this.uiAction = new LeftTreeUiAction(props);
        this.state = {
            selectCpCode: this.props.Organization,
            selectType: '',
            autoExpandParent: true,
            expandedKeys: [" "],
            selectedKeys: this.props.selectedKeys
        }
        this.onOrganizationTreeClickHandler = this.onOrganizationTreeClickHandler.bind(this)
        this.onOrganizationTypeTreeClickHandler = this.onOrganizationTypeTreeClickHandler.bind(this)
        this.onExpand = this.onExpand.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.outSelectChange = this.outSelectChange.bind(this)
        this.props.OnSelectedChange!(this.outSelectChange)
    }
    public render() {
        const title = (
            this.state.selectType === ''
                ? this.props.typeDataList[0] === '区段'
                : this.state.selectType === '区段')
            ? "全部区段"
            : (this.state.selectType === ''
                ? this.props.typeDataList[0] === '小区'
                : this.state.selectType === '小区')
                ? "全部小区"
                : (this.state.selectType === ''
                    ? this.props.typeDataList[0] === '用水性质'
                    : this.state.selectType === '用水性质')
                    ? '全部用水性质'
                    : (this.state.selectType === ''
                        ? this.props.typeDataList[0] === '用户类型'
                        : this.state.selectType === '用户类型')
                        ? '全部用户类型' :
                        (this.state.selectType === ''
                            ? this.props.typeDataList[0] === '供水所'
                            : this.state.selectType === '供水所')
                            ? '全部供水所' : '全部网点'
        this.props.returnTitle(title);
        return (
            <div style={{ width: '100%' }} className='LeftTree-TopSelect'>
                {(this.props.OrganizationList && this.props.OrganizationList.length !== 0)
                    ?
                    <div style={{ height: 34, overflowY: 'hidden', float: 'left', width: '50%' }}>
                        <TreeSelect
                            allowClear={false}
                            treeDefaultExpandAll={true}
                            value={this.state.selectCpCode}
                            onChange={this.onOrganizationTreeClickHandler}
                            style={{ width: '100%' }}
                            className='LeftTree-LeftTopSelect'
                            key='Organization'
                            dropdownStyle={{ zIndex: 0, width: '215px' }}>
                            {this.uiAction.renderOrganizationTree(this.props.OrganizationList.slice())}
                        </TreeSelect>
                    </div>
                    : ''}
                {(this.props.OrganizationList && this.props.OrganizationList.length !== 0) ?
                    <div style={{ height: 34, overflowY: 'hidden', width: '50%' }}>
                        <TreeSelect
                            style={{ width: '100%' }}
                            className='LeftTree-RightTopSelect'
                            value={this.state.selectType === '' ? this.props.typeDataList[0] : this.state.selectType}
                            key='OrganizationType'
                            onChange={this.onOrganizationTypeTreeClickHandler}
                            dropdownStyle={{ zIndex: 0 }}>
                            {this.props.typeDataList.map((element: any) => {
                                return (
                                    <TreeSelect.TreeNode key={element} value={element} title={element} />
                                )
                            })}
                        </TreeSelect>
                    </div>
                    :
                    <div style={{ height: 34, overflowY: 'hidden', width: '100%' }}>
                        <TreeSelect
                            style={{ width: '100%' }}
                            className='LeftTree-RightTopSelect'
                            value={this.state.selectType === '' ? this.props.typeDataList[0] : this.state.selectType}
                            key='OrganizationType'
                            onChange={this.onOrganizationTypeTreeClickHandler}
                            dropdownStyle={{ zIndex: 0 }}>
                            {this.props.typeDataList.map((element: any) => {
                                return (
                                    <TreeSelect.TreeNode key={element} value={element} title={element} />
                                )
                            })}
                        </TreeSelect>
                    </div>
                }
                {(this.props.DataListSource && this.props.DataListSource.length !== 0)
                    ? <div className="ori-small-scrollbar" style={{ height: this.props.maxHeight, overflow: "auto", transition: "0.2s" }} >
                        <Tree
                            expandedKeys={this.state.expandedKeys}
                            autoExpandParent={this.state.autoExpandParent}
                            onExpand={this.onExpand}
                            className={"ori-table-scroll"}
                            onSelect={this.onSelect}
                            selectedKeys={this.state.selectedKeys}
                        >
                            {
                                this.uiAction.loadAllShow({
                                    title,
                                    AllGarden: this.props.zoneTreeConfig["IsAllShowGardenRootNode"],
                                    AllRegion: this.props.zoneTreeConfig["IsAllShowRegionRootNode"],
                                    child: this.uiAction.loop(this.props.DataListSource.slice())
                                })
                            }

                        </Tree>
                    </div>
                    : ""}
            </div>
        )
    }
    /** 由外部进行选择值的更改 */
    @action
    public outSelectChange(key: any) {
        this.setState({
            selectedKeys: [String(key)]
        })
        if (String(key) === 'undefined') {
            this.props.handleChange('')
        }
    }
    /** 选中树节点 */
    @action
    public onSelect(selectedKeys: any) {
        if (selectedKeys.length === 0) {
            return
        }
        this.setState({
            selectedKeys
        })
        if (this.props.onTreeSelect) {
            this.props.onTreeSelect!(selectedKeys)
        }
    }

    /** 切换组织时更改组织的文本框显示 */
    @action
    public onOrganizationTreeClickHandler(value: any) {
        if (value === undefined) {
            return
        }
        this.setState({
            selectCpCode: value,
            selectedKeys: [],
        })
        if (this.props.onOrganizationTreeClickHandler) {
            this.props.onOrganizationTreeClickHandler!(value)
        }

    }
    /** 切换组织类型时更改组织类型的文本框显示 */
    @action
    public onOrganizationTypeTreeClickHandler(value: any) {
        if (value === undefined) {
            return
        }
        this.setState({
            selectType: value,
            selectedKeys: [],
        })
        if (this.props.onOrganizationTypeTreeClickHandler) {
            this.props.onOrganizationTypeTreeClickHandler!(value)
        }


    }
    /**
     * 展开事件
     * @param exKeys 
     * @param info 
     */
    @action
    private onExpand(exKeys: string[], info: AntTreeNodeExpandedEvent) {
        this.setState({
            autoExpandParent: false,
            expandedKeys: exKeys,
        });
    }
}