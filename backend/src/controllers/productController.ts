import { Request, Response } from "express";
import { seed } from "../dataSeeding";
import { prisma } from "../prismaClient";


export async function seedingController(req: Request, res: Response) {
  try {
    const data = await seed();

    return res.json({
      success: true,
      message: "Database seeding completed",
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Seeding failed",


    });
  }
}

export async function allProductsController(req: Request, res: Response) {
  try {
    let data = await prisma.product.findMany({
      take : 20,
      orderBy: [
        {
          updatedAt: "desc"
        },
        {
          id: "desc"
        }
      ]
    })

   const formattedData = data.map((product)=> ({
    ...product,
    id : product.id.toString()
   }))

    return res.json({
      message: "data fetched",
      data : formattedData
    })
  } catch (e) {
    console.log(e)
    return res.json({
      messsage: "err while fetching products"
    })
  }



}

export async function getProductsByCategoryController(
  req: Request,
  res: Response
) {
  try {
    const category = req.params.category as string;
    console.log(req.params)
    console.log(category)

    const products = await prisma.product.findMany({
      where: {
        category : category,
      },
      take: 20,
      orderBy: [
        {
          updatedAt: "desc",
        },
        {
          id: "desc",
        },
      ],
    });

    return res.json({
      success: true,
      data: products.map((product) => ({
        ...product,
        id: product.id.toString(),
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
}