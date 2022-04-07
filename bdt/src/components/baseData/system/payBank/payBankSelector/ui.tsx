import { TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IPayBankSelectorProps } from "./interface";



/**
 * 下拉选视图
 */
@inject("GlobalPayBankStore")
@observer
export class PayBankSelectView extends React.Component<IPayBankSelectorProps>{
    public state={
        value:this.props.value
    }

    constructor(props:IPayBankSelectorProps){
        super(props);
    }

    public render(){
        
        console.log('c',this.state.value)
        return (
            <TreeSelect
             allowClear={true}
             onChange={this.onChangeValue}
             disabled = {this.props.disabled}
             value={this.state.value===undefined?'':this.state.value}
             treeDefaultExpandAll = {false}
             labelInValue={false}
             placeholder={this.props.GlobalPayBankStore!.isEditModal?"":"请选择银行"}
             treeData = {this.props.list}
             onSelect = {this.props.onSelect}
            />);
                {/* {
                    this.loop(this.props.GlobalPayBankStore!.PayBankList)
                } */}
      
    }
    private onChangeValue=(value:any)=>{
        this.setState({
            value
        })
        this.props.setFieldsValue!({
            FatherId:value===undefined?"":value
        })
        if(value===undefined){
            value=''
            this.props.onSelect(value)
        }
    }
    

    // private loop(list:PayBank[]):JSX.Element[]{
        
    //     return  list.map((value)=>{
    //           if (value.children!==undefined&&value.children!==null) {
    //               return(
    //                   <TreeSelect.TreeNode  key={value.AgentBankId} value={value.AgentBankId} title={value.AgentBankName} >
    //                      {
    //                          this.loop(value.children)
    //                      }
    //                     </TreeSelect.TreeNode>
    //                   )
    //           }else{
    //               return ( <TreeSelect.TreeNode value={value.AgentBankId} title={value.AgentBankName} key={value.AgentBankId} />)
    //           }
  
    //       })
  
    //    }
}