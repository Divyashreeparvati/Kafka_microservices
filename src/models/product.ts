export class Product{
    constructor(
        public readonly name:String,
        public readonly Description:String,
        public readonly stock:number,
        public readonly price:number,
        public readonly id?:number
    ){}
}