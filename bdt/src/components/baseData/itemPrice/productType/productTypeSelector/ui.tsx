import { TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ProductType } from "../entity";
import { IProductTypeSelectorProps } from "./interface";


/**
 * 产品类型下拉选
 */
@inject("GlobalProductTypeStore")
@observer
export class ProductTypeSelector extends React.Component<IProductTypeSelectorProps>{

    constructor(props:IProductTypeSelectorProps){
        super(props);
    }

    public componentWillMount(){

        if (this.props.GlobalProductTypeStore!.ProductTypeList.length===0) {
            this.props.GlobalProductTypeStore!.LoadData();
        }

    }

    public render(){
        const data = this.props.GlobalProductTypeStore!.ProductTypeList
        return(
            <TreeSelect
            onChange={this.props.onChange}
            value = {this.props.value}
            disabled = {this.props.disabled}
            treeDefaultExpandAll = {true}
            labelInValue={false}
            >
                <TreeSelect.TreeNode 
                    key={"00"} 
                    value={"00"}
                    title={"根"} >
                    {this.loop(data)}
                </TreeSelect.TreeNode>
            </TreeSelect>
        );
    }


    /**
     * 加载节点
     * @param datas 
     */
    private loop(datas:ProductType[]):React.ReactNode{
        return datas.map((model)=>{
            if (model.children && model.children.length) {
                return (
                    <TreeSelect.TreeNode key={model.ProductTypeId} value={model.ProductTypeId} title={model.ProductTypeName} >
                        {this.loop(model.children)}
                    </TreeSelect.TreeNode>
                );
              }
              return <TreeSelect.TreeNode  key={model.ProductTypeId} value={model.ProductTypeId} title={model.ProductTypeName} />;
        })

    }



}