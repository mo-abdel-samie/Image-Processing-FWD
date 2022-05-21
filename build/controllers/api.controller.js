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
const validator_1 = __importDefault(require("validator"));
const sharp_1 = __importDefault(require("sharp"));
const fileSystem_module_1 = require("../modules/fileSystem.module");
const path_1 = __importDefault(require("path"));
/**
 * @param req
 * @param res
 */
const updateImage = (req, res) => {
    const sendFileOptions = {
        root: path_1.default.join(__dirname, '../../public/assets/images/thumbnails/'),
        // dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
        },
    };
    const imageName = String(req.query.imageName);
    const imageNameWithOutEx = imageName.split('.')[0];
    const width = String(req.query.width);
    const hight = String(req.query.hight);
    const expectedEditedImgName = `${imageNameWithOutEx}_etided_${width}_${hight}.png`;
    let cheeckExisting = false;
    let notValid = false;
    if (!validator_1.default.isInt(width) ||
        !validator_1.default.isInt(hight) ||
        imageName == 'undefined') {
        notValid = true;
        res.status(303).send('image param not valied');
    }
    // ToDo: Cheeck if the image exist befor. if exist return file
    !notValid &&
        (0, fileSystem_module_1.getImgFilesFromDir)('public/assets/images/thumbnails/', (files) => {
            files.forEach((file) => {
                if (file == expectedEditedImgName) {
                    cheeckExisting = true;
                    res.status(200).sendFile(expectedEditedImgName, sendFileOptions);
                }
            });
            if (!cheeckExisting)
                (0, exports.resizeImage)({ imageName, width, hight }, (error, savedName) => {
                    if (error) {
                        (0, fileSystem_module_1.getImgFilesFromDir)('public/assets/images/gallery/', (files) => {
                            res.render('index', { files, error });
                        });
                    }
                    else {
                        res.sendFile(savedName, sendFileOptions);
                    }
                });
        });
};
exports.updateImage = updateImage;
/**
 * @param imageData (imageName: string, width: number, hight: number )
 * @param cb
 */
const resizeImage = (imageData, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const imageSplitName = imageData.imageName.split('.');
    const imgFinalName = `${imageSplitName[0]}_etided_${imageData.width}_${imageData.hight}.png`;
    try {
        yield (0, sharp_1.default)(`public/assets/images/gallery/${imageData.imageName}`)
            .resize(Number(imageData.hight), Number(imageData.hight))
            .png()
            .toFile(`public/assets/images/thumbnails/${imgFinalName}`);
        cb('', imgFinalName);
    }
    catch (error) {
        cb('An error occurred processing the image', '');
    }
});
exports.resizeImage = resizeImage;
