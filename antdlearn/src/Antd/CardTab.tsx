import { Tabs } from "antd";
import React, { Component } from "react";
import '../AntdCss/antdcss.css';
import TableAntd from "./TableAntd";

const {TabPane} = Tabs;

const initialPanes = [
    { title: '工作台', content: <TableAntd/>, key: '1', closable: false},
    { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
    {
      title: 'Tab 3',
      content: 'Content of Tab 3',
      key: '3',
    },
    {
      title: 'Tab 4',
      content: 'Content of Tab 4',
      key: '4',
    },
    {
      title: 'Tab 5',
      content: 'Content of Tab 5',
      key: '5',
    },
  ];

 export class CardTab extends Component<any,any>{
    constructor(props:any){
        super(props)

        this.onChange = this.onChange.bind(this);
        // this.onEdit = this.onEdit.bind(this);
        this.remove = this.remove.bind(this);

        this.state = {
            activeKey:initialPanes[0].key,
            panes:initialPanes
       };
    }

      onChange(activeKey: string){
          this.setState({activeKey});
          console.log(activeKey);
      }

      // onEdit(targetKey:any,action:string){
      //     this[action](targetKey);
      // }

      remove (targetKey: any){
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex = 0;
        panes.forEach((pane: { key: string; }, i: number) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });

        const newPanes = panes.filter((pane: { key: string; }) => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
          if (lastIndex >= 0) {
            newActiveKey = newPanes[lastIndex].key;
          } else {
            newActiveKey = newPanes[0].key;
          }
        }

        this.setState({
          panes: newPanes,
          activeKey: newActiveKey,
        });

        }

        render() {
            const { panes,activeKey } = this.state;
            return (
              <>
              <Tabs
                 type="editable-card"
                 onChange={this.onChange}
                //  onEdit={this.onEdit}
                activeKey={activeKey}
              >
                {panes.map((pane: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; key: React.Key | null | undefined; closable: boolean | undefined; content: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                  <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                    {pane.content}
                  </TabPane>
                ))}
              </Tabs>
              </>
            );
          }
    }
    