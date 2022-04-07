import { observer, Provider, } from 'mobx-react';
import * as React from 'react';
import stores from '../../stores';
import { HeatStateTableView } from './heatStateTable/ui';
@observer
export class HeatStateLayout extends React.Component {
    public render() {
        console.log("render SystemLayout");
        return (
            <Provider {...stores}>
                        <HeatStateTableView />
            </Provider>
        );
    }
}