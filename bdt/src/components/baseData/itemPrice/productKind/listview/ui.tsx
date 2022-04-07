import { Button, message } from "antd";
import { inject, observer } from "mobx-react";
import { HorTwo, VerThr } from "orid";
import * as React from "react";
import { BusinessTypeTreeList } from "../../../system/businessType";
import '../../index.scss';
import { ProductKindModal } from "../dialog/ui";
import { ProductKindTable } from "../table/ui";
import { IProductKindListViewProps } from "./interface";
import { ProductKindListViewUiAction } from "./uiAction";





@inject("ProductKindUiStore","GlobalBusinesstypeStore")
@observer
export class ProductKindListView extends React.Component<IProductKindListViewProps>{
        
    
        private uiAction:ProductKindListViewUiAction;

        constructor(props:IProductKindListViewProps){
            super(props);
            this.uiAction = new ProductKindListViewUiAction(props);
        }
        public componentWillMount(){
            message.destroy()
        }


        public render(){
            return(
               <HorTwo style={{padding:"16px"}}>
                    <HorTwo.left style={{padding:"0px 8px 16px 8px",borderRight:"1px solid #ccc"}}>
                       <BusinessTypeTreeList
                         onSelect = {this.uiAction.TreeOnSelect}
                         selectedKeys={this.uiAction.selectKeys}
                       />
                   </HorTwo.left>
                   <HorTwo.right>
                       <VerThr>
                            <VerThr.top style={{ padding:'0px 16px 0px 16px'}}>
                                <Button 
                                    type={"primary"} 
                                    icon={"plus"} 
                                    onClick = {this.uiAction.Add}
                                >
                                {
                                    "新建"
                                }
                                </Button>
                            </VerThr.top>
                            <VerThr.middle  className="wc-padding-trl-16 ori-drawer-father">
                                <ProductKindTable 
                                    onEdit = {this.uiAction.TableOnEdit}
                                    onDelete={this.uiAction.onDelete}
                                />
                            </VerThr.middle>
                       </VerThr>
                       <ProductKindModal 
                            visible = {this.uiAction.IsShowModal}
                            onCancel = {this.uiAction.ModalOnCancel}
                            onOk = {this.uiAction.Save}
                            fatherIdIsCanEdit={this.uiAction.operationType!=="add"}
                            isEditModalShow = {this.uiAction.isEditModalShow}
                       />
                   </HorTwo.right>
               </HorTwo>
            )
        }


}