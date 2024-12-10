const boxes = document.querySelectorAll(".box");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      } else {
        entry.target.classList.remove("animate");
      }
    });
  },
  { threshold: 0.2 }
);

boxes.forEach((box) => {
  observer.observe(box);
});
