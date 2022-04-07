import { observer, Provider } from "mobx-react";
import React from "react";
import { DeviceArchiveTypeTableView } from "./DeviceArchiveType/DeviceArchiveTypeTable/ui";
import stores from "./stores";

@observer
export class DeviceArchiveTypeLayout extends React.Component{
    public render() {
        console.log('render DeviceArchiveTypeLayout');
        return (
                <Provider {...stores}>
                    <DeviceArchiveTypeTableView/>
                </Provider >
        );
    }
}