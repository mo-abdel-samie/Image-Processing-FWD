"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gallery = exports.thumbnailImage = exports.home = void 0;
const fileSystem_module_1 = require("../modules/fileSystem.module");
const home = (req, res) => {
    (0, fileSystem_module_1.getImgFilesFromDir)('public/assets/images/gallery/', (files) => {
        res.render('index', { files });
    });
};
exports.home = home;
const thumbnailImage = (req, res) => {
    (0, fileSystem_module_1.getImgFilesFromDir)('public/assets/images/thumbnails/', (files) => {
        res.render('pages/thumbnail-image', { files });
    });
};
exports.thumbnailImage = thumbnailImage;
const gallery = (req, res) => {
    (0, fileSystem_module_1.getImgFilesFromDir)('public/assets/images/gallery/', (files) => {
        res.render('pages/gallery', { files });
    });
};
exports.gallery = gallery;
