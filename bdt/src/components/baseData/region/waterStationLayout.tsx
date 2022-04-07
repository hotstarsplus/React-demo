
import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import stores from './stores';
import { WaterStationView } from './waterStation/ui';


@observer
export class WaterStationLayout extends React.Component {
    public render() {
        return (
                <Provider {...stores}>                
                        <WaterStationView />
                </Provider >
        );
    }
}

