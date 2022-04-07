
import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { RegionView } from "./region/ui";
import stores from './stores';

@observer
export class RegionLayout extends React.Component {
    public render() {
        console.log('render regionLayout');
        return (
                <Provider {...stores}>
                        <RegionView />
                </Provider >
        );
    }
}

