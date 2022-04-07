
import { observer, Provider, } from 'mobx-react';
import * as React from 'react';
import { CalcFeeTypeView } from './calcFeeType/ui';
import calcFeeStores from './stores';

/**
 * 计费layout
 */
@observer
export class CalcFeeTypeLayout extends React.Component {
    public render() {
        console.info('render CalcFeeTypeLayout');
        return (
                <Provider {...calcFeeStores}>
                        <CalcFeeTypeView />
                </Provider>
        );
    }
}