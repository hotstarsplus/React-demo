import { TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { DeviceType } from "../entity";
import { IDeviceTypeSelectorProps } from "./interface";




/**
 * 下拉选视图
 */
@inject("GlobalDeviceTypeStore")
@observer
export class DeviceTypeSelectorView extends React.Component<IDeviceTypeSelectorProps>{

    constructor(props:IDeviceTypeSelectorProps){
        super(props);
        this.loop = this.loop.bind(this);
    }

    public render(){
        return (
            <TreeSelect
             onChange={this.props.onChange}
             value = {this.props.value}
             disabled = {this.props.disabled}
             treeDefaultExpandAll = {false}
             labelInValue={false}
             placeholder={"请选择类型"}
            >
                {
                    this.loop(this.props.GlobalDeviceTypeStore!.list)
                }
            </TreeSelect>
        );
    }

    private loop(list:DeviceType[]):JSX.Element[]{
        
        return  list.map((value)=>{
              if (value.children!==undefined&&value.children!==null) {
                  return(
                      <TreeSelect.TreeNode  key={value.DeviceTypeId} value={value.DeviceTypeId} title={value.DeviceTypeName} >
                         {
                             this.loop(value.children)
                         }
                        </TreeSelect.TreeNode>
                      )
              }else{
                  return ( <TreeSelect.TreeNode value={value.DeviceTypeId} title={value.DeviceTypeName} key={value.DeviceTypeId} />)
              }
  
          })
  
       }
}