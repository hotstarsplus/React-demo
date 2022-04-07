import { observer, Provider, } from 'mobx-react';
import * as React from 'react';
import { QuantityTapyView } from './quantityTapy/ui'
import stores from './stores';

@observer
export class QuantityTypeLayout extends React.Component {
    public render() {
        console.log('render QuantityTypeLayout');
        return (
            <Provider {...stores}>
                <QuantityTapyView />
            </Provider >
        );
    }
}

