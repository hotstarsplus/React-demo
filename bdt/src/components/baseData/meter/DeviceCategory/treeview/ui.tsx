import { Button, Form, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { inject, observer } from "mobx-react";
import React from "react";
import { TypeDoMainStore } from "./domainStore";
import { DropdownView } from "./dropdown/ui";
import { OneTreedownselect } from "./oneTreeDrop/ui";
import { Treedownselect } from "./treeDropdown/ui";

export interface ICeshiViewProps extends FormComponentProps {
    /**
     * Store
     */
    TreeTypeStore?: TypeDoMainStore
}

interface ICeshiViewState{
    visible1:boolean,
    visible2:boolean,
    visible3:boolean
}
@inject("TreeTypeStore")
@observer
class CeshiView extends React.Component<ICeshiViewProps,ICeshiViewState>{

    constructor(props:ICeshiViewProps){
        super(props);
        this.state={
            visible1:false,
            visible2:false,
            visible3:false,
        }
        this.handleOnClick1 = this.handleOnClick1.bind(this);
        this.handleOnClick2 = this.handleOnClick2.bind(this);
        this.handleOnClick3 = this.handleOnClick3.bind(this);
        this.handleCancel1 = this.handleCancel1.bind(this);
        this.handleCancel2 = this.handleCancel2.bind(this);
        this.handleCancel3 = this.handleCancel3.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    public render() {
        const form = this.props.form;
        return (
            <>
                <Button onClick={this.handleOnClick1}>设备种类</Button>
                <Button onClick={this.handleOnClick2} >设备种类/类型树</Button>
                <Button onClick={this.handleOnClick3}>某一种类的设备类型树</Button>
                <div>
                <Modal
                        title="设备种类"
                        visible={this.state.visible1}
                        onCancel={this.handleCancel1}
                        onOk={this.handleCancel1}>
                        <Form>
                            <Form.Item label="XXXX" >
                                {
                                    form.getFieldDecorator(
                                        "FatherId",
                                    )(<DropdownView/>)
                                }
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <div>
                    <Modal
                        title="设备种类/类型树"
                        visible={this.state.visible2}
                        onCancel={this.handleCancel2}
                        onOk={this.handleCancel2}>
                        <Form>
                            <Form.Item label="XXXX" >
                                {
                                    form.getFieldDecorator(
                                        "FatherId",
                                    )(<Treedownselect
                                        list={this.props.TreeTypeStore!.TreeTypeUiList}
                                        setFieldsValue={this.props.form.setFieldsValue}
                                    />)
                                }
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <div>
                    <label>请输入Id</label>
                    <input onChange={this.handleOnChange}/>
                </div>
                <div>
                <Modal
                        title="某一种类的设备类型树"
                        visible={this.state.visible3}
                        onCancel={this.handleCancel3}
                        onOk={this.handleCancel3}>
                        <Form>
                            <Form.Item label="XXXX" >
                                {
                                    form.getFieldDecorator(
                                        "FatherId",
                                    )(<OneTreedownselect
                                        list={this.props.TreeTypeStore!.List}
                                        setFieldsValue={this.props.form.setFieldsValue}
                                    />)
                                }
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </>
        )
    }

    private handleOnClick1(){
        this.setState({
            visible1:true,
            visible2:false,
            visible3:false
        })
    }
    private handleOnClick2(){
        this.setState({
            visible1:false,
            visible2:true,
            visible3:false
        })
    }
    private handleOnClick3(){
        this.setState({
            visible1:false,
            visible2:false,
            visible3:true
        })
        this.props.TreeTypeStore!.SearchId();
    }

    private handleCancel1(){
        this.setState({
            visible1:false,
            visible2:false,
            visible3:false
        })
    }
    private handleCancel2(){
        this.setState({
            visible1:false,
            visible2:false,
            visible3:false
        })
    }
    private handleCancel3(){
        this.setState({
            visible1:false,
            visible2:false,
            visible3:false
        })
    }

    private handleOnChange(event: React.ChangeEvent<HTMLInputElement>){
        this.props.TreeTypeStore!.pushInputid = event.target.value;
    }
}

export default Form.create<ICeshiViewProps>()(CeshiView);