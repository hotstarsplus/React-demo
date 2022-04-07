import { Checkbox, Col, Modal, Row } from "antd";
import { inject, observer } from "mobx-react";
import { HorTwo } from "orid";
import * as React from "react";
import { CpDeptTree } from "../../cpDept/ui";
import { IUserDialogProps } from "./interface";
import { UserDialogUiAction } from "./uiAction";
// import { CompanyDrawer } from "../../entity";




@inject("GlobalCompanyDrawerDomainStore")
@observer
export class UserDialog extends React.Component<IUserDialogProps>{

    private uiAction:UserDialogUiAction;

    constructor(props:IUserDialogProps){
        super(props);
        this.uiAction = new UserDialogUiAction(props);
    }


    public render(){
        const datas = this.props.GlobalCompanyDrawerDomainStore!.CompanyDrawerList;
        return(
            <Modal
                title = {"添加人员"}
                visible = {this.props.visible}
                onOk = {this.props.onOk}
                onCancel = {this.props.onCancel}
                okText={"确定"}
                cancelText={"取消"}
                width = {800}
                bodyStyle = {{height:400}}
                destroyOnClose = {true}
            >
                <HorTwo>
                     <HorTwo.left>
                         <CpDeptTree 
                            onSelect = {this.uiAction.OnTreeSelect}
                         />
                     </HorTwo.left>
                     <HorTwo.right>
                          {
                              datas.length>0?
                              <>
                                <Checkbox
                                    style={{marginBottom:"15px",marginLeft:"15px"}}
                                    onChange = {this.uiAction.OnSelectAll}
                                    checked={this.props.GlobalCompanyDrawerDomainStore!.CheckAll}
                                >
                                    全选/反选
                                </Checkbox>
                                <Row style={{marginLeft:"15px"}}>
                                        {
                                            datas.map((model,index)=>{
                                                return(
                                                    <Col
                                                        key = {index}
                                                        span={8} 
                                                        style={{marginBottom:"10px"}}
                                                    >
                                                        <Checkbox 
                                                            value={model.OperatorId} 
                                                            defaultChecked={ model.IsDelete==="0" && model.CompanyId===this.props.GlobalCompanyDrawerDomainStore!.CompanyId?true:false}
                                                            checked = {model.IsDelete==="0"}
                                                            onChange = {this.uiAction.OnChecked}
                                                            disabled={ model.CompanyId===this.props.GlobalCompanyDrawerDomainStore!.CompanyId||model.CompanyId===null?false:true}
                                                        >
                                                            {model.OperatorName}
                                                            </Checkbox>
                                                    </Col>
                                                )
                                            })
                                        }
                                </Row>
                            </>
                          :""
                          }
                     </HorTwo.right>
                </HorTwo>
            </Modal>
        )
    }


}