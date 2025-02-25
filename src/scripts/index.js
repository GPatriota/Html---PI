const images = ["src/assets/imagem1.jpg", "src/assets/imagem2.jpg"];
let currentIndex = 0;
const sliderImg = document.getElementById("slider-img");

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    sliderImg.src = images[currentIndex];
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    sliderImg.src = images[currentIndex];
}