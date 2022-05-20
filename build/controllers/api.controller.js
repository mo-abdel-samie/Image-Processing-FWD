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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = exports.updateImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fileSystem_module_1 = require("../modules/fileSystem.module");
/**
 * @param req
 * @param res
 */
const updateImage = (req, res) => {
    const imageName = String(req.query.imageName);
    const width = Number(req.query.width);
    const hight = Number(req.query.hight);
    (0, exports.resizeImage)({ imageName, width, hight }, (error) => {
        if (error) {
            (0, fileSystem_module_1.getImgFilesFromDir)('public/assets/images/gallery/', (files) => {
                res.render('index', { files, error });
            });
        }
        else {
            res.redirect('/thumbnail-img');
        }
    });
};
exports.updateImage = updateImage;
/**
 * @param imageData (imageName: string, width: number, hight: number )
 * @param cb
 */
const resizeImage = (imageData, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const imageSplitName = imageData.imageName.split('.');
    try {
        yield (0, sharp_1.default)(`public/assets/images/gallery/${imageData.imageName}`)
            .resize(Number(imageData.hight), Number(imageData.hight))
            .png()
            .toFile(`public/assets/images/thumbnails/${imageSplitName[0]}_etided_${imageData.width}_${imageData.hight}.png`);
        cb(null);
    }
    catch (error) {
        cb('An error occurred processing the image');
    }
});
exports.resizeImage = resizeImage;
