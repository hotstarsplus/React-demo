// import React,{Component} from 'react';
import { Table } from 'antd';
import React, { Component } from 'react';
import { EditOut } from '../AntdBtn/EditOut';
import { EyeOut } from '../AntdBtn/EyeOut';
import '../AntdCss/antdcss.css';
import DraewraAntd from './DraewraAntd';

interface DataType {
  // key: React.Key;
  name: string;
  age: number;
  address: string;
}


class TableAntd extends Component<any, any>{

  public record: any = {};

  public index: number = 0;

  public visible: boolean = false;

  public dis:boolean = false;

  public data: DataType[] = [
    {
      // setting: 'seting',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      // setting: 'Name',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      // setting: 'Age',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      // setting: 'Address',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  
 public  columns = [
  {
    key:"seting",
    title: '',
    dataIndex: 'seting',
    render: (text: any, record: any, index: number) => (
      <div>
        <div className="editbtn">
          <div onClick={this.showeditDrawer.bind(this, record, index)}>
            <EditOut />
          </div>

          <div onClick={this.showDrawer.bind(this, record, index)}>
            <EyeOut />
          </div>
        </div>

      </div>
    ),
  },
  {
    key:"name",
    title: 'name',
    dataIndex: 'name',
  },
  {
    key:"age",
    title: 'age',
    dataIndex: 'age',
  },
  {
    title: 'address',
    key:"address",
    dataIndex: 'address',
  }
];
  
  // public operationColumn = {
  //   title: <SettingOutlined style={{
  //     color: 'blue', fontSize: '16px'
  //   }} />,
  //   dataIndex: 'seting',
  //   render: (text: any, record: any, index: number) => (
  //     <div>
  //       <div className="editbtn">
  //         <div onClick={this.showDrawer.bind(this, record, index)}>
  //           <EditOut />
  //         </div>

  //         <div onClick={this.showDrawer.bind(this, record, index)}>
  //           <EyeOut />
  //         </div>
  //       </div>

  //     </div>
  //   ),
  // };
 

  render() {
    console.log('render', this.data)
    return (
      <div>
        <Table<any>
          rowKey={'key'}
          rowSelection={{
            onSelect: (data) => { console.log(data) }
          }}
          columns={this.columns}
          dataSource={this.data}
        />
        {this.visible ?
          <DraewraAntd
            visible={this.visible}
            dis={this.dis}
            callbackdata={this.update}
            username={this.record.name}
            age={this.record.age}
            address={this.record.address} />
          : <></>}
      </div>
    );
  }



  public update = (d: any) => {
    this.data[this.index].name = d.username;
    this.data[this.index].age =Number( d.age);
    this.data[this.index].address = d.address;
    this.visible = false;
    this.data=JSON.parse(JSON.stringify(this.data));
    this.setState({})
  }

  public showeditDrawer(data: any, index: number) {
    this.index = index;
    this.record = data;
    this.visible = true;
    this.dis = false;
    console.log(data);
    this.setState({})
  }

  
  public showDrawer(data: any, index: number) {
    this.index = index;
    this.record = data;
    this.visible = true;
    this.dis = true;
    console.log(data);
    this.setState({})
  }
}




export default TableAntd;

