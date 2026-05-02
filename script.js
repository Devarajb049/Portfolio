AOS.init({
  duration: 1200, // Animation duration in ms
  once: false, // Animation only occurs once
});

function openFullscreen(id) {
  const img = document.getElementById(id);
  if (img.requestFullscreen) {
    img.requestFullscreen();
  } else if (img.webkitRequestFullscreen) {
    img.webkitRequestFullscreen();
  } else if (img.msRequestFullscreen) {
    img.msRequestFullscreen();
  }
}
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {

    // Move main cursor
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Create trail
    const trail = document.createElement("div");
    trail.classList.add("trail");
    document.body.appendChild(trail);

    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";

    setTimeout(() => {
        trail.remove();
    }, 500);

});