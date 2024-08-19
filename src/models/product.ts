export class Product{
    constructor(
        public readonly name:string,
        public readonly Description:string,
        public readonly stock:number,
        public readonly price:number,
        public readonly id?:number
    ){}
}
