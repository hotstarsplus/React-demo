import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { SpecialProgressTypeView } from './specialProcessType/ui';
import stores from './stores';


@observer
export class MeterSpecialTypeLayout extends React.Component {
    public render() {
        console.log('render MeterSpecialTypeLayout');
        return (
            <>
                <Provider {...stores}>
                        <SpecialProgressTypeView/>
                </Provider >
            </>
        );
    }
}

