import { TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { CardType } from "../entity";
import { ICardTypeSelectorProps } from "./interface";



/**
 * 下拉选视图
 */
@inject("GlobalCardTypeStore")
@observer
export class CardTypeSelectView extends React.Component<ICardTypeSelectorProps>{

    constructor(props: ICardTypeSelectorProps) {
        super(props);
        this.loop = this.loop.bind(this);
    }

    public render() {
        return (
            <TreeSelect
                onChange={this.props.onChange}
                value={this.props.value}
                disabled={this.props.disabled}
                treeDefaultExpandAll={false}
                labelInValue={false}
            >
                {
                    this.loop(this.props.GlobalCardTypeStore!.CardTypeUiList)
                }
            </TreeSelect>

        );
    }



    private loop(list: CardType[]): JSX.Element[] {
        return list.map((value) => {
            if (value.children !== undefined && value.children !== null) {
                return (
                    <TreeSelect.TreeNode key={value.CardTypeId} value={value.CardTypeId} title={value.CardTypeName} >
                        {
                            this.loop(value.children)
                        }
                    </TreeSelect.TreeNode>
                )
            } else {
                return (<TreeSelect.TreeNode value={value.CardTypeId} title={value.CardTypeName} key={value.CardTypeId} />)
            }

        })

    }


}