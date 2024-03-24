export const uniqByKey = <T>(arr: T[], key: (k: T) => any) => {
    const seen: {[_: string]: any} = {};
    return arr.filter((item) => {
        const k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
}

// example
// import { uniqByKey } from "./uniq-by-key";
// 
// const arr = [
//     { id: 1, name: "foo" },
//     { id: 2, name: "bar" },
//     { id: 1, name: "baz" },
//     { id: 3, name: "qux" },
//     { id: 2, name: "quux" },
// ];
//
// const result = uniqByKey(arr, (item) => item.id);