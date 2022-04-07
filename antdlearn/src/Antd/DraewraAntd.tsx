import { Button, Drawer, Form, Input } from "antd";
import $ from "jquery";
import React, { Component } from "react";
import '../AntdCss/antdcss.css';

// const [visible, setVisible] = useState(false);

interface IDrawer {
    visible:boolean;
    dis:boolean;
    callbackdata: (data: any) => void
    username: string
    age: string
    address: string
}

class DraewraAntd extends Component<IDrawer, any>{

    constructor(props: IDrawer) {
        super(props);

        // 不绑定只能指向空，或者使用箭头函数 onCClose=()=>{}可以不绑定
        this.onClose = this.onClose.bind(this);

        this.onChangeddata = this.onChangeddata.bind(this);

        this.state = {
            dis: false,
            data: {
                username: this.props.username,
                age: this.props.age,
                address: this.props.address,
            }

        }
    }

    onChangeddata(values: any) {
        // console.log(values)
        this.setState({
            data: {
                username: $('#username').val(),
                age: $('#age').val(),
                address: $('#address').val(),
            }
        })
        this.props.callbackdata(this.state.data);
        // 放在此处点击两下才行，其实已经改变

    }


    onClose() {
        this.setState(
            { visible: false }
        )
    }




    render() {
        console.log('vi',this.props.visible,'dis',this.props.dis)
        // const username = this.state.data.username;
        // const age = this.state.data.age;
        // const address = this.state.data.address;
        // console.log(username,age,address,);

        return (
            <>

                <Drawer
                    maskClosable={false}
                    destroyOnClose={true}
                    closable={false}
                    keyboard={true}
                    title="信息窗口"
                    placement="right"
                    onClose={this.onClose}
                    visible={this.props.visible}>
                    <div className="draewrainput">

                        {/* {this.state.data.username}
                        {this.state.data.age}
                        {this.state.data.address} */}
                        <Form onFinish={this.onChangeddata}>
                            <Form.Item name="username">
                                <Input id="username"  disabled={this.props.dis} addonBefore="姓名" maxLength={50} defaultValue={this.state.data.username} />
                            </Form.Item>

                            <Form.Item name="age">
                                <Input id="age"  disabled={this.props.dis} addonBefore="年龄" maxLength={50} defaultValue={this.state.data.age} />
                            </Form.Item>

                            <Form.Item name="address">
                                <Input id="address"  disabled={this.props.dis} addonBefore="地址" maxLength={50} defaultValue={this.state.data.address} />
                            </Form.Item>

                            <Form.Item>
                                <Button htmlType="submit" type="primary">保存</Button>
                            </Form.Item>





                        </Form>

                    </div>


                </Drawer>

            </>
        );
    }
}

export default DraewraAntd;