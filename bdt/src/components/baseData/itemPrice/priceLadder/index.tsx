import { Provider } from 'mobx-react';
import * as React from 'react';
import itemPriceStores from '../stores';
import { PriceLadderLayout } from './priceLadderLayout';
export class PriceLadder extends React.Component{
    public render(){
        return(
            <>
            <Provider {...itemPriceStores} >
                <PriceLadderLayout/>
                </Provider>
            </>
        );
    }
}