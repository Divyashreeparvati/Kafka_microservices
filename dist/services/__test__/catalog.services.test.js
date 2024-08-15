"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mockCatelog_repository_1 = require("../../repository/mockCatelog.repository");
const catalog_services_1 = require("../catalog.services");
const faker_1 = require("@faker-js/faker");
const rosie_1 = require("rosie");
const productFactory = new rosie_1.Factory()
    .attr("id", faker_1.faker.number.int({ min: 1, max: 100 }))
    .attr("name", faker_1.faker.commerce.productName())
    .attr("Description", faker_1.faker.commerce.productDescription())
    .attr("stock", faker_1.faker.number.int({ min: 10, max: 100 }))
    .attr("price", +faker_1.faker.commerce.price());
const mockProduct = (rest) => {
    return Object.assign({ name: faker_1.faker.commerce.productName(), Description: faker_1.faker.commerce.productDescription(), stock: faker_1.faker.number.int({ min: 10, max: 100 }) }, rest);
};
describe("catalogService", () => {
    let repository;
    beforeEach(() => {
        repository = new mockCatelog_repository_1.MockCatalogRepository();
    });
    afterEach(() => {
        repository = {};
    });
    describe("createProduct", () => {
        test("should create product", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new catalog_services_1.CatalogService(repository);
            const requestBody = mockProduct({
                price: +faker_1.faker.commerce.price()
            });
            const result = yield service.createProduct(requestBody);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                Description: expect.any(String),
                stock: expect.any(Number),
                price: expect.any(Number)
            });
        }));
        test("should throw error if Unable to create product", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new catalog_services_1.CatalogService(repository);
            const requestBody = mockProduct({
                price: +faker_1.faker.commerce.price()
            });
            jest.spyOn(repository, 'create').mockImplementationOnce(() => Promise.resolve({}));
            yield expect(service.createProduct(requestBody)).rejects.toThrow("Unable to create product");
        }));
        test("should throw error if product already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new catalog_services_1.CatalogService(repository);
            const requestBody = mockProduct({
                price: +faker_1.faker.commerce.price()
            });
            jest.spyOn(repository, 'create').mockImplementationOnce(() => Promise.reject(new Error("product already exists")));
            yield expect(service.createProduct(requestBody)).rejects.toThrow("product already exists");
        }));
    });
    describe("updateProduct", () => {
        test("shoul update product", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new catalog_services_1.CatalogService(repository);
            const requestBody = mockProduct({
                price: +faker_1.faker.commerce.price(),
                id: faker_1.faker.number.int({ min: 10, max: 100 })
            });
            const result = yield service.updateProduct(requestBody);
            expect(result).toMatchObject(requestBody);
        }));
        test("should throw error if product does not exists", () => {
            const service = new catalog_services_1.CatalogService(repository);
            jest.spyOn(repository, "update").mockImplementationOnce(() => Promise.reject(new Error("product does not exists")));
            expect(service.updateProduct({})).rejects.toThrow("product does not exists");
        });
    });
    describe('getProducts', () => {
        test("shoul get products from offset and limit", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new catalog_services_1.CatalogService(repository);
            const randomLimit = faker_1.faker.number.int({ min: 1, max: 100 });
            const products = productFactory.buildList(randomLimit);
            jest.spyOn(repository, "find").mockImplementationOnce(() => Promise.resolve(products));
            const result = yield service.getProducts(randomLimit, 0);
            expect(result.length).toEqual(randomLimit);
            expect(result).toMatchObject(products);
        }));
        test("should throw error if products does not exists", () => {
            const service = new catalog_services_1.CatalogService(repository);
            jest.spyOn(repository, "find").mockImplementationOnce(() => Promise.reject(new Error("products does not exists")));
            expect(service.getProducts(0, 0)).rejects.toThrow("products does not exists");
        });
    });
    describe('getProduct', () => {
        test("shoul get product by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new catalog_services_1.CatalogService(repository);
            const randomLimit = faker_1.faker.number.int({ min: 1, max: 100 });
            const product = productFactory.build();
            jest.spyOn(repository, "findOne").mockImplementationOnce(() => Promise.resolve(product));
            const result = yield service.getProduct(product.id);
            expect(result).toMatchObject(product);
        }));
        test("should throw error if product does not exists", () => {
            const service = new catalog_services_1.CatalogService(repository);
            jest.spyOn(repository, "findOne").mockImplementationOnce(() => Promise.reject(new Error("product does not exists")));
            expect(service.getProduct(0)).rejects.toThrow("product does not exists");
        });
    });
    describe('deleteProduct', () => {
        test("shoul delete Product by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new catalog_services_1.CatalogService(repository);
            const product = productFactory.build();
            jest.spyOn(repository, "delete").mockImplementationOnce(() => Promise.resolve({ id: product.id }));
            const result = yield service.deleteProduct(product.id);
            expect(result).toMatchObject({ id: product.id });
        }));
        test("should throw error if product does not exists", () => {
            const service = new catalog_services_1.CatalogService(repository);
            jest.spyOn(repository, "delete").mockImplementationOnce(() => Promise.reject(new Error("product does not exists")));
            expect(service.deleteProduct(0)).rejects.toThrow("product does not exists");
        });
    });
});
