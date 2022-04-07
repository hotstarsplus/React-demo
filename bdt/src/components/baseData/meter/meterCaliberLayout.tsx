import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { MeterCaliberView } from './meterCaliber/ui';
import stores from './stores';


@observer
export class MeterCaliberLayout extends React.Component {
    public render() {
        console.log('render MeterCaliberLayout');
        return (
                <Provider {...stores}>
                        <MeterCaliberView />
                </Provider >
        );
    }
}

