
import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { NeighborhoodView } from './neighborhood/ui';
import stores from './stores';

@observer
export class NeighborhoodLayout extends React.Component {
    public render() {
        return (
                <Provider {...stores}>
                        <NeighborhoodView /> 
                </Provider >
        );
    }
}

