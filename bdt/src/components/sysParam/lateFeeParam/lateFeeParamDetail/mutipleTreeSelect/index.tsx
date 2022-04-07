import { TreeSelect } from 'antd';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import './index.scss';

interface IMutipleSelectProps {

    onChange: (value: string[]) => void;

    placeholder?: string;

    defaultValue?: string[];

    value?: string[];

    defaultName?: string;

    dropDownWidth?: number | string;

    style?: React.CSSProperties;

    className?: string;

    region?: any[]

}

/** 树选择器-多选 */
@observer
export class MutipleTreeSelect extends React.Component<IMutipleSelectProps, any> {

    @observable
    private selectValue: string[] = [];

    private keyMap: object | undefined;

    public constructor(props: any) {
        super(props);
        this.keyMap = undefined;
    }
    public componentDidMount() {
        this.selectValue = this.props.value ?? ( this.props.defaultValue || [] );
    }

    @action.bound
    public UNSAFE_componentWillReceiveProps(props: IMutipleSelectProps) {
        if ( 
            props.value &&
            JSON.stringify(props.value) !== JSON.stringify(this.selectValue)
        ) {
            this.selectValue = props.value!;
            this.setState({}); // 伪受控
        }

        if ( !this.keyMap && props.region ) {
            this.calcKeyMap(props.region);
            this.setState({});
        }
    }

    public render() {
        return (
            <TreeSelect
                searchValue=''
                multiple={true}
                treeCheckable={true}
                placeholder={this.props.placeholder}
                style={this.props.style}
                dropdownStyle={{ maxHeight: 300, overflowY: 'scroll', width: this.props.dropDownWidth }}
                allowClear={true}
                value={this.selectValue}
                onChange={this.onChange}
                className={this.props.className ? 'orid-multipleselect ' + this.props.className : 'orid-multipleselect'}
                maxTagCount={0}
                maxTagPlaceholder={(value) => {
                    const keyMap = this.calcKeyMap(this.props.region);
                    const selectName = value.length === 0? this.props.placeholder ?? "请选择区段!": value.length> 1? (((keyMap || {})[value[0]] ?? value[0])+ `等${value.length}个片区`): (keyMap || [])[value[0]] ?? value[0];
                    return <span title={selectName}>{selectName}</span>
                }}
            >
                {this.props.children}
            </TreeSelect>
        )
    }

    private onChange = (value: any, label: any, extra: any) => {
        // 受控
        if ( !this.props.value ) {
            this.selectValue = value
        }
        this.props.onChange(value);
    }

    @action.bound
    private calcKeyMap(region: any) {
        if ( !region ) { return {} };
        if ( this.keyMap ) { return this.keyMap };
        const t = this;
        this.keyMap = {};
        loop(region);
        return this.keyMap;

        function loop(datas: any[]) {
            return datas.forEach((model) => {
                if (model.ChildList && model.ChildList.length) {
                    t.keyMap![model.RegionId] = model.RegionName;
                    loop(model.ChildList);
                }else {
                    t.keyMap![model.RegionId] = model.RegionName;
                }
            })
        }
    }


}