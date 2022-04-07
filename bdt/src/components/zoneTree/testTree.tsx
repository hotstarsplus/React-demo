import React from "react";
import { SearchTree } from ".";
const e = <div>1321234561234</div>;
export class Test extends React.Component{
    public render(){
        return(
            <SearchTree
                TopSearch={e}
                ReportDataTable={e}
                middleTopSearch={e}
                PutOutSelectId={this.getId}
                PutOutSelectCpCode={this.getCpCode}
                PutOutSelectType={this.getType}
                pageCode="90002617"/>
        )
    }
    private getId=(treeId:string)=>{
        console.log("进行了查询 查询树ID为： " +treeId)
        console.log('treeId',treeId)
    } 
    private getCpCode=(cpcode: any)=>{
        console.log('获取到了CpCode： '+cpcode)
    }
    private getType=(treeType:string)=>{
        console.log('获取到了TreeType: '+ treeType)
    }
}