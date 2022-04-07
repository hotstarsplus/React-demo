import { TreeSelect } from "antd";
import * as React from "react";
import { ProductKindTreeData } from "../entity";
import './ui.scss'




export interface IProductKindSelectorProps{
    

    /**
     * 数据源
     */
    list?:any[];

    /**
     * 改变事件
     */
    onChange?:(value: any, label: any) => void;

    /**
     * 被选中时调用
     */
    onSelect?:(value: any) => void;

    /**
     * 当前选择项
     */
    value?: any;

    /**
     * 是否禁用
     */
    disabled?:boolean;

}

export class ProductKindSelector extends React.Component<IProductKindSelectorProps>{
    

    public render(){
        return (
            <TreeSelect
             onChange={this.props.onChange}
             value = {this.props.value||""}
             disabled = {this.props.disabled}
             labelInValue={false}
             placeholder="请选择"
             treeDefaultExpandAll={true}
             onSelect={this.props.onSelect}
             style={{width:"100%"}}
             getPopupContainer={this.getParentFun()}
             dropdownStyle={{maxHeight:'400px',width:"100%"}}
             className='treeSelect-selector-tree'
             allowClear={true}
            >
                <TreeSelect.TreeNode 
                key={"00"} 
                value={"00"}
                 title={"根"} >
                    {this.loop(this.props.list!)}
                </TreeSelect.TreeNode>
            </TreeSelect>

        );
    }

    private loop(datas:ProductKindTreeData[]):React.ReactNode{
        return datas.map((model)=>{
            if (model.children && model.children.length) {
                return (
                    <TreeSelect.TreeNode key={model.key} value={model.value} title={model.title} >
                        {this.loop(model.children)}
                    </TreeSelect.TreeNode>
                );
              }
              return <TreeSelect.TreeNode  key={model.key} value={model.value} title={model.title} />;
        })

    }
    private getParentFun=()=>{
        return this.getParentDom
     }
    private getParentDom=(e:any):HTMLElement=>{
        return e.parentNode as HTMLElement;
        
    }
}