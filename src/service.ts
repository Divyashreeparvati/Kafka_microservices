import expressApp from './expressApp'
import dotenv from 'dotenv'
import path from 'path'

const env=process.env.NODE_ENV

dotenv.config({path:path.resolve(__dirname,`.env.${env}`)})

const PORT=process.env.PORT||8000

export const StartServer=async()=>{

    expressApp.listen(PORT,()=>{
        console.log("listening at ",PORT)
    })

    process.on('uncaughtException',async (err)=>{
        console.log(err)
        process.exit(1)
    })

}

StartServer().then(()=>{
    console.log("server is up")
})