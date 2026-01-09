/* HERO IMAGE HOVER */
const heroImg = document.querySelector(".hero-image img");

if (heroImg) {
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
}

/* ABOUT HORIZONTAL AUTO SCROLL */
const aboutTrack = document.querySelector(".about-track");

if (aboutTrack) {
  let position = 0;
  const speed = 0.25;

  function animateAbout() {
    position -= speed;
    const width = aboutTrack.scrollWidth / 2;
    if (Math.abs(position) >= width) position = 0;
    aboutTrack.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animateAbout);
  }

  animateAbout();
}
