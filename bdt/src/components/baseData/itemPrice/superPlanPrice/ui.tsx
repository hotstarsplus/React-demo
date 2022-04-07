import { Provider } from "mobx-react";
import * as React from "react";
import itemPriceStores from "../stores";
import { SuperPlanPriceListView } from "./listView/ui";




export class SuperPlanPriceLayout extends React.Component{


    public render(){
        return(
            <Provider {...itemPriceStores} >
                <SuperPlanPriceListView />
            </Provider>
        )
    }

}