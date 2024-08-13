import express, { NextFunction,Request,Response } from 'express';

const catalogRouter=express.Router()


catalogRouter.post('/product',async (req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json({})
})


export default catalogRouter;