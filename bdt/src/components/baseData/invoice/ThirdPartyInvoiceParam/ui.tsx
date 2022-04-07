import { Provider } from "mobx-react";
import * as React from "react";
import { ThirdPartyInvoiceParamLayout } from "./layout/ui";
import ThirdPartyInvoiceParamStore from "./store";





export class ThirdPartyInvoiceParamView extends React.Component{

    public render(){
        return(
            <Provider {...ThirdPartyInvoiceParamStore}>
                <ThirdPartyInvoiceParamLayout />
            </Provider>
        )
    }

}