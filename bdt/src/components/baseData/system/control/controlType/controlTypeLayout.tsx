import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import stores from '../../stores';
import { ControlTypeView } from './ui';
@observer
export class ControlTypeLayout extends React.Component{
    public render(){
        console.log("render SystemLayout");
        return(
            <Provider {...stores}>
                <ControlTypeView/>
            </Provider>
        );
    }
}