import express, { urlencoded } from 'express'
import path from 'path';
import catalogRouter from './api/catalog.route'


const app=express()

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',catalogRouter)


export default app;

