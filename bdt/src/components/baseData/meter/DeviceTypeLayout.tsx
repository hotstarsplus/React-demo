import { observer, Provider } from "mobx-react";
import React from "react";
import { DeviceTypeView } from "./DeviceType/ui";
import stores from "./stores";


@observer
export class DeviceTypeLayout extends React.Component{
    public render() {
        console.log('render DeviceTypeLayout');
        return (
                <Provider {...stores}>
                    <DeviceTypeView/>
                </Provider >
        );
    }
}