import { Provider } from 'mobx-react';
import * as React from 'react';
import { BusineTypeListview } from './businessTypeListview/ui';
import { businesstypeStores } from './stores';


/**
 * 业务类别
 */
export class  BusineTypeLayout extends React.Component{
    public render(){
        return(
            <Provider {...businesstypeStores}>
                < BusineTypeListview/>
            </Provider>
        )
    }
}