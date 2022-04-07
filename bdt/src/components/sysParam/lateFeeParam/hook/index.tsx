import { Col, Icon, Popconfirm } from "antd";
import React, { useState } from "react";
import { CalcLateFeeRule } from "../entity/calcLateFeeRule";
import "./index.scss";



function LateFeeParamDetailHook(props: {
    rule: CalcLateFeeRule, 
    select?: CalcLateFeeRule
    onSelect?: (rule: CalcLateFeeRule)=> void,
    onDelete?: (rule: CalcLateFeeRule)=> void,
    // onChange?: (rule: CalcLateFeeRule)=> void, 编辑按钮使用
}): JSX.Element {

    const [color, setColor] = useState('none')

    const thenColor = (props.rule.AutoId === props.select?.AutoId)? "#bae7ff": "none";

    color !== thenColor && setColor(thenColor);


    return <React.Fragment>
        <div className={"late-fee-select"} onClick={()=> (props.onSelect?.(props.rule))} >
            <Col span={16}>
                <div className={color === "none"? undefined: 'feeparam-select late-fee-selected'}/>
                <div className="rule-name" title={props.rule.RuleName}>{props.rule.RuleName}</div>
            </Col>
            <Col span={8} onClick={(event)=> {event?.stopPropagation()}}>
                <div >
                    {/** 嫌麻烦 需要删除编辑按钮 应该不会加回来了  */}
                    {/* <span title={"编辑"} onClick={(event)=> {event?.stopPropagation();props.onChange?.(props.rule)}} style={{ marginLeft: "12px" ,marginRight: "8px", color: "#69c0ff", cursor: "pointer" }}>
                        <Icon type="form" />
                    </span> */}
                    <Popconfirm title="确定要删除吗" onConfirm={(event)=> {event?.stopPropagation(); props.onDelete?.(props.rule)}} okText="是" cancelText="否">
                        <span title={"删除"} onClick={(event)=> {event?.stopPropagation()}} style={{ margin: "0px 8px", color: "#69c0ff", cursor: "pointer" }}>
                            <Icon type="delete" />
                        </span>
                    </Popconfirm>
                </div>
            </Col>
        </div>
    </React.Fragment>
}

export { LateFeeParamDetailHook };

