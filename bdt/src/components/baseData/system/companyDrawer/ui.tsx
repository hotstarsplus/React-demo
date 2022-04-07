import { Provider } from "mobx-react";
import * as React from "react";
import { CompanyDrawerListView } from "./listview/ui";
import CompanyDrawerStore from "./stores";




export class CompanyDrawerLayout extends React.Component{

    public render(){
        return(
            <Provider {...CompanyDrawerStore}>
                <CompanyDrawerListView />
            </Provider>
        )
    }

}