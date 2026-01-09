/* HERO IMAGE HOVER */
const heroImg = document.querySelector(".hero-image img");
const originalSrc = heroImg.src;
const hoverSrc = heroImg.dataset.hover;

heroImg.addEventListener("mouseenter", () => {
  heroImg.style.opacity = "0";
  setTimeout(() => {
    heroImg.src = hoverSrc;
    heroImg.style.opacity = "1";
  }, 600);
});

heroImg.addEventListener("mouseleave", () => {
  heroImg.style.opacity = "0";
  setTimeout(() => {
    heroImg.src = originalSrc;
    heroImg.style.opacity = "1";
  }, 600);
});
