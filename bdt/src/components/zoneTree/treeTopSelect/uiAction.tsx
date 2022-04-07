import { TreeSelect } from "antd";
import { Tree } from "antd";
import { action } from "mobx";
import * as React from "react";
import { ITopSelectProps } from "./index";

export class LeftTreeUiAction {

    // private props:ITopSelectProps

    constructor(props: ITopSelectProps) {
        // this.props = props;
        // console.log(this.props);
        this.renderOrganizationTree = this.renderOrganizationTree.bind(this);
        this.loop = this.loop.bind(this)
    }
    /** 渲染树节点 */
    public renderOrganizationTree = (tableData: any[]): any => tableData.map(item => {
        if (item.Children && item.Children.length !== 0) {
            return (
                <TreeSelect.TreeNode key={item.OrganitionCode} value={item.OrganitionCode} title={item.OrganizationName}>
                    {this.renderOrganizationTree(item.Children)}
                </TreeSelect.TreeNode>);
        }
        return <TreeSelect.TreeNode key={item.OrganitionCode} value={item.OrganitionCode} title={item.OrganizationName} />;
    })
    /**
     * 构造树节点
     * @param datas 集合数据
     */
    public loop = (datas: any[]): any => datas.map(item => {
        if (item.children && item.children.length !== 0) {
            return (
                <TreeSelect.TreeNode
                    key={this.treeKeyAndValue(item)}
                    value={this.treeKeyAndValue(item)}
                    title={this.treeTitle(item)}
                >
                    {this.loop(item.children)}
                </TreeSelect.TreeNode>);
        }
        return (
            <TreeSelect.TreeNode
                key={this.treeKeyAndValue(item)}
                value={this.treeKeyAndValue(item)}
                title={this.treeTitle(item)}
            />);
    })

    @action.bound
    public loadAllShow(props: {
        AllGarden: boolean,
        AllRegion: boolean,
        title: string,
        child: React.ReactNode,
    }): React.ReactNode {
        return <Tree.TreeNode
            key={" "}
            title={props.title}
            disabled={
                props.title === "全部区段" ? props.AllGarden ? false : true : props.title === "全部小区" ? props.AllRegion ? false : true : true
            }
        >
            {props.child}
        </Tree.TreeNode>;
    }

    /** 判断树的key值和value值 */
    @action.bound
    public treeKeyAndValue(item: any) {
        if (item.RegionId) { return item.RegionId; }
        else if (item.GardenId) { return item.GardenId; }
        else if (item.BusinessOfficeId) { return item.BusinessOfficeId; }
        else if (item.UserCategoryId) { return item.UserCategoryId; }
        else if (item.WaterStationId) { return item.WaterStationId }
        else { return item.ProductKindId; }
    }

    /** 判断树的标题 */
    @action.bound
    public treeTitle(item: any) {
        if (item.RegionName) { return item.RegionName; }
        else if (item.GardenName) { return item.GardenName; }
        else if (item.BusinessOfficeName) { return item.BusinessOfficeName; }
        else if (item.UserCategoryName) { return item.UserCategoryName; }
        else if (item.WaterStationName) { return item.WaterStationName }
        else { return item.ProductKindName; }
    }
}