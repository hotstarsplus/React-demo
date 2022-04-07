export { BdtMenuData } from './menus';
export { BDTStore } from './store';
export { SearchTree, ZoneTree } from './zoneTree';

// (()=>{
//     window["selfOffice"] = {};
//     window["selfOffice"].listen = (key: React.ReactText,call: ()=> any) => {
//         if (!window["listenList"]) { window["listenList"] = {}};
//         if (!window["listenList"][key]) { window["listenList"][key] = call}
//         else { window["listenList"][key] = call };
//     };
//     window["selfOffice"].trigger = () => {
//         if (!window["listenList"]) { return; };
//         Object.keys(window["listenList"]).map(( model ) => {
//             if ( window["listenList"][model] ) {
//                 window["listenList"][model]();
//             }
//         })
//     };
//     if( window["pipeLine"] ) {
//         Object.keys(window["pipeLine"]).map(( model ) => {
//             window["listenList"][model] = window["pipeLine"][model];
//         })
//     };
//     if ( window.onresize ) {
//         const oldResize = window.onresize as any;
//         window.onresize = (event: any) => {
//             oldResize();
//             window["selfOffice"].trigger();
//         }
//     };
//     window.addEventListener("resize",() => {
//         console.log("重置页面大小!")
//         window["selfOffice"].trigger();
//     })
// })()