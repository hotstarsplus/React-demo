import { observer } from "mobx-react";
import React from "react";
import { IChargeHallDrawerProps } from "./interface";
import { IChargeHallDrawerUiAction } from "./uiAction";
import { ChargeHallCommon } from "./uiCommon";

/**
 * @author zyl 2020-12-01 
 * @description 
 */
@observer
export class ChargeHallDrawer extends React.Component<IChargeHallDrawerProps>{
    public uiAction: IChargeHallDrawerUiAction;
    public common: ChargeHallCommon;
    constructor(props: IChargeHallDrawerProps){
        super(props);
        this.uiAction = new IChargeHallDrawerUiAction(props);
        this.common = new ChargeHallCommon(this.uiAction,this);
    }
}
