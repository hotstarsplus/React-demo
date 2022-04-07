import { Table } from "antd";
import React from "react";
import { downColumns, DownColumns } from "./tableStract";

class DownLoadFilesTable extends React.Component<{
    dataSource: DownColumns[];
}>{ 

    public constructor(props: any) {
        super(props);
    }

    public componentWillReceiveProps(props: any) {
        this.setState({});
    }

    public render() {
        return (
            <React.Fragment>
                <Table 
                    bordered={true}
                    columns={downColumns}                
                    pagination={false}
                    scroll={{y: 700 }}
                    dataSource={this.props.dataSource}
                    className="ori-table ori-table-scroll"
                />
            </React.Fragment>
        )
    }

}


export { DownLoadFilesTable };
