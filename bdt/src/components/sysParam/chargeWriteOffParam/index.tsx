import { Provider } from 'mobx-react';
import * as React from 'react';
import { ChargeWriteOffParamLayout } from './chargetWriteOffParamLayout';
import { ChargeWriteOffParamUiStore } from './chargetWriteOffParamLayout/uiStore';


export class ChargeWriteOffParam extends React.Component {

    public uiStore: ChargeWriteOffParamUiStore = new ChargeWriteOffParamUiStore();


    public render() {
        return (
            <>
                <Provider ChargeWriteOffParamUiStore={this.uiStore}>
                    <ChargeWriteOffParamLayout />
                </Provider>
            </>
        );
    }
}