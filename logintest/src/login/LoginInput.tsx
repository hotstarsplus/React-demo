import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LockOutlined } from '@ant-design/icons';
import React,{Component} from 'react';
import './login.css';

class LoginInput extends Component<any,any>{

    public userValue:string='';

    public passWord:string='';

    constructor(props:any){
        super(props);

        this.checkLogin = this.checkLogin.bind(this);

        // this.state = {
        //     pathname: "/"
        // }
        this.onUserNoChange = this.onUserNoChange.bind(this);
        this.onPassWordChange = this.onPassWordChange.bind(this);
    }
    
    
    checkLogin(){
        
        // var user = document.querySelector("#user");
        // console.log(user);

        console.log(this.userValue,this.passWord);
        

        if(this.userValue === "admin" && this.passWord === "1234"){

            // this.setState({
            //     pathname:"/index"
            // })

            this.props.onlogin();

        }
        else{
            console.log("登录失败")
        }
    }

    render(){
   

        return(
             <div className='loginDiv'>
                 <div className='inputDiv'>
                        {/* <RouterTest pathname={this.state.pathname}></RouterTest> */}
                        <div className='textCenter'><h1>登录</h1></div>
                        {/* aautoFocus自动获取焦点 */}
                        <Form onFinish={this.checkLogin}>
                            <Form.Item>
                                <Input onChange={this.onUserNoChange} id='user' autoFocus size="large" placeholder=" 账号/手机号" prefix={<UserOutlined />} />
                            </Form.Item>
                            <Form.Item>
                                <Input.Password onChange={this.onPassWordChange} id='pwd' size="large" autoComplete='on' placeholder=" 密码" prefix={<LockOutlined />} />
                            </Form.Item>
                            <Form.Item>
                                <div className='lable' >
                                    <div>
                                        <a href='index.html'> 忘记密码 </a>
                                    </div>
                                    <div >
                                        还没有账号，<a href='index.html'>点击注册</a>
                                    </div>
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <div className='BuCenter'><Button  htmlType='submit'  size='large' type="primary">登录</Button></div>
                            </Form.Item>
                        </Form>                                               
                 </div>               
            </div> 
        );
      
    }

    public onUserNoChange(e:any){
       this.userValue= e.target.value
    }

    public onPassWordChange(e:any){
       this.passWord= e.target.value
    }
}

export default LoginInput;

