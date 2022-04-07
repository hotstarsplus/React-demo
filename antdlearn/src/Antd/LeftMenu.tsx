import {
  // MenuUnfoldOutlined,
  // MenuFoldOutlined,
  AppstoreOutlined, UploadOutlined, UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu } from "antd";
import React, { Component } from "react";
import '../AntdCss/antdcss.css';
import { CardTab } from "./CardTab";
import SearchAntd from "./SearchAntd";



const { Sider, Content } = Layout;


export class LeftMenu extends Component<any,any>{
    state = {
        collapsed : true,
    };


    // 自定义触发器，改变状态

    // toggle = () =>{
    //     this.setState({
    //         collapsed: !this.state.collapsed,
    //     });
    // };

    render(){
        return(
            <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo"><AppstoreOutlined /></div>
          <Menu theme="dark"  mode="inline" defaultOpenKeys={['sub1']} defaultSelectedKeys={['1']}>
            <Menu.SubMenu  theme="dark" key="sub1" icon={<UserOutlined />}>
               <Menu.Item key="1">
                    Iteam1
               </Menu.Item >
               <Menu.Item key="2">
                    Iteam2
               </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="4" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">

          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <SearchAntd/>
            <CardTab/>
          </Content>
        </Layout>
      </Layout>
        );
    }
}