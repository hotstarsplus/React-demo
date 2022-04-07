import { Tree } from "antd";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ProductKind } from "../../../itemPrice/productKind/entity";
// import { ProductKindTree } from "../../../itemPrice/productKind/tree";
import { BusinessType } from "../entity";
import { IBusinessAndProductKindTreeListProps } from "./interface";


const { TreeNode } = Tree
/** 产品-业务用水性质树 */
@inject("GlobalBusinesstypeStore","GlobalWaterProductStore")
@observer
export class BusinessAndProductKindTreeList extends React.Component<IBusinessAndProductKindTreeListProps>{

    private treeKey:number = 0;

    constructor(props:IBusinessAndProductKindTreeListProps){
        super(props);
        this.ProductKindTreeOnSelect=this.ProductKindTreeOnSelect.bind(this);
        this.reduicProductKinds=this.reduicProductKinds.bind(this);
    }


    public componentWillMount(){
        this.props.GlobalBusinesstypeStore!.loadBusinessAndProductKindList();
    }


    public render(){
        console.log("selectedKeys",this.props.GlobalBusinesstypeStore!.expandedKeys);
        return(
            <Tree
                onSelect={this.ProductKindTreeOnSelect}
                onExpand={this.onExpand}
                expandedKeys={this.props.GlobalBusinesstypeStore!.expandedKeys}
                // selectedKeys={this.props.selectKeys}
                
            >
                {
                    this.loopBusinessType(this.props.GlobalBusinesstypeStore!.BusinessTypeAndProductKindList)
                }
            </Tree>
        )

    }

    public onExpand=(Expandkeys: string[])=>{
        this.props.GlobalBusinesstypeStore!.expandedKeys = Expandkeys;
    }

    public ProductKindTreeOnSelect(selectedKeys: string[], e: AntTreeNodeSelectedEvent){
        console.log("selectedKeys",selectedKeys,this.props.GlobalBusinesstypeStore!.expandedKeys);
        console.log(e);
        console.log("e:",e.node.props['data-cpcode']);
        this.props.GlobalWaterProductStore!.CompanyCode = e.node.props['data-cpcode']
        const businessTypeId = e.node.props['data-businesstypeid']
        this.props.onSelect!(businessTypeId,selectedKeys,e);
    }

    private reduicProductKinds(data:ProductKind[],productKindId:string):boolean{
        let flag=false;
        data.forEach((productKind:ProductKind)=>{
            if(productKind.ProductKindId===productKindId){
                flag=true;
            }
            if (!flag){
                if(productKind.children){
                    flag=this.reduicProductKinds(productKind.children,productKindId);
                }    

            }        
        });
        return flag;
    }

    private loopBusinessType=(list:BusinessType[]):JSX.Element[]=>{
        return  list.map((item:BusinessType)=>{
            const ss = this.treeKey;
            console.log("this.treeKey",ss)

            if(item.ProductKinds&&item.ProductKinds.length){
                return <TreeNode 
                            key={item.AutoId.toString()} 
                            title={item.BusinessTypeName}    
                            data-cpcode={item.CpCode}
                            disabled={true}
                        >
                        {
                            this.loop(item.ProductKinds)
                        }
                        </TreeNode>;
            }
            if (item.Children && item.Children.length !== 0) {
                return <TreeNode key={item.BusinessTypeId.toString()+(item.BusinessTypeName)} disabled={true}  data-cpcode={item.CpCode} title={item.BusinessTypeName} >
                            {this.loopBusinessType(item.Children)}
                        </TreeNode>
            }
            return <TreeNode key={item.BusinessTypeId.toString()+(item.BusinessTypeName)} disabled={true} data-cpcode={item.CpCode} title={item.BusinessTypeName} />;
        })
    }

    private loop(list:ProductKind[]):JSX.Element[]{
        return  list.map((item:ProductKind)=>{
              if (item.children && item.children.length) {
                  return <TreeNode key={item.ProductKindId+"_"+item.CpCode} data-businesstypeid={item.BusinessTypeId} data-cpcode={item.CpCode} title={item.ProductKindName}>{this.loop(item.children)}</TreeNode>;
                }
                return <TreeNode key={item.ProductKindId+"_"+item.CpCode} data-businesstypeid={item.BusinessTypeId} data-cpcode={item.CpCode} title={item.ProductKindName} />;
          })
      }
    }
