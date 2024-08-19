import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductrequest{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    Description:string;

    @IsNumber()
    @Min(1)
    price:number;

    @IsNumber()
    stock:number
}

export class UpdateProductRequest {
    name?: string;
  
    description?: string;
  
    price?: number;
  
    @IsNumber()
    stock?: number;
  }