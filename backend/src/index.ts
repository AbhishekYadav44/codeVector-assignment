import dotenv from 'dotenv'
dotenv.config();
import productRoutes from './routes/products'
import {prisma} from "./prismaClient";

import express from 'express';
const app = express();
const PORT = process.env.PORT;

 
app.use(express.json())

app.get('/', async (req, res) => {
  try {
    const data = await prisma.product.findFirst({
        where :{ 
            category : "Books"
        }
    });
    console.log(data)
    res.json({ data });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.use("/",productRoutes)

app.listen(PORT,()=> {
    console.log(`your server is running on port ${PORT}`)
})

process.on("exit", (code) => {
  console.log("Process exiting with code:", code);
});