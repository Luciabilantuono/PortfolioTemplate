const heroImg = document.getElementById("heroImg");

const images = [
  "https://picsum.photos/900/600?random=1",
  "https://picsum.photos/900/600?random=2",
  "https://picsum.photos/900/600?random=3",
];

let current = 0;

window.addEventListener("mousemove", () => {
  current = (current + 1) % images.length;
  heroImg.src = images[current];
});

// ABOUT carousel auto scroll
gsap.to(".about-track", {
  x: "-50%",
  duration: 20,
  repeat: -1,
  ease: "linear",
});
