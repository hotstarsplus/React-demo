import { IMenuItem, PermissionPrompt } from 'orid';
import { AppPrintTemplate } from '../baseData/appPrintTemplate';
import { BillTemplateIndex } from '../baseData/billTemplate';
import { CalcFeeTypeLayout } from '../baseData/calcFee';
import { ThirdPartyInvoiceParamView } from '../baseData/invoice/ThirdPartyInvoiceParam';
import { PriceLadder } from '../baseData/itemPrice/priceLadder';
import { WaterProductLayout } from '../baseData/itemPrice/product';
import { ProductItemLayout } from '../baseData/itemPrice/productItem';
import { ProductKindLayout } from '../baseData/itemPrice/productKind/ui';
// import { ProductTypeLayout } from '../baseData/itemPrice/productType';
import { SuperPlanPriceLayout } from '../baseData/itemPrice/superPlanPrice';
import { DeviceArchiveTypeLayout, DeviceCategoryLayout, DeviceTypeLayout, ManufacturerLayout, MeterCaliberLayout, MeterModelLayout, MeterSpecialTypeLayout, MeterStateLayout, MeterTypeLayout, QuantityTypeLayout } from '../baseData/meter';
// import CeshiView from '../baseData/meter/DeviceCategory/treeview/ui';
import { BussinessOfficeLayout, GardenLayout, RegionLayout } from '../baseData/region';
// import { NeighborhoodLayout } from '../baseData/region/neighborhoodLayout';
import { WaterStationLayout } from '../baseData/region/waterStationLayout';
import { AgentBankLayout } from '../baseData/system';
import { BusineTypeLayout } from '../baseData/system/businessType/ui';
import { CompanyDrawerLayout } from '../baseData/system/companyDrawer';
import { ControlTypeLayout } from '../baseData/system/control/controlType/controlTypeLayout';
import { HeatStateLayout } from '../baseData/system/heat/heatState/heatStateLayout';
import { PayTpyeLayout } from '../baseData/system/payTypeLayout';
import { CardTypeLayout } from '../baseData/user';
import { CopeMenuLayout } from '../copeMenuTest/ui';
import { FilesDownLoad } from '../fileDownload';
import { SysParam } from '../sysParam';
import { Test } from '../zoneTree/testTree';

/**
 * 营业系统菜单数据
 */
export const BdtMenuData: IMenuItem[] = [
    {
        id: 10001100, text: "设备资料", key: "98.18", url: "", type: "", child: [
            { id: 10001110, text: "水表生产厂家", key: "98.13", url: "", type: "", child: undefined, disabled: false, component: ManufacturerLayout },
            { id: 10001120, text: "水表口径", key: "98.7", url: "", type: "", child: undefined, disabled: false, component: MeterCaliberLayout },
            { id: 10001130, text: "水表类型", key: "98.10", url: "", type: "", child: undefined, disabled: false, component: MeterTypeLayout },
            { id: 10001140, text: "水表型号", key: "98.8", url: "", type: "", child: undefined, disabled: false, component: MeterModelLayout },
            { id: 10001150, text: "水表特殊型号", key: "98.12", url: "", type: "", child: undefined, disabled: false, component: MeterSpecialTypeLayout },
            { id: 10001160, text: "水表状态管理", key: "98.9", url: "", type: "", child: undefined, disabled: false, component: MeterStateLayout },
            { id: 10001170, text: "设备种类", key: "98.33", url: "", type: "", child: undefined, disabled: false, component: DeviceCategoryLayout },
            { id: 10001180, text: "设备档案类别", key: "98.34", url: "", type: "", child: undefined, disabled: false, component: DeviceArchiveTypeLayout },
            { id: 10001190, text: "设备类型", key: "98.35", url: "", type: "", child: undefined, disabled: false, component: DeviceTypeLayout },

        ], disabled: false
    },
    {
        id: 10001200, text: "片区资料", key: "98.19", url: "", type: "", child: [
            { id: 10001210, text: "片区管理", key: "98.4", url: "", type: "", child: undefined, disabled: false, component: RegionLayout },
            { id: 10001220, text: "小区管理", key: "98.6", url: "", type: "", child: undefined, disabled: false, component: GardenLayout },
            { id: 10001230, text: "供水所管理", key: "98.17", url: "", type: "", child: undefined, disabled: false, component: WaterStationLayout },
            // { id: 10001240, text: "缴费网点管理", key: "98.16", url: "", type: "", child: undefined, disabled: false, component: NeighborhoodLayout },
            { id: 10001250, text: "营业网点管理", key: "98.5", url: "", type: "", child: undefined, disabled: false, component: BussinessOfficeLayout },
        ], disabled: false
    },
    {
        id: 10001300, text: "银行资料", key: "98.20", url: "", type: "", child: [
            { id: 10001310, text: "扣费银行", key: "98.1", url: "", type: "", child: undefined, disabled: false, component: AgentBankLayout },
        ], disabled: false
    },
    {
        id: 10001400, text: "系统编码", key: "98.21", url: "", type: "", child: [
            { id: 10001410, text: "客户类型", key: "98.3", url: "", type: "", child: undefined, disabled: false, component: CardTypeLayout },
            { id: 10001420, text: "计费方式", key: "98.2", url: "", type: "", child: undefined, disabled: false, component: CalcFeeTypeLayout },
            { id: 10001430, text: "支付方式", key: "98.15", url: "", type: "", child: undefined, disabled: false, component: PayTpyeLayout },
            { id: 10001440, text: "水量类型", key: "98.11", url: "", type: "", child: undefined, disabled: false, component: QuantityTypeLayout },
            { id: 10001450, text: "税收分类编码", key: "98.28", url: "", type: "", child: undefined, disabled: false, component: ThirdPartyInvoiceParamView },
            { id: 10001460, text: "企业票据信息", key: "98.30", url: "", type: "", child: undefined, disabled: false, component: CompanyDrawerLayout },
            { id: 10001470, text: "业务类别", key: "98.31", url: "", type: "", child: undefined, disabled: false, component: BusineTypeLayout },
            { id: 10001480, text: "供暖状态", key: "98.29", url: "", type: "", child: undefined, disabled: false, component: HeatStateLayout },
            { id: 10001490, text: "控制方式", key: "98.32", url: "", type: "", child: undefined, disabled: false, component: ControlTypeLayout },
            { id: 10001491, text: "票据模板", key: "98.33", url: "", type: "", child: undefined, disabled: false, component: BillTemplateIndex },
            { id: 10001492, text: "APP打印模板", key: "10001492", url: "", type: "", child: undefined, disabled: false, component: AppPrintTemplate },

        ], disabled: false
    },
    {
        id: 10001500, text: "产品价格", key: "98.14", url: "", type: "", disabled: false, component: PermissionPrompt, child:
            [
                { id: 10001510, text: "产品性质", key: "98.22", url: "", type: "", child: undefined, disabled: false, component: ProductKindLayout },
                { id: 10001520, text: "产品项目", key: "98.23", url: "", type: "", child: undefined, disabled: false, component: ProductItemLayout },
                // { id: 10001530, text: "产品类型", key: "98.24", url: "", type: "", child: undefined, disabled: false, component: ProductTypeLayout },
                { id: 10001540, text: "产品", key: "98.25", url: "", type: "", child: undefined, disabled: false, component: WaterProductLayout },
                { id: 10001550, text: "超计划水价", key: "98.26", url: "", type: "", child: undefined, disabled: false, component: SuperPlanPriceLayout },
                { id: 10001560, text: "阶梯水价", key: "98.27", url: "", type: "", child: undefined, disabled: false, component: PriceLadder },
                { id: 20000000, text: "测试", key: "200000", url: "", type: "", child: undefined, disabled: false, component: Test },
                { id: 20010000, text: "测试", key: "201000", url: "", type: "", child: undefined, disabled: false, component: Test },
            ],
    },
    {
        id: 10001600, text: "系统参数", key: "98.99", url: "", type: "", child: undefined, disabled: false, component: SysParam
    },
    { id: 10001700, text: "文件下载", key: "99.31", url: "", type: "", child: undefined, disabled: false, component: FilesDownLoad },
    
    { id: 10001800, text: "用户管理_仿制", key: "99.666", url: "", type: "", child: undefined, disabled: false, component: CopeMenuLayout },

       
    // {
    //     id: 19999999, text: "cs", key: "99.999", url: "", type: "", child: undefined, disabled: false, component: LABBBBBBBB
    // },
    // 供需求人员测试用
    // {
    //     id: 10001700, text: "测试", key: "99.00", url: "", type: "", child: undefined, disabled: false, component:CeshiView
    // },
]


