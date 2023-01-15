export function mergeArrays<Type>(
    firstArray: Array<Type>,
    secondArray: Array<Type>,
    getIdentifierCallback: (x: Type) => any) {
    const resIds = new Set([
        ...firstArray.map(x => getIdentifierCallback(x)), ...secondArray.map(x => getIdentifierCallback(x))
    ]);
    const resArray = [];
    // @ts-ignore
    for (const resId of resIds) {
        let item = firstArray.find(x => getIdentifierCallback(x) === resId);
        if(!item) {
            item = secondArray.find(x => getIdentifierCallback(x) === resId);
        }
        if(item) {
            resArray.push(item);
        }
    }
    return resArray;
}