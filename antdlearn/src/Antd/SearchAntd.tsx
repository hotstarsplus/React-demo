import { Input } from "antd";
import React,{Component} from "react";
import $ from "jquery"; //


const { Search } = Input

class SearchAntd extends Component<any,any>{

    constructor(props:any){
        super(props)

        this.onSearch=this.onSearch.bind(this);
    }

    onSearch(){
        console.log($("#user").val())
    }

    render(){
        return(
            <Search id="user" placeholder="input search text"  allowClear={true} onSearch={this.onSearch} style={{ width: 200 }}/>
        );
    }
}

export default SearchAntd;