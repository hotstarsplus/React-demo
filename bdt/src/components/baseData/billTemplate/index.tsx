import { Provider } from "mobx-react";
import React from "react";
import { BillTemplateLayout } from "./layout/ui";
import store from "./rootStore";



export class BillTemplateIndex extends React.Component {
    public render() {
        console.log("BillTemplateIndex___render")
        return (
            <Provider {...store}>
                <BillTemplateLayout />
            </Provider>
        )
    }
}