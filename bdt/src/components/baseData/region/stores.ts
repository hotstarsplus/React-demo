import { BusinessOfficeUiStore } from './businessOffice/uiStore';
import { NeighborhoodDoMainStore } from './neighborhood/domainStore';
import { RegionUiStore } from './region/uiStore';
import { ResidenceUiStore } from './residence/uiStore';
import { WaterStationUiStore } from './waterStation/uiStore'

const stores = { 
    GlobalBusinessOfficeStore: new BusinessOfficeUiStore(),
    GlobalRegionStore:new RegionUiStore(),
    GlobalResidenceStore: new ResidenceUiStore(), 
    GlobalNeighborhoodStore: new NeighborhoodDoMainStore(),
    GlobalWaterStationStore: new WaterStationUiStore(),
}

export default stores;