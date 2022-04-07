import { Provider } from "mobx-react";
import React from "react";
import { AppPrintTemplateLayout } from "./layout";
import store from "./stores";




export class AppPrintTemplate extends React.Component{

    public render() {
        return (
            <Provider {...store}>
                <AppPrintTemplateLayout />
            </Provider>
        )
    }
}