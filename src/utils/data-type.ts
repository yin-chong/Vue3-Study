export {};
const str: string = '字符串';
const num: number = 1111;
const a: number | string = 1111;
const b: number | string = 'aaaa';
const nu: null = null;
const und: undefined = void 666;
const bool: boolean = true;
const arr: Array<number> = [1, 2, 3];
interface User {
    readonly name: string,
    age: number,
    students: Array<string>,
    country?: string
}
const user: User = {
    name: '张三',
    age: 22,
    students: ['李四', '王五']
}
const objectArr: Array<User> = [
    { age: 11, name: 'aaa', students: ['aa', 'bbb'] },
    { age: 11, name: 'aaa', students: ['aa', 'bbb'] },
    { age: 11, name: 'aaa', students: ['aa', 'bbb'] },
    { age: 11, name: 'aaa', students: ['aa', 'bbb'] },
];
function fnc(name: string = '张三', age: number = 20): Array<number>  {
    return [1, 2, 3, 4]
}
const myCanvas = <HTMLCanvasElement>document.getElementById('canvas'); // 类型断言