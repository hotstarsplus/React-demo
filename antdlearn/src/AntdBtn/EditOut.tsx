import { EditOutlined } from '@ant-design/icons'
// import { Button } from 'antd';
import React,{Component} from 'react'

export class EditOut extends Component<any,any>{
    render(){
        // const visible = this.props.visble;
        return(
            <div className="editbtn" >
                    <EditOutlined />
            </div>
        );
    }
}