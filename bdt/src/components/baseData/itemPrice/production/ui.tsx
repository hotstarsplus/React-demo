import { observer, Provider } from "mobx-react";
import * as React from "react";
import itemPriceStores from "../stores";
import { WaterProductionView } from "./productionListView/ui";


@observer
export class WaterProductionLayout extends React.Component {

    public render(){
        return (
        <Provider {...itemPriceStores}>
            <WaterProductionView/>
        </Provider>
        )
    }

}





