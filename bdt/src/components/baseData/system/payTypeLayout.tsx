import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { PayTypeView } from './payType/ui';
import stores from './stores';

@observer
export class PayTpyeLayout extends React.Component {
    public render() {
        return (
                <Provider {...stores}>                
                    <PayTypeView />
                </Provider >
        );
    }
}
