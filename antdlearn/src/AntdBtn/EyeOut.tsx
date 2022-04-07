import { EyeOutlined } from '@ant-design/icons'
// import { Button } from 'antd';
import React,{Component} from 'react'

export class EyeOut extends Component<any,any>{
    render(){
        return(
            <div className="editbtn" >
                    <EyeOutlined />   
            </div>
        );
    }
}