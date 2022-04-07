import { observer, Provider } from "mobx-react";
import * as React from "react";
import itemPriceStores from "../stores";
import { ProductTypeListView } from "./listView/ui";


@observer
export class ProductTypeLayout extends React.Component {

    public render(){
        return (
        <Provider {...itemPriceStores}>
            <ProductTypeListView />
        </Provider>
        )
    }

}