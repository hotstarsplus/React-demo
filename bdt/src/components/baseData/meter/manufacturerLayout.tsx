import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { ManufacturerView } from './manufacturer/ui';
import stores from './stores';


@observer
export class ManufacturerLayout extends React.Component {
    public render() {
        console.log('render MeterCaliberLayout');
        return (
                <Provider {...stores}>
                        <ManufacturerView/>
                </Provider >
        );
    }
}

