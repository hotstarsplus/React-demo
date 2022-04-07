import { FlexAlign, HorTwo, OridStores, VerThr } from "orid";
import React from "react";
import { IZoneTreeProps } from "./interface";
import { TopSearchSelect } from "./topSearchSelect";
import { TopSelect } from "./treeTopSelect";
import { IZoneTreeUiAction } from "./uiAction";
import "./zoneTree.scss";

export class ZoneTree extends React.Component<IZoneTreeProps>{
    /** 默认的查询条件文本框内容 */
    public state = {
        placehoder: '未选区段',
        DataListSource: [],
        selectedKeys: [],
        selectedKey: [],
        Organization: OridStores.authStore.currentOperator.CpCode,
        uiType: '1',
        typeDataList: [],
        /** 存储的左侧区段是否显示/隐藏的值 */
        IsShow: false,
    }
    /** uiAction */
    private uiAction: IZoneTreeUiAction;

    constructor(props: IZoneTreeProps) {
        super(props);
        this.uiAction = new IZoneTreeUiAction(this.props, this);
        this.uiAction.InitZoneTree();
        window.addEventListener("resize",()=>{try{
            if ( !(this.uiAction.store.frontageHeight === 0) ) {
                this.uiAction.frontageHeightCalc();
                this.setState({})
            }
        }catch(err){console.log(err)}});
    }        


    public render() {
        const { TopSearch, ReportDataTable } = this.props;
        return ((uiType: string): JSX.Element => {
            switch (uiType) {
                case "1":
                    return <VerThr className={this.props.className} style={this.props.outerStyle}>
                        {
                            TopSearch
                                ? <VerThr.top style={{ padding: "16px 12px 16px 16px" }}>
                                    <FlexAlign direction='row' style={{ minHeight: "32px" }}>
                                        {TopSearch ? TopSearch : ''}
                                    </FlexAlign>
                                </VerThr.top>
                                : ''
                        }
                        <VerThr.middle>
                            <HorTwo>
                                <HorTwo.left
                                    style={{
                                        borderRight: "1px solid #d9d9d9",
                                        padding: TopSearch ? "0px 8px 16px 16px" : "0px 8px 16px 16px",
                                    }}
                                    className={"uitype_1"+this.props.pageCode}
                                    shrink={true}
                                    collapsed={true} 
                                    refs={e => this.uiAction.store.uiTypeRefs1 = e}
                                    handleChange={this.uiAction.getValue}
                                >
                                    <div style={{ height: "100%"}} >
                                        <div>
                                            <TopSearchSelect
                                                DataListSource={this.state.DataListSource}
                                                selectType={this.state.uiType}
                                                Organization={this.uiAction.store.Organization}
                                                type={this.uiAction.store.selectType}
                                                placehoder={this.state.placehoder}
                                                pageCode={this.props.pageCode}
                                                title={this.uiAction.store.thenShowTitle}
                                                value={this.state.selectedKeys}
                                                frouceValue={this.uiAction.setSelectValues}
                                                onChangeValue={this.uiAction.ChangeSelectValue}
                                                onHandleChange={this.uiAction.getHandleChange(false)} />
                                        </div>
                                        <TopSelect
                                            maxHeight={((dom: HTMLDivElement| null,className: string)=>  
                                                this.uiAction.regetHeight("uiType_1",{dom,className})
                                            )(this.uiAction.store.uiTypeRefs1,"uitype_1"+this.props.pageCode)}
                                            handleChange={this.uiAction.store.handlePanelChange}
                                            selectedKeys={this.state.selectedKeys}
                                            Organization={this.uiAction.store.Organization}
                                            OrganizationList={this.uiAction.store.OrganizationData}
                                            onOrganizationTreeClickHandler={this.uiAction.getonOrganization}
                                            returnTitle={this.uiAction.getTitle}
                                            onOrganizationTypeTreeClickHandler={this.uiAction.getOrganizationType}
                                            DataListSource={this.state.DataListSource}
                                            onTreeSelect={this.uiAction.getTreeSelect}
                                            OnSelectedChange={this.uiAction.OnSelected}
                                            zoneTreeConfig={this.uiAction.store.zoneTreeConfig}
                                            typeDataList={this.state.typeDataList} />
                                    </div>
                                </HorTwo.left>
                                <HorTwo.right
                                    style={{
                                        padding: TopSearch ? "0px 0 0 8px" : "0px 0 0 8px",
                                    }}>
                                    {ReportDataTable}
                                </HorTwo.right>
                            </HorTwo>
                        </VerThr.middle>
                        {this.props.BottomReportDataTable ? this.props.BottomReportDataTable : ''}
                    </VerThr>
                case "2":
                    return <VerThr className={this.props.className} style={this.props.outerStyle}>
                        {
                            TopSearch
                                ? <VerThr.top style={{ padding: "16px 12px 16px 16px" }}>
                                    <FlexAlign direction='row' style={{ minHeight: "32px" }}>
                                        {TopSearch ? TopSearch : ''}
                                    </FlexAlign>
                                </VerThr.top>
                                : ""
                        }
                        <VerThr.middle>
                            <HorTwo>
                                <HorTwo.left
                                    style={{
                                        borderRight: "1px solid #d9d9d9",
                                        padding: TopSearch ? "0px 8px 16px 16px" : "0px 8px 16px 16px"
                                    }}
                                    shrink={true}
                                    collapsed={true}
                                    className={"uitype_2"+this.props.pageCode}
                                    refs={e => this.uiAction.store.uiTypeRefs2 = e}
                                    handleChange={this.uiAction.getValue}
                                >
                                    <div style={{ height: "100%"}}>
                                        <div style={{}}>
                                            <TopSearchSelect
                                                DataListSource={this.state.DataListSource}
                                                isShow={String(this.state.IsShow)}
                                                selectType={this.state.uiType}
                                                Organization={this.uiAction.store.Organization}
                                                type={this.uiAction.store.selectType}
                                                pageCode={this.props.pageCode}
                                                title={this.uiAction.store.thenShowTitle}
                                                placehoder={this.state.placehoder}
                                                value={this.state.selectedKeys}
                                                frouceValue={this.uiAction.setSelectValues}
                                                onChangeValue={this.uiAction.ChangeSelectValue}
                                                onHandleChange={this.uiAction.getHandleChange(false)} />
                                        </div>
                                        <TopSelect
                                            maxHeight={((dom: HTMLDivElement| null,className: string)=> 
                                                this.uiAction.regetHeight("uiType_2",{dom,className})
                                            )(this.uiAction.store.uiTypeRefs2,"uitype_2"+this.props.pageCode)}
                                            handleChange={()=>{""}}
                                            selectedKeys={this.state.selectedKeys}
                                            Organization={this.uiAction.store.Organization}
                                            OrganizationList={this.uiAction.store.OrganizationData}
                                            onOrganizationTreeClickHandler={this.uiAction.getonOrganization}
                                            returnTitle={this.uiAction.getTitle}
                                            onOrganizationTypeTreeClickHandler={this.uiAction.getOrganizationType}
                                            DataListSource={this.state.DataListSource}
                                            onTreeSelect={this.uiAction.getTreeSelect}
                                            OnSelectedChange={this.uiAction.OnSelected}
                                            zoneTreeConfig={this.uiAction.store.zoneTreeConfig}
                                            typeDataList={this.state.typeDataList} />
                                    </div>
                                </HorTwo.left>
                                <HorTwo.right
                                    style={{
                                        padding: TopSearch ? "0px 0 0 8px" : "0px 0 0 8px",
                                    }}>
                                    <VerThr>
                                        <FlexAlign direction='row'>
                                            {
                                                this.state.IsShow
                                                    ? ""
                                                    :
                                                    <div className="zoneTree-select-fdiv" >
                                                        <TopSearchSelect
                                                            DataListSource={this.state.DataListSource}
                                                            isShow={String(this.state.IsShow)}
                                                            selectType={this.state.uiType}
                                                            Organization={this.uiAction.store.Organization}
                                                            type={this.uiAction.store.selectType}
                                                            pageCode={this.props.pageCode}
                                                            title={this.uiAction.store.thenShowTitle}
                                                            placehoder={this.state.placehoder}
                                                            value={this.state.selectedKeys}
                                                            frouceValue={this.uiAction.setSelectValues}
                                                            onChangeValue={this.uiAction.ChangeSelectValues}
                                                            onHandleChange={this.uiAction.getHandleChange(true)} />
                                                    </div>
                                            }

                                            {this.props.middleTopSearch ? this.props.middleTopSearch : ""}
                                        </FlexAlign>
                                        {ReportDataTable}
                                    </VerThr>
                                </HorTwo.right>
                            </HorTwo>
                        </VerThr.middle>
                        {this.props.BottomReportDataTable ? this.props.BottomReportDataTable : ''}
                    </VerThr>
                default:
                    return <VerThr className={this.props.className} style={this.props.outerStyle}>
                        {
                            TopSearch
                                ? <VerThr.top style={{ padding: "16px 12px 16px 16px" }}>
                                    <FlexAlign direction='row' style={{ alignItems: "start", minHeight: "32px", position: "relative" }}>
                                        <TopSearchSelect
                                            DataListSource={this.state.DataListSource}
                                            isShow={String(this.state.IsShow)}
                                            selectType={this.state.uiType}
                                            Organization={this.uiAction.store.Organization}
                                            type={this.uiAction.store.selectType}
                                            pageCode={this.props.pageCode}
                                            title={this.uiAction.store.thenShowTitle}
                                            placehoder={this.state.placehoder}
                                            value={this.state.selectedKeys}
                                            frouceValue={this.uiAction.setSelectValues}
                                            onChangeValue={this.uiAction.ChangeSelectValue}
                                            onHandleChange={this.uiAction.getHandleChange(false)} />
                                        {TopSearch ? TopSearch : ''}
                                    </FlexAlign>
                                </VerThr.top>
                                : ""
                        }
                        <VerThr.middle>
                            <HorTwo>
                                <HorTwo.left
                                    style={{
                                        borderRight: "1px solid #d9d9d9",
                                        padding: TopSearch ? "0px 8px 16px 16px" : "0px 8px 16px 16px"
                                    }}
                                    className={"uitype_3"+this.props.pageCode}
                                    shrink={true}                                    
                                    collapsed={true}
                                    refs={e => this.uiAction.store.uiTypeRefs3 = e} 
                                    handleChange={this.uiAction.getValue}
                                >
                                    <div style={{ height: "100%" }} >
                                        <TopSelect
                                            maxHeight={((dom: HTMLDivElement| null,className: string)=> 
                                                this.uiAction.regetHeight("uiType_3",{dom,className})
                                            )(this.uiAction.store.uiTypeRefs3,"uitype_3"+this.props.pageCode)}
                                            selectType={this.state.uiType}
                                            handleChange={()=>{""}}
                                            selectedKeys={this.state.selectedKeys}
                                            Organization={this.uiAction.store.Organization}
                                            OrganizationList={this.uiAction.store.OrganizationData}
                                            returnTitle={this.uiAction.getTitle}
                                            onOrganizationTreeClickHandler={this.uiAction.getonOrganization}
                                            onOrganizationTypeTreeClickHandler={this.uiAction.getOrganizationType}
                                            DataListSource={this.state.DataListSource}
                                            onTreeSelect={this.uiAction.getTreeSelect}
                                            OnSelectedChange={this.uiAction.OnSelected}
                                            zoneTreeConfig={this.uiAction.store.zoneTreeConfig}
                                            typeDataList={this.state.typeDataList} />
                                    </div>
                                </HorTwo.left>
                                <HorTwo.right
                                    style={{ padding: TopSearch ? "0px 0 0 8px" : "0px 0 0 8px" }}
                                    className={this.props!.fatherDomClassName ? this.props!.fatherDomClassName : ''}>
                                    {ReportDataTable}
                                </HorTwo.right>
                            </HorTwo>
                        </VerThr.middle>
                        {this.props.BottomReportDataTable ? this.props.BottomReportDataTable : ''}
                    </VerThr>
            }
        })(String(this.state.uiType))
    }
}
export class SearchTree extends ZoneTree{}
