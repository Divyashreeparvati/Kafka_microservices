import express, { urlencoded } from 'express'
import path from 'path';
import catalogRouter from './api/catalog.route'
import { httpLogger, HandleErrorWithLogger } from "./utils";


const app=express()

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',catalogRouter)
app.use(httpLogger);
app.use(HandleErrorWithLogger);


export default app;

