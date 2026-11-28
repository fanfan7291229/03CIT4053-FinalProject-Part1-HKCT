/* ==========================================================================
   HKCS 網站主要 JavaScript | HKCS Website Main JavaScript
   功能：漢堡包選單切換、輪播圖自動播放、箭頭切換、縮略圖聯動
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // ========================================
  // 1. 響應式漢堡包選單切換 | Mobile Menu Toggle
  // ========================================
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle("show");
    });
  }

  // ========================================
  // 2. 輪播圖功能 | Carousel Functionality
  // ========================================
  const carouselContainer = document.querySelector(".carousel-main-container");

  if (carouselContainer) {
    const slides = carouselContainer.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    const thumbnails = document.querySelectorAll(".thumbnail-item");
    const prevArrow = carouselContainer.querySelector(".carousel-arrow.prev");
    const nextArrow = carouselContainer.querySelector(".carousel-arrow.next");

    let currentSlide = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000;

    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));

      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      }

      slides[currentSlide].classList.add("active");
      if (dots[currentSlide]) dots[currentSlide].classList.add("active");
      if (thumbnails[currentSlide])
        thumbnails[currentSlide].classList.add("active");
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }
    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }
    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    if (prevArrow) {
      prevArrow.addEventListener("click", function (e) {
        e.preventDefault();
        prevSlide();
        resetAutoPlay();
      });
    }

    if (nextArrow) {
      nextArrow.addEventListener("click", function (e) {
        e.preventDefault();
        nextSlide();
        resetAutoPlay();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", function (e) {
        e.preventDefault();
        showSlide(index);
        resetAutoPlay();
      });
    });

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", function (e) {
        e.preventDefault();
        showSlide(index);
        resetAutoPlay();
      });
    });

    carouselContainer.addEventListener("mouseenter", stopAutoPlay);
    carouselContainer.addEventListener("mouseleave", startAutoPlay);

    showSlide(0);
    startAutoPlay();
  }
});
