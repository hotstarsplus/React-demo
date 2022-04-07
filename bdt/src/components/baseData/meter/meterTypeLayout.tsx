import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { MeterTypeView } from './meterType/ui';

import stores from './stores';


@observer
export class MeterTypeLayout extends React.Component {
    public render() {
        console.log('render MeterTypeLayout');
        return (
                <Provider {...stores}>
                        <MeterTypeView/>
                </Provider >
        );
    }
}

