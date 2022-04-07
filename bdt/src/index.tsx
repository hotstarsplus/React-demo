import 'antd/dist/antd.less';
import { Provider } from 'mobx-react';
import { Page404, Root } from 'orid';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import stores from './components/baseData/meter/stores';
import { BdtMenuData } from './components/menus';
import { loginConfig } from './loginConfig';
import registerServiceWorker from './registerServiceWorker';

 // OridStores.authStore.isLogined = true;

const defaultTabPane: any = {
  closable: false,
  component: Page404,
  key: "defaultPage",
  title: "首页",
  url: "/workstate",
  menuKey: "2.1"
}

const BdtMenuDataDemoMenu = [
  { component: Page404, key: "98", text: '基础数据', type: 'setting', url: '', child: BdtMenuData }]

ReactDOM.render(
  <Provider{...stores}>
  <Root 
    frameMenus={BdtMenuDataDemoMenu}
    defaultTabPane={defaultTabPane}
    loginConfig={loginConfig}
  />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

