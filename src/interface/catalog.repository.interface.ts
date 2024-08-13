import { Product } from "../models/product";


export interface ICatalogRepository{
    create(data:Product):Promise<Product>;
    update(data:Product):Promise<Product>;
    delete(id:any):any;
    find():Promise<[]>;
    findOne(id:any):Promise<Product>
}