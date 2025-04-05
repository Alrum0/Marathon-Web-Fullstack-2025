const images = ['1.jpg', '2.jpg', '3.jpg'];

let currentIndex = 0;
const sliderImage = document.getElementById('slaider');

const showImage = (index) => {
    sliderImage.src = `assets/images/${images[index]}`;
}

const nextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

document.getElementById('next').addEventListener('click', () => {
    nextImage();
});

showImage(currentIndex);
setInterval(nextImage, 3000);