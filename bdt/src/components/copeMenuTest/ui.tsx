import { Provider } from "mobx-react";
import React from "react";
import stores from "./stores";
import { CopeMenuView } from "./uiLayout";

/**
 * 组件主视图，所有的组件都要在此进行组装
 */
export class CopeMenuLayout extends React.Component<any,any>{
        public render(){
        return(
            <Provider {...stores}>
                <CopeMenuView/>
            </Provider>
        );
    }
}