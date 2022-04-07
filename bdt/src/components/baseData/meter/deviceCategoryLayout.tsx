import { observer, Provider } from "mobx-react";
import React from "react";
import { DeviceCategoryView } from "./DeviceCategory/ui";
import stores from "./stores";


@observer
export class DeviceCategoryLayout extends React.Component{
    public render() {
        console.log('render DeviceCategoryLayout');
        return (
                <Provider {...stores}>
                    <DeviceCategoryView/>
                </Provider >
        );
    }
}