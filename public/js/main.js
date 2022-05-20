const showImage = document.querySelector('#showImage');
const selectImage = document.querySelector('#selectImage');

selectImage &&
  selectImage.addEventListener('change', () => {
    showImage.src = `assets/images/gallery/${selectImage.value}`;
    console.log(selectImage.value);
  });
