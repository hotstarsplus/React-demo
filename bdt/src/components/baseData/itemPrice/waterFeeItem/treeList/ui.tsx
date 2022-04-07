import { Tree } from "antd";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { requestJson } from "orid";
import * as React from "react";
import { IWaterFeeItem } from "../entity";
import { IWaterFeeItemTreeListProps } from "./interface";






export class WaterFeeItemTreeList extends React.Component<IWaterFeeItemTreeListProps,{list:IWaterFeeItem[]}>{


        constructor(props:IWaterFeeItemTreeListProps){
            super(props);
            this.state = {
                list:[]
            }
            this.onSelect = this.onSelect.bind(this);
            this.loadData = this.loadData.bind(this);
        }


        public componentWillMount(){
            this.loadData()
        }


        public render(){
            return(
                <Tree 
                    onSelect = {this.onSelect}
                >
                    {
                        this.state.list.map((model)=>{
                            return( <Tree.TreeNode key={model.WaterFeeItemId} title={model.WaterFeeItemName} /> )
                        })
                    }
                </Tree>
            )
        }

        /**
         * 树节点点击事件
         * @param selectedKeys 
         * @param e 
         */
        private onSelect(selectedKeys: string[], e: AntTreeNodeSelectedEvent){

            if (e.selected) {
                this.props.onSelect!(selectedKeys[0]);
            }

        };


        private async loadData(){

            try {

                const res = await requestJson('/api/bdt/WaterFeeItem/List', {
                    method: "GET"
                });
                
                if (res.rtnCode===0) {
                    
                    const data = res.data as IWaterFeeItem[];

                    this.setState({
                        list:data
                    })

                }


            } catch (error) {
                console.log(error);
            }

        }




}