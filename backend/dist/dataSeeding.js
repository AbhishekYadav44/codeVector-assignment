"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const prismaClient_1 = require("./prismaClient");
const TOTAL = 200000;
const BATCH_SIZE = 5000;
const categories = ["Electronics", "Books", "Clothing", "Food", "Sports"];
function generateProducts(start, end) {
    const data = [];
    for (let i = start; i < end; i++) {
        data.push({
            name: `Product-${i}`,
            category: categories[i % categories.length],
            price: Math.floor(Math.random() * 10000),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    return data;
}
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Seeding started...");
        for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
            const batch = generateProducts(i, i + BATCH_SIZE);
            yield prismaClient_1.prisma.product.createMany({
                data: batch,
                skipDuplicates: true,
            });
            console.log(`inserted ${i + BATCH_SIZE}/${TOTAL}`);
        }
        console.log("seeding complete ");
    });
}
//# sourceMappingURL=dataSeeding.js.map