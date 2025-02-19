"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const faker_1 = require("@faker-js/faker");
const catalog_route_1 = __importStar(require("../catalog.route"));
const index_1 = require("../../utils/fixtures/index");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(catalog_route_1.default);
const mockRequest = () => {
    return {
        name: faker_1.faker.commerce.productName(),
        description: faker_1.faker.commerce.productDescription(),
        stock: faker_1.faker.number.int({ min: 10, max: 100 }),
        price: +faker_1.faker.commerce.price(),
    };
};
describe("Catalog Routes", () => {
    describe("POST /products", () => {
        test("should create product successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const requestBody = mockRequest();
            const product = index_1.ProductFactory.build();
            jest
                .spyOn(catalog_route_1.catalogService, "createProduct")
                .mockImplementationOnce(() => Promise.resolve(product));
            const response = yield (0, supertest_1.default)(app)
                .post("/products")
                .send(requestBody)
                .set("Accept", "application/json");
            expect(response.status).toBe(201);
            expect(response.body).toEqual(product);
        }));
        test("should response with validation error 400", () => __awaiter(void 0, void 0, void 0, function* () {
            const requestBody = mockRequest();
            const response = yield (0, supertest_1.default)(app)
                .post("/products")
                .send(Object.assign(Object.assign({}, requestBody), { name: "" }))
                .set("Accept", "application/json");
            expect(response.status).toBe(400);
            expect(response.body).toEqual("name should not be empty");
        }));
        test("should response with an internal error code 500", () => __awaiter(void 0, void 0, void 0, function* () {
            const requestBody = mockRequest();
            jest
                .spyOn(catalog_route_1.catalogService, "createProduct")
                .mockImplementationOnce(() => Promise.reject(new Error("unable to create product")));
            const response = yield (0, supertest_1.default)(app)
                .post("/products")
                .send(requestBody)
                .set("Accept", "application/json");
            expect(response.status).toBe(500);
            expect(response.body).toEqual("unable to create product");
        }));
    });
    describe("PATCH /products/:id", () => {
        test("should update product successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const product = index_1.ProductFactory.build();
            const requestBody = {
                name: product.name,
                price: product.price,
                stock: product.stock,
            };
            jest
                .spyOn(catalog_route_1.catalogService, "updateProduct")
                .mockImplementationOnce(() => Promise.resolve(product));
            const response = yield (0, supertest_1.default)(app)
                .patch(`/products/${product.id}`)
                .send(requestBody)
                .set("Accept", "application/json");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        }));
        test("should response with validation error 400", () => __awaiter(void 0, void 0, void 0, function* () {
            const product = index_1.ProductFactory.build();
            const requestBody = {
                name: product.name,
                price: -1,
                stock: product.stock,
            };
            const response = yield (0, supertest_1.default)(app)
                .patch(`/products/${product.id}`)
                .send(Object.assign({}, requestBody))
                .set("Accept", "application/json");
            expect(response.status).toBe(400);
            expect(response.body).toEqual("price must not be less than 1");
        }));
        test("should response with an internal error code 500", () => __awaiter(void 0, void 0, void 0, function* () {
            const product = index_1.ProductFactory.build();
            const requestBody = mockRequest();
            jest
                .spyOn(catalog_route_1.catalogService, "updateProduct")
                .mockImplementationOnce(() => Promise.reject(new Error("unable to update product")));
            const response = yield (0, supertest_1.default)(app)
                .patch(`/products/${product.id}`)
                .send(requestBody)
                .set("Accept", "application/json");
            expect(response.status).toBe(500);
            expect(response.body).toEqual("unable to update product");
        }));
    });
    describe("GET /products?limit=0&offset=0", () => {
        test("should return a range of products based on limit and offset", () => __awaiter(void 0, void 0, void 0, function* () {
            const randomLimit = faker_1.faker.number.int({ min: 10, max: 50 });
            const products = index_1.ProductFactory.buildList(randomLimit);
            jest
                .spyOn(catalog_route_1.catalogService, "getProducts")
                .mockImplementationOnce(() => Promise.resolve(products));
            const response = yield (0, supertest_1.default)(app)
                .get(`/products?limit=${randomLimit}&offset=0`)
                .set("Accept", "application/json");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(products);
        }));
    });
    describe("GET /products/:id", () => {
        test("should return a product by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const product = index_1.ProductFactory.build();
            jest
                .spyOn(catalog_route_1.catalogService, "getProduct")
                .mockImplementationOnce(() => Promise.resolve(product));
            const response = yield (0, supertest_1.default)(app)
                .get(`/products/${product.id}`)
                .set("Accept", "application/json");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        }));
    });
    describe("DELETE /products/:id", () => {
        test("should delete a product by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const product = index_1.ProductFactory.build();
            jest
                .spyOn(catalog_route_1.catalogService, "deleteProduct")
                .mockImplementationOnce(() => Promise.resolve({ id: product.id }));
            const response = yield (0, supertest_1.default)(app)
                .delete(`/products/${product.id}`)
                .set("Accept", "application/json");
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: product.id });
        }));
    });
});
