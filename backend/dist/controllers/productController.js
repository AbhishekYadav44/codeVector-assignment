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
exports.seedingController = seedingController;
const dataSeeding_1 = require("../dataSeeding");
function seedingController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, dataSeeding_1.seed)();
            return res.json({
                success: true,
                message: "Database seeding completed",
                data
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Seeding failed",
            });
        }
    });
}
//# sourceMappingURL=productController.js.map