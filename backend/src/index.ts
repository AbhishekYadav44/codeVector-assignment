import dotenv from 'dotenv'
dotenv.config();
import productRoutes from './routes/products'
import {prisma} from "./prismaClient";

import express from 'express';
const app = express();
const PORT = process.env.PORT;

 
app.use(express.json())


app.use("/",productRoutes)

app.listen(PORT,()=> {
    console.log(`your server is running on port ${PORT}`)
})

process.on("exit", (code) => {
  console.log("Process exiting with code:", code);
});