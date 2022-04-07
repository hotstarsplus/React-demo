import { observer, Provider } from "mobx-react";
import * as React from "react";
import itemPriceStores from "../stores";
import { WaterKindView } from "./waterKindListView/ui";


@observer
export class WaterKindLayout extends React.Component {

    public render(){
        return (
        <Provider {...itemPriceStores}>
            <WaterKindView />
        </Provider>
        )
    }

}