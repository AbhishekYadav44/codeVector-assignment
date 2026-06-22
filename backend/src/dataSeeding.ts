
import {prisma} from "./prismaClient";

const TOTAL = 200000;
const BATCH_SIZE = 5000;

const categories = ["Electronics", "Books", "Clothing", "Food", "Sports"];

function generateProducts(start: number, end: number) {
  const data = [];

  for (let i = start; i < end; i++) {
    data.push({
      name: `Product-${i}`,
      category: categories[i % categories.length]!,
      price: Math.floor(Math.random() * 10000),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return data;
}

export  async function seed() {
  console.log("Seeding started...");

  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const batch = generateProducts(i, i + BATCH_SIZE);

    await prisma.product.createMany({
      data: batch,
      skipDuplicates: true,
    });

    console.log(`inserted ${i + BATCH_SIZE}/${TOTAL}`);
  }

  console.log("seeding complete ");
  
}

