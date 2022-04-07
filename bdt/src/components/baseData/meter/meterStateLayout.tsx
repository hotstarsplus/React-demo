
import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { MeterStateView } from './meterState/ui';
import stores from './stores';


@observer
export class MeterStateLayout extends React.Component {
    public render() {
        console.log('render MeterStateLayout');
        return (
                <Provider {...stores}>
                        <MeterStateView/>
                </Provider >
        );
    }
}

