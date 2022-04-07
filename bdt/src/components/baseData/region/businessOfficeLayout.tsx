import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { BusinessOfficeView } from './businessOffice/ui';
import stores from './stores';

@observer
export class BussinessOfficeLayout extends React.Component {
    public render() {
        console.log('render regionLayout');
        return (
            <Provider {...stores}>
                <BusinessOfficeView />
            </Provider >
        );
    }
}

