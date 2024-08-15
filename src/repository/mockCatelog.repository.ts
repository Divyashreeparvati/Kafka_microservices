import { ICatalogRepository } from "../interface/catalog.repository.interface";
import { Product } from "../models/product";


export class MockCatalogRepository implements ICatalogRepository{
    create(data: Product): Promise<Product> {
        const mockproduct={
            id:123,
            ...data
        }
        return Promise.resolve(mockproduct)
    }
    update(data: Product): Promise<Product> {
        return Promise.resolve(data as unknown as Product)
    }
    delete(id: any) {
        return Promise.resolve(id)
    }
    find(limit:number,offset:number): Promise<[]> {
        return Promise.resolve([])
    }
    findOne(id: any): Promise<Product> {
        return Promise.resolve({} as unknown as Product)
    }
}