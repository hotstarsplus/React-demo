import { DeviceArchiveTypeDoMainStore } from './DeviceArchiveType/domainStore';
import { DeviceCategoryDoMainStore } from './DeviceCategory/domainStore';
import { TypeDoMainStore } from './DeviceCategory/treeview/domainStore';
import { DeviceTypeDoMainStore } from './DeviceType/domainStore';
import { ManufacturerDomainStore } from './manufacturer/doMainStore';
import { ManufacturerUiStore } from './manufacturer/uiStore';
import { MeterCaliberUiStore } from './meterCaliber/uiStore';
import { MeterModelUiStore } from './meterModel/uiStore';
import { MeterStateUiStore } from './meterState/uiStore';
import { MeterTypeUiStore } from './meterType/uiStore';
import { QuantityTapyUiStore } from './quantityTapy/uiStore';
import { SpecialProcessTypeUiStore } from './specialProcessType/uiStore';


const stores = {
    GlobalManufacturerStore: new ManufacturerUiStore(),
    GlobalManufacturerDomainStore:new ManufacturerDomainStore(),
    GlobalMeterCaliberStore:new MeterCaliberUiStore(),
    GlobalMeterModelStore:new MeterModelUiStore(),
    GlobalMeterStateStore: new MeterStateUiStore(),
    GlobalMeterTypeStore:new MeterTypeUiStore(),
    GlobalQuantityTapyStore:new QuantityTapyUiStore(),
    GlobalSpecialProgressTypeStore:new SpecialProcessTypeUiStore(),
    GlobalDeviceCategoryStore:new DeviceCategoryDoMainStore(),
    GlobalDeviceArchiveTypeStore:new DeviceArchiveTypeDoMainStore(),
    GlobalDeviceTypeStore:new DeviceTypeDoMainStore(),
    TreeTypeStore: new TypeDoMainStore(),

}

export default stores;