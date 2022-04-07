import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { PayBankView } from './payBank/ui';
import stores from './stores';

@observer
export class AgentBankLayout extends React.Component {
    public render() {
        console.log('render SystemLayout');
        return (
                <Provider {...stores}>
                        <PayBankView />
                </Provider >
        );
    }
}

