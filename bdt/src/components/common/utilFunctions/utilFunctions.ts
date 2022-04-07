/**
 * 判断指定的对象的除指定的属性外的其它所有属性是否为空
 * @param {any} obj 指定的对象
 * @param {string[]} names 指定的对象属性
 */
export function isObjectOtherPropertyEmpty(obj: any,names:string[]): boolean {
    if (typeof obj !== "object" || !obj || Array.isArray(obj)) {
        return false;
    }

    for (const pk in obj) {
        if (names.indexOf(pk)!==-1) {
            if (typeof obj[pk] === 'string') {
                if (obj[pk] === "") {
                    return false;
                }
            }
        }else{// 如果属性是其它属性
            if (typeof obj[pk] === 'string') {
                if (obj[pk] !== "") {
                    return false;
                }
            }
        }
    }
    return true;
}


    /**
     * 获取一个对象数组中某个属性的最大值
     * @param model  对象数组
     * @param key    需要取最大值的属性
     */
    export function getMaxValueByKey(model:any,key:string){

        let maxValue = 0;

        model.forEach((element:any) => {
            if(element[key]>maxValue){
                maxValue = element[key]
            }
        });

        return maxValue
    }

function proxySetObject(bindThis: object | any, values?: object ) {
    values && (Object.keys(values) || []).map(( model )=> {
        bindThis[model] = values[model];
    })
}

/** 特殊字符转化未UnionCode编码，用于调用接口 */
export function conversionSpecialCharacter(str:string){
    str=str.split('%').join('%25');
    str=str.split('#').join('%23');
    str=str.split('&').join('%26');
    str=str.split('=').join('%3D');
    str=str.split('?').join('%3F');
    str=str.split("'").join('%22');
    str=str.split(',').join('%2C');
    return str;
}
export { proxySetObject };