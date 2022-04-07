import { observer, Provider } from "mobx-react";
import * as React from "react";
import itemPriceStores from "../stores";
import { WaterFeeItemView } from "./listView/ui";


@observer
export class WaterFeeItemLayout extends React.Component {

    public render(){
        return (
        <Provider {...itemPriceStores}>
            <WaterFeeItemView/>
        </Provider>
        )
    }

}