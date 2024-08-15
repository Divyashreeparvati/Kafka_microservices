import  request  from "supertest";
import express from "express";
import { faker } from "@faker-js/faker";
import catalogRouter from "../catalog.route";

const app=express()

app.use(express.json())
app.use(catalogRouter)

const mockRequest=()=>{
    return {
        name: faker.commerce.productName() ,
        Description:faker.commerce.productDescription(),
        stock: faker.number.int({min:10,max:100}) ,
        price:+faker.commerce.price()
    }
}//src/api/__test__/catalog.route.test.ts

describe("Catalog Rotes",()=>{
    describe("POST /products",()=>{

        test("shoul create product sucessfully",async()=>{
            const requestBody=mockRequest()
            const response=await request(app)
            .post("/products")
            .send(requestBody)
            .set("Accept","application/json")

            // console.log("TEST RESPONSE",response)

            expect(response.status).toBe(201)
        })

    })
})