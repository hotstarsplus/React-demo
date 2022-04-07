import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { ResidenceView } from './residence/ui';
import stores from './stores';

@observer
export class GardenLayout extends React.Component {
    public render() {
        return (
                <Provider {...stores}>
                        <ResidenceView />   
                </Provider >
        );
    }
}

