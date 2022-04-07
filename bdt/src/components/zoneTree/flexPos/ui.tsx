import { FlexAlign, HorTwo, VerThr } from "orid";
import React from "react";
import { ChargeHallDrawer } from "./chargeHallDrawer/ui";
import { SearchTools } from "./common/searchTools";


export class IAAAAAAAAAA extends ChargeHallDrawer{

    public static SearchTools: typeof SearchTools = SearchTools;
    public state = {hor: false};
    constructor(props: any) {
        super(props);

        this.state = {
            hor: false
        }
    }

    public render(){
        const searchdom = this.loadSearch(this.props.children);
        return (
            <VerThr>
                <VerThr.top style={{ padding: "16px 12px 0 16px",borderBottom: "1px solid #333" }}>
                    <FlexAlign direction='row' style={{ position: 'relative' }}>
                        {this.common.StructureSearch({
                            mode: ["账期年月"],
                            type: "抄表记录",
                            child: [
                                searchdom instanceof Array ? 
                                    searchdom.map( model => {
                                        if ( model === undefined ) { return };
                                        if ( model.props) {
                                            return model.props.children
                                        };
                                        return model
                                    })
                                : searchdom
                            ]
                        })}

                    </FlexAlign>
                </VerThr.top>
                <VerThr.middle>
                    <HorTwo>
                        <HorTwo.left
                            style={{ borderRight: "1px solid #d9d9d9", padding: "16px 8px" }}
                            shrink={true}
                            collapsed={true}
                            handleChange={this.resizeHor}
                        >
                            123
                        </HorTwo.left>
                        <HorTwo.right
                            style={{ padding:"16px 8px"}}>
                                {this.common.StructureTable({
                                    columns: [],
                                    dataSource:[],
                                    pagination: this.uiAction.getProxy("抄表记录","search")["pagition"]
                                })}
                        </HorTwo.right>
                    </HorTwo>
                </VerThr.middle>
            </VerThr>
        )
    }

    public loadSearch(child: any): any{
        if ( child instanceof Array ) {
            return child.map(( model ) => {
                if ( model.type.name === "SearchTools" ) {
                    return model
                }
            })
        }
        if ( child! && child.type.name === "SearchTools" && child.props.length !== 0 ) {
            return child
        }
    }
    public resizeHor = (hor: boolean) => {
        this.setState({hor})
    }
}