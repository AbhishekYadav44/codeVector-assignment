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
      take: 20,
      orderBy: [
        {
          updatedAt: "desc"
        },
        {
          id: "desc"
        }
      ]
    })

    const formattedData = data.map((product) => ({
      ...product,
      id: product.id.toString()
    }))

    return res.json({
      message: "data fetched",
      data: formattedData
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
        category: category,
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

export async function paginatedProductsController(
  req: Request,
  res: Response
) {
  try {
    const cursorId = req.query.cursorId as string | undefined;
    const limit = Number(req.query.limit) || 10;
    const cursorUpdatedAt = req.query.updatedAt as string | undefined;

    
    const providedAnchor = req.query.anchor as string | undefined;


    if (cursorId && !providedAnchor) {
      return res.status(400).json({
        success: false,
        message:
          "Missing anchor",
      });
    }

    const anchor = providedAnchor ?? new Date().toISOString();

    let products;

    if (!cursorId || !cursorUpdatedAt) {
     
      products = await prisma.product.findMany({
        take: limit,
        where: {
          updatedAt: {
            lte: new Date(anchor),
          },
        },
        orderBy: [
          { updatedAt: "desc" },
          { id: "desc" },
        ],
      });
    } else {
     
      products = await prisma.product.findMany({
        
        where: {
          AND: [
            { updatedAt: { lte: new Date(anchor) } },
            {
              OR: [
                { updatedAt: { lt: new Date(cursorUpdatedAt) } },
                {
                  updatedAt: new Date(cursorUpdatedAt),
                  id: { lt: BigInt(cursorId) },
                },
              ],
            },
          ],
        },
        take: limit,
        
        orderBy: [
          { updatedAt: "desc" },
          { id: "desc" },
        ],
      });
    }

    const formattedProducts = products.map((product) => ({
      ...product,
      id: product.id.toString(),
    }));

    const lastProduct = products[products.length - 1];

    return res.json({
      success: true,
      data: formattedProducts,
      anchor, 
      nextCursor: lastProduct
        ? {
            id: lastProduct.id.toString(),
            updatedAt: lastProduct.updatedAt,
          }
        : null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching paginated products",
    });
  }
}

export async function updateProductController(
  req: Request,
  res: Response
) {
  try {
    const id = BigInt(req.params.id as string);

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: req.body.name,
        updatedAt: new Date(),
      },
    });
    console.log(product)

    return res.json({
      success: true,
      product: {
        ...product,
        id: product.id.toString(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Product update failed",
    });
  }
}


export async function deleteController( req: Request, res: Response) {
  try {
    const id = BigInt(req.params.id as string);

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
}
