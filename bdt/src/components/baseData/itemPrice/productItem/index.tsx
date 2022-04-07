import { Provider } from "mobx-react";
import * as React from "react";
import itemPriceStores from "../stores";
import { ProductItemView } from "./listview/ui";
import { ProductItemTreeList } from "./treeList/ui";




class ProductItemLayout extends React.Component {

    public render(){
        return (
        <Provider {...itemPriceStores}>
            <ProductItemView />
        </Provider>
        )
    }

}

export { ProductItemTreeList, ProductItemLayout };