import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { CardTypeView } from './cardType/ui';
import  stores  from './stores';

@observer
export class CardTypeLayout extends React.Component{

    public render(){
        return (
                <Provider {...stores}>          
                        <CardTypeView />    
                </Provider >
        );
    }
}