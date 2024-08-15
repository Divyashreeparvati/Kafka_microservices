import { ICatalogRepository } from "../../interface/catalog.repository.interface"
import { Product } from "../../models/product"
import { MockCatalogRepository } from "../../repository/mockCatelog.repository"
import { CatalogService } from "../catalog.services"
import { faker } from "@faker-js/faker"
import { Factory } from "rosie"

const productFactory=new Factory<Product>()
    .attr("id",faker.number.int({min:1,max:100}))
    .attr("name",faker.commerce.productName())
    .attr("Description",faker.commerce.productDescription())
    .attr("stock",faker.number.int({min:10,max:100}))
    .attr("price",+faker.commerce.price())

const mockProduct=(rest:any)=>{
    return {
        name: faker.commerce.productName() ,
        Description:faker.commerce.productDescription(),
        stock: faker.number.int({min:10,max:100}) ,
        ...rest
    }
}

describe("catalogService",()=>{
    let repository:ICatalogRepository

    beforeEach(()=>{
        repository= new MockCatalogRepository()
    })

    afterEach(()=>{
        repository= {} as MockCatalogRepository
    })

    describe("createProduct", ()=>{
        test("should create product",async()=>{
            const service=new CatalogService(repository)
            const requestBody=mockProduct({
                price: +faker.commerce.price()
            })
            const result=await service.createProduct(requestBody)
            expect(result).toMatchObject({
                id:expect.any(Number),
                name:expect.any(String),
                Description:expect.any(String),
                stock:expect.any(Number),
                price:expect.any(Number)
            })
        })

        test("should throw error if Unable to create product",async()=>{
            const service=new CatalogService(repository)
            const requestBody=mockProduct({
                price: +faker.commerce.price()
            })
            jest.spyOn(repository,'create').mockImplementationOnce(()=>Promise.resolve({} as Product))

            await expect(service.createProduct(requestBody)).rejects.toThrow("Unable to create product")

        })

        test("should throw error if product already exists",async()=>{
            const service=new CatalogService(repository)
            const requestBody=mockProduct({
                price: +faker.commerce.price()
            })
            jest.spyOn(repository,'create').mockImplementationOnce(()=>Promise.reject(new Error("product already exists")))

            await expect(service.createProduct(requestBody)).rejects.toThrow("product already exists")

        })
    })

    describe("updateProduct",()=>{
        test("shoul update product",async()=>{
            const service= new CatalogService(repository)
            const requestBody=mockProduct({
                price:+faker.commerce.price(),
                id:faker.number.int({min:10,max:100})
            })
            const result=await service.updateProduct(requestBody)

            expect(result).toMatchObject(requestBody)
        })
        test("should throw error if product does not exists",()=>{
            const service =new CatalogService(repository)
            jest .spyOn(repository,"update").mockImplementationOnce(()=>Promise.reject(new Error("product does not exists")))

            expect(service.updateProduct({})).rejects.toThrow("product does not exists")
        })
        
    })

    describe('getProducts',()=>{
        test("shoul get products from offset and limit",async()=>{
            const service= new CatalogService(repository)
            const randomLimit=faker.number.int({min:1,max:100})

            const products=productFactory.buildList(randomLimit)

            jest.spyOn(repository,"find").mockImplementationOnce(()=>Promise.resolve(products))

            const result=await service.getProducts(randomLimit,0)

            expect(result.length).toEqual(randomLimit)
            expect(result).toMatchObject(products)
        })

        test("should throw error if products does not exists",()=>{
            const service =new CatalogService(repository)
            jest .spyOn(repository,"find").mockImplementationOnce(()=>Promise.reject(new Error("products does not exists")))

            expect(service.getProducts(0,0)).rejects.toThrow("products does not exists")
        })
    })

    describe('getProduct',()=>{
        test("shoul get product by id",async()=>{
            const service= new CatalogService(repository)
            const randomLimit=faker.number.int({min:1,max:100})

            const product=productFactory.build()

            jest.spyOn(repository,"findOne").mockImplementationOnce(()=>Promise.resolve(product))

            const result=await service.getProduct(product.id!)

            expect(result).toMatchObject(product)
        })

        test("should throw error if product does not exists",()=>{
            const service =new CatalogService(repository)
            jest .spyOn(repository,"findOne").mockImplementationOnce(()=>Promise.reject(new Error("product does not exists")))

            expect(service.getProduct(0)).rejects.toThrow("product does not exists")
        })
    })

    describe('deleteProduct',()=>{
        test("shoul delete Product by id",async()=>{
            const service= new CatalogService(repository)

            const product=productFactory.build()

            jest.spyOn(repository,"delete").mockImplementationOnce(()=>Promise.resolve({id:product.id}))

            const result=await service.deleteProduct(product.id!)

            expect(result).toMatchObject({id:product.id})
        })

        test("should throw error if product does not exists",()=>{
            const service =new CatalogService(repository)
            jest .spyOn(repository,"delete").mockImplementationOnce(()=>Promise.reject(new Error("product does not exists")))

            expect(service.deleteProduct(0)).rejects.toThrow("product does not exists")
        })
    })
})