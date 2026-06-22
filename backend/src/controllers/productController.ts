import { Request, Response } from "express";
import { seed } from "../dataSeeding";


export async function seedingController(req: Request, res: Response) {
  try {
   const data =  await seed();

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