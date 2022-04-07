
import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { MeterModelView } from './meterModel/ui';
import stores from './stores';


@observer
export class MeterModelLayout extends React.Component {
    public render() {
        return (
                <Provider {...stores}>                  
                        <MeterModelView/>      
                </Provider >
        );
    }
}

