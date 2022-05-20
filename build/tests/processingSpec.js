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
const api_controller_1 = require("../controllers/api.controller");
describe('Testing function of processing image:', function () {
    it('1.Expect rezise image with error null', function () {
        const IimageInfo = {
            imageName: 'img_1.jpg',
            width: 200,
            hight: 200,
        };
        (0, api_controller_1.resizeImage)(IimageInfo, (error) => {
            expect(error).toBeNull();
        });
    });
    it('2.Expect resize image with "An error occurred processing the image"', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const IimageInfo = {
                imageName: 'incorrectName.jpg',
                width: 200,
                hight: 200,
            };
            (0, api_controller_1.resizeImage)(IimageInfo, (error) => {
                expect(error).toBe('An error occurred processing the image');
            });
        });
    });
});
