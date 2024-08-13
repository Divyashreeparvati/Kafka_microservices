import { ICatalogRepository } from "../interface/catalog.repository.interface";
import { Product } from "../models/product";


export class MockCatalogRepository implements ICatalogRepository{
    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: any) {
        throw new Error("Method not implemented.");
    }
    find(): Promise<[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }
}