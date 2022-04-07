import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'mobx-react';
import * as React from 'react';
import './index.scss'
import sysParamStores from './store';
import { SysParamTabs } from './sysParamTabs';

export class SysParam extends React.Component {
    public render() {
        return (
            <>
                <Provider {...sysParamStores}>
                    <LocaleProvider locale={zhCN}>
                        <div
                            className="SysParamTabs-Tabs-InvoicingParametersLayout"
                        >
                            <SysParamTabs />
                        </div>
                    </LocaleProvider>
                </Provider>
            </>
        );
    }
}