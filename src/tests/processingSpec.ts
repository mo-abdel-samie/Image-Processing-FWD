import { resizeImage } from '../controllers/api.controller';

describe('Testing function of processing image:', function () {
  // it('1.Expect rezise image with error null', function () {
  //   const IimageInfo = {
  //     imageName: 'img_1.jpg',
  //     width: '200',
  //     hight: '200',
  //   };
  //   resizeImage(IimageInfo, (error) => {
  //     expect(error).toBeNull();
  //   });
  // });

  it('2.Expect resize image with "An error occurred processing the image"', async function () {
    const IimageInfo = {
      imageName: 'incorrectName.jpg',
      width: '200',
      hight: '200',
    };
    resizeImage(IimageInfo, (error) => {
      expect(error).toBe('An error occurred processing the image');
    });
  });
});
