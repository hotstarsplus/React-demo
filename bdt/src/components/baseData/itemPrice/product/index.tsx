import { observer, Provider } from "mobx-react";
import * as React from "react";
import itemPriceStores from "../stores";
import { WaterProductView } from "./listview/ui";


@observer
export class WaterProductLayout extends React.Component {

    public render(){
        return (
        <Provider {...itemPriceStores}>
            <WaterProductView/>
        </Provider>
        )
    }

}



