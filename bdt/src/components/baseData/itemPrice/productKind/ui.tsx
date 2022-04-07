import { Provider } from "mobx-react";
import * as React from "react";
import itemPriceStores from "../stores";
import { ProductKindListView } from "./listview/ui";






export class ProductKindLayout extends React.Component {

    public render(){
        return (
        <Provider {...itemPriceStores}>
            <ProductKindListView />
        </Provider>
        )
    }

}