"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileSystem_module_1 = require("../modules/fileSystem.module");
describe('Testing modules:', function () {
    it('1.Get files from directory [expect gallery directory to contain "img_1.jpg"]', function () {
        (0, fileSystem_module_1.getImgFilesFromDir)('public/assets/images/gallery/', (files) => {
            expect(files).toContain('img_1.jpg');
        });
    });
    it('2.Handling not file founded [expect files to equal [] ]', function () {
        (0, fileSystem_module_1.getImgFilesFromDir)('public/assets/images/thumbnails1/', (files) => {
            expect(files).toEqual([]);
        });
    });
});
