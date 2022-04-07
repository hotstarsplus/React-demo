import { Tree } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ICpDept } from "../entity";
import { ICpDeptTreeProps } from "./interface";

@inject("GlobalCompanyDrawerDomainStore")
@observer
export class CpDeptTree extends React.Component<ICpDeptTreeProps>{

    constructor(props:ICpDeptTreeProps){
        super(props);
        this.loop = this.loop.bind(this);
    }


    public render(){
        return(
            <Tree
                onSelect = {this.props.onSelect}
            >
                {
                    this.loop(this.props.GlobalCompanyDrawerDomainStore!.CpDeptList)
                }
            </Tree>
        )
    }


    private loop(list:ICpDept[]):JSX.Element[]{

        return list.map((value)=>{

            if (value.Children && value.Children.length) {
                return <Tree.TreeNode key={value.DeptId} title={value.DeptName}>{this.loop(value.Children)}</Tree.TreeNode>;
              }
              return <Tree.TreeNode key={value.DeptId} title={value.DeptName} />;

        })

    }


}