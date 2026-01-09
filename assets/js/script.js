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

/* ABOUT AUTO SCROLL */
let offset = 0;
const track = document.querySelector(".about-track");

function scrollAbout() {
  offset -= 0.25;
  track.style.transform = `translateX(${offset}px)`;
  if (Math.abs(offset) > track.scrollWidth / 2) offset = 0;
  requestAnimationFrame(scrollAbout);
}

scrollAbout();
